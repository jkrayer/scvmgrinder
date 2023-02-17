<script>
	import { TriangleDown, TriangleUp } from 'radix-icons-svelte';
	/**
	 * @type {string[]|object[]}
	 */
	export let options = [];
</script>

<div class="select-wrapper">
	<select class="control select" {...$$restProps}>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
	<TriangleDown class="icon" color="#979797" size={24} />
</div>
