import { writable } from 'svelte/store';

const settings = writable(
	{
		darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
		language: 'en',
		fontSize: 16,
	},
	(set) => {
		const savedSettings = localStorage.getItem('settings');
		if (savedSettings) {
			set(JSON.parse(savedSettings));
		}
		return () => {};
	}
);

export default settings;
