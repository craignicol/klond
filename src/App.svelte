<script lang="ts">
import { onMount } from "svelte";
import Card from "./Card.svelte";
import { Letter, Deal, Layout } from "./deck";
import Shelf from "./Shelf.svelte";
import {isWord, wordScore} from "./dictionary";

	export let deck: Letter[];
	export let selected: Letter[] = [];
	export let foundWords: String[] = [];
	export let score: number = 0;
	export let notFound: String = undefined;
	export let layout: Layout = { columns: [[]], discard: [] };

	function selectCard(card: Letter, index: number, component: Card) {
		selected = [...selected, card];
		component.$set({ selected: true });
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

	onMount(() => {
		layout = Deal(deck);
	});
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

	<div class="row">
		{#each layout.columns as column}
	<div class="column">
		{#each column as c, i}
			<Card face={c} turned={i < column.length - 1} stacked on:click={_ => selectCard(c, i, this)}/>
		{/each}
	</div>
	{/each}
	</div>

	<div class="discard">
		{#if layout.discard.length > 0}
		<Card face={Letter.Q} turned on:click={() => _}/>
			{:else}
			<Card />
			{/if}
		{#each layout.discard.slice(0,3) as c, i}
			<Card face={c} on:click={_ => selectCard(c, i, this)}/>
		{/each}
	</div>
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

	.column {
		margin: 0 auto;
	}

	.row {
		display: flex;
		flex-direction: row;
		margin: 0 auto;
		height: 20em;
		width: 25em;
		float: left;
	}

	.discard {
		float: right;
		width: auto;
		height: 20em;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	@media (max-width: 640px) {
		main {
			font-size: 0.8em;
		}
	}
</style>