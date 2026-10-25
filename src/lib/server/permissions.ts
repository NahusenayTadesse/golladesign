import { and, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { permissions, rolePermissions } from '$lib/server/db/schema';

export const PERMISSIONS = [
	'manage_content',
	'manage_leads',
	'manage_settings',
	'manage_users',
	'view_activity'
] as const;

export type Permission = (typeof PERMISSIONS)[number];

/** Dashboard sections and the permission each one needs. First match wins. */
const ROUTE_PERMISSIONS: [prefix: string, permission: Permission][] = [
	['/dashboard/admin-panel', 'manage_users'],
	['/dashboard/activity', 'view_activity'],
	['/dashboard/settings', 'manage_settings'],
	['/dashboard/messages', 'manage_leads'],
	['/dashboard/quotes', 'manage_leads'],
	['/dashboard/blog', 'manage_content'],
	['/dashboard/projects', 'manage_content'],
	['/dashboard/services', 'manage_content'],
	['/dashboard/team', 'manage_content'],
	['/dashboard/testimonials', 'manage_content'],
	['/dashboard/logos', 'manage_content'],
	['/dashboard/faqs', 'manage_content']
];

/** The permission a dashboard path requires, or null if any signed-in user may open it. */
export function requiredPermission(pathname: string): Permission | null {
	const match = ROUTE_PERMISSIONS.find(
		([prefix]) => pathname === prefix || pathname.startsWith(prefix + '/')
	);
	return match ? match[1] : null;
}

/** Permissions granted through the user's role. Better Auth admins always get everything. */
export async function getUserPermissions(user: {
	role?: string | null;
	roleId?: number | null;
}): Promise<Permission[]> {
	if (user.role === 'admin') return [...PERMISSIONS];
	if (!user.roleId) return [];

	const rows = await db
		.select({ name: permissions.name })
		.from(rolePermissions)
		.innerJoin(permissions, eq(permissions.id, rolePermissions.permissionId))
		.where(and(eq(rolePermissions.roleId, user.roleId), eq(rolePermissions.isActive, 1)));

	return rows
		.map((r) => r.name)
		.filter((n): n is Permission => PERMISSIONS.includes(n as Permission));
}
