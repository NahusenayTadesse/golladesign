<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import {
		ShieldCheck,
		Users,
		CreditCard,
		Newspaper,
		Calendar,
		Image,
		MessageSquare,
		ShoppingBag,
		Quote,
		Briefcase,
		MapPin,
		Plus
	} from '@lucide/svelte';

	const navigation = [
		{
			title: 'Content',
			description: 'Blogs and client testimonials',
			color: 'border-l-amber-500',
			links: [
				{ name: 'Blog', href: '/blog', icon: Newspaper },
				{ name: 'Testimonials', href: '/testimonials', icon: Quote },
				{ name: 'Partner Logos', href: '/logos', icon: Image }
			]
		},
		{
			title: 'Operations',
			description: 'Events, Venues, and Services',
			color: 'border-l-emerald-500',
			span: 'md:col-span-2',
			links: [
				{ name: 'Events', href: '/events', icon: Calendar },
				{ name: 'Venues', href: '/venues', icon: MapPin },
				{ name: 'Services', href: '/services', icon: Briefcase }
			]
		},
		{
			title: 'Sales & CRM',
			description: 'Orders, Quotes, and Inquiries',
			color: 'border-l-rose-500',
			links: [
				{ name: 'Quotes', href: '/quotes', icon: Quote },
				{ name: 'Messages', href: '/messages', icon: MessageSquare }
			]
		},
		{
			title: 'User Management',
			description: 'Manage system access and permissions',
			color: 'border-l-blue-500',
			links: [{ name: 'Users', href: '/admin-panel/users', icon: Users }]
		}
	];
</script>

<svelte:head>
	<title>Dashboard - Yebehir</title>
	<meta name="description" content="Dashboard for Yebehir" />
</svelte:head>

<div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-1">
	{#each navigation as section (section.title)}
		<Card.Root
			class="group overflow-hidden border-l-4 {section.color} transition-all hover:shadow-lg {section.span ??
				''}"
		>
			<Card.Header>
				<Card.Title class="text-xl">{section.title}</Card.Title>
				<Card.Description>{section.description}</Card.Description>
			</Card.Header>
			<Card.Content class="grid grid-cols-2 gap-3 sm:grid-cols-3">
				{#each section.links as link (link.name)}
					<a
						href="/dashboard{link.href}"
						class="flex flex-col items-center justify-center gap-2 rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-primary hover:text-primary-foreground"
					>
						<link.icon class="h-6 w-6" />
						<span class="text-xs font-medium">{link.name}</span>
					</a>
				{/each}

				<!-- Quick Add Action -->
			</Card.Content>
		</Card.Root>
	{/each}
</div>
