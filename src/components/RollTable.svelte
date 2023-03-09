<script lang="ts">
	export let die: number;
	export let group: any;
	export let options: { dice: number[]; value: string; label: string }[];
	export let multiple: number = 1;
	export let alignItems: 'list-item' | 'inline-block' = 'list-item';

	let isDisabled: boolean = false;

	$: isDisabled = group.length >= multiple;
</script>

<h1 class="title">d{die}</h1>
<ol class={`clear-list list ${alignItems}`}>
	{#each options as { dice, label, value }}
		<li class="list-item">
			<label>
				{#if multiple === 1}
					<input class="radio" type="radio" {value} bind:group />
				{:else if isDisabled && group.indexOf(value) === -1}
					<input class="radio" type="checkbox" {value} bind:group disabled={true} />
				{:else}
					<input class="radio" type="checkbox" {value} bind:group />
				{/if}

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
		margin: 1.5rem 0 0 0;
	}
	.list {
		margin: 0 0 1.5rem 0;
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
	.inline-block > li {
		display: inline-block;
	}
</style>
