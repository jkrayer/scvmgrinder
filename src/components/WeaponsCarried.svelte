<script type="ts">
  import type { Abilities, Message, Weapon } from "../global";
  import RollButton from "./Buttons/RollButton.svelte";
  import MessageStore from "./MessageService/MessageStore";

  export let abilities: Partial<Abilities> = {};
  export let weapons: Weapon[] = [];

  const COMBAT_MAP = {
    melee: { toHit: `1d20+${abilities.strength}` },
    ranged: { toHit: `1d20+${abilities.presence}` },
    thrown: { toHit: `1d20+${abilities.presence}` },
  };

  const handleRoll =
    (rollFormula: string, rollType: "To Hit" | "Damage") => (roll: number) => {
      MessageStore.send({
        campaignId: "e9lQv3ZyOxnPKyrK",
        characterId: "F7bATPIJ558NwzOu",
        message: {
          name: "Vatan",
          rollType,
          roll,
          rollFormula,
          target: "",
        },
      });
    };
</script>

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
