<script>
    import character, { incrementHp, decrementHp } from '../stores/Character'
</script>

<div>
    Hit Points: {$character.hitpoints.current} / {$character.hitpoints.maximum}
    <button type="button" on:click={decrementHp}>-</button>
    <button type="button" on:click={incrementHp}>+</button>
</div>
