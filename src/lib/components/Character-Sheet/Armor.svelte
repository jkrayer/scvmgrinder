<script lang="ts">
	import { EquippedArmor } from './store';
	import RollButton from '../RollButton.svelte';

	const getTier = (a: Equipment.Armor | null): number => a?.tier?.current || a?.currentTier || 0;
	const getMaxTier = (a: Equipment.Armor | null): number => a?.tier?.maximum || a?.maxTier || 0;
</script>

<div class="row" style="align-items:center;">
	<div class="col-one">
		<div class="row">
			<div class="score-title armor-formula">
				{#if typeof $EquippedArmor.formula === 'number'}
					-{$EquippedArmor.formula}
				{:else}
					-{$EquippedArmor.formula.join('')}
				{/if}
			</div>
			{#if typeof $EquippedArmor.formula !== 'number'}
				<RollButton dice={$EquippedArmor.formula} />
			{/if}
		</div>
	</div>

	<div class="col-two">
		<div class="row" style="align-items:center;">
			<h2 class="sheet-title">Armor</h2>
			{$EquippedArmor.title}
		</div>
	</div>

	<div class="col-one">
		{#if $EquippedArmor.armor !== null}
			<div class="row row-right">
				<button
					class="button-tier"
					class:active={getTier($EquippedArmor.armor.armor) === 1}
					disabled={1 > getMaxTier($EquippedArmor.armor.armor)}
					type="button">1</button
				>
				<button
					class="button-tier"
					class:active={getTier($EquippedArmor.armor.armor) === 2}
					disabled={2 > getMaxTier($EquippedArmor.armor.armor)}
					type="button">2</button
				>
				<button
					class="button-tier"
					class:active={getTier($EquippedArmor.armor.armor) === 3}
					disabled={3 > getMaxTier($EquippedArmor.armor.armor)}
					type="button">3</button
				>
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
	}

	.button-tier {
		width: 30px;
		height: 30px;
		padding: 3px;
		border: none;
		border-radius: 50%;
		margin-left: var(--padding-tiny);
		font-size: 0.75em;
		font-weight: 700;
		color: var(--white);
		background-color: transparent;
	}
	.active {
		color: var(--black);
		background-color: var(--yellow);
	}
	.button-tier:disabled {
		/* border: 1px solid var(--lightGray); */
		color: var(--gray);
		background-color: var(--lightGray);
	}
</style>
