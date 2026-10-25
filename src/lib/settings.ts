import {
	contactInfo as defaultContact,
	socialLinks as defaultSocial,
	type SocialLink
} from '$lib/site';

/** Editable settings: key, label for the dashboard form, and the default from $lib/site. */
export const SETTING_FIELDS = [
	{
		key: 'phone1',
		label: 'Primary phone',
		group: 'Contact',
		fallback: defaultContact.phones[0]?.display ?? ''
	},
	{
		key: 'phone2',
		label: 'Secondary phone',
		group: 'Contact',
		fallback: defaultContact.phones[1]?.display ?? ''
	},
	{
		key: 'whatsapp',
		label: 'WhatsApp number',
		group: 'Contact',
		fallback: defaultContact.whatsapp.display
	},
	{ key: 'email', label: 'Public email', group: 'Contact', fallback: defaultContact.email.display },
	{ key: 'address', label: 'Address', group: 'Location', fallback: defaultContact.address.display },
	{
		key: 'city',
		label: 'City / country',
		group: 'Location',
		fallback: defaultContact.address.city
	},
	{
		key: 'mapsUrl',
		label: 'Google Maps link',
		group: 'Location',
		fallback: defaultContact.address.href
	},
	{
		key: 'mapEmbed',
		label: 'Google Maps embed URL',
		group: 'Location',
		fallback: defaultContact.mapEmbed
	},
	{
		key: 'hours',
		label: 'Office hours',
		group: 'Location',
		fallback: 'Monday – Friday: 8:30 AM – 5:30 PM\nSaturday: 8:30 AM – 12:00 PM'
	},
	...defaultSocial
		.filter((s) => s.icon !== 'whatsapp')
		.map((s) => ({ key: s.icon, label: `${s.name} URL`, group: 'Social', fallback: s.url }))
] as const;

export type SettingKey = (typeof SETTING_FIELDS)[number]['key'];
export type SettingsMap = Record<SettingKey, string>;

export function withDefaults(stored: Partial<Record<string, string>>): SettingsMap {
	return Object.fromEntries(
		SETTING_FIELDS.map((f) => [f.key, stored[f.key]?.trim() || f.fallback])
	) as SettingsMap;
}

const digits = (phone: string) => phone.replace(/[^\d+]/g, '');

/** The settings in the shape the public components use. */
export function buildSiteInfo(s: SettingsMap) {
	const contactInfo = {
		phones: [s.phone1, s.phone2]
			.filter(Boolean)
			.map((p) => ({ display: p, href: `tel:${digits(p)}` })),
		whatsapp: { display: s.whatsapp, href: `https://wa.me/${digits(s.whatsapp).replace('+', '')}` },
		email: { display: s.email, href: `mailto:${s.email}` },
		address: { display: s.address, city: s.city, href: s.mapsUrl },
		mapEmbed: s.mapEmbed,
		hours: s.hours
	};

	const socialLinks: SocialLink[] = [
		...defaultSocial
			.filter((d) => d.icon !== 'whatsapp')
			.map((d) => ({ ...d, url: s[d.icon as SettingKey] }))
			.filter((d) => d.url),
		{ name: 'WhatsApp', url: contactInfo.whatsapp.href, icon: 'whatsapp' }
	];

	return { contactInfo, socialLinks };
}

export type SiteInfo = ReturnType<typeof buildSiteInfo>;
