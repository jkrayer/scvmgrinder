<script lang="ts">
	export let die: number;
	export let group: any;
	export let options: { dice: number[]; value: string; label: string }[];
</script>

<h1 class="title">d{die}</h1>
<ol class="clear-list list">
	{#each options as { dice, label, value }}
		<li class="list-item">
			<label>
				<input type="radio" class="radio" {value} bind:group />
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
		line-height: 1.33333;
	}
	.radio:checked + .list-item-text {
		background-color: var(--yellow);
	}
</style>
