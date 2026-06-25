import nodemailer from 'nodemailer';

import {
	SMTP_HOST as HOST,
	SMTP_USER as USER,
	SMTP_PASSWORD as PASSWORD,
	SMTP_PORT as PORT
} from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: HOST,
	port: Number(PORT),
	secure: true,
	auth: {
		user: USER,
		pass: PASSWORD
	}
});

export const sendEmail = async (to: string, subject: string, html: string) => {
	await transporter.sendMail({
		from: USER,
		to,
		subject,
		html
	});
};

const generateOrderTable = (items) => {
	const rows = items
		.map((item) => {
			let variation = '';
			let price = 0;

			// Case 1: price exists explicitly
			if (typeof item.price === 'number') {
				price = item.price;
				variation = item.amount;
			}
			// Case 2: amount = "price variation"
			else if (typeof item.amount === 'string') {
				const parts = item.amount.split(' ');
				price = Number(parts[0]) || 0;
				variation = parts.slice(1).join(' ') || '';
			}

			return `
                 <tr style="border-bottom: 1px solid #eee;">
                     <td style="padding: 10px; text-align: left;">
                         Product #${item.product} ${variation ? `(${variation})` : ''}
                     </td>
                     <td style="padding: 10px; text-align: center;">
                         ${item.quantity}
                     </td>
                     <td style="padding: 10px; text-align: right;">
                         ${price} ETB
                     </td>
                 </tr>
             `;
		})
		.join('');
	return `
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: sans-serif;">
            <thead>
                <tr style="background-color: #2596be; color: white;">
                    <th style="padding: 10px; text-align: left;">Item</th>
                    <th style="padding: 10px; text-align: center;">Qty</th>
                    <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
};

// --- ADMIN NOTIFICATION TEMPLATE ---
export const adminContactTemplate = (data: {
	name: string;
	email: string;
	phoneNumber: string;
	subject: string;
	contactMessage?: string;
}) => ({
	subject: `📩 Yebehir Lead: ${data.subject}`,
	html: `
        <div style="font-family: sans-serif; color: #091B38; max-width: 600px; margin: auto; border: 1px solid #F2E1D1; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <div style="background-color: #091B38; padding: 25px; text-align: center;">
                <h2 style="color: #F2E1D1; margin: 0; font-size: 20px; letter-spacing: 1px;">New Website Inquiry</h2>
            </div>

            <!-- Body -->
            <div style="padding: 30px; background-color: #ffffff;">
                <p style="margin-bottom: 10px;"><strong>Client Name:</strong> ${data.name}</p>
                <p style="margin-bottom: 10px;"><strong>Email:</strong> ${data.email}</p>
                <p style="margin-bottom: 10px;"><strong>Phone:</strong> ${data.phoneNumber}</p>
                <p style="margin-bottom: 20px;"><strong>Interested In:</strong> ${data.subject}</p>

                <div style="margin-top: 20px; border-top: 1px solid #F2E1D1; padding-top: 20px;">
                    <strong style="color: #091B38;">Message Details:</strong>
                    <div style="background: #fdfaf7; padding: 20px; margin-top: 10px; border-radius: 4px; border-left: 4px solid #F2E1D1; line-height: 1.6;">
                        ${data.contactMessage || '<i>No message provided</i>'}
                    </div>
                </div>

                <div style="margin-top: 30px; text-align: center;">
                    <a href="mailto:${data.email}"
                       style="background: #091B38; color: #F2E1D1; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                       Reply to Customer
                    </a>
                </div>
            </div>

            <!-- Footer -->
            <div style="background: #F2E1D1; padding: 15px; text-align: center; font-size: 11px; color: #091B38; font-weight: bold;">
                YEBEHIR VENTURES | INTERNAL NOTIFICATION
            </div>
        </div>
    `
});

// --- CUSTOMER CONFIRMATION TEMPLATE ---
export const customerContactTemplate = (name: string, subject: string) => ({
	subject: `We've Received Your Inquiry - Yebehir Ventures`,
	html: `
        <div style="max-width: 600px; margin: auto; font-family: sans-serif; border: 1px solid #F2E1D1; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <div style="background-color: #091B38; padding: 30px; text-align: center;">
                <img src="https://yebehir.com/logo.png"
                     alt="Yebehir Ventures Logo"
                     width="140"
                     style="display: block; margin: 0 auto 15px;">
                <h1 style="color: #F2E1D1; margin: 0; font-size: 18px; letter-spacing: 2px; text-transform: uppercase;">
                    Inquiry Received
                </h1>
            </div>

            <!-- Body -->
            <div style="padding: 40px 30px; color: #333; background-color: #ffffff; line-height: 1.6;">
                <p>Hi <strong>${name}</strong>,</p>

                <p>
                    Thank you for reaching out to <strong>Yebehir Ventures</strong>.
                    We have successfully received your inquiry regarding:
                </p>

                <p style="font-weight: bold; color: #091B38; margin: 15px 0; padding: 10px; background: #fdfaf7; border-radius: 4px; text-align: center;">
                    "${subject}"
                </p>

                <p>
                    Our team is currently reviewing your request. Whether you're looking to book <strong>4 Kilo Plaza</strong>, plan a corporate event, or explore partnership opportunities, we'll get back to you shortly to discuss how we can bring your vision to life.
                </p>

                <p style="margin-top: 30px;">
                    Best regards,<br/>
                    <strong style="color: #091B38;">Yebehir Ventures Team</strong><br/>
                    <span style="font-size: 12px; color: #666;">Ahead of the curve</span>
                </p>
            </div>

            <!-- Footer -->
            <div style="background: #F2E1D1; padding: 20px; text-align: center; color: #091B38; font-size: 11px;">
                <strong>Yebehir Ventures</strong><br/>
                Events | Venue | Sales<br/>
                Addis Ababa, Ethiopia
            </div>
        </div>
    `
});
