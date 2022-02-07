import App from './App.svelte';
import { Shuffle } from './deck';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		deck: Shuffle(0)
	}
});

export default app;