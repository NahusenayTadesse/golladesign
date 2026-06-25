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

// --- ADMIN NOTIFICATION TEMPLATE ---
export const adminContactTemplate = (data: {
	name: string;
	email: string;
	phoneNumber: string;
	subject: string;
	contactMessage?: string;
}) => ({
	subject: `🏛️ Golla Design Lead: ${data.subject}`,
	html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #171717; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden; background-color: #fafafa;">
            <!-- Studio Minimal Header -->
            <div style="background-color: #171717; padding: 30px; text-align: left;">
                <span style="color: #ffffff; font-size: 11px; font-weight: 900; tracking-widest: 0.2em; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 4px;">Studio CRM Registry</span>
                <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 900; text-transform: uppercase; tracking-tight: -0.025em;">New Project Brief</h2>
            </div>

            <!-- Specifications Body -->
            <div style="padding: 35px 30px; background-color: #ffffff;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr style="border-b: 1px solid #f0f0f0;">
                        <td style="padding: 10px 0; color: #566557; width: 120px; font-weight: 500;">Client Entity:</td>
                        <td style="padding: 10px 0; color: #171717; font-weight: 700;">${data.name}</td>
                    </tr>
                    <tr style="border-b: 1px solid #f0f0f0;">
                        <td style="padding: 10px 0; color: #566557; font-weight: 500;">Email Address:</td>
                        <td style="padding: 10px 0; color: #171717; font-weight: 700;"><a href="mailto:${data.email}" style="color: #171717; text-decoration: underline;">${data.email}</a></td>
                    </tr>
                    <tr style="border-b: 1px solid #f0f0f0;">
                        <td style="padding: 10px 0; color: #566557; font-weight: 500;">Phone Line:</td>
                        <td style="padding: 10px 0; color: #171717; font-weight: 700;">${data.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #566557; font-weight: 500;">Project Scope:</td>
                        <td style="padding: 10px 0; color: #171717; font-weight: 700; text-transform: uppercase; font-size: 13px; tracking-wide: 0.05em;">${data.subject}</td>
                    </tr>
                </table>

                <div style="margin-top: 25px; border-top: 1px solid #e5e5e5; padding-top: 25px;">
                    <strong style="color: #171717; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 10px;">Design Brief Details:</strong>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #171717; line-height: 1.6; font-size: 14px; color: #404040;">
                        ${data.contactMessage || '<i>No specific brief criteria or text submitted.</i>'}
                    </div>
                </div>

                <div style="margin-top: 35px; text-align: center;">
                    <a href="mailto:${data.email}"
                       style="background: #171717; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-size: 12px; font-weight: 900; uppercase; letter-spacing: 1px; display: inline-block; text-transform: uppercase;">
                        Open Correspondence Channel
                    </a>
                </div>
            </div>

            <!-- Footer Meta -->
            <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 10px; color: #a3a3a3; font-weight: 700; letter-spacing: 1.5px; border-top: 1px solid #e5e5e5;">
                GOLLA DESIGN GROUP | SECURE INTAKE ENGINE
            </div>
        </div>
    `
});

// --- CUSTOMER CONFIRMATION TEMPLATE ---
export const customerContactTemplate = (name: string, subject: string) => ({
	subject: `Project Brief Logged - Golla Design Group`,
	html: `
        <div style="max-width: 600px; margin: auto; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
            <!-- Header -->
            <div style="background-color: #ffffff; padding: 40px 30px 20px 30px; text-align: left; border-b: 1px solid #f5f5f5;">
                <img src="https://golladesign.com/logo.png"
                     alt="Golla Design Group"
                     width="160"
                     style="display: block; margin-bottom: 20px; filter: grayscale(100%);">
                <span style="color: #566557; font-size: 11px; font-weight: 700; uppercase; letter-spacing: 2px; text-transform: uppercase; display: block;">Studio Receipt</span>
                <h1 style="color: #171717; margin: 0; font-size: 24px; font-weight: 900; tracking-tight: -0.03em; text-transform: uppercase;">
                    Brief Transmission Verified
                </h1>
            </div>

            <!-- Body -->
            <div style="padding: 20px 30px 40px 30px; color: #404040; background-color: #ffffff; line-height: 1.6; font-size: 15px;">
                <p>Hello <strong>${name}</strong>,</p>

                <p>
                    Thank you for contacting the design studio at <strong>Golla Design Group</strong>. We have successfully cataloged your project blueprint consultation request for the following design track:
                </p>

                <p style="font-weight: 800; color: #171717; margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; text-align: center; border: 1px solid #e5e5e5; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                    "${subject}"
                </p>

                <p>
                    An architect or spatial coordinator from our team is reviewing your structural parameters and project description. We balance human flow, material integrity, and volumetric aesthetics, and will contact you directly to schedule an initial design layout review.
                </p>

                <p style="margin-top: 40px; border-top: 1px solid #f5f5f5; padding-top: 25px;">
                    Sincerely,<br/>
                    <strong style="color: #171717; font-weight: 800; text-transform: uppercase; font-size: 13px; tracking-wide: 0.05em;">Golla Design Group</strong><br/>
                    <span style="font-size: 12px; color: #566557; font-style: italic;">Enduring Space & Narrative</span>
                </p>
            </div>

            <!-- Footer Details -->
            <div style="background: #171717; padding: 25px 30px; text-align: left; color: #a3a3a3; font-size: 11px; line-height: 1.5;">
                <strong style="color: #ffffff; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Golla Design Group</strong>
                Architecture | Interior Design | 3D Visualization<br/>
                Addis Ababa, Ethiopia
            </div>
        </div>
    `
});
