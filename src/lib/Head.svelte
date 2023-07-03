<script>
	import settings from './stores/settings';
</script>

<svelte:head>
	{#if $settings.darkMode}
		<style lang="scss">
			@use '../styles/variables';

			:root {
				background-color: variables.$gray-dark;
				color: variables.$gray-light;
			}
		</style>
	{:else}
		<style lang="scss">
			@use '../styles/variables';

			:root {
				background-color: variables.$gray-light;
				color: variables.$gray-dark;
			}
		</style>
	{/if}
</svelte:head>
