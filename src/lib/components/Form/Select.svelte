<script lang="ts" generics="T extends {_id: string; name: string}">
	import { TriangleDown } from 'radix-icons-svelte';
	import { prop } from 'ramda';

	export let options: T[];
	export let valueProp: keyof T = '_id';
	export let labelProp: keyof T = 'name';
	export let value: string;

	const getVal = prop(valueProp);
	const getLabel = prop(labelProp);
</script>

<div class="select-wrapper">
	<select class="control select" bind:value {...$$restProps}>
		{#each options as option}
			<option value={getVal(option)}>{getLabel(option)}</option>
		{/each}
	</select>
	<TriangleDown class="icon" color="#979797" size={24} />
</div>
