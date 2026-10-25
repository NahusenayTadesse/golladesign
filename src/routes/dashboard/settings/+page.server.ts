import { fail } from '@sveltejs/kit';
import { SETTING_FIELDS, type SettingsMap } from '$lib/settings';
import { getSettings, saveSettings } from '$lib/server/settings';
import { logActivity } from '$lib/server/activity';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({ settings: await getSettings() });

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const values: Partial<SettingsMap> = {};

		for (const field of SETTING_FIELDS) {
			const value = String(data.get(field.key) ?? '').trim();
			if (value.length > 2000) return fail(400, { error: `${field.label} is too long` });
			if (field.group === 'Social' && value && !/^https?:\/\//.test(value)) {
				return fail(400, { error: `${field.label} must start with https://` });
			}
			// Blank means "use the default".
			values[field.key] = value;
		}

		await saveSettings(values, locals.user?.id);
		await logActivity(locals, 'settings', 'site settings', null, 'Updated site settings');
		return { ok: true };
	}
};
