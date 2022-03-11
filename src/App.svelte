<script>
	import settings from './stores/Settings'
	import NewCharacter from './components/NewCharacter.svelte'
	import CharacterSheet from './components/CharacterSheet/CharacterSheet.svelte';
	import Sidebar from './components/Sidebar.svelte';
</script>

<main id="app">
	<div id="stage">
		{#if $settings.newCharacter}
			<NewCharacter />
		{:else if $settings.selectedCharacterId !== null}
			<CharacterSheet />
		{/if}
	</div>
	<input type="checkbox" id="test" />
	<Sidebar />
</main>
