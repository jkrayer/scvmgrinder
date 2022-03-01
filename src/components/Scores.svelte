<script>
    import { toPairs } from 'ramda';
    import character from '../stores/Character';

    const { strength, agility, presence, toughness } = $character.abilities;
</script>

<table>
    <tbody>
        <tr><th>Strength</th><td>{strength}</td></tr>
        <tr><th>Agility</th><td>{agility}</td></tr>
        <tr><th>Presence</th><td>{presence}</td></tr>
        <tr><th>Toughness</th><td>{toughness}</td></tr>
    </tbody>
</table>
