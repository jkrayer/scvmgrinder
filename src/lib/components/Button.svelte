<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let style: 'primary' | 'muted' = 'primary';

	const classes: string = `button ${style}`;
</script>

<button {type} {disabled} aria-disabled={disabled} on:click {...$$restProps} class={classes}
	><slot />
</button>

<style>
	.button {
		box-sizing: border-box;
		border: none;
		padding: calc(var(--padSmall) + var(--padTiny));
		font-weight: 700;
		line-height: 1;
		transition: color 200ms linear, background-color 200ms linear;
	}

	.primary {
		color: var(--black);
		background-color: var(--yellow);
	}

	.primary:hover {
		background-color: var(--pink);
	}
	.primary:active {
		background-color: var(--black);
		color: var(--white);
	}

	.muted {
		border: 1px solid var(--lightGray);
		color: var(--gray);
		/* background-color: var(--yellow); */
	}
	.muted:hover,
	.muted:active {
		background-color: var(--black);
		color: var(--white);
	}

	.primary:disabled,
	.primary:disabled:hover,
	.primary:disabled:active,
	.muted:disabled,
	.muted:disabled:hover,
	.muted:disabled:active {
		border: 1px solid var(--lightGray);
		color: var(--lightGray);
		background-color: transparent;
	}
</style>
