<script lang="ts">
	import FaRegCopy from 'svelte-icons/fa/FaRegCopy.svelte';

	import Button from '../Button.svelte';
	import location from '../stores/location';
</script>

<div class="locationContainer">
	<h1>Location</h1>

	{#if $location.error}
		<p class="locationError">{$location.error}</p>
	{:else if $location.loading}
		<p class="locationLoading">Loading...</p>
	{:else}
		<div class="locationCoordinates">
			<!-- Show the location information in a grid -->
			<div>
				<span>Latitude:</span>
				<span>{$location.data.latitude}</span>
			</div>
			<div>
				<span>Longitude:</span>
				<span>{$location.data.longitude}</span>
			</div>
			<a
				href="https://www.google.com/maps/search/?api=1&query={$location.data.latitude},{$location
					.data.longitude}"
				target="_blank"
			>
				Open in Google Maps
			</a>
			<Button
				type="button"
				size="small"
				on:click={() => {
					if (navigator.clipboard) {
						navigator.clipboard.writeText(
							`${$location.data.latitude}, ${$location.data.longitude}`
						);
					} else {
						console.error('Clipboard API not supported');
					}
				}}
			>
				<span slot="leftContent">
					<FaRegCopy />
				</span>
				Copy coordinates
			</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	@use 'src/styles/variables' as *;

	.locationContainer {
		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			margin: 1rem;
		}

		.locationError {
			color: $danger-color;
		}

		.locationLoading {
			color: $info-color;
		}

		.locationCoordinates {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;

			& > div {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 1rem;
			}

			a {
				margin-top: 1rem;
			}
		}
	}
</style>
