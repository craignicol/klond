<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Card from "./Card.svelte";
  import { Letter, type LetterCard } from "./deck";

  interface Props {
    currentWord?: LetterCard[];
    message?: string;
    dragtarget?: boolean;
    minLength?: number;
    ondrop?: (event: DragEvent) => void | boolean;
    ondragover?: (event: DragEvent) => void | boolean;
    ondragenter?: (event: DragEvent) => void | boolean;
    ondragstart?: (event: DragEvent) => void;
    ondragend?: (event: DragEvent) => void;
    ontouchstart?: (event: TouchEvent) => void;
    ontouchend?: (event: TouchEvent) => void;
    onsubmit?: () => void;
    onclear?: () => void;
    onend?: () => void;
    ondeselect?: (event: CustomEvent<LetterCard>) => void;
  }

  let {
    currentWord = $bindable([]),
    message = $bindable(undefined),
    dragtarget = $bindable(false),
    minLength = 2,
    ondrop,
    ondragover,
    ondragenter,
    ondragstart,
    ondragend,
    ontouchstart,
    ontouchend,
    onsubmit,
    onclear,
    onend,
    ondeselect,
  }: Props = $props();

  const emptyCard: LetterCard = {
    letter: Letter.Q,
    deckPosition: -10,
    selected: false,
    used: false,
  };

  const dispatch = createEventDispatcher();

  function deselect(letter: LetterCard) {
    dispatch("deselect", letter);
    ondeselect?.(new CustomEvent("deselect", { detail: letter }));
  }

  function submit() {
    dispatch("submit");
    onsubmit?.();
  }

  function clear() {
    dispatch("clear");
    onclear?.();
  }

  function end() {
    dispatch("end");
    onend?.();
  }
</script>

<div
  id="shelf"
  role="region"
  aria-label="Drop zone for word building"
  class={dragtarget ? "dragtarget" : ""}
  ondragover={(event) => {
    event.preventDefault();
    ondragover?.(event);
  }}
  {ondragstart}
  {ondragenter}
  {ondragend}
  {ontouchstart}
  {ontouchend}
  ondrop={(event) => {
    event.preventDefault();
    ondrop?.(event);
  }}
>
  {#each currentWord as c}
    <Card
      face={c}
      selected={true}
      ondblclick={(_) => deselect(c)}
      ontouchstart={(_) => deselect(c)}
    />
  {:else}
    <Card face={emptyCard} turned />
    <span class="shelf-text"
      >{#if message}{message}{:else}Double-click or drag cards here to make
        words.{/if}</span
    >
    <button class="shelf-text end" onclick={end}>End Game</button>
  {/each}
  {#if currentWord.length >= minLength}
    <button class="shelf-text submit" onclick={submit}>Submit</button>
    <button class="shelf-text clear" onclick={clear}>Clear</button>
  {:else if currentWord.length > 0}
    <span class="shelf-text">Drag {minLength} or more cards to make a word</span
    >
  {/if}
</div>

<style>
  #shelf {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: linear-gradient(#c1bebe, #545656);
    border-bottom: 5px solid rgb(15, 15, 15);
    position: relative;
  }
  #shelf :global(button.card),
  #shelf :global(div.card) {
    z-index: 1;
  }
  #shelf.dragtarget {
    border: 5px solid rgb(15, 15, 15);
  }
  #shelf .shelf-text {
    font-size: 1.2em;
    color: #fff;
    text-align: center;
    margin: 0;
    margin-left: auto;
    margin-right: 1rem;
    max-width: 80%;
  }

  #shelf button.shelf-text {
    background: rgb(21, 59, 33);
    margin-right: 2rem;
    margin-left: 0;
  }

  #shelf button.shelf-text.submit {
    margin-left: auto;
  }
</style>
