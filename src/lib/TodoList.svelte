<svelte:options immutable={true} />

<script lang="ts">
	import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import Button from './Button.svelte';

	export let todos: { text: string; id: string; done: boolean }[] = [];
	export const focusInput = () => {
		input.focus();
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
	let prevTodos: { text: string; id: string; done: boolean }[] = todos;

	$: {
		// We need to check if there are more todos than before, if so, we need to scroll to the bottom
		// This needs to be done in a reactive statement, because we need to check before we set prevTodos
		// equal to the newTodos
		if (todos.length >= prevTodos.length) autoScroll = true;
		prevTodos = todos;
	}

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

		const isNotCancelled = dispatch(
			'addTodo',
			{
				text: inputValue,
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
		<div class="add-todo-input">
			<input type="text" placeholder="Add a todo" bind:this={input} bind:value={inputValue} />
			<Button size="small" type="submit">Add</Button>
		</div>
	</form>
	<div class="todo-list" bind:this={todoListDiv}>
		<ul>
			{#if todos.length === 0}
				<li class="todo">
					<p>No todos yet</p>
				</li>{/if}
			{#each todos as { id, text, done }, index (id)}
				<li class="todo">
					<div class="todo-header">
						<input type="checkbox" checked={done} on:change={() => handleDone(id)} />
						<p class:done>{text}</p>
					</div>

					{#if done}
						<button
							class="deleteButton"
							on:click={() => handleDelete(id)}
							on:keydown={() => handleDelete(id)}
						>
							<MdDelete />
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
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

				border-radius: $border-radius;
				border: none;
				outline: 1px solid $gray-medium;
				outline-offset: 0;
				input {
					-webkit-appearance: none;
					appearance: none;
					border: none;
					padding: 1rem;
					outline: none;
				}
				&:focus-within {
					outline: 1px solid $primary-color;
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

				p {
					&.done {
						text-decoration: line-through;
					}
				}

				.todo-header {
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
