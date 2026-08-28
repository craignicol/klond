import App from './App.svelte';
import { Shuffle } from './deck';
import { mount } from "svelte";

const app = mount(App, {
	target: document.body,
	props: {
		deck: Shuffle(0)
	}
});

export default app;