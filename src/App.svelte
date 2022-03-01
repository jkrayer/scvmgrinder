<script>
	import { writable } from 'svelte/store';

	import EditView from './components/EditView.svelte';
	import PlayView from './components/PlayView.svelte';

	const toggleView = writable('edit') // play | edit
	const handleToggle = (e) => toggleView.set($toggleView === 'play' ? 'edit' : 'play')
</script>

<!-- 
<button type="button" on:click={handleToggle}>{$toggleView === 'play' ? 'Edit' : 'Play'}</button>
{#if $toggleView === 'play'}
	<PlayView />
{:else}
	
{/if}
 -->
<div style="display:flex;">
	<div style="flex-grow:1"><PlayView /></div>
	<div style="flex-grow:1"><EditView /></div>
 </div>