import { writable } from 'svelte/store';

const settings = writable({
	darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
	language: 'en',
	fontSize: 16,
});

export default settings;
