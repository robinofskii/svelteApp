<svelte:options immutable={true} />

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	export let todos: { text: string; id: string; done: boolean }[] = [];
	export const focusInput = () => {
		input.focus();
	};

	const dispatch = createEventDispatcher();

	let inputValue: string = '';
	let input: HTMLInputElement;

	const handleDone = (id: string) => {
		dispatch('doneTodo', {
			id,
		});
	};

	const handleDelete = (id: string) => {
		dispatch('deleteTodo', {
			id,
		});
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();

		if (!inputValue) return;

		dispatch('addTodo', {
			text: inputValue,
		});

		inputValue = '';
	};

	const handleClear = (e: Event) => {
		e.preventDefault();

		dispatch('clearTodos');
	};
</script>

<section class="todo-container">
	<h2>Todo List</h2>
	<form class="add-todo-form" on:submit={handleSubmit}>
		<input type="text" placeholder="Add a todo" bind:this={input} bind:value={inputValue} />
		<Button size="small" type="submit">Add</Button>
	</form>
	<ul>
		{#each todos as { id, text, done }, index (id)}
			<li class="todo">
				{#if done}
					<s>{text}</s>
				{:else}
					<p>{text}</p>
				{/if}
				<div class="todo-actions">
					<input type="checkbox" checked={done} on:change={() => handleDone(id)} />
					<button
						class="deleteButton"
						on:click={() => handleDelete(id)}
						on:keydown={() => handleDelete(id)}
					>
						Delete
					</button>
				</div>
			</li>
		{/each}
	</ul>
	<span class="clearButton" on:click={handleClear} on:keydown={handleClear}> Clear todos </span>
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

			.todo-actions {
				display: flex;
				gap: 1rem;
				justify-items: flex-end;
				align-items: center;

				input {
					width: 1.5rem;
					height: 1.5rem;
					accent-color: $primary-color;
					&:active {
						transform: scale(1.2);
					}
				}

				button {
					border: none;
					background-color: transparent;
					cursor: pointer;
					color: $primary-color;

					&:hover {
						text-decoration: underline;
					}
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
