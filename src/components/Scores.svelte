<script>
    import character from '../stores/Character';
    import {symbol} from '../lib'

    const { strength, agility, presence, toughness } = $character.abilities;

    
</script>

<!-- <h2>Abilities</h2> -->
<!--
<table class="abilities">
    <tbody>
        <tr>
            <th>Strength</th>
            <td>{symbol(strength)}</td>
            <td><button type="button" on:click={() => console.log(`d20+${strength}`)}>Roll</button></td>
            <th>Agility</th>
            <td>{symbol(agility)}</td>
            <td><button type="button" on:click={() => console.log(`d20+${agility}`)}>Roll</button></td>
        </tr>
        <tr>
            <th>Presence</th>
            <td>{symbol(presence)}</td>
            <td><button type="button" on:click={() => console.log(`d20+${presence}`)}>Roll</button></td>
            <th>Toughness</th>
            <td>{symbol(toughness)}</td>
            <td><button type="button" on:click={() => console.log(`d20+${toughness}`)}>Roll</button></td>
        </tr>
    </tbody>
</table>
-->

<table class="abilities">
    <tbody>
        <tr>
            <th>Strength</th>
            <td>{symbol(strength)}</td>
            <!-- <td><button type="button" on:click={() => console.log(`d20+${strength}`)}>Roll</button></td> -->
        </tr>
        <tr>
            <th>Agility</th>
            <td>{symbol(agility)}</td>
            <!-- <td><button type="button" on:click={() => console.log(`d20+${agility}`)}>Roll</button></td> -->
        </tr>
        <tr>
            <th>Presence</th>
            <td>{symbol(presence)}</td>
            <!-- <td><button type="button" on:click={() => console.log(`d20+${presence}`)}>Roll</button></td> -->
        </tr>
        <tr>
            <th>Toughness</th>
            <td>{symbol(toughness)}</td>
            <!-- <td><button type="button" on:click={() => console.log(`d20+${toughness}`)}>Roll</button></td> -->
        </tr>
    </tbody>
</table>


<style>
    .abilities {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .abilities th, .abilities td {
        padding: .2em .5em .2em .5em;
        text-align: left;
    }
</style>