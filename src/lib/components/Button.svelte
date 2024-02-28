<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let style: 'primary' | 'muted' = 'primary';

	const classes: string = `btn button ${style}`;
</script>

<button {type} {disabled} aria-disabled={disabled} on:click {...$$restProps} class={classes}
	><slot />
</button>

<style>
	.button {
		padding: calc(var(--padSmall) + var(--padTiny));
		font-weight: 700;
	}
</style>
