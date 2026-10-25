import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
import { sendEmail, customerContactTemplate, adminContactTemplate } from '$lib/server/email';
import { SMTP_USER as USER } from '$env/static/private';
import { contactSchema } from './schema';
import { db } from '$lib/server/db';
import { contactMessages } from '$lib/server/db/schema';
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

		const { name, phoneNumber, email, subject, contactMessage } = form.data;

		try {
			await db
				.insert(contactMessages)
				.values({ name, phone: phoneNumber, email, subject, message: contactMessage ?? '' });

			const adminMail = adminContactTemplate(form.data);
			const userMail = customerContactTemplate(name, subject);

			// The message is already saved, so a mail failure must not fail the request.
			// An unawaited rejection here would crash the Node process.
			const results = await Promise.allSettled([
				sendEmail(USER, adminMail.subject, adminMail.html),
				sendEmail(email, userMail.subject, userMail.html)
			]);
			for (const result of results) {
				if (result.status === 'rejected') console.error('Contact email failed:', result.reason);
			}

			return message(form, { type: 'success', text: 'Message Successfully Sent!' });
		} catch (err) {
			console.error('Error saving contact message:', err);
			return message(form, {
				type: 'error',
				text: 'Something went wrong, please try again.'
			});
		}
	}
};
