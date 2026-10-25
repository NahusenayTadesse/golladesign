import { fail } from '@sveltejs/kit';
import { desc, eq, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { quotes, user } from '$lib/server/db/schema';
import { quoteStatuses } from '$lib/enums';
import { assigneeOptions, updateLead } from '$lib/server/leads';
import { logActivity } from '$lib/server/activity';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const filter = url.searchParams.get('status');
	const status = quoteStatuses.find((s) => s === filter);

	const [rows, counts, users] = await Promise.all([
		db
			.select({
				id: quotes.id,
				name: quotes.name,
				email: quotes.email,
				phone: quotes.phone,
				service: quotes.serviceType,
				location: quotes.location,
				plotSize: quotes.plotSize,
				budgetRange: quotes.budgetRange,
				timeline: quotes.timeline,
				description: quotes.description,
				status: quotes.status,
				notes: quotes.notes,
				assignedTo: quotes.assignedTo,
				assignee: user.name,
				createdAt: quotes.createdAt
			})
			.from(quotes)
			.leftJoin(user, eq(user.id, quotes.assignedTo))
			.where(status ? eq(quotes.status, status) : undefined)
			.orderBy(desc(quotes.createdAt)),
		db
			.select({ status: quotes.status, n: sql<number>`count(*)` })
			.from(quotes)
			.groupBy(quotes.status),
		assigneeOptions()
	]);

	return {
		quotes: rows,
		counts: Object.fromEntries(counts.map((c) => [c.status, Number(c.n)])),
		status: status ?? null,
		users
	};
};

export const actions: Actions = {
	update: async ({ request, locals }) => updateLead('quote', request, locals),

	delete: async ({ request, locals }) => {
		const id = Number((await request.formData()).get('id'));
		if (!id) return fail(400);
		await db.delete(quotes).where(eq(quotes.id, id));
		await logActivity(locals, 'delete', 'quote request', id);
		return { ok: true };
	}
};
