// Enum values shared by the database schema, form schemas and the UI.
export const publishStatuses = ['draft', 'published', 'archived'] as const;
export const projectTypes = [
	'residential',
	'commercial',
	'hospitality',
	'interior',
	'other'
] as const;
export const contactStatuses = ['new', 'in_progress', 'replied', 'closed'] as const;
export const quoteStatuses = ['new', 'contacted', 'proposal_sent', 'won', 'lost'] as const;

const label = (v: string) => v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, ' ');
export const toItems = (values: readonly string[]) =>
	values.map((v) => ({ value: v, name: label(v) }));
