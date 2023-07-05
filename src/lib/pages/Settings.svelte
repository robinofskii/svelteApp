<script lang="ts">
	import { settingsStore } from '../stores/settings';
	import { languageStore } from '../stores/language';
	import AnimatedIcon from '../AnimatedIcon.svelte';

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
			<label for="languageSelect"> Language </label>
			<select id="languageSelect" bind:value={$settingsStore.language}>
				<option value="en">English</option>
				<option value="nl">Dutch</option>
				<option value="ar">Arabic</option>
			</select>
			<p class="languageDisplay">
				Selected language: {$settingsStore.language} in {$languageStore.textDirection}
			</p>
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
	<AnimatedIcon />
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

				#resetButton {
					width: 5rem;
				}

				.languageDisplay {
					margin-top: 0.5rem;
				}
			}
		}
	}
</style>
