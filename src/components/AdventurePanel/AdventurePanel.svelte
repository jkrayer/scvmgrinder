<script type="ts">
  import type { Adventure } from "../../global";
  import Game from "../../stores/Campaign";
  // TEST
  import type { TrackerMonster } from "../../global";
  import MonsterSheet from "../Sheets/MonsterSheet/MonsterSheet.svelte";

  const monster: TrackerMonster = {
    _id: 1,
    name: "Fletcher, the cannibal warlock",
    description:
      "7 feet tall, built like a grizzly. Sooty, bald and covered in tattoos. Rules the Den. Hates Lesdy in the Greenhouse but can’t fit through the Tunnel.",
    hp: 20,
    morale: -1,
    armor: {
      name: "Hardened skin",
      type: "armor",
      tier: {
        current: 2,
        maximum: 2,
      },
      equipped: true,
    },
    weapons: [
      {
        name: "Red-hot flail",
        damageDie: "1d8",
        type: "weapon",
        subType: "melee",
        weight: 100,
        equipped: true,
        special: "+ severe burn (agility tests −2 for a day).",
      },
    ],
    hitpoints: {
      maximum: 20,
      current: 20,
    },
  };

  let adventure: Adventure | null = null;

  Game.subscribe((data) => {
    adventure = data.adventure;
  });
</script>

{#if adventure !== null}
  <div
    id="adventure-panel"
    style={`background-image: url(${adventure.poster})`}
  >
    <MonsterSheet {monster} />
  </div>
{/if}

<style>
  #adventure-panel {
    /* position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; */
    flex-grow: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>
