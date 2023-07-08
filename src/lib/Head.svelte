<script>
	import { settingsStore } from './stores/settings';
</script>

<svelte:head>
	{#if $settingsStore.darkMode}
		<style lang="scss">
			@use '../styles/variables';

			:root {
				background-color: var(--gray-dark);
				color: var(--gray-light);
			}
		</style>
	{:else}
		<style lang="scss">
			@use '../styles/variables';

			:root {
				background-color: var(--gray-light);
				color: var(--gray-dark);
			}
		</style>
	{/if}
</svelte:head>
