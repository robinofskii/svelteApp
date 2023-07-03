<script lang="ts">
	import settings from '../stores/settings';
</script>

<div class="settingsContainer">
	<h1>Settings</h1>

	<div class="settingsForm">
		<div class="inputContainer">
			<label for="darkModeInput"> Dark mode </label>
			<input
				type="checkbox"
				id="darkModeInput"
				bind:checked={$settings.darkMode}
				on:click={() => {
					$settings.darkMode = !$settings.darkMode;
				}}
			/>
		</div>
		<div class="inputContainer">
			<label for="fontSizeInput"> Font size </label>
			<input
				type="number"
				id="fontSizeInput"
				bind:value={$settings.fontSize}
				on:change={() => {
					$settings.fontSize = Number($settings.fontSize);
				}}
			/>
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
