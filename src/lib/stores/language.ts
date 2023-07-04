import { derived } from 'svelte/store';

import { settingsStore } from './settings';

interface LanguageStoreType {
	language: 'en' | 'nl' | 'ar';
	textDirection: 'ltr' | 'rtl';
}

/**
 * A derived Svelte store that provides the current language and text direction based on the settings store.
 * @returns An object containing the Svelte store methods.
 */
export const languageStore = derived(
	settingsStore,
	($settings, set) => {
		const languageStoreValue: LanguageStoreType = {
			language: $settings.language,
			textDirection: $settings.language === 'ar' ? 'rtl' : 'ltr',
		};

		set(languageStoreValue);
	},
	{ language: 'en', textDirection: 'ltr' }
);
