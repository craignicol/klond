<script lang="ts">
  import Card from "./Card.svelte";
  import { Letter } from "./deck";
  export let currentWord : Letter[];
</script>

<div id="shelf">
  {#each currentWord as c}
  <Card face={c} /> 
  {:else}
  <Card face={Letter.Q} turned /> <span class="shelf-text">Click or drag cards here to make words</span>
  {/each}
  {#if currentWord.length >= 3}
  <button class="shelf-text">Submit</button>
  {:else if currentWord.length > 0}
  <span class="shelf-text">Drag 3 cards to make a word</span>
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
    margin: 3em;
  }

  #shelf button.shelf-text {
    background: rgb(21, 59, 33);
    margin-right: 0.5em;
    margin-left: auto;
  }
</style>