<script lang="ts">
  interface Props {
    hasEnded?: boolean;
    score: number;
    penaltyScore: number;
    longestWordLength: number;
    wordsCount: number;
    cardsRemaining: number;
  }

  let {
    hasEnded = $bindable(false),
    score = $bindable(0),
    penaltyScore = $bindable(0),
    longestWordLength = $bindable(0),
    wordsCount = $bindable(0),
    cardsRemaining = $bindable(0)
  }: Props = $props();
</script>

{#if hasEnded}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2>Game Over</h2>
      <p>Score: {score}</p>
      <p>Penalty Score: {penaltyScore}</p>
      <p>Longest Word: {longestWordLength}</p>
      <p>Words Count: {wordsCount}</p>
      <p>Cards Remaining: {cardsRemaining}</p>
      <div class="actions">
        <button onclick={() => (hasEnded = false)}>OK</button>
      </div>
    </div>
  </div>
{/if}

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
    background: rgba(0, 0, 0, 0.4);
    pointer-events: auto;
  }

  .contents {
    min-width: 280px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
</style>
