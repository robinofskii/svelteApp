<script lang="ts">
	import { settingsStore } from '../stores/settings';

	$: {
		localStorage.setItem('settings', JSON.stringify($settingsStore));
	}
</script>

<div class="settingsContainer">
	<h1>Settings</h1>

	<div class="settingsForm">
		<div class="inputContainer">
			<label for="darkModeInput"> Dark mode </label>
			<input
				type="checkbox"
				id="darkModeInput"
				bind:checked={$settingsStore.darkMode}
				on:click={() => settingsStore.toggleDarkmode()}
			/>
		</div>
		<div class="inputContainer">
			<label for="fontSizeInput"> Font size </label>
			<input
				type="number"
				id="fontSizeInput"
				bind:value={$settingsStore.fontSize}
				on:blur={() => {
					$settingsStore.fontSize = Number($settingsStore.fontSize);
				}}
			/>
		</div>
		<div class="inputContainer">
			<label for="resetButton"> Reset Settings </label>
			<button
				id="resetButton"
				on:click={() => {
					settingsStore.reset();
				}}
			>
				Reset
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'src/styles/variables' as *;

	.settingsContainer {
		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			margin: 1rem;
		}

		.settingsForm {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;

			.inputContainer {
				display: flex;
				flex-direction: column;
				align-items: center;

				label {
					margin-bottom: 0.5rem;
				}

				input {
					margin-bottom: 1rem;
				}

				#fontSizeInput {
					width: 3rem;
				}
			}
		}
	}
</style>
