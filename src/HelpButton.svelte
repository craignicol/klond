<script lang="ts">
  import { getContext, getAllContexts } from "svelte";
  import Help from "./Help.svelte";
  const x = getAllContexts();
  const { open } = getContext("simple-modal");
  const showHelp = () =>
    open(
      Help,
      {
        title: "Help",
        content: "This is a help message"
      },
      { closeButton: false }
    );
</script>

<button on:click={showHelp} id="open-help">❓</button>

<style>
  #open-help {
    position: fixed;
    top: 0;
    right: 0;
    font-size: 2rem;
    color: #ff3e00;
    cursor: help;
  }
</style>
