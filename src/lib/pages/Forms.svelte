<script lang="ts">
	import setInputType from '../actions/setInputType';
	import { type User } from '../../models/User';
	import { Form } from '../../helpers/formBuilder';
	import {
		validateMinMaxNumber,
		validateEmail,
		validateMinMaxLength,
		validatePassword,
	} from '../../helpers/validators';

	import Button from '../Button.svelte';

	let formState = new Form<User>({
		username: {
			label: 'Username',
			placeholder: 'Enter your username',
			type: 'text',
			validators: [(v) => validateMinMaxLength(v, { min: 3 })],
		},
		age: {
			label: 'Age',
			placeholder: 'Enter your age',
			type: 'number',
			validators: [(v) => validateMinMaxNumber(v, { min: 18, max: 99 })],
		},
		email: {
			label: 'Email',
			placeholder: 'Enter your email',
			type: 'email',
			validators: [validateEmail],
		},
		password: {
			label: 'Password',
			placeholder: 'Create a strong password',
			type: 'password',
			validators: [validatePassword],
		},
	});

	$: {
		formState.runValidation();
	}

	const handleSubmit = (e: Event) => {
		formState.handleSubmitTest(e, 'api/user', 'POST');
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	{#each Object.entries(formState.data) as [input, value]}
		<div class="inputGroup">
			<label for={input}>{value.label}</label>
			<input
				id={input}
				placeholder={value.placeholder}
				use:setInputType={value.type}
				bind:value={value.value}
				on:blur={() => {
					value.isTouched = true;
				}}
			/>
			{#if value.isTouched}
				{#if !value.isValid}
					<p class="error">{value.errorMessage}</p>
				{/if}
			{/if}
		</div>
	{/each}
	<Button type="submit" label="Submit" disabled={!formState.isValid}>Submit</Button>
</form>

<style lang="scss">
	form {
		margin: 2rem auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 400px;

		.inputGroup {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			margin: 1rem;

			label {
				font-size: 1.5rem;
				margin-bottom: 0.5rem;
			}

			input {
				font-size: 1.25rem;
				padding: 0.5rem;
				border-radius: 0.5rem;
				border: 1px solid #ccc;
				width: 100%;

				&:focus {
					outline: none;
					box-shadow: inset 0px 0px 0px 2px var(--primary-color);
				}
			}

			.error {
				font-size: 0.75rem;
				margin-top: 0.5rem;
				color: var(--danger-color);
				word-break: break-all;
				white-space: normal;
			}
		}
	}
</style>
