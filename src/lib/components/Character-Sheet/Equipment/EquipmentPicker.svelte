<script lang="ts">
	import { take } from 'ramda';
	import equipment from '../../../../morkborg/data/equipment';
	import allWeapons from '../../../../morkborg/data/all-weapons';
	import armor from '../../../../morkborg/data/armor';
	import scrolls_sacred from '../../../../morkborg/data/scrolls_sacred';
	import scrolls_unclean from '../../../../morkborg/data/scrolls_unclean';

	const displayEquipment = take(42, equipment);
	const displayWeapons = take(17, allWeapons);
</script>

<h3 class="sheet-title col-two">Weapons</h3>
<table>
	<tbody>
		{#each displayWeapons as eq}
			<tr>
				<td>{eq.name}</td>
				<td>{eq.price}</td>
				<td>{@html eq.description}</td>
			</tr>
		{/each}
	</tbody>
</table>

<h3 class="sheet-title col-two">Armor</h3>
<table>
	<tbody>
		{#each armor as eq}
			<tr>
				<td>{eq.name}</td>
				<td>{eq.price}</td>
				<td>{@html eq.description}</td>
			</tr>
		{/each}
	</tbody>
</table>

<!-- <h3 class="sheet-title col-two">Services</h3> -->

<h3 class="sheet-title col-two">Equipment</h3>
<table>
	<tbody>
		{#each displayEquipment as eq}
			<tr>
				<td>{eq.name}</td>
				<td>{eq.price}</td>
				<td>{@html eq.description}</td>
			</tr>
		{/each}
	</tbody>
</table>
