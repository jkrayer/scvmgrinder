<script>
	import settings from './stores/Settings'
	import NewCharacter from './components/NewCharacter.svelte'
	import CharacterSheet from './components/CharacterSheet/CharacterSheet.svelte';
	import Sidebar from './components/Sidebar.svelte';
</script>


<header id="global-header" class="theme-magenta">
	<h1>SCVUMGRINDER</h1>
</header>

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

<footer id="global-footer" class="theme-black">
	<p>Scvmgrinder is an independent production by James Krayer and is not affiliated with Ockult Örtmästare Games or Stockholm Kartell. It is published under the MÖRK BORG Third Party License.</p>
	<p>MÖRK BORG is copyright Ockult Örtmästare Games and Stockholm Kartell.</p>
	<p><a href="https://github.com/jkrayer/scvmgrinder">GitHub</a> |  <a href="https://morkborg.com/">MÖRK BORG</a></p>
</footer>
