<script lang="ts">
	import { ArrowDown, ArrowUp, Circle, CrossCircled, EyeOpen, Trash } from 'radix-icons-svelte';
	import SquareButton from '$lib/components/SquareButton.svelte';
	import {
		canDecrement,
		canIncrement,
		hasQuantityProp,
		isEquippable
	} from '$lib/helpers/equipment';
	// import { toggleEq } from '$lib/helpers/character';

	export let eq: Character.Equipment | null;
	export let encumbered: boolean = false;

	const classes: string = `inventory-title ${encumbered ? 'inventory-title-encumbered' : ''} ${
		eq?.broken ? 'inventory-is-broken' : ''
	}`;

	let active = false;

	// HANDLERS
	const handleMouseIn = () => (active = true);
	const handleMouseOut = () => (active = false);
</script>

<!-- on:mouseenter={handleHover} -->
{#if eq === null}
	<div class={classes} />
{:else}
	<div class={classes} on:mouseenter={handleMouseIn} on:mouseleave={handleMouseOut} title={eq.name}>
		<div class="buttons" class:active>
			<SquareButton title="Details"><EyeOpen /></SquareButton>

			{#if hasQuantityProp(eq)}
				<SquareButton title="-1" disabled={canDecrement(eq)}><ArrowDown /></SquareButton>
				<SquareButton title="+1" disabled={canIncrement(eq)}><ArrowUp /></SquareButton>
			{/if}

			{#if isEquippable(eq)}
				{#if eq.equipped}
					<SquareButton title="Un-Equip">
						<CrossCircled />
					</SquareButton>
				{:else}
					<SquareButton title="Equip">
						<Circle />
					</SquareButton>
				{/if}
			{/if}

			<SquareButton title="Drop"><Trash /></SquareButton>
		</div>
		<div class="copy" class:active>
			{eq.name}
		</div>
	</div>
{/if}

<style>
	.inventory-title {
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
		height: 27px;
		padding: 0 6px;
		background-color: var(--veryLightGray);
		font-size: 0.875rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.inventory-title-encumbered {
		background-color: var(--lightYellow);
	}

	.inventory-is-broken {
		text-decoration: line-through;
	}

	.buttons {
		position: absolute;
		display: flex;
		gap: 1px;
		transform: translate3d(calc(-100% - 6px), 0, 0);
		transition: all 0.2s ease-in-out;
	}

	.buttons.active {
		transform: translate3d(0, 0, 0);
	}

	/* .copy {
		transform: translate3d(-104px, 0, 0);
	}

	.copy.active {
		transform: translate3d(6px, 0, 0);
	} */
</style>
