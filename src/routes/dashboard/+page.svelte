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
		Contact,
		MapPin,
		CircleHelp,
		Settings,
		History,
		FileText
	} from '@lucide/svelte';
	import { page } from '$app/state';

	let { data } = $props();

	const allNavigation = [
		{
			title: 'Content',
			description: 'Blogs, testimonials, partners, team and FAQs',
			color: 'border-l-amber-500',
			perm: 'manage_content',
			links: [
				{ name: 'Blog', href: '/blog', icon: Newspaper },
				{ name: 'Testimonials', href: '/testimonials', icon: Quote },
				{ name: 'Partner Logos', href: '/logos', icon: Image },
				{ name: 'Team Members', href: '/team', icon: Contact },
				{ name: 'FAQs', href: '/faqs', icon: CircleHelp }
			]
		},
		{
			title: 'Operations',
			description: 'Projects',
			color: 'border-l-emerald-500',
			perm: 'manage_content',
			span: 'md:col-span-2',
			links: [
				{ name: 'Projects', href: '/projects', icon: MapPin },
				{ name: 'Services', href: '/services', icon: Briefcase }
			]
		},
		{
			title: 'Sales & CRM',
			description: 'Quote requests and messages',
			color: 'border-l-rose-500',
			perm: 'manage_leads',
			links: [
				{ name: 'Quote Requests', href: '/quotes', icon: FileText },
				{ name: 'Messages', href: '/messages', icon: MessageSquare }
			]
		},
		{
			title: 'User Management',
			description: 'Manage system access and permissions',
			color: 'border-l-blue-500',
			perm: 'manage_users',
			links: [
				{ name: 'Users', href: '/admin-panel/users', icon: Users },
				{ name: 'Roles', href: '/admin-panel/roles', icon: ShieldCheck }
			]
		},
		{
			title: 'Site',
			description: 'Contact details, links and change history',
			color: 'border-l-violet-500',
			links: [
				{ name: 'Site Settings', href: '/settings', icon: Settings, perm: 'manage_settings' },
				{ name: 'Activity Log', href: '/activity', icon: History, perm: 'view_activity' }
			]
		}
	];

	const can = (perm?: string) => !perm || page.data.permissions?.includes(perm);
	const navigation = $derived(
		allNavigation
			.filter((s) => can(s.perm))
			.map((s) => ({ ...s, links: s.links.filter((l) => can((l as { perm?: string }).perm)) }))
			.filter((s) => s.links.length)
	);
</script>

<svelte:head>
	<title>Dashboard - golla designs</title>
	<meta name="description" content="Dashboard for Golla Designs" />
</svelte:head>

{#if data.newQuotes !== null}
	<div class="grid grid-cols-2 gap-4 px-6 pt-6">
		<a href="/dashboard/quotes?status=new" class="rounded-xl border p-4 hover:bg-muted">
			<p class="text-xs text-muted-foreground uppercase">New quote requests</p>
			<p class="text-3xl font-bold">{data.newQuotes}</p>
		</a>
		<a href="/dashboard/messages" class="rounded-xl border p-4 hover:bg-muted">
			<p class="text-xs text-muted-foreground uppercase">New messages</p>
			<p class="text-3xl font-bold">{data.newMessages}</p>
		</a>
	</div>
{/if}

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
