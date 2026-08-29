<script lang="ts">
  import { Letter, type LetterCard } from "./deck";

  interface Props {
    face?: LetterCard;
    turned?: boolean;
    stacked?: boolean;
    selected?: boolean;
    emptyText?: string;
    onclick?: (event: MouseEvent) => void;
    ondblclick?: (event: MouseEvent) => void;
    ondragstart?: (event: DragEvent) => void;
    ondragend?: (event: DragEvent) => void;
    ontouchstart?: (event: TouchEvent) => void;
    ontouchmove?: (event: TouchEvent) => void;
    ontouchend?: (event: TouchEvent) => void;
  }

  let {
    face = undefined,
    turned = false,
    stacked = false,
    selected = $bindable(false),
    emptyText = undefined,
    onclick,
    ondblclick,
    ondragstart,
    ondragend,
    ontouchstart,
    ontouchmove,
    ontouchend,
  }: Props = $props();
</script>

{#if face === undefined}
  <button class="card empty" {onclick} {ondblclick}
    >{#if emptyText}{emptyText}{:else}&nbsp;{/if}</button
  >
{:else if turned && stacked}
  <div class="card back clip" id="card-{face.deckPosition}" role="presentation">
    &nbsp;
  </div>
{:else if turned}
  <button
    class="card back"
    id="card-{face.deckPosition}"
    aria-label="Card"
    {onclick}
    {ondblclick}>&nbsp;</button
  >
{:else}
  <button
    class="card front {selected ? 'selected' : ''}"
    id="card-{face.deckPosition}"
    aria-label="Card {Letter[face.letter]}"
    draggable="true"
    {onclick}
    {ondblclick}
    {ondragstart}
    {ondragend}
    {ontouchstart}
    {ontouchmove}
    {ontouchend}>{Letter[face.letter]}</button
  >
{/if}

<style>
  button.card,
  div.card {
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
    border: none;
    cursor: pointer;
  }
  button.card.empty {
    background: white;
    color: black;
    border: dotted black;
  }
  div.card.back.clip:not(:last-child) {
    height: 1em;
    border-bottom: 0;
    border-radius: 1.5vw 1.5vw 0 0;
    line-height: 0;
    margin: 0;
    padding: 0;
  }
  div.card.back,
  button.card.back {
    background: repeating-linear-gradient(
      45deg,
      rgb(62, 26, 26, 0.5),
      rgb(49, 1, 1, 0.5) 1px,
      transparent 1px,
      transparent 4px
    );
  }
  button.card.front {
    background: radial-gradient(
      circle,
      rgb(165, 30, 30) 0%,
      rgb(100, 15, 15) 100%
    );
  }
  button.card.selected {
    opacity: 0.2;
  }
</style>
