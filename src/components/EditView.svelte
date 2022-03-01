<script>
	import character from '../stores/Character'
</script>

<form>
    <div>
        <label>Name:
            <input type="text" bind:value={$character.name} />
        </label>
    </div>
    <textarea bind:value={$character.description} />
	<input type="text" bind:value={$character.class} />
</form>
