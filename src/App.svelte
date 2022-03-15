<script>
	import { isNil } from 'ramda';
	import settings from './stores/Settings'
	import CreateCharacter from './components/NewCharacter/CreateCharacter.svelte';
	import CharacterSheet from './components/CharacterSheet/CharacterSheet.svelte';
	import Sidebar from './components/Sidebar.svelte';
	import Welcome from './components/Welcome.svelte';
</script>


<header id="global-header" class="theme-magenta row row-polar">
	<h1>SCVUMGRINDER</h1>
	<button type="button" id="sidebar-button" title="Toggle Menu">
        <div></div>
        <div></div>
        <div></div>
    </button>
</header>

<main id="app">
	<div id="stage">
		{#if $settings.newCharacter}
			<CreateCharacter />
		{:else if !isNil($settings.selectedCharacterId)}
			<CharacterSheet />
		{:else}
			<Welcome />
		{/if}
	</div>
	<input type="checkbox" id="test" />
	<!-- <Sidebar /> -->
</main>

<footer id="global-footer" class="theme-black">
	<p>Scvmgrinder is an independent production by James Krayer and is not affiliated with Ockult Örtmästare Games or Stockholm Kartell. It is published under the MÖRK BORG Third Party License.</p>
	<p>MÖRK BORG is copyright Ockult Örtmästare Games and Stockholm Kartell.</p>
	<p><a href="https://github.com/jkrayer/scvmgrinder">GitHub</a> |  <a href="https://morkborg.com/">MÖRK BORG</a></p>
</footer>
