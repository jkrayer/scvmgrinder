<script type="ts">
  import type { Encounter, TrackerMonster } from "../../global";
  import { addMonsters } from "../../stores/Campaign";
  import { rollString } from "../../lib";

  export let encounter: Encounter;
  let i = 1;

  const handleAddMonsters = () => {
    const { number, monster, roll } = encounter.encounter;

    const numberOfMonsters = roll !== undefined ? rollString(roll) : number;

    const trackerMonsters: TrackerMonster[] = new Array(numberOfMonsters)
      .fill(0)
      .map(() => {
        const { hp } = monster;
        return {
          ...monster,
          _id: i++,
          hitpoints: {
            maximum: hp,
            current: hp,
          },
        };
      });

    addMonsters(trackerMonsters);
  };
</script>

<article>
  <h1>{encounter.name}</h1>
  <div>{@html encounter.description}</div>
  {#if !!encounter.encounter}
    <button type="button" on:click={handleAddMonsters}
      >Add {encounter.encounter.monster.name} To Tacker</button
    >
  {/if}
</article>
