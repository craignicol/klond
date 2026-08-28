import App from './App.svelte';
import { Shuffle } from './deck';
import { mount } from "svelte";

if (typeof window !== 'undefined') {
	mount(App, {
		target: document.body,
		props: {
			deck: Shuffle(0)
		}
	});
}