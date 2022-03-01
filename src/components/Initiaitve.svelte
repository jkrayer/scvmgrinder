<script>
    import { writable } from 'svelte/store';
    import character from '../stores/Character'
    import { roll } from '../lib'

    const { agility } = $character.abilities

    const STORAGE_KEY = 'initiative'

    const initiative = writable(0, (set) => {
        const init = JSON.parse(localStorage.getItem(STORAGE_KEY) || 0);
        set(init)
  
        return (a,b,c,d) => console.log('no more init subs',a,b,c,d)
    })

    initiative.subscribe(value => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    });

    const rollInitiative = () => initiative.set(roll(6) + agility)
</script>

<div class="row">
    <label>Current Initiative: <input type="number" class="init" bind:value={$initiative} /></label>
    <button type="button" title="Agility + d6" on:click={rollInitiative}>Agility + d6</button>
</div>

<style>
  .init {
    max-width: 50px;
    border: none;
  }
</style>