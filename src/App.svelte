<script lang="ts">
import Card from "./Card.svelte";
import { Letter } from "./deck";
import Shelf from "./Shelf.svelte";

	export let deck: Letter[];
	export let selected: Letter[] = [Letter.Q, Letter.U, Letter.E, Letter.U, Letter.E, Letter.R];
</script>

<main>
	<h1>Klond</h1>
	<p class="instructions">Drag cards to make words. More points for longer words, but you'll lose points for any cards you can't make into words.</p>
	<p class="instructions">Words must be at least 3 letters. US and UK spellings allowed.</p>
	<p>Visit the <a href="https://craignicol.github.io/klond/#howtoplay">Klond tutorial</a> to find out more.</p>

	<Shelf currentWord={selected}/>

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
    font-family: "OpenDyslexic3", "OpenDyslexic2", "Dyslexie", "Comic Sans MS", cursive, sans-serif;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	p.instructions {
		font-size: 1.2em;
		margin-bottom: 1em;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>