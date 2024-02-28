<script lang="ts">
	export let data: CreateCharacterData;
	import NewCharacerForm from '../../morkborg/new-characer-form.svelte';
</script>

<NewCharacerForm tables={data.tables} />
