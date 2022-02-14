<script lang="ts">
  import Card from "./Card.svelte";
  import { Letter, LetterCard } from "./deck";
  export let currentWord : LetterCard[];
  export let message : string = undefined;
  const minLength = 2;
</script>

<div id="shelf">
  {#each currentWord as c}
  <Card face={c.letter} /> 
  {:else}
  <Card face={Letter.Q} turned /> <span class="shelf-text">{#if message}{message}{:else}Click or drag cards here to make words.{/if}</span>
  {/each}
  {#if currentWord.length >= minLength}
  <button class="shelf-text" on:click>Submit</button>
  {:else if currentWord.length > 0}
  <span class="shelf-text">Drag {minLength} or more cards to make a word</span>
  {/if}
</div>

<hr />

<style>
  #shelf {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: linear-gradient(#c1bebe, #545656);
    border-bottom: 5px solid rgb(15, 15, 15);
  }
  #shelf .shelf-text {
    font-size: 1.5em;
    color: #fff;
    text-align: center;
    margin: 4rem;
  }

  #shelf button.shelf-text {
    background: rgb(21, 59, 33);
    margin-right: 2rem;
    margin-left: auto;
  }
</style>