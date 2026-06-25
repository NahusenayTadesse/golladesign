export type PortfolioItem = {
	id: number;
	title: string;
	slug: string;
	category: string;
	description: string | null;
	isFeatured: boolean;
	featuredImage: string | null;
	completedAt: string | null;
	clientName: string | null;
	location: string | null;
	excerpt: string | null;
	content: string | null;
};

export type BlogItem = {
	id: number;
	title: string;
	slug: string;
	category: string;
	featuredImage: string | null;

	excerpt: string | null;
	content: string | null;
	createdAt: string | Date | null;
};

export const eventTypes = [
	...new Set(portfolioItems.map((item) => item.eventType).filter(Boolean))
] as string[];
