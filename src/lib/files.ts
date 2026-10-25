// URLs for uploaded files, with optional server-side resizing (see routes/files).
export const RESIZE_WIDTHS = [320, 640, 960, 1280, 1920] as const;

const isResizable = (name: string) => /\.(jpe?g|png|webp|avif)$/i.test(name);

/** URL of an uploaded file, resized to `width` when it is an image. */
export function fileUrl(name: string | null | undefined, width?: number) {
	if (!name) return '';
	return width && isResizable(name) ? `/files/${name}?w=${width}` : `/files/${name}`;
}

/** `srcset` covering the resize widths up to `max`. */
export function fileSrcset(name: string | null | undefined, max = 1920) {
	if (!name || !isResizable(name)) return undefined;
	return RESIZE_WIDTHS.filter((w) => w <= max)
		.map((w) => `/files/${name}?w=${w} ${w}w`)
		.join(', ');
}
