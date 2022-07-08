<script type="ts">
  import type { Abilities, Message, Weapon } from "../../global";
  import RollButton from "../Buttons/RollButton.svelte";
  import { send } from "../../stores/MessageStore";

  import { setAttack, clearTarget } from "../../stores/Attack";

  export let abilities: Partial<Abilities> = {};
  export let weapons: Weapon[] = [];

  const COMBAT_MAP = {
    melee: { toHit: `1d20+${abilities.strength}` },
    ranged: { toHit: `1d20+${abilities.presence}` },
    thrown: { toHit: `1d20+${abilities.presence}` },
  };

  const handleRoll =
    (rollFormula: string, rollType: "To Hit" | "Damage") => (roll: number) => {
      setAttack({ rollFormula, rollType, roll });
    };

  const keyboardHandler = (e: KeyboardEvent) =>
    e.code === "Escape" ? clearTarget() : null;
</script>

<svelte:body on:keyup={keyboardHandler} />

<table>
  <thead>
    <tr>
      <th colspan="2">Weapon</th>

      <th>To Hit</th>
      <th>Damage</th>
    </tr>
  </thead>
  <tbody>
    {#each weapons as weapon}
      <tr>
        <td>{weapon.name}</td>
        <td />
        <td>
          <!-- <button type="button" draggable="true"
            >{COMBAT_MAP[weapon.subType].toHit}</button
          > -->
          <RollButton
            diceString={COMBAT_MAP[weapon.subType].toHit}
            onRoll={handleRoll(COMBAT_MAP[weapon.subType].toHit, "To Hit")}
          />
        </td>
        <td
          ><RollButton
            diceString={weapon.damageDie}
            onRoll={handleRoll(weapon.damageDie, "Damage")}
          /></td
        >
      </tr>
    {/each}
  </tbody>
</table>
