<script>
    export let title = ''
    export let value = 0;
    export let maxValue = -1;
    export let increment = () => {}
    export let decrement = () => {}
    export let set = () => {}

    let showInput = false;
    let val = null

    const handleInput = () => !!set ? showInput = true : null;

    const handleSubmit = () => {
        set(val);
        val = null;
        showInput = false;
    }
</script>

<div class="hit-points row">
    <div>
        <div class="score-name">
            {@html title}
            <!-- <abbr title="Hit Points">HP</abbr> -->
        </div>
        <div
            class="score"
            on:click={handleInput}
        >
        {#if showInput }
            <form action="" on:submit|preventDefault={handleSubmit}>
                <input type="number" bind:value={val} />
                <button type="submit">Submit</button>
            </form>
        {:else}
            {value}
            {#if maxValue > -1}
                /{maxValue}
            {/if}
        {/if}
        </div>
    </div>
    <div class="col">
        {#if !showInput }
        <button
            type="button"
            class="btn"
            on:click={increment}
            title="Increase by 1"
        >+
        </button>
        <button
            type="button"
            class="btn"
            on:click={decrement}
            title="Reduce by 1P"
        >-
        </button>
        {/if}
    </div>
</div>

<style>
.hit-points {
    text-align: center;
}
.btn {
  margin: 0 0 0 0.25em;
  padding: 0.25em 0.5em;
  border: none;
  border-radius: 0;
  font-weight: 700;
  /* color: #fff;
  background: linear-gradient(0deg, #444, #000) */
}    
</style>
