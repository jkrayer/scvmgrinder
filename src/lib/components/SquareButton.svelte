<script lang="ts">
	import Icons from './Icons.svelte';
	import { stringValue } from '$lib';

	type IconTypes = 'plus' | 'minus' | 'play';

	export let tag: 'button' | 'a' = 'button';
	export let icon: IconTypes = 'plus';
	export let color: 'primary' | 'secondary' = 'primary';
	export let href: string = '';

	const classes: string = `btn ${color} btn-square`;
</script>

{#if tag === 'button'}
	<button type="button" on:click {...$$restProps} class={classes}>
		<slot>
			<Icons {icon} />
		</slot>
	</button>
{:else}
	<a {href} on:click {...$$restProps} class={classes}>
		<Icons {icon} />
	</a>
{/if}
