// src/lib/server/upload.ts
import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { env } from '$env/dynamic/private';
import { randomUUID } from 'crypto';
import { invalidateStatCache } from '$lib/server/fileCache';

const FILES_DIR = env.FILES_DIR ?? '.tempFiles';

/* ensure folder exists once, at module load */
if (!fs.existsSync(FILES_DIR)) {
	fs.mkdirSync(FILES_DIR, { recursive: true });
}

/**
 * Save an uploaded file and return the stored file name.
 * @param file  File object coming from formData (has .name, .stream(), .type, etc.)
 * @returns     The generated file name (with extension) that was written to disk
 * @throws      If the write fails
 */
export async function saveUploadedFile(file: File): Promise<string>;
export async function saveUploadedFile(file: File | undefined): Promise<string | undefined>;
export async function saveUploadedFile(file: File | undefined): Promise<string | undefined> {
	if (!file || file.size === 0) return undefined;
	const ext = path.extname(file.name); // keep original extension
	const fileName = `${randomUUID()}${ext}`;

	const target = path.join(FILES_DIR, fileName);

	const webStream = file.stream(); // Web-stream from File
	const nodeStream = Readable.fromWeb(webStream as import('node:stream/web').ReadableStream);

	await pipeline(nodeStream, fs.createWriteStream(target));
	invalidateStatCache(path.resolve(FILES_DIR, target));

	return fileName; // store this string in your DB
}

export const uploadGallery = async (gallery: File[] | undefined) => {
	// 1. Guard against undefined or null
	if (!gallery || !Array.isArray(gallery)) {
		return [];
	}

	try {
		// 2. Filter out empty files (size === 0 or missing name) before mapping
		const validFiles = gallery.filter((file) => file && file.size > 0);

		if (validFiles.length === 0) return [];

		const uploadPromises = validFiles.map(async (file) => {
			const address = await saveUploadedFile(file);
			return address;
		});

		const uploadedAddresses: string[] = await Promise.all(uploadPromises);
		return uploadedAddresses;
	} catch (error) {
		console.error('Error uploading gallery:', error);
		throw error;
	}
};

/**
 * Delete stored uploads that are no longer referenced. Ignores empty values,
 * anything that isn't a bare file name, and files that are already gone.
 */
export async function deleteUploadedFiles(names: (string | null | undefined)[]) {
	for (const name of names) {
		if (!name || name !== path.basename(name)) continue;
		const target = path.resolve(FILES_DIR, name);
		try {
			await fs.promises.unlink(target);
		} catch (err) {
			if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
				console.error('Failed to delete upload', name, err);
			}
		}
		invalidateStatCache(target);
	}
}
