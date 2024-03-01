<script lang="ts">
	export const ssr = false;
</script>

<header id="site-header">
	<h1 id="site-logo"><a href="/">SCVUMGRINDER</a></h1>
	<p id="site-tag">A digital character sheet for MÖRK BORG</p>
	<img src="CompWith_MORKBORG_horiz.svg" width="270" height="77" alt="Compatible With MÖRK BORG" />
</header>

<main class="narrow-container">
	<slot />
</main>

<footer id="site-footer" class="narrow-container">
	<p>
		Scvmgrinder is an independent production by James Krayer and is not affiliated with Ockult
		Örtmästare Games or Stockholm Kartell. It is published under the MÖRK BORG Third Party License.
	</p>
	<p>
		<a href="https://morkborg.com/">MÖRK BORG</a> is copyright Ockult Örtmästare Games and
		<a href="https://www.stockholmkartell.com/">Stockholm Kartell</a>.
	</p>
	<p>
		<a href="https://github.com/jkrayer/scvmgrinder">GitHub</a> |
		<a href="https://morkborg.com/">MÖRK BORG</a>
	</p>
	<p>v0.1.0</p>
</footer>

<style>
	#site-header {
		margin-bottom: 1.25rem;
		text-align: center;
	}

	#site-logo {
		font: 400 1.125rem/1 var(--serif);
		letter-spacing: 4px;
	}

	#site-logo > a {
		color: var(--gray);
		text-decoration: none;
	}

	#site-tag,
	#site-footer {
		font: 400 0.875rem/1.3333 var(--fixed);
		color: var(--gray);
	}
	#site-tag {
		margin-top: 0.625rem;
		margin-bottom: 0.625rem;
	}

	#site-footer {
		margin-top: 2.5rem;
		margin-bottom: 1.25rem;
		text-align: center;
	}
</style>
