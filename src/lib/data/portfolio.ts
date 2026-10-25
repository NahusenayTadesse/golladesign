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
	date?: string | null;
	metaTitle?: string | null;
	metaDescription?: string | null;
	ogImage?: string | null;
};
