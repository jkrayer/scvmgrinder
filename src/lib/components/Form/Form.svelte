<script lang="ts">
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface $$Props extends HTMLFormAttributes {
		onSubmit: (arg1: SubmitEvent) => void;
	}

	export let onSubmit: (arg1: SubmitEvent) => void;
</script>

<form on:submit|preventDefault={onSubmit} {...$$restProps}><slot /></form>
