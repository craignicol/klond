<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import { Letter, LetterCard } from "./deck";

  interface Props {
    face?: LetterCard;
    turned?: boolean;
    stacked?: boolean;
    selected?: boolean;
    emptyText?: string;
  }

  let {
    face = undefined,
    turned = false,
    stacked = false,
    selected = false,
    emptyText = undefined
  }: Props = $props();
</script>

{#if face === undefined}
  <span class="card empty" onclick={bubble('click')} ondblclick={bubble('dblclick')}
    >{#if emptyText}{emptyText}{:else}&nbsp;{/if}</span
  >
{:else if turned && stacked}
  <span class="card back clip" id="card-{face.deckPosition}">&nbsp;</span>
{:else if turned}
  <span class="card back" id="card-{face.deckPosition}" onclick={bubble('click')} ondblclick={bubble('dblclick')}
    >&nbsp;</span
  >
{:else}
  <span
    class="card front {selected ? 'selected' : ''}"
    id="card-{face.deckPosition}"
    draggable="true"
    onclick={bubble('click')}
    ondblclick={bubble('dblclick')}
    ondragstart={bubble('dragstart')}
    ondragend={bubble('dragend')}
    ontouchstart={bubble('touchstart')}
    ontouchmove={bubble('touchmove')}
    ontouchend={bubble('touchend')}>{Letter[face.letter]}</span
  >
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
    border: rgb(64, 31, 31) solid 0.1em;
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
