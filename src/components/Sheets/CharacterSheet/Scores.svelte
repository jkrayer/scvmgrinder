<script type="ts">
  import type { Abilities } from "../../../global";
  import MessageStore from "../../../stores/MessageStore";
  import RollButton from "../../Buttons/RollButton.svelte";
  import { sign } from "../../../lib";

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
      <th class="score-table-title">Strength</th>
      <th class="score-table-title">Agility</th>
      <th class="score-table-title">Presence</th>
      <th class="score-table-title">Toughness</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="score-table-score">{scores.strength}</td>
      <td class="score-table-score">{scores.agility}</td>
      <td class="score-table-score">{scores.presence}</td>
      <td class="score-table-score">{scores.toughness}</td>
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
    border-collapse: collapse;
    margin: 1rem 0;
  }
  .score-table td,
  .score-table th {
    width: 25%;
    /* border-right: 1px solid #333;
    border-left: 1px solid #333; */
    text-align: center;
  }
  .score-table-score {
    font-family: var(--serif);
    font-size: 1.5rem;
  }

  .score-table-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
</style>
