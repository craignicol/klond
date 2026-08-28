<script lang="ts">
  import { run } from 'svelte/legacy';

  import { getContext, getAllContexts } from "svelte";
  import ScoreModal from "./ScoreModal.svelte";

  interface Props {
    hasEnded?: boolean;
    score: number;
    penaltyScore: number;
    longestWordLength: number;
    wordsCount: number;
    cardsRemaining: number;
  }

  let {
    hasEnded = false,
    score,
    penaltyScore,
    longestWordLength,
    wordsCount,
    cardsRemaining
  }: Props = $props();

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
  run(() => {
    hasEnded && showScore();
  });
</script>
