<svelte:options immutable={true} />

<script lang="ts">
	import { createEventDispatcher, afterUpdate } from 'svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import Button from './Button.svelte';
	import { type Todo } from '../models/Todo';

	export let todos: Todo[] = null;
	export let error: string = null;
	export let isLoading: boolean = false;
	export let disableButton: boolean = false;
	export let disabledItems: number[] = [];

	export const focusInput = () => {
		input.focus();
	};

	export const clearInput = () => {
		input.value = '';
	};

	afterUpdate(() => {
		if (!todoListDiv) return;
		if (autoScroll) todoListDiv.scrollTo(0, todoListDiv.scrollHeight);
		autoScroll = false;
	});

	const dispatch = createEventDispatcher();

	let inputValue: string = '';
	let autoScroll = false;
	let input: HTMLInputElement;
	let todoListDiv: HTMLDivElement;
	let prevTodos: Todo[] = todos;

	$: {
		// We need to check if there are more todos than before, if so, we need to scroll to the bottom
		// This needs to be done in a reactive statement, because we need to check before we set prevTodos
		// equal to the newTodos
		if (todos && prevTodos && todos.length > prevTodos.length) {
			autoScroll = true;
		}
		prevTodos = todos;
	}

	const handleDone = (id: number, currCompleted: boolean) => {
		dispatch('doneTodo', {
			id,
			completed: !currCompleted,
		});
	};

	const handleDelete = (id: number) => {
		dispatch('deleteTodo', {
			id,
		});
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();

		if (inputValue === '') return;

		const isNotCancelled = dispatch(
			'addTodo',
			{
				title: inputValue,
			},
			{ cancelable: true }
		);

		if (isNotCancelled) inputValue = '';
	};

	const handleClear = (e: Event) => {
		e.preventDefault();

		dispatch('clearTodos');
	};
</script>

<section class="todo-container">
	<h2>Todo List</h2>
	<form class="add-todo-form" on:submit={handleSubmit}>
		<div class="add-todo-input" class:disabled={disableButton}>
			<input
				type="text"
				placeholder="Add a todo"
				bind:this={input}
				bind:value={inputValue}
				disabled={disableButton || !todos}
			/>
			<Button size="small" type="submit" disabled={inputValue === '' || disableButton}>Add</Button>
		</div>
	</form>
	{#if isLoading}
		<p>Loading...</p>
	{:else if error}
		<p>{error}</p>
	{:else if todos}
		<div class="todo-list" bind:this={todoListDiv}>
			<ul>
				{#if todos.length === 0}
					<li class="todo">
						<p>No todos yet</p>
					</li>{/if}
				{#each todos as { id, title, completed }}
					<li class="todo">
						<div class="todo-header">
							<input
								type="checkbox"
								checked={completed}
								on:change={() => handleDone(id, completed)}
								disabled={disabledItems.includes(id)}
							/>
							<p class:completed>{title}</p>
						</div>

						{#if completed}
							<button
								class="deleteButton"
								on:click={() => handleDelete(id)}
								on:keydown={() => handleDelete(id)}
								disabled={disabledItems.includes(id)}
							>
								<MdDelete />
							</button>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	<span class="clearButton" on:click={handleClear} on:keydown={handleClear}>Clear todos</span>
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
		width: 500px;

		h2 {
			margin-bottom: 1rem;
		}

		.add-todo-form {
			display: flex;
			gap: 1rem;
			margin-bottom: 1rem;

			.add-todo-input {
				display: flex;
				flex: 1;
				justify-content: space-between;

				border-radius: $border-radius;
				border: none;
				outline: 1px solid $gray-medium;
				outline-offset: 0;

				&:focus-within {
					outline: 1px solid $primary-color;
				}
				&.disabled {
					outline: 1px solid $gray-dark;
					background-color: $gray-light;
				}

				input {
					-webkit-appearance: none;
					appearance: none;
					border: none;
					padding: 1rem;
					outline: none;
					flex-grow: 1;
				}
			}
		}
		.todo-list {
			max-height: 200px;
			overflow-y: auto;

			.todo {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 1rem;

				background-color: $gray-light;
				border-radius: $border-radius;
				padding: 0.5rem 1rem;
				margin: calc($margin / 2) 0;

				.todo-header {
					display: flex;
					gap: 1rem;
					justify-items: flex-end;
					align-items: center;

					input {
						width: 1.5rem;
						height: 1.5rem;
						accent-color: $primary-color;
						cursor: pointer;
						flex-shrink: 0;
						&:active {
							transform: scale(1.2);
						}
					}

					p {
						&.completed {
							text-decoration: line-through;
						}
					}
				}

				.deleteButton {
					max-width: 2rem;
					border: none;
					background-color: transparent;
					cursor: pointer;
					color: $danger-color;

					&:hover {
						color: $primary-color;
					}
					&:disabled {
						color: $gray-dark;
						cursor: not-allowed;
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

		@media (prefers-color-scheme: dark) {
			background-color: $gray-dark;

			h2 {
				color: $gray-light;
			}

			.add-todo-form {
				.add-todo-input {
					outline: 1px solid $gray-dark;
					background-color: #fff;
				}
			}

			.todo-list {
				.todo {
					background-color: $gray-dark;
					color: $gray-light;

					.todo-header {
						input {
							accent-color: $gray-light;
						}
					}

					.deleteButton {
						color: $danger-color;

						&:hover {
							color: $primary-color;
						}
					}
				}
			}
		}
	}
</style>
