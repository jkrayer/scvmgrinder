<script lang="ts">
	// import type { HTMLInputAttributes, ChangeEventHandler } from 'svelte/elements';
	// interface $$Props extends Omit<HTMLInputAttributes, 'type'> {}

	export let value: number = 0;
</script>

<input type="number" class="control" bind:value {...$$restProps} />
