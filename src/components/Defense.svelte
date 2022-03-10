<script>
    import character from '../stores/Character';
    import RollButton from './Buttons/RollButton.svelte';

    const { tests, abilities } = $character;

        // 
    const alertRoll = (dr, score) => (roll) => {
        const total = roll + score;
        const hit = total >= dr ? 'Hits' : 'Misses';

        alert(`D20 ${roll} + ${score} = ${total}; ${hit} DR${dr}`);
    }

</script>

<div>
    <RollButton diceString="1d20" onRoll={alertRoll(tests.defence, abilities.agility)}>Defence 1d20 + Agility vs {tests.defence}</RollButton>
</div>
