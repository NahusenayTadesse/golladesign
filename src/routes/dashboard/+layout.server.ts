import type { LayoutServerLoad } from './$types';

// hooks.server.ts has already checked the session and the route's permission.
export const load: LayoutServerLoad = async ({ locals }) => ({
	name: locals.user?.name,
	permissions: locals.permissions
});
