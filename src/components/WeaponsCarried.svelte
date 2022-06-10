<script>
  export let abilities = {};
  export let weapons = [];

  const COMBAT_MAP = {
    melee: { toHit: `1d20+${abilities.strength}` },
    ranged: { toHit: `1d20+${abilities.presence}` },
    thrown: { toHit: `1d20+${abilities.presence}` },
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
          {COMBAT_MAP[weapon.subType].toHit}
        </td>
        <td>{weapon.damageDie}</td>
      </tr>
    {/each}
  </tbody>
</table>
