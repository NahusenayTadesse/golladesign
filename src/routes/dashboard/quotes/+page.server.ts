import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';

import { deleteTestimonial, markRead, schema } from './schema.js';
import { db } from '$lib/server/db';
import { contactMessages as paymentMethods, quotes } from '$lib/server/db/schema';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	const readForm = await superValidate(zod4(markRead));
	const deleteForm = await superValidate(zod4(deleteTestimonial));

	const allQuotes = await db.select().from(quotes);
	const replyForm = await superValidate(zod4(schema));

	return {
		readForm,
		deleteForm,
		allQuotes,
		replyForm
	};
};

import { HOST, PORT, USER, PASSWORD } from '$env/static/private';
import nodemailer from 'nodemailer';

export const actions: Actions = {
	read: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.update(quotes).set({ status: 'Replied' }).where(eq(quotes.id, id));
			return message(form, { type: 'success', text: 'Quote Successfully Marked as Read' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while marking quote as read.'
				},
				{ status: 500 }
			);
		}
	},
	delete: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.delete(quotes).where(eq(quotes.id, id));
			return message(form, { type: 'success', text: 'Quote Successfully Deleted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting quote.'
				},
				{ status: 500 }
			);
		}
	},
	reply: async ({ request }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please Check for Errors' }, { status: 400 });
		}

		const { name, email, subject, emailMessage } = form.data;

		const transporter = nodemailer.createTransport({
			host: HOST,
			port: PORT,
			secure: true,
			auth: {
				user: USER,
				pass: PASSWORD
			}
		});
		const currentYear = new Date().getFullYear();

		const htmlContent = `
   <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #091B38; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #F2E1D1; border-radius: 4px; overflow: hidden; background-color: #ffffff;">

     <!-- Header with Navy Background -->
     <div style="background-color: #091B38; text-align: center; padding: 45px 20px;">

       <img src="http://yebehir.com/logo.png" alt="Yebehir Ventures" style="width: 150px; height: auto; display: block; margin: 0 auto;" />
       <p style="color: #F2E1D1; font-size: 12px; letter-spacing: 2px; margin-top: 15px; text-transform: uppercase;">Ahead of the curve</p>
     </div>

     <!-- Main Content -->
     <div style="padding: 40px 30px;">
       <h2 style="color: #091B38; font-size: 20px; font-weight: bold; margin-top: 0;">Hi ${name},</h2>

       <div style="color: #333333; font-size: 16px;">
         ${emailMessage}
       </div>

       <!-- Call to Action / Sign-off -->
       <div style="margin-top: 40px; padding-top: 25px; border-top: 2px solid #F2E1D1;">
         <p style="margin: 0; font-size: 14px; color: #666;">Best regards,</p>
         <p style="margin: 5px 0 0 0; font-weight: bold; color: #091B38; font-size: 18px;">Yebehir Ventures Team</p>
         <p style="margin: 2px 0 0 0; font-size: 12px; color: #091B38; opacity: 0.8;">Events | Venue | Sales</p>
       </div>
     </div>

     <!-- Footer -->
     <div style="background-color: #F2E1D1; padding: 30px; text-align: center; font-size: 11px; color: #091B38;">
       <p style="margin: 0 0 10px 0; font-weight: bold; letter-spacing: 1px;">
         &copy; ${currentYear} YEBEHIR VENTURES
       </p>
       <p style="margin: 0;">
         4 Kilo Plaza, Addis Ababa, Ethiopia
       </p>
       <p style="margin: 10px 0 0 0;">
         <a href="https://yebehir.com" style="color: #091B38; text-decoration: underline; font-weight: bold;">Visit our website</a>
       </p>
     </div>
   </div>
 `;

		try {
			await transporter.sendMail({
				from: `"Yebehir Ventures" <${USER}>`,
				to: email,
				subject: subject,
				html: htmlContent
			});

			return message(form, {
				type: 'success',
				text: 'Email sent successfully.'
			});
		} catch (error) {
			console.error('Error processing message:', error);

			return message(
				form,
				{
					type: 'error',
					text: 'An unexpected error occurred. Please try again later. ' + error?.message
				},
				{ status: 500 }
			);
		}
	}
};
