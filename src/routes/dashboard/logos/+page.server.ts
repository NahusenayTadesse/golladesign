import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc, eq } from 'drizzle-orm';

import { editGallery } from './schema';
import { db } from '$lib/server/db';
import { gallery } from '$lib/server/db/schema';
import { deleteUploadedFiles, uploadGallery } from '$lib/server/upload';
import { imageMetaAction } from '$lib/server/imageMeta';
import { logActivity } from '$lib/server/activity';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(editGallery));
	const rows = await db.select().from(gallery).orderBy(asc(gallery.sortOrder), asc(gallery.id));

	return {
		form,
		gallery: rows.map((r) => r.imageUrl).filter((u): u is string => Boolean(u)),
		galleryRows: rows.map((r) => ({ ...r, url: r.imageUrl }))
	};
};

export const actions: Actions = {
	editGallery: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(editGallery));
		const { existing, images } = form.data;

		try {
			const uploaded = images?.length ? await uploadGallery(images) : [];
			const kept = new Set(existing.split(',').filter((u) => u.trim()));
			const current = await db.select().from(gallery);
			const removed = current.filter((row) => !row.imageUrl || !kept.has(row.imageUrl));

			await db.transaction(async (tx) => {
				for (const row of removed) await tx.delete(gallery).where(eq(gallery.id, row.id));
				if (uploaded.length) {
					await tx
						.insert(gallery)
						.values(uploaded.map((url, i) => ({ imageUrl: url, sortOrder: current.length + i })));
				}
			});

			await deleteUploadedFiles(removed.map((r) => r.imageUrl));
			await logActivity(locals, 'update', 'partner logos', null, 'Updated partner logos');
			return message(form, { type: 'success', text: 'Partner logos updated successfully!' });
		} catch (err) {
			console.error('Error updating partner logos:', err);
			return message(form, { type: 'error', text: 'Could not update the logos.' }, { status: 500 });
		}
	},

	imageMeta: async ({ request, locals }) =>
		imageMetaAction(request, locals, gallery, null, null, 'partner logos')
};
