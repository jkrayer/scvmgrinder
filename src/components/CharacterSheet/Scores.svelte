<script>
  import RollButton from "../Buttons/RollButton.svelte";
  import { sign } from "../../lib";

  export let scores = {
    strength: 0,
    agility: 0,
    presence: 0,
    toughness: 0,
  };
  // export let tests = {
  //   strength: 0,
  //   agility: 0,
  //   presence: 0,
  //   toughness: 0,
  // };
</script>

<table class="score-table">
  <thead>
    <tr>
      <th>Strength</th>
      <th>Agility</th>
      <th>Presence</th>
      <th>Toughness</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{scores.strength}</td>
      <td>{scores.agility}</td>
      <td>{scores.presence}</td>
      <td>{scores.toughness}</td>
    </tr>
    <tr>
      <td>
        <RollButton diceString="1d20{sign(scores.strength)}" />
      </td>
      <td><RollButton diceString="1d20{sign(scores.agility)}" /></td>
      <td><RollButton diceString="1d20{sign(scores.presence)}" /></td>
      <td><RollButton diceString="1d20{sign(scores.toughness)}" /></td>
    </tr>
  </tbody>
</table>

<style>
  .score-table {
    padding: 0;
    border-right: 1px solid #333;
    border-left: 1px solid #333;
    border-collapse: collapse;
    margin: 0;
  }
  .score-table td,
  .score-table th {
    width: 25%;
    border-right: 1px solid #333;
    border-left: 1px solid #333;
    text-align: center;
  }
</style>
