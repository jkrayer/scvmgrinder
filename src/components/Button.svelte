<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
</script>

<button {type} {disabled} aria-disabled={disabled} on:click {...$$restProps} class="button"
	><slot />
</button>

<style>
	.button {
		box-sizing: border-box;
		border: none;
		padding: calc(var(--padSmall) + var(--padTiny));
		font-weight: 700;
		line-height: 1;
		color: var(--black);
		background-color: var(--yellow);
		transition: color 200ms linear, background-color 200ms linear;
	}
	.button:hover {
		background-color: var(--pink);
	}
	.button:active {
		background-color: var(--black);
		color: var(--white);
	}
	.button:disabled,
	.button:disabled:hover,
	.button:disabled:active {
		border: 1px solid var(--lightGray);
		color: var(--lightGray);
		background-color: transparent;
	}
</style>
