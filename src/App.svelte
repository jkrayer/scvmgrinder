<script>
	import settings from './stores/Settings'
	import NewCharacter from './components/NewCharacter.svelte'
	import PlayView from './components/PlayView.svelte';
	import Sidebar from './components/Sidebar.svelte';
</script>

<main id="app">
	<div id="stage">
		{#if $settings.newCharacter}
			<NewCharacter />
		{:else if $settings.selectedCharacterId !== null}
			<PlayView />
		{/if}
	</div>
	<input type="checkbox" id="test" />
	<Sidebar />
</main>
