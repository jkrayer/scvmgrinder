<script>
  import { filter, partial, propSatisfies } from "ramda";
  import character, { breakWeapon } from "../stores/Character";
  import RollButton from "./Buttons/RollButton.svelte";
  import { alertRoll, roll, rollString, symbol } from "../lib";

  const { strength, presence } = $character.abilities;
  const { melee, ranged } = $character.tests;

  const COMBAT_MAP = {
    melee: {
      bonus: strength,
      roll: alertRoll(melee, strength),
    },
    ranged: {
      bonus: presence,
      roll: alertRoll(ranged, presence),
    },
  };

  const isWeapon = propSatisfies((x) => x === "weapon", "type");
  const isUnbroken = propSatisfies(
    (x) => x === false || x === undefined,
    "broken"
  );
  const isEquipped = propSatisfies((x) => x === true, "equipped");
  const isUnbrokenWeapon = (weapon) =>
    isWeapon(weapon) && isEquipped(weapon) && isUnbroken(weapon);
  const getWeapons = filter(isUnbrokenWeapon);

  const rol = (die) => (typeof die === "string" ? rollString(die) : roll(die));

  $: weapons = getWeapons($character.equipment);
</script>

<table>
  <thead>
    <tr>
      <th>Weapon</th>
      <th />
      <th>To Hit</th>
      <th>Damage</th>
    </tr>
  </thead>
  <tbody>
    {#each weapons as weapon}
      {@const damageType = typeof weapon.damageDie}
      {@const attackType = COMBAT_MAP[weapon.weaponType]}
      <tr>
        <td>{weapon.description}</td>
        <td>
          <button type="button" on:click={partial(breakWeapon, [weapon._id])}>
            Break
          </button>
        </td>
        <td>
          <RollButton diceString="1d20" onRoll={attackType.roll}>
            {symbol(attackType.bonus)}
          </RollButton>
        </td>
        <td>
          <button
            type="button"
            on:click={() => alert(rol(weapon.damageDie))}
            title="Damage"
          >
            {damageType === "string"
              ? weapon.damageDie
              : `d${weapon.damageDie}`}
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
