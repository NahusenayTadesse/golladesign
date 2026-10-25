import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
import { SMTP_USER as USER } from '$env/static/private';
import { db } from '$lib/server/db';
import { quotes, services } from '$lib/server/db/schema';
import { getNavServices } from '$lib/server/content';
import { sendEmail, adminQuoteTemplate, customerContactTemplate } from '$lib/server/email';
import { quoteSchema } from './schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(quoteSchema));
	const serviceOptions = (await getNavServices()).map((s) => ({
		value: String(s.id),
		name: s.name
	}));
	return { form, serviceOptions };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(quoteSchema));
		if (!form.valid) {
			return message(
				form,
				{ type: 'error', text: 'Please check the form for errors' },
				{ status: 400 }
			);
		}

		const { serviceId, ...rest } = form.data;
		const sid = serviceId && /^\d+$/.test(serviceId) ? Number(serviceId) : null;

		try {
			const service = sid
				? await db
						.select({ name: services.name })
						.from(services)
						.where(eq(services.id, sid))
						.then((r) => r[0])
				: undefined;

			await db.insert(quotes).values({
				...rest,
				serviceId: service ? sid : null,
				serviceType: service?.name ?? null
			});

			const adminMail = adminQuoteTemplate({ ...rest, service: service?.name });
			const userMail = customerContactTemplate(
				rest.name,
				`Quote request${service ? `: ${service.name}` : ''}`
			);
			// The request is saved; mail problems are logged, never shown to the visitor.
			const results = await Promise.allSettled([
				sendEmail(USER, adminMail.subject, adminMail.html),
				sendEmail(rest.email, userMail.subject, userMail.html)
			]);
			for (const r of results)
				if (r.status === 'rejected') console.error('Quote email failed:', r.reason);

			return message(form, {
				type: 'success',
				text: 'Thank you! Our team will contact you within one business day.'
			});
		} catch (err) {
			console.error('Error saving quote request:', err);
			return message(
				form,
				{ type: 'error', text: 'Something went wrong, please try again.' },
				{ status: 500 }
			);
		}
	}
};
