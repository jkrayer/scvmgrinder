<script>
	/**
	 * @type {number}
	 */
	export let die;
	/**
	 * @type {{dice:number[], value:string, label:string}[]}
	 */
	export let options;
</script>

<h1 class="title">d{die}</h1>
<ol class="clear-list list">
	{#each options as { dice, label }}
		<li class="list-item">
			<label>
				<input type="radio" class="radio" />
				<span class="list-item-text"
					>{dice[0]}{#if dice.length > 1}-{dice[dice.length - 1]}{/if}
					{label}</span
				>
			</label>
		</li>
	{/each}
</ol>

<style>
	.title {
		margin: 0;
	}
	.radio {
		position: absolute;
		opacity: 0;
	}
	.list-item {
		margin: var(--padSmall) 0;
	}
	.list-item-text {
		padding: var(--padTiny);
	}
	.radio:checked + .list-item-text {
		background-color: var(--yellow);
	}
</style>
