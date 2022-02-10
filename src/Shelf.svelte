<script lang="ts">
  import Card from "./Card.svelte";
  import { Letter } from "./deck";
  export let currentWord : Letter[];
</script>

<div id="shelf">
  {#each currentWord as c}
  <Card face={c} />
  {:else}
  <Card face={Letter.Q} turned /> <span class="shelf-help">Drag cards here to make words</span>
  {/each}
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
  #shelf .shelf-help {
    font-size: 1.5em;
    color: #fff;
    text-align: center;
    margin: 3em;
  }
</style>