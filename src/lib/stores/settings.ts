import { writable } from 'svelte/store';

const settings = writable({
	darkMode: true,
	language: 'en',
	fontSize: 16,
});

export default settings;
