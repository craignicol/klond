<script lang="ts">
  import { getContext } from "svelte";

  interface Props {
    title?: string;
    score: number;
    penaltyScore: number;
    longestWordLength: number;
    wordsCount: number;
    cardsRemaining: number;
  }

  let {
    title = "Game Over",
    score,
    penaltyScore,
    longestWordLength,
    wordsCount,
    cardsRemaining
  }: Props = $props();
  let finalScore: number = score - penaltyScore;

  const baseUrl = "https://craignicol.github.io/klond/";
  let message: string = `🎉 I just scored ${
    isNaN(finalScore) ? "No" : finalScore
  } points!<br/>
🃏 I had ${cardsRemaining} cards remaining.<br/>
📖 I had ${wordsCount} words.<br/>
↔ The longest word was ${longestWordLength} letters long.`;

  function share(): void {
    const content = message.replaceAll("<br/>", "");
    if (navigator.share) {
      navigator
        .share({
          title: content,
          text: content,
          url: baseUrl
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error));
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(content + "\n\n" + baseUrl)
        .then(() => console.log("Successful copy"))
        .catch(error => console.log("Error copying", error));
    } else {
      console.log("No share method available");
    }
  }
</script>

<div role="dialog" class="modal">
  <div class="contents">
    <h2>{title}</h2>
    <p class="instructions">
      {@html message}
    </p>
    <div class="actions">
      <button
        disabled={!(navigator.share || navigator.clipboard)}
        onclick={share}
        >{navigator.share
          ? "Share"
          : navigator.clipboard
          ? "Copy"
          : "Cannot Share"}</button
      >
    </div>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  p.instructions {
    font-size: 1.2rem;
    margin-bottom: 1em;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
</style>
