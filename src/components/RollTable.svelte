<script lang="ts">
	export let die: number;
	export let group: any;
	export let options: { dice: number[]; value: string; label: string }[];
	export let multiple: number = 1;
	export let alignItems: 'list-item' | 'inline-block' = 'list-item';

	let isDisabled: boolean = false;

	$: isDisabled = group.length >= multiple;
</script>

<div class="wrapper">
	<h1 class="title">d{die} <slot /></h1>
	<ol class={`clear-list list local ${alignItems}`}>
		{#each options as { dice, label, value }, index}
			{@const isDisabled = !(index < die)}
			<li class="list-item">
				<label>
					{#if multiple === 1}
						<input class="radio" type="radio" {value} bind:group disabled={isDisabled} />
					{:else if isDisabled && group.indexOf(value) === -1}
						<input class="radio" type="checkbox" {value} bind:group disabled={true} />
					{:else}
						<input class="radio" type="checkbox" {value} bind:group />
					{/if}

					<span class="list-item-text"
						><span class="dice"
							>{dice[0]}{#if dice.length > 1}-{dice[dice.length - 1]}{/if}</span
						>
						{label}</span
					>
				</label>
			</li>
		{/each}
	</ol>
</div>

<style>
	.wrapper {
		margin: 0 0 1.5rem 0;
	}
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
	.radio:disabled + .list-item-text {
		text-decoration: line-through;
	}
	.inline-block > li {
		display: inline-block;
	}
	.dice {
		padding-right: 0.5em;
	}
</style>
