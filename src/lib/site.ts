/**
 * Single source of truth for studio contact details, social profiles and logo
 * assets. Every public-facing component reads from here so the information only
 * ever has to be corrected in one place.
 */

export const siteLogos = {
	/** Transparent wordmark — sits on any dark surface as-is. */
	mark: '/logoWhite.webp',
	/** Solid dark plate version — for light surfaces and social previews. */
	plate: '/logoForWhite.webp',
	/** Raster fallback for meta tags and favicons. */
	raster: '/logoWhite.png',
	social: '/logo.jpg'
};

export const contactInfo = {
	phones: [
		{ display: '+251 909 604 406', href: 'tel:+251909604406' },
		{ display: '+251 944 129 357', href: 'tel:+251944129357' }
	],
	whatsapp: {
		display: '+251 909 604 406',
		href: 'https://wa.me/251909604406'
	},
	email: {
		display: 'studio@golladesign.com',
		href: 'mailto:studio@golladesign.com'
	},
	address: {
		display: 'Signal Business Center Building, 7th Floor',
		city: 'Addis Ababa, Ethiopia',
		href: 'https://www.google.com/maps/search/?api=1&query=Signal+Business+Center+Addis+Ababa'
	},
	mapEmbed:
		'https://www.google.com/maps?q=Signal%20Business%20Center%20Building%2C%20Addis%20Ababa&output=embed'
};

export type SocialLink = {
	name: string;
	url: string;
	/** Key into the icon map each component keeps locally. */
	icon: 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'whatsapp';
};

export const socialLinks: SocialLink[] = [
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/golla.design?igsh=aWIzaDRvNTJ6NmJh',
		icon: 'instagram'
	},
	{
		name: 'TikTok',
		url: 'https://vm.tiktok.com/ZS9keANrrhWRX-YTaCV/',
		icon: 'tiktok'
	},
	{
		name: 'Facebook',
		url: 'https://share.google/rzOeFqzZDyTNPYVhu',
		icon: 'facebook'
	},
	{
		name: 'LinkedIn',
		url: 'https://share.google/IlHUYcD2FZyUVweQb',
		icon: 'linkedin'
	},
	{
		name: 'WhatsApp',
		url: contactInfo.whatsapp.href,
		icon: 'whatsapp'
	}
];
