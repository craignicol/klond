<script lang="ts">
  import { getContext } from "svelte";
  export let title: string = "Game Over";

  export let score: number;
  export let penaltyScore: number;
  export let longestWordLength: number;
  export let wordsCount: number;
  export let cardsRemaining: number;
  let finalScore: number = score - penaltyScore;

  let message: string = `🎉 I just scored ${
    isNaN(finalScore) ? "No" : finalScore
  } points!<br/>
🃏 I had ${cardsRemaining} cards remaining.<br/>
📖 I had ${wordsCount} words.<br/>
↔ The longest word was ${longestWordLength} letters long.`;

  function share(): void {
    if (navigator.share) {
      navigator
        .share({
          title: message.replace("<br/>", "\n"),
          text: message.replace("<br/>", "\n"),
          url: "https://craignicol.github.io/klond/"
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error));
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
      <button on:click={share}>Share</button>
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
