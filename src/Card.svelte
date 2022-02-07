<script lang="ts">
import { Letter } from "./deck";

  export let face: Letter;
  export let turned: boolean = false;
</script>

{#if turned}
<span class="back">.</span>
{:else}
<span class="front">{Letter[face]}</span>
{/if}

<style>
  span {
    display: inline-block;
    width: 3em;
    height: 5em;
    background: rgb(165, 30, 30);
    padding: 0.1em;
    margin: 0.3em;
    opacity: 1;
    z-index: -1;
    font-size: 2em;
    font-weight: bold;
    font-family: "Dyslexie", "Comic Sans MS", cursive, sans-serif;
    color: white;
    text-align: center;
    line-height: 5em;
    border-radius: 0.5em;
  }
  span.back {
    background: repeating-linear-gradient(
        45deg,
        rgba(62, 26, 26, 0.5),
        rgba(49, 1, 1, 0.5) 1px,
      transparent 1px,
      transparent 3px
      );
    z-index: 1;
  }
  span.front {
    background: radial-gradient(
      circle,
      rgba(51, 3, 3, 0.5) 0%,
      rgba(51, 3, 3, 0.5) 80%,
      rgba(228, 9, 9, 0.5) 100%
    );
    z-index: 1;
  }
</style>