<script>
  import { isEmpty, partial } from "ramda";
  import character, { setSilver } from "../../stores/Character";
  import Scores from "./Scores.svelte";
  import Defense from "../Defense.svelte";
  import Rest from "./Rest.svelte";
  import Miseries from "./Miseries.svelte";
  import Omens from "../Omens.svelte";
  import Powers from "../Powers.svelte";
  import ArmorWorn from "../ArmorWorn.svelte";
  import WeaponsCarried from "../WeaponsCarried.svelte";
  import Equipment from "../Equipment.svelte";
  import Header from "./Header.svelte";
  import { roll } from "../../lib";
  import SlideIn from "../SlideIn.svelte";
  import Incrementer from "./Incrementer.svelte";

  let showOmens = false;
  let showPowers = false;
  let showRest = false;
</script>

{#if !isEmpty($character)}
  <article>
    <!-- <Miseries /> -->
    <Header />
    <Scores />
    <!-- 
    <div class="row row-padded">
        <div>
            <button
                type="button"
                class="b"
                disabled={$character?.omens?.current === 0}
                on:click={() => showOmens = true}
            >
                Omens ({$character?.omens?.current})
            </button>
        </div>
        <div>
            <button
                type="button"
                class="b"
                disabled={$character?.powers === 0}
                on:click={() => showPowers = true}
            >
                Powers ({$character?.powers || 0})
            </button>
        </div>
        <div>
            <button
                type="button"
                class="b"
                on:click={() => showRest = true}
            >
                Rest
            </button>
        </div>
        <div>
            <button type="button" disabled class="b">Get Better</button>
        </div>
    </div>

    <ArmorWorn />
    <WeaponsCarried />
    <Equipment />
    <Incrementer
        title="Silver"
        value={$character.silver}
        increment={partial(setSilver, [1])}
        decrement={partial(setSilver, [-1])}
        set={(num) => setSilver(num)}
    />

    <Omens show={showOmens} onClose={() => showOmens = false} />
    <Powers show={showPowers} onClose={() => showPowers = false } />
    <Rest show={showRest} onClose={() => showRest = false } />
     -->
  </article>
{/if}

<style>
  /* .b {
        width: 100%;
    } */
</style>
