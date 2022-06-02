<script>
	import CharacterSheet from './components/CharacterSheet/CharacterSheet.svelte';
</script>

<header id="global-header" class="theme-magenta row row-polar">
	<h1>SCVUMGRINDER</h1>
</header>

<main id="app">
	<div id="stage">
		<CharacterSheet />
	</div>
</main>

<footer id="global-footer" class="theme-black">
	<p>Scvmgrinder is an independent production by James Krayer and is not affiliated with Ockult Örtmästare Games or Stockholm Kartell. It is published under the MÖRK BORG Third Party License.</p>
	<p>MÖRK BORG is copyright Ockult Örtmästare Games and Stockholm Kartell.</p>
	<p><a href="https://github.com/jkrayer/scvmgrinder">GitHub</a> |  <a href="https://morkborg.com/">MÖRK BORG</a></p>
</footer>
