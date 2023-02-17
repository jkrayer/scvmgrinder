<script>
	/**
	 * @type {"button" | "submit" | "reset"} any valid html button type
	 */
	export let type = 'button';
</script>

<button {type} {...$$restProps} class="button"><slot /></button>

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
	.button:disabled {
		border: 1px solid var(--lightGray);
		color: var(--lightGray);
		background-color: transparent;
	}
	.button:hover {
		background-color: var(--pink);
	}
	.button:active {
		background-color: var(--black);
		color: var(--white);
	}
</style>
