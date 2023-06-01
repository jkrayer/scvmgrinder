<script lang="ts">
	import Character from './store';
</script>

<h2 class="sheet-title">Features</h2>
<ul class="clear-list row">
	{#each $Character.description as d}
		<li class="col-two">{d}</li>
	{/each}
</ul>
