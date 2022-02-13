<script lang="ts">
import Card from "./Card.svelte";
import { Letter } from "./deck";
import Shelf from "./Shelf.svelte";
import {isWord, wordScore} from "./dictionary";

	export let deck: Letter[];
	export let selected: Letter[] = [];
	export let foundWords: String[] = [];
	export let score: number = 0;
	export let notFound: String = undefined;

	function selectCard(card: Letter, index: number) {
		selected = [...selected, card];
		deck = deck.filter((_, i) => i !== index);
	}

	function checkWord() {
		const word = selected.map(s => Letter[s]).join('');
		if (isWord(word)) {
			const nextScore = wordScore(word);
			foundWords = [...foundWords, word + " : " + nextScore.toString()];
			score += nextScore;
			selected = [];
			notFound = undefined;
		} else {
			deck = [...deck, ...selected];
			selected = [];
			notFound = word;
		}
	}
</script>

<main>
	<h1>Klond</h1>
	<p class="instructions">Drag cards to make words. More points for longer words, but you'll lose points for any cards you can't make into words.</p>
	<p class="instructions">Words must be at least 3 letters. US and UK spellings allowed.</p>
	<p>Visit the <a href="https://craignicol.github.io/klond/#howtoplay">Klond tutorial</a> to find out more. <a href="https://github.com/dwyl/english-words">The word list is taken from Github</a></p>
	<p class="hidden">{#each selected as l}{Letter[l]}{:else}~~No selected letters~~{/each}</p>
	{#if notFound}<p id="notfound">{notFound} is not a word.</p>{/if}
	<div id="found"><p id=score>Score: {score}</p><ul>
		{#each foundWords as w}
		<li>{w}</li>
		{/each}
	</ul></div>

	<Shelf bind:currentWord={selected} on:click={checkWord}/>

	{#each deck as c, i}
		<Card face={c} turned={Math.random() > 0.5} on:click={_ => selectCard(c, i)}/>
	{/each}
	<Card />
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

	p.hidden {
		display: none;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>