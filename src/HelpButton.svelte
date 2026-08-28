<script lang="ts">
  import Help from "./Help.svelte";

  let open = $state(false);
  const showHelp = () => {
    open = true;
  };
  const closeHelp = () => {
    open = false;
  };
</script>

<button onclick={showHelp} id="open-help">❓</button>

{#if open}
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    onclick={closeHelp}
    onkeydown={event => event.key === "Escape" && closeHelp()}
    tabindex="0"
  >
    <div
      class="modal-content"
      role="presentation"
      onclick={event => event.stopPropagation()}
    >
      <Help title="How to Play" onClose={closeHelp} />
    </div>
  </div>
{/if}

<style>
  #open-help {
    position: fixed;
    top: 0;
    right: 0;
    font-size: 2rem;
    color: #ff3e00;
    cursor: help;
    z-index: 10;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }

  .modal-content {
    background: white;
    border-radius: 8px;
    max-width: 560px;
    width: min(90vw, 560px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
  }
</style>
