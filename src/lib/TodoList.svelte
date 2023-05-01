<script>
	import { v4 as uuid } from 'uuid';
	import Button from './Button.svelte';

	export let todos = [];

	let inputValue = '';

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!inputValue) return;

		const newTodo = { id: uuid(), text: inputValue, done: false };
		todos = [...todos, newTodo];
		inputValue = '';
	};

	const clearTodos = () => {
		todos = [];
	};
</script>

<section class="todo-container">
	<h2>Todo List</h2>
	<form class="add-todo-form" on:submit={handleSubmit}>
		<input type="text" placeholder="Add a todo" bind:value={inputValue} />
		<Button size="small" type="submit">Add</Button>
	</form>
	<ul>
		{#each todos as { id, text, done }, index (id)}
			{@const number = index + 1}
			<li class="todo">
				{#if done}
					<s>{number}. {text}</s>
				{:else}
					<p>{number}. {text}</p>
				{/if}
				<input type="checkbox" bind:checked={done} />
			</li>
		{/each}
	</ul>
	<span class="clearButton" on:click={clearTodos} on:keydown={clearTodos}> Clear todos </span>
</section>

<style lang="scss">
	@use 'src/styles/variables' as *;

	.todo-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
		border-radius: $border-radius;
		background-color: #fff;
		box-shadow: $box-shadow;

		h2 {
			margin-bottom: 1rem;
		}
		.add-todo-form {
			display: flex;
			gap: 1rem;
			margin-bottom: 1rem;

			input {
				padding: 0.5rem;
				border-radius: 0.5rem;
				border: none;
				outline: 1px solid $gray-medium;
				outline-offset: 0;
				font-size: large;
				&:focus {
					outline: 2px solid $primary-color;
				}
			}
		}
		.todo {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;

			input {
				width: 1.5rem;
				height: 1.5rem;
				accent-color: $primary-color;
				&:active {
					transform: scale(1.2);
				}
			}
		}
		.clearButton {
			align-self: flex-end;
			cursor: pointer;
			color: $primary-color;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
