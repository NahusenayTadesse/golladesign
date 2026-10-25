// Options shared by the public quote form and the dashboard lead pipeline.
export const BUDGET_RANGES = [
	'Under 500,000 ETB',
	'500,000 – 2,000,000 ETB',
	'2,000,000 – 10,000,000 ETB',
	'Over 10,000,000 ETB',
	'Not sure yet'
];

export const TIMELINES = [
	'As soon as possible',
	'Within 3 months',
	'3 – 6 months',
	'6 – 12 months',
	'Just exploring'
];

export const QUOTE_STATUS_LABELS = {
	new: 'New',
	contacted: 'Contacted',
	proposal_sent: 'Proposal sent',
	won: 'Won',
	lost: 'Lost'
} as const;

export const CONTACT_STATUS_LABELS = {
	new: 'New',
	in_progress: 'In progress',
	replied: 'Replied',
	closed: 'Closed'
} as const;
