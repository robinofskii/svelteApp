<script lang="ts">
	import setInputType from '../actions/setInputType';
	import { type User } from '../../models/User';
	import { buildForm } from '../../helpers/formBuilder';
	import {
		validateAge,
		validateEmail,
		validatePassword,
		validateUsername,
	} from '../../helpers/validators';

	import Button from '../Button.svelte';

	let formState = buildForm<User>({
		username: {
			label: 'Username',
			placeholder: 'Enter your username',
			type: 'text',
			validators: [validateUsername],
		},
		age: {
			label: 'Age',
			placeholder: 'Enter your age',
			type: 'number',
			validators: [validateAge],
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
		formState.isValid = Object.values(formState.data).every((input) => input.isValid);
	}

	const handleSubmit = () => {
		formState.isSubmitting = true;

		setTimeout(() => {
			formState.isSubmitting = false;
			console.table(formState.data);
		}, 1000);
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
					value.isValid = value.validators.some((validator) => validator(value.value).isValid);
					value.errorMessage = value.validators[0](value.value).errorMessage || null;
				}}
			/>
			{#if value.isTouched}
				{#if !value.isValid}
					<p class="error">{value.validators[0](value.value).errorMessage}</p>
				{/if}
			{/if}
		</div>
	{/each}
	<Button type="submit" label="Submit" disabled={!formState.isValid}>Submit</Button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

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

				&:focus {
					outline: none;
					box-shadow: inset 0px 0px 0px 2px var(--primary-color);
				}
			}

			.error {
				font-size: 0.75rem;
				margin-top: 0.5rem;
				color: var(--danger-color);
			}
		}
	}
</style>
