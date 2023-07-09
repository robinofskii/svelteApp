<script lang="ts">
	let formValues = {
		firstName: '',
		lastName: '',
		userName: '',
		email: '',
		password: '',
	};
</script>

<form>
	<div class="inputGroup">
		<label for="firstName">First Name</label>
		<input type="text" id="firstName" bind:value={formValues.firstName} />
	</div>
	<div class="inputGroup">
		<label for="lastName">Last Name</label>
		<input type="text" id="lastName" bind:value={formValues.lastName} />
	</div>
	<div class="inputGroup">
		<label for="userName">User Name</label>
		<input type="text" id="userName" bind:value={formValues.userName} />
	</div>
	<div class="inputGroup">
		<label for="email">Email</label>
		<input type="email" id="email" bind:value={formValues.email} />
	</div>
	<div class="inputGroup">
		<label for="password">Password</label>
		<input type="password" id="password" bind:value={formValues.password} />
	</div>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.inputGroup {
			display: flex;
			flex-direction: row;
			justify-content: stretch;
			align-items: center;
			margin: 1rem;

			label {
				font-size: 1.5rem;
			}

			input {
				font-size: 1.5rem;
				padding: 0.5rem;
				border-radius: 0.5rem;
				border: 1px solid #ccc;
			}
		}
	}
</style>
