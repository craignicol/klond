<script lang="ts">
import { Letter } from "./deck";

  export let face: Letter = undefined;
  export let turned: boolean = false;
  export let stacked: boolean = false;
  export let selected: boolean = false;
  export let emptyText: string = undefined;
</script>

{#if face === undefined}
<span class="card empty" on:click>{#if emptyText}{emptyText}{:else}&nbsp;{/if}</span>
{:else if turned && stacked}
<span class="card back clip">&nbsp;</span>
{:else if turned}
<span class="card back" on:click>&nbsp;</span>
{:else}
<span class="card front {selected ? 'selected' : ''}" on:click>{Letter[face]}</span>
{/if}

<style>
  span.card {
    display: inline-block;
    width: 6vw;
    height: 10vw;
    max-width: 6rem;
    max-height: 10rem;
    background: rgb(165, 30, 30);
    padding: 0.1em;
    margin: 0.1em;
    margin-top: 0;
    opacity: 1;
    z-index: -1;
    font-size: 3vw;
    font-weight: bold;
    color: white;
    text-align: center;
    line-height: 3em;
    border-radius: 1.5vw;
  }
  span.card.empty {
    background: white;
    color: black;
    border: dotted black;
  }

  span.card.back.clip:not(:last-child) {
    height: 1em;
    border-bottom: 0;
    border-radius: 1.5vw 1.5vw 0 0;
    line-height: 0;
    margin: 0;
    padding: 0;
  }
  span.card.back {
    background: repeating-linear-gradient(
        45deg,
        rgba(62, 26, 26, 0.5),
        rgba(49, 1, 1, 0.5) 1px,
      transparent 1px,
      transparent 3px
      );
    z-index: 1;
  }
  span.card.front {
    background: radial-gradient(
      circle,
      rgba(64, 33, 33) 0%,
      rgb(64, 31, 31) 80%,
      rgba(228, 129, 129) 100%
    );
    z-index: 1;
  }
  span.card.selected {
    opacity: 0.2;
  }
</style>