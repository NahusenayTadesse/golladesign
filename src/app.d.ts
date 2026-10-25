import type { User, Session } from 'better-auth/minimal';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user?: User & { roleId?: number | null };
			session?: Session;
			permissions: import('$lib/server/permissions').Permission[];
			lang: import('$lib/i18n').Lang;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
