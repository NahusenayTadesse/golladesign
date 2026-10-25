import { fail } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { z } from 'zod/v4';
import { db } from '$lib/server/db';
import { contactMessages, quotes, user } from '$lib/server/db/schema';
import { contactStatuses, quoteStatuses } from '$lib/enums';
import { logActivity } from '$lib/server/activity';
import { orNull } from '$lib/server/forms';

/** Dashboard users a lead can be assigned to. */
export const assigneeOptions = async () =>
	(await db.select({ id: user.id, name: user.name }).from(user).orderBy(asc(user.name))).map(
		(u) => ({ value: u.id, name: u.name })
	);

const tables = {
	quote: { table: quotes, statuses: quoteStatuses },
	message: { table: contactMessages, statuses: contactStatuses }
} as const;

/** Form action: change a lead's status, assignee and notes. */
export async function updateLead(kind: keyof typeof tables, request: Request, locals: App.Locals) {
	const { table, statuses } = tables[kind];
	const schema = z.object({
		id: z.coerce.number().int(),
		status: z.enum(statuses as unknown as [string, ...string[]]),
		assignedTo: z.string().max(36).optional(),
		notes: z.string().max(10000).optional()
	});

	const parsed = schema.safeParse(Object.fromEntries(await request.formData()));
	if (!parsed.success) return fail(400, { error: 'Invalid data' });
	const { id, status, assignedTo, notes } = parsed.data;

	await db
		.update(table)
		.set({
			status: status as never,
			assignedTo: orNull(assignedTo),
			notes: orNull(notes),
			...(kind === 'message' ? { seen: status === 'new' ? 0 : 1 } : {})
		})
		.where(eq(table.id, id));

	await logActivity(
		locals,
		'status',
		kind === 'quote' ? 'quote request' : 'contact message',
		id,
		`Status: ${status}`
	);
	return { ok: true };
}
