<script lang="ts">
	import { onMount } from "svelte";
	import Card from "./Card.svelte";
	import { Letter, LetterCard, Deal, Layout } from "./deck";
	import Shelf from "./Shelf.svelte";
	import { isWord, wordScore } from "./dictionary";
	import { Modal } from "svelte-simple-modal";
	import Help from "./Help.svelte";
	import HelpButton from "./HelpButton.svelte";

	export let deck: LetterCard[];
	let selected: LetterCard[] = [];
	export let foundWords: string[] = [];
	export let score: number = 0;
	let notFound: string = undefined;
	let notFoundMessage: string = undefined;
	let dragMessage: string = undefined;
	let layout: Layout = { columns: [[]], discard: [] };
	let discardIndex: number = 0;
	const verbose = false;
	const genericCard: LetterCard = {
		letter: Letter.Q,
		deckPosition: -1,
		selected: false,
		used: false
	};

	let shelf: HTMLElement;
	let touchedCard: LetterCard;
	let sourceColumn: number;
	let activeEvent = "";
	let originalX = "";
	let originalY = "";

	function selectCard(card: LetterCard) {
		// Or unselect if selected
		if (card === undefined) {
			dragMessage = "card not found";
			return;
		}
		if (deck[card.deckPosition].selected) {
			selected = selected.filter(c => c.deckPosition !== card.deckPosition);
			deck = deck.map((c, i) =>
				i === card.deckPosition ? { ...c, selected: false } : c
			);
		} else {
			notFoundMessage = undefined;
			selected = [...selected, { ...card, selected: true }];
			deck = deck.map((c, i) =>
				i === card.deckPosition ? { ...c, selected: true } : c
			);
		}
	}

	function checkWord() {
		const word = selected.map(s => Letter[s.letter]).join("");
		if (isWord(word)) {
			const nextScore = wordScore(word);
			foundWords = [...foundWords, word + " : " + nextScore.toString()];
			score += nextScore;
			selected = [];
			notFound = undefined;
			deck = deck.map(c =>
				c.selected ? { ...c, selected: false, used: true } : c
			);
			layout = {
				columns: layout.columns.map(col =>
					col.filter(c => !deck[c.deckPosition].used)
				),
				discard: layout.discard.filter(d => !deck[d.deckPosition].used)
			};
		} else {
			deck = deck.map(c => (c.selected ? { ...c, selected: false } : c));
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
		shelf = document.getElementById("shelf");
	});

	const scrollIntoView = (node: HTMLElement) => {
		node.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "center"
		});
	};

	function startDrag(e: DragEvent, card: LetterCard, columnidx: number) {
		e.dataTransfer.setData("card", card.deckPosition.toString());
		e.dataTransfer.setData("source", columnidx.toString());
		e.dataTransfer.dropEffect = "move";
		dragMessage =
			"Dragging " +
			Letter[card.letter] +
			card.deckPosition.toString() +
			" from column " +
			columnidx.toString();
	}

	function dragDrop(e: DragEvent) {
		dragMessage = "Dropping...";
		// Only handling shelf for now
		if (e.target instanceof Element && e.target.id === "shelf") {
			dragMessage = "Dropping on the correct shelf";
			const card = deck[parseInt(e.dataTransfer.getData("card"))];
			const source = parseInt(e.dataTransfer.getData("source"));
			e.stopPropagation();
			selectCard(card);
			return false;
		}
		dragMessage =
			"Dropping on " +
			(e.target instanceof Element
				? e.target.nodeName + "#" + e.target.id
				: "nothing");
	}

	function dragOver(e: DragEvent) {
		dragMessage = "Dragging over...";
		return false;
	}

	function cardDragEnter(e: DragEvent) {
		dragMessage = "Dragging enter...";
		e.preventDefault();
		return true;
	}

	function handleTouchStart(
		e: TouchEvent,
		card: LetterCard,
		columnidx: number
	) {
		dragMessage =
			"Touch start with card " +
			card.deckPosition.toString() +
			"-" +
			Letter[card.letter] +
			" from column " +
			columnidx.toString();
		const sourceElement = e.target as HTMLElement;
		originalX = sourceElement.offsetLeft - 10 + "px";
		originalY = sourceElement.offsetTop - 10 + "px";
		activeEvent = "start";
		touchedCard = card;
		sourceColumn = columnidx;
	}

	function handleTouchMove(e: TouchEvent) {
		let touchLocation = e.targetTouches[0];
		let pageX = Math.floor(touchLocation.pageX - 50) + "px";
		let pageY = Math.floor(touchLocation.pageY - 50) + "px";
		dragMessage = "Touch x " + pageX + " Touch y " + pageY;
		const targetElement = e.target as HTMLElement;
		targetElement.style.position = "absolute";
		targetElement.style.left = pageX;
		targetElement.style.top = pageY;
		activeEvent = "move";
	}

	function handleTouchEnd(e: TouchEvent) {
		e.preventDefault();
		if (activeEvent === "move") {
			const targetElement = e.target as HTMLElement;
			let pageX = parseInt(targetElement.style.left) - 50;
			let pageY = parseInt(targetElement.style.top) - 50;

			if (
				detectTouchEnd(
					shelf.offsetLeft,
					shelf.offsetTop,
					pageX,
					pageY,
					shelf.offsetWidth,
					shelf.offsetHeight
				)
			) {
				selectCard(touchedCard);
				targetElement.style.position = "initial";
				dragMessage =
					"You dropped " + targetElement.getAttribute("id") + " into drop zone";
			} else {
				targetElement.style.left = originalX;
				targetElement.style.top = originalY;
				dragMessage =
					"You let card " + targetElement.getAttribute("id") + " go.";
			}

			touchedCard = undefined;
			sourceColumn = undefined;
		}
	}

	function detectTouchEnd(x1, y1, x2, y2, w, h) {
		//Very simple detection here
		if (Math.abs(x2 - x1) > w) return false;
		if (Math.abs(y2 - y1) > h) return false;
		return true;
	}
</script>

<Modal>
	<HelpButton />
</Modal>

<main>
	<h1>Klond</h1>
	<p class="hidden">
		{#each selected as l}{Letter[l.letter]}{:else}~~No selected letters~~{/each}
	</p>

	<Shelf
		bind:currentWord={selected}
		bind:message={notFoundMessage}
		on:click={checkWord}
		on:drop={dragDrop}
		on:dragover={dragOver}
		on:dragenter={cardDragEnter}
		on:deselect={event => selectCard(event.detail)}
	/>

	<hr />

	<div class="row">
		{#each layout.columns as column, columnIdx}
			<div class="column">
				{#each column as c, i}
					<Card
						face={c}
						turned={i < column.length - 1}
						stacked
						bind:selected={deck[c.deckPosition].selected}
						on:dblclick={_ => selectCard(c)}
						on:dragstart={e => startDrag(e, c, columnIdx)}
						on:touchstart={e => handleTouchStart(e, c, columnIdx)}
						on:touchmove={handleTouchMove}
						on:touchend={handleTouchEnd}
					/>
				{:else}
					<Card />
				{/each}
			</div>
		{/each}
	</div>

	<div class="discard">
		{#if layout.discard.length > discardIndex + 3}
			<Card face={genericCard} turned on:click={dealDiscard} />
		{:else}
			<Card
				emptyText={layout.discard.length > 3 ? "🔄" : "❌"}
				on:click={dealDiscard}
			/>
		{/if}
		{#each layout.discard.slice(discardIndex, discardIndex + 3) as c}
			<Card
				face={c}
				bind:selected={deck[c.deckPosition].selected}
				on:dblclick={_ => selectCard(c)}
				on:dragstart={e => startDrag(e, c, -1)}
				on:touchstart={e => handleTouchStart(e, c, -1)}
				on:touchmove={handleTouchMove}
				on:touchend={handleTouchEnd}
			/>
		{/each}
		{#each Array(3 - layout.discard.slice(discardIndex, discardIndex + 3).length) as _}
			<Card />
		{/each}
	</div>

	<div id="results">
		{#if dragMessage && verbose}{dragMessage}{/if}
		{#if notFound}<p id="notfound">{notFound} is not a word.</p>{/if}
		<div id="found">
			<p id="score" use:scrollIntoView>Score: {score}</p>
			<ul>
				{#each foundWords as w}
					<li>{w}</li>
				{/each}
			</ul>
		</div>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1rem;
		max-width: 95%;
		margin: 0 auto;
		font-size: 1vw;
		font-family: "OpenDyslexic3", "OpenDyslexic2", "Dyslexie", "Comic Sans MS",
			cursive, sans-serif;
		touch-action: none;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		margin: 0;
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
		height: 40vw;
		width: 50vw;
		max-width: 25rem;
		float: left;
	}

	.discard {
		float: right;
		width: auto;
		height: 12vw;
		max-height: 12rem;
		margin: 0 auto;
	}

	#results {
		float: right;
		margin-top: 2.2rem;
		text-align: left;
		background: #f3ac6577;
		border: 5px solid #ff3e00;
		padding: 2em;
		column-count: 2;
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
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
