<script lang="ts">
	import { base } from '$app/paths';
</script>

<a href="{base}/" class="banner">Go Home!<br />the path is pain.</a>

<style>
	.banner {
		position: fixed;
		top: 32px;
		left: -63px;
		padding: 0.5em 4rem;
		border-bottom: 1px solid var(--black);
		transform: rotate(-45deg);
		background-color: var(--yellow);
		text-align: center;
	}
</style>
