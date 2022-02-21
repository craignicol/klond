<script lang="ts">
  import { getContext } from "svelte";
  const { close } = getContext("simple-modal");

  export let title: string = "How to Play";
</script>

<div role="dialog" class="modal">
  <div class="contents">
    <h2>{title}</h2>
    <p class="instructions">
      Double-click or drag cards to make words. Click the card back beside the
      3-card spread to deal more cards.
    </p>
    <p class="instructions">
      More points for longer words, but you'll lose points for any cards you
      can't make into words.
    </p>
    <p class="instructions">US and UK spellings allowed.</p>
    <p>
      Visit the <a href="https://craignicol.github.io/klond/#howtoplay"
        >Klond tutorial</a
      >
      to find out more.
      <a href="https://github.com/dwyl/english-words"
        >The word list is taken from Github</a
      >
    </p>
    <div class="actions">
      <button on:click={close}>OK</button>
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
