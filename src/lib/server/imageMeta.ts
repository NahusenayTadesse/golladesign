import { fail } from '@sveltejs/kit';
import type { Column } from 'drizzle-orm';
import { imageMetaSchema } from '$lib/schemas/content';
import { saveImageMeta } from '$lib/server/forms';
import { logActivity } from '$lib/server/activity';

type Table = Parameters<typeof saveImageMeta>[0];

/** Form action body for the image details editor. */
export async function imageMetaAction(
	request: Request,
	locals: App.Locals,
	table: Table,
	parentColumn: Column | null,
	parentId: number | null,
	entity: string
) {
	const data = await request.formData();
	const ids = String(data.get('ids') ?? '')
		.split(',')
		.filter((id) => /^\d+$/.test(id));
	const parsed = imageMetaSchema.safeParse({
		items: ids.map((id) => ({
			id,
			altText: data.get(`alt_${id}`),
			caption: data.get(`caption_${id}`),
			sortOrder: data.get(`order_${id}`) || 0
		}))
	});
	if (!parsed.success) return fail(400, { error: 'Invalid data' });

	await saveImageMeta(table, parentColumn, parentId, parsed.data.items);
	await logActivity(locals, 'update', entity, parentId, 'Updated image details');
	return { ok: true };
}
