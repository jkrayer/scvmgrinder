<script>
    import character from '../stores/Character';
    import RollButton from './Buttons/RollButton.svelte';
    import { symbol } from '../lib';

    const { tests, abilities } = $character

    // 
    const alertRoll = (dr, score) => (roll) => {
        const total = roll + score;
        const hit = total >= dr ? 'Hits' : 'Misses';

        alert(`D20 ${roll} + ${score} = ${total}; ${hit} DR${dr}`);
    }
</script>

<table class="abilities">
    <thead>
        <tr>
            <th>Ability</th>
            <th>Score</th>
            <th>Test</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Strength</th>
            <td>{symbol(abilities.strength)}</td>
            <td><RollButton diceString="1d20" onRoll={alertRoll(tests.strength, abilities.strength)}>{tests.strength}</RollButton></td>
        </tr>
        <tr>
            <th>Agility</th>
            <td>{symbol(abilities.agility)}</td>
            <td><RollButton diceString="1d20" onRoll={alertRoll(tests.agility, abilities.agility)}>{tests.agility}</RollButton></td>
        </tr>
        <tr>
            <th>Presence</th>
            <td>{symbol(abilities.presence)}</td>
            <td><RollButton diceString="1d20" onRoll={alertRoll(tests.presence, abilities.presence)}>{tests.presence}</RollButton></td>
        </tr>
        <tr>
            <th>Toughness</th>
            <td>{symbol(abilities.toughness)}</td>
            <td><RollButton diceString="1d20" onRoll={alertRoll(tests.toughness, abilities.toughness)}>{tests.toughness}</RollButton></td>
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
    .abilities > thead th {
        padding-top: 0;
        padding-bottom: .2rem;
        border-bottom: 1px solid #ccc;
        font-size: .75em;
    }
</style>
