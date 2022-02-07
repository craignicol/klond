<script lang="ts">
import Card from "./Card.svelte";
import type { Letter } from "./deck";

	export let deck: Letter[];
</script>

<main>
	<h1>Klond</h1>
	<p>Drag cards to make words. More points for longer words, but you'll lose points for any cards you can't make into words.</p>
	<p>Visit the <a href="https://craignicol.github.io/klond/#howtoplay">Klond tutorial</a> to find out more.</p>

	{#each deck as c}
		<Card face={c} turned={Math.random() > 0.5} />
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>