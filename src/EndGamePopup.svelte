<script lang="ts">
  import { getContext, getAllContexts } from "svelte";
  import ScoreModal from "./ScoreModal.svelte";
  export let hasEnded: boolean = false;

  export let score: number;
  export let penaltyScore: number;
  export let longestWordLength: number;
  export let wordsCount: number;
  export let cardsRemaining: number;

  const x = getAllContexts();
  const { open } = getContext("simple-modal");
  const showScore = () =>
    open(
      ScoreModal,
      {
        title: "Game Over",
        score,
        penaltyScore,
        longestWordLength,
        wordsCount,
        cardsRemaining
      },
      { closeButton: false }
    );
  $: hasEnded && showScore();
</script>
