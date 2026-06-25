import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
// import { sendEmail, customerContactTemplate, adminContactTemplate } from '$lib/server/email';
// import { USER } from '$env/static/private';
import { contactSchema, schema } from './schema';
import { db } from '$lib/server/db';
import { quotes } from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(contactSchema));

	return {
		form
	};
};

export const actions: Actions = {
	contact: async ({ request }) => {
		const form = await superValidate(request, zod4(contactSchema));
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please check the form for Errors' });
		}

		const {
			name,
			phone,
			email,
			budgetRange,
			description,
			serviceType,
			eventDate,
			guestCount,
			eventLocation
		} = form.data;

		try {
			await db.insert(quotes).values({
				name,
				phone,
				email,
				description,
				serviceType,
				budgetRange,
				eventDate: new Date(eventDate),
				guestCount,
				eventLocation
			});

			// const adminMail = adminContactTemplate(form.data);
			// sendEmail(USER, adminMail.subject, adminMail.html);

			// const userMail = customerContactTemplate(name, subject);
			// sendEmail(email, userMail.subject, userMail.html);

			return message(form, { type: 'success', text: 'Request for Quote Successfully Sent!' });
		} catch (err) {
			return message(form, {
				type: 'error',
				text: 'Error Adding Quote: ' + err?.message
			});
		}
	}
};
