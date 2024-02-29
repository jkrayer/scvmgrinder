<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { identity } from "ramda";
  import Fieldset from "./Form/Fieldset.svelte";
  import InputNumber from "./Form/InputNumber.svelte";
  import Button from "./Button.svelte";
  import { parseRollString, rollString } from "../lib";

  const dispatch = createEventDispatcher();

  // score/modifier, roll/score
  type ScoreSetting = {
    name: string;
    rollFormula: string;
  };

  type ParseScoreSetting = ScoreSetting & {
    min: number;
    max: number;
  };


  export let scores: ScoreSetting[] = [];
  export let getModifier: (score: number) => number = identity<number>;

  const SCORE:ScoreObject = {};

  const parsedScores: ParseScoreSetting[] = scores.map(
    (score: ScoreSetting): ParseScoreSetting => {
      SCORE[score.name] = { score: 0, modifier: 0 };
      const[min, ,die, operation="+", mod=0] = parseRollString(score.rollFormula)
      const max = (min * die) + (operation === "+" ? mod : -mod);

      return {
        ...score,
        min,
        max,
      };
    }
  );

  const roll = (name: string, formula: string) => () => {
    const roll = rollString(formula);
    SCORE[name] = {
      score: roll,
      modifier: getModifier(roll),
    };
    dispatch("score:update", SCORE)
  };


  const handleBlur = () => {
    Object.keys(SCORE).forEach((key) => {
      SCORE[key] = {
        score: SCORE[key].score,
        modifier: getModifier(SCORE[key].score),
      };
    });
    dispatch("score:update", SCORE)
  }
</script>

<Fieldset legend="Ability Scores">
  <div class="grid score-row">
    {#each parsedScores as score}
      <InputNumber
        label={`${score.name} Roll`}
        min={score.min}
        max={score.max}
        bind:value={SCORE[score.name].score}
        on:blur={handleBlur}
      />
      <div class="button-wrapper">
        <Button
          buttonColor="yellow"
          stretch
          on:click={roll(score.name, score.rollFormula)}
          >{score.rollFormula}</Button
        >
      </div>
      <InputNumber
        label={`${score.name}`}
        bind:value={SCORE[score.name].modifier}
        readonly
      />
    {/each}
  </div>
</Fieldset>

<style>
  .score-row {
    grid-template-columns: 2fr 1fr 2fr 2fr 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    align-items: end;
  }
  .score-row > .button-wrapper {
    position: relative;
    bottom: var(--small-padding);
  }
</style>
