<script lang="ts">
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
	import Button from './Button.svelte';

	export let onClick: (arg0: MouseEvent) => void;

	let dialog: HTMLDialogElement;

	// handle
	const localClick = () => dialog.showModal();
	const cancel = () => dialog.close();
	const confirm = (e: MouseEvent) => {
		cancel();
		onClick(e);
	};
</script>

<dialog bind:this={dialog} class="dialog">
	<p><slot name="message">Are you sure?</slot></p>
	<div class="button-row">
		<Button type="button" style="muted" on:click={cancel}>Cancel</Button>
		<Button type="button" on:click={confirm}>Comfirm</Button>
	</div>
</dialog>

<span on:click={localClick}>
	<slot />
</span>

<style>
	.dialog {
		border: 1px solid var(--midGray);
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
	}
	.dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.2);
	}
	.button-row {
		margin-top: 2rem;
		text-align: right;
	}
</style>
