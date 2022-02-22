<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Card from "./Card.svelte";
  import { Letter, LetterCard } from "./deck";
  export let currentWord: LetterCard[];
  export let message: string = undefined;
  export let dragtarget: boolean = false;
  export const minLength = 2;
  const emptyCard: LetterCard = {
    letter: Letter.Q,
    deckPosition: -10,
    selected: false,
    used: false
  };

  const dispatch = createEventDispatcher();

  export function deselect(letter: LetterCard) {
    dispatch("deselect", letter);
  }

  export function submit() {
    dispatch("submit");
  }

  export function clear() {
    dispatch("clear");
  }

  export function end() {
    dispatch("end");
  }
</script>

<div
  id="shelf"
  ondragover="return false"
  class={dragtarget ? "dragtarget" : ""}
  on:dragover
  on:dragstart
  on:dragenter
  on:dragend
  on:touchstart
  on:touchend
  on:drop
>
  {#each currentWord as c}
    <Card
      face={c}
      on:dblclick={_ => deselect(c)}
      on:touchstart={_ => deselect(c)}
    />
  {:else}
    <Card face={emptyCard} turned />
    <span class="shelf-text"
      >{#if message}{message}{:else}Double-click or drag cards here to make
        words.{/if}</span
    >
  {/each}
  {#if currentWord.length >= minLength}
    <button class="shelf-text submit" on:click={submit}>Submit</button>
    <button class="shelf-text clear" on:click={clear}>Clear</button>
  {:else if currentWord.length > 0}
    <span class="shelf-text">Drag {minLength} or more cards to make a word</span
    >
  {/if}
  <button class="shelf-text end" on:click={end}>End Game</button>
</div>

<style>
  #shelf {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: linear-gradient(#c1bebe, #545656);
    border-bottom: 5px solid rgb(15, 15, 15);
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
