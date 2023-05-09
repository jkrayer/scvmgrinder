<script lang="ts">
	import { stringValue } from '$lib';

	type IconTypes = 'plus' | 'minus' | 'play';

	export let tag: 'button' | 'a' = 'button';
	export let icon: IconTypes = 'plus';
	export let color: 'yellow' | 'pink' = 'yellow';
	export let href: string = '';

	const classes: string = `button ${color}`;

	const ICONS: { [key in IconTypes]: string } = {
		minus: '<rect id="Rectangle" x="4px" y="9px" width="12" height="2"></rect>',
		plus: '<rect id="Rectangle" x="4px" y="9px" width="12" height="2"></rect><rect id="Rectangle2" transform="rotate(90)" x="4px" y="-11px" width="12" height="2"></rect>',
		play: '<g id="HOME" transform="translate(-223.500000, -14.500000)" fill="#000000"><polygon id="Triangle" transform="translate(234.000000, 25.000000) rotate(-270.000000) translate(-227.000000, -19.500000) " points="227 16 232 23 222 23"></polygon></g>'
	};
</script>

{#if tag === 'button'}
	<button type="button" on:click {...$$restProps} class={classes}>
		<svg
			width="20px"
			height="20px"
			viewBox="0 0 20 20"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
		>
			{@html ICONS[icon]}
		</svg>
	</button>
{:else}
	<a {href} on:click {...$$restProps} class={classes}>
		<svg
			width="20px"
			height="20px"
			viewBox="0 0 20 20"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
		>
			{@html ICONS[icon]}
		</svg>
	</a>
{/if}

<style>
	.button {
		box-sizing: border-box;
		width: 1.25rem;
		height: 1.25rem;
		padding: 0;
		border: none;
		overflow: hidden;
		appearance: none;
		line-height: 1;
		transition: color 200ms linear, background-color 200ms linear;
		cursor: pointer;
	}

	.button:focus {
		outline: none;
	}

	.yellow {
		color: var(--black);
		background-color: var(--yellow);
	}

	.pink {
		color: var(--white);
		background-color: var(--pink);
	}

	.pink > svg {
		fill: var(--white);
	}
</style>
