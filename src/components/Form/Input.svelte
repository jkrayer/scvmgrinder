<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type {
		HTMLInputAttributes,
		// HTMLInputTypeAttribute,
		ChangeEventHandler
	} from 'svelte/elements';
	import { stringValue } from '../../lib';

	// interface $$Props extends Omit<HTMLInputAttributes, 'type'> {
	// 	type?: HTMLInputAttributes | null;
	// }

	// interface $$Props extends HTMLInputAttributes {}
	interface $$Props extends Omit<HTMLInputAttributes, 'type'> {}

	// const dispatch = createEventDispatcher();

	// export let type: HTMLInputTypeAttribute | undefined | null = 'text';
	// export let value: any = '';

	// const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
	// 	dispatch('change', e.target.value);
	export let value: string = '';
</script>

<!-- on:change={handleChange} -->

<input type="text" class="control" bind:value {...$$restProps} />

<!--
<script lang="ts">
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface $$Props extends HTMLFormAttributes {
		onSubmit: (arg1: SubmitEvent) => void;
	}

	export let onSubmit: (arg1: SubmitEvent) => void;
</script>

<form on:submit|preventDefault={onSubmit} {...$$restProps}><slot /></form>
-->
