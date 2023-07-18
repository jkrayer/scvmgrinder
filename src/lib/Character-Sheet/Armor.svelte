<script lang="ts">
	import { EquippedArmor, EquippedShield } from './state/store';
	import RollButton from '$lib/components/RollButton.svelte';
	import { ARMOR_TIERS } from '$lib/morkborg/game-constants';
	import { setArmorTier } from '$lib/Character-Sheet/state';
	import { damageMitigation } from '$lib/Messages/state';
	import { toDiceString } from '$lib';

	//
	let formula: Dice;

	// COME BACK TO ME
	$: formula = ARMOR_TIERS[$EquippedArmor?.currentTier || 0].concat(
		!!$EquippedShield ? ['+', 1] : []
	) as Dice;
</script>

<div class="row" style="align-items:center;">
	<div class="col-one">
		<div class="row">
			<div class="score-title armor-formula">
				{#if $EquippedArmor !== null}
					-{toDiceString(formula)}
				{/if}
			</div>
			{#if $EquippedArmor !== null}
				<RollButton
					dice={formula}
					on:roll={() => damageMitigation($EquippedArmor, !!$EquippedShield)}
				/>
			{/if}
		</div>
	</div>

	<div class="col-two">
		<div class="row" style="align-items:center;">
			<h2 class="sheet-title">Armor</h2>
			&nbsp;{$EquippedArmor?.name}
			{$EquippedShield !== null ? ' + Shield' : ''}
		</div>
	</div>

	<div class="col-one">
		{#if $EquippedArmor !== null}
			<div class="row row-right">
				<div class="btn-col">
					<button
						on:click={setArmorTier(1, $EquippedArmor._id)}
						class="btn primary button-tier"
						class:active={$EquippedArmor.currentTier === 1}
						disabled={1 > $EquippedArmor.maxTier}
						type="button">1</button
					>
				</div>
				<div class="btn-col">
					<button
						on:click={setArmorTier(2, $EquippedArmor._id)}
						class="btn primary button-tier"
						class:active={$EquippedArmor.currentTier === 2}
						disabled={2 > $EquippedArmor.maxTier}
						type="button">2</button
					>
				</div>
				<div class="btn-col">
					<button
						on:click={setArmorTier(3, $EquippedArmor._id)}
						class="btn primary button-tier"
						class:active={$EquippedArmor.currentTier === 3}
						disabled={3 > $EquippedArmor.maxTier}
						type="button">3</button
					>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.armor-formula {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70px;
		height: 50px;
		border: 1px solid var(--ruleGray);
		margin-right: 0.625rem;
	}

	.btn-col {
		flex: 1 1;
	}

	.button-tier {
		width: 30px;
		height: 30px;
		padding: 3px;
		border-radius: 50%;
		border: 1px solid var(--gray);
		margin-left: var(--padding-tiny);
		font-size: 0.75em;
		font-weight: 700;
		color: var(--gray);
		background-color: transparent;
	}
	.active {
		border-color: var(--yellow);
		color: var(--black);
		background-color: var(--yellow);
		cursor: pointer;
	}

	.active:hover {
		border-color: var(--black);
	}
</style>
