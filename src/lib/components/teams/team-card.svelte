<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	type TeamMember = {
		name: string;
		position: string;
		avatar: string;
		description: string;
	};

	const { member }: { member: TeamMember } = $props();

	/** Get initials from name for avatar fallback */
	const getInitials = (name: string): string => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};
</script>

<Card
	class="group hover:bg-carbg! relative h-full overflow-hidden border border-border bg-card shadow-sm transition-all duration-300
 hover:-translate-y-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
>
	<CardContent class="flex flex-col items-center p-6 text-center">
		<!-- Avatar with enhanced ring effect -->
		<div class="relative mb-4">
			<div
				class="absolute -inset-1 rounded-full bg-linear-to-r from-primary/50 to-primary/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
			></div>
			<Avatar
				class="relative size-24 border-4 border-background shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/20"
			>
				<AvatarImage src="/files/{member.avatar}" alt={member.name} class="object-cover" />
				<AvatarFallback class="bg-primary/5 text-primary">
					{getInitials(member.name)}
				</AvatarFallback>
			</Avatar>
		</div>

		<!-- Name with color shift -->
		<h3
			class="mb-1 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary"
		>
			{member.name}
		</h3>

		<!-- Position -->
		<p
			class="mb-3 text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
		>
			{member.position}
		</p>

		<!-- Description -->
		<p
			class="line-clamp-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/90"
		>
			{member.description}
		</p>
	</CardContent>
</Card>
