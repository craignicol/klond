<script lang="ts">
import { onMount } from "svelte";
import Card from "./Card.svelte";
import { Letter, LetterCard, Deal, Layout } from "./deck";
import Shelf from "./Shelf.svelte";
import {isWord, wordScore} from "./dictionary";

	export let deck: LetterCard[];
	let selected: LetterCard[] = [];
	export let foundWords: string[] = [];
	export let score: number = 0;
	let notFound: string = undefined;
	let notFoundMessage: string = undefined;
	let layout: Layout = { columns: [[]], discard: [] };
	let discardIndex: number = 0;

	function selectCard(card: LetterCard) { // Or unselect if selected
		if(deck[card.deckPosition].selected) {
			selected = selected.filter(c => c.deckPosition !== card.deckPosition);
			deck = deck.map((c, i) => i === card.deckPosition ? {...c, selected: false} : c);
		} else {
			notFoundMessage = undefined;
			selected = [...selected, {...card, selected: true}];
			deck = deck.map((c, i) => i === card.deckPosition ? {...c, selected: true} : c);
		}
	}

	function checkWord() {
		const word = selected.map(s => Letter[s.letter]).join('');
		if (isWord(word)) {
			const nextScore = wordScore(word);
			foundWords = [...foundWords, word + " : " + nextScore.toString()];
			score += nextScore;
			selected = [];
			notFound = undefined;
			deck = deck.map(c => c.selected ? ({...c, selected: false, used: true}): c);
			layout = {columns: layout.columns.map(col => col.filter(c => !deck[c.deckPosition].used)), discard: layout.discard.filter(d => !deck[d.deckPosition].used)};
		} else {
			deck = deck.map(c => c.selected ? ({...c, selected: false}): c);
			selected = [];
			notFound = word;
			notFoundMessage = notFound + " is not a word";
		}
	}

	function dealDiscard() {
		discardIndex += 3;
		if (discardIndex >= layout.discard.length) {
			discardIndex = 0;
		}
	}

	onMount(() => {
		layout = Deal(deck);
	});
</script>

<main>
	<h1>Klond</h1>
	<p class="instructions">Click or drag cards to make words. More points for longer words, but you'll lose points for any cards you can't make into words.</p>
	<p class="instructions">US and UK spellings allowed.</p>
	<p>Visit the <a href="https://craignicol.github.io/klond/#howtoplay">Klond tutorial</a> to find out more. <a href="https://github.com/dwyl/english-words">The word list is taken from Github</a></p>
	<p class="hidden">{#each selected as l}{Letter[l.letter]}{:else}~~No selected letters~~{/each}</p>

	<Shelf bind:currentWord={selected} bind:message={notFoundMessage} on:click={checkWord}/>

	<div class="row">
		{#each layout.columns as column}
	<div class="column">
		{#each column as c, i}
			<Card face={c.letter} turned={i < column.length - 1} stacked bind:selected={deck[c.deckPosition].selected} on:click={_ => selectCard(c)}/>
		{:else}
			<Card />
		{/each}
	</div>
	{/each}
	</div>

	<div class="discard">
		{#if layout.discard.length > discardIndex + 3}
		<Card face={Letter.Q} turned on:click={dealDiscard}/>
			{:else}
			<Card on:click={dealDiscard}/>
			{/if}
		{#each layout.discard.slice(discardIndex, discardIndex + 3) as c}
			<Card face={c.letter} bind:selected={deck[c.deckPosition].selected} on:click={_ => selectCard(c)}/>
		{/each}
		{#each Array(3 - layout.discard.slice(discardIndex, discardIndex + 3).length) as _}
			<Card />
		{/each}
	</div>

	<div id="results">
	{#if notFound}<p id="notfound">{notFound} is not a word.</p>{/if}
	<div id="found"><p id=score>Score: {score}</p><ul>
		{#each foundWords as w}
		<li>{w}</li>
		{/each}
	</ul></div>
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

	#results {
		float: right;
		margin-top: 21em;
		text-align: left;
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