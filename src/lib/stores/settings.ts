import { writable } from 'svelte/store';

interface SettingsStoreType {
	darkMode: boolean;
	language: 'en' | 'nl' | 'ar';
	fontSize: number;
}

const defaultSettings: SettingsStoreType = {
	darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
	language: 'en',
	fontSize: 16,
};

/**
 * Fetches the settings from local storage or returns the default settings if none are found.
 * @returns {SettingsStoreType} The settings object.
 */
const fetchSettings = (): SettingsStoreType => {
	const settings = localStorage.getItem('settings');
	if (settings) {
		return JSON.parse(settings);
	}
	return { ...defaultSettings };
};

/**
 * Creates a Svelte store for the settings.
 * @returns An object containing the Svelte store methods.
 */
const createSettingsStore = () => {
	const { subscribe, set, update } = writable(fetchSettings());

	const reset = () => {
		set({ ...defaultSettings });
	};

	const toggleDarkmode = () =>
		update((settings) => ({ ...settings, darkMode: !settings.darkMode }));

	return {
		subscribe,
		set,
		update,
		reset,
		toggleDarkmode,
	};
};

export const settingsStore = createSettingsStore();
