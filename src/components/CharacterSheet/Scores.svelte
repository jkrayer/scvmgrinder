<script type="ts">
  import type { Abilities } from "../../global";
  import MessageStore from "../../stores/MessageStore";
  import RollButton from "../Buttons/RollButton.svelte";
  import { sign } from "../../lib";

  export let scores: Abilities = {
    strength: 0,
    agility: 0,
    presence: 0,
    toughness: 0,
  };

  let tests: any = {};

  const strengthTest = `1d20${sign(scores.strength)}`;
  const agilityTest = `1d20${sign(scores.agility)}`;
  const presenceTest = `1d20${sign(scores.presence)}`;
  const toughnessTest = `1d20${sign(scores.toughness)}`;

  const handleTest =
    (
      rollFormula: string,
      target: "Strength" | "Agility" | "Presence" | "Toughness"
    ) =>
    (roll: number) => {
      MessageStore.send({
        rollType: "Test",
        roll,
        rollFormula,
        target,
      });
    };
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
        <RollButton
          diceString={strengthTest}
          onRoll={handleTest(strengthTest, "Strength")}
        />
      </td>
      <td
        ><RollButton
          diceString={agilityTest}
          onRoll={handleTest(agilityTest, "Agility")}
        /></td
      >
      <td
        ><RollButton
          diceString={presenceTest}
          onRoll={handleTest(presenceTest, "Presence")}
        /></td
      >
      <td
        ><RollButton
          diceString={toughnessTest}
          onRoll={handleTest(toughnessTest, "Toughness")}
        /></td
      >
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
