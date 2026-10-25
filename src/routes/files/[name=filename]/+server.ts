import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { env } from '$env/dynamic/private';
import { getCachedStats } from '$lib/server/fileCache';
import { RESIZE_WIDTHS as RESIZE_WIDTH_LIST } from '$lib/files';

const FILES_DIR = path.resolve(env.FILES_DIR ?? '.tempFiles');

if (!fs.existsSync(FILES_DIR)) {
	fs.mkdirSync(FILES_DIR, { recursive: true });
}

// ---------------------------------------------------------------------------
// Cache-Control policy per file type
// ---------------------------------------------------------------------------
const CACHE_TTL: Record<string, string> = {
	immutable: 'public, max-age=31536000, immutable',
	long: 'public, max-age=86400',
	short: 'public, max-age=600',
	none: 'no-store'
};

function cacheControl(ext: string): string {
	// Uploads get random UUID names and are never overwritten, so they can be cached for good.
	if (['webp', 'png', 'jpg', 'jpeg', 'avif', 'mp4', 'webm', 'mp3'].includes(ext))
		return CACHE_TTL.immutable;
	if (['pdf', 'txt'].includes(ext)) return CACHE_TTL.short;
	return CACHE_TTL.none;
}

// ---------------------------------------------------------------------------
// Range header parser
// ---------------------------------------------------------------------------
function parseRange(header: string, size: number): { start: number; end: number } | null {
	const match = header.match(/^bytes=(\d*)-(\d*)$/);
	if (!match) return null;

	let start = match[1] === '' ? NaN : Number(match[1]);
	let end = match[2] === '' ? NaN : Number(match[2]);

	if (isNaN(start) && isNaN(end)) return null;

	if (isNaN(start)) {
		// suffix: bytes=-500
		start = Math.max(0, size - end);
		end = size - 1;
	} else if (isNaN(end)) {
		// open-ended: bytes=500-
		end = size - 1;
	}

	if (start > end || end >= size) return null;
	return { start, end };
}

// ---------------------------------------------------------------------------
// MIME types
// ---------------------------------------------------------------------------
const mimes: Record<string, string> & { lookup: (s: string) => string } = {
	// Text
	txt: 'text/plain',
	pdf: 'application/pdf',
	// Images
	webp: 'image/webp',
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	avif: 'image/avif',
	// Audio
	mp3: 'audio/mpeg',
	// Video
	webm: 'video/webm',
	mp4: 'video/mp4',
	lookup(s: string): string {
		const ext = s.toLowerCase().split('.').at(-1);
		return (ext && this[ext]) ?? 'application/octet-stream';
	}
};

// ---------------------------------------------------------------------------
// Optional resizing (?w=640). sharp is an optional dependency: if it can't load
// on the host, originals are served instead.
// ---------------------------------------------------------------------------
const RESIZE_WIDTHS = new Set(RESIZE_WIDTH_LIST);
const RESIZE_DIR = path.join(FILES_DIR, '.resized');
type Sharp = typeof import('sharp');
let sharpLoader: Promise<Sharp | null> | null = null;
const loadSharp = () =>
	(sharpLoader ??= import('sharp')
		.then((m) => (m.default ?? m) as unknown as Sharp)
		.catch((err) => {
			console.warn('Image resizing disabled, sharp could not be loaded:', err?.message);
			return null;
		}));

// One resize per file/width at a time, even under concurrent requests.
const pending = new Map<string, Promise<string | null>>();
// Files sharp couldn't read; serve the original instead of retrying every request.
const failed = new Set<string>();

async function resized(source: string, name: string, width: number): Promise<string | null> {
	const target = path.join(RESIZE_DIR, String(width), `${name}.webp`);
	if (fs.existsSync(target)) return target;

	const key = `${width}/${name}`;
	if (failed.has(name)) return null;
	if (!pending.has(key)) {
		pending.set(
			key,
			(async () => {
				const sharp = await loadSharp();
				if (!sharp) return null;
				try {
					await fs.promises.mkdir(path.dirname(target), { recursive: true });
					const tmp = `${target}.${process.pid}.tmp`;
					await sharp(source)
						.rotate()
						.resize({ width, withoutEnlargement: true })
						.webp({ quality: 78 })
						.toFile(tmp);
					await fs.promises.rename(tmp, target);
					return target;
				} catch (err) {
					failed.add(name);
					console.error('Resize failed for', name, (err as Error).message);
					return null;
				}
			})().finally(() => pending.delete(key))
		);
	}
	return pending.get(key)!;
}

// ---------------------------------------------------------------------------
// GET handler
// ---------------------------------------------------------------------------
export async function GET({
	params,
	request,
	url
}: {
	params: { name: string };
	request: Request;
	url: URL;
}) {
	// Security: prevent path traversal
	const file_path = path.resolve(FILES_DIR, params.name);
	const relative = path.relative(FILES_DIR, file_path);
	if (relative.startsWith('..') || path.isAbsolute(relative)) {
		return new Response('forbidden', { status: 403 });
	}

	// Stat (with cache)
	const stats = getCachedStats(file_path);
	if (!stats || !stats.isFile()) return new Response('not found', { status: 404 });

	const ext = params.name.toLowerCase().split('.').at(-1) ?? '';
	const mimeType = mimes.lookup(params.name);

	const width = Number(url.searchParams.get('w'));
	if (RESIZE_WIDTHS.has(width as never) && ['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(ext)) {
		const small = await resized(file_path, params.name, width);
		if (small) {
			const smallStats = getCachedStats(small);
			if (smallStats) return sendFile(small, smallStats, 'webp', 'image/webp', request);
		}
	}

	return sendFile(file_path, stats, ext, mimeType, request);
}

function sendFile(
	file_path: string,
	stats: fs.Stats,
	ext: string,
	mimeType: string,
	request: Request
): Response {
	const etag = `W/"${stats.size}-${stats.mtime.getTime()}"`;
	const lastMod = stats.mtime.toUTCString();

	// Conditional requests
	if (request.headers.get('if-none-match') === etag) {
		return new Response(null, { status: 304 });
	}
	const ifModifiedSince = request.headers.get('if-modified-since');
	if (ifModifiedSince && new Date(ifModifiedSince) >= stats.mtime) {
		return new Response(null, { status: 304 });
	}

	// Range requests (audio/video seeking)
	const rangeHeader = request.headers.get('range');
	if (rangeHeader) {
		const range = parseRange(rangeHeader, stats.size);
		if (!range) {
			return new Response('range not satisfiable', {
				status: 416,
				headers: { 'Content-Range': `bytes */${stats.size}` }
			});
		}
		const { start, end } = range;
		const stream = Readable.toWeb(fs.createReadStream(file_path, { start, end }), {
			strategy: new CountQueuingStrategy({ highWaterMark: 100 })
		});
		return new Response(stream as ReadableStream, {
			status: 206,
			headers: {
				'Content-Range': `bytes ${start}-${end}/${stats.size}`,
				'Content-Length': String(end - start + 1),
				'Content-Type': mimeType,
				'Accept-Ranges': 'bytes',
				'Cache-Control': cacheControl(ext),
				'Last-Modified': lastMod,
				ETag: etag
			}
		});
	}

	// Full response
	const stream = Readable.toWeb(fs.createReadStream(file_path), {
		strategy: new CountQueuingStrategy({ highWaterMark: 100 })
	});
	return new Response(stream as ReadableStream, {
		headers: {
			'Content-Type': mimeType,
			'Content-Length': String(stats.size),
			'Cache-Control': cacheControl(ext),
			'Last-Modified': lastMod,
			'Accept-Ranges': 'bytes',
			ETag: etag
		}
	});
}
