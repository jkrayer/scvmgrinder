<script>
    import character, { incrementHp, decrementHp } from '../stores/Character'
</script>

<div class="hit-points row">
    <div>
        <div class="score-name">
            <abbr title="Hit Points">HP</abbr>
        </div>
        <div
            class="score"
        >
            {$character.hitpoints.current}/{$character.hitpoints.maximum}
        </div>
    </div>
    <div class="col">
        <button
            type="button"
            class="btn"
            on:click={incrementHp}
            title="Increase HP"
        >+
        </button>
        <button
            type="button"
            class="btn"
            on:click={decrementHp}
            title="Reduce HP"
        >-
        </button>
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
  color: #fff;
  background: linear-gradient(0deg, #444, #000)
}    
</style>
