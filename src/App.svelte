<script lang="ts">
	import { v4 as uuid } from 'uuid';
	import MdThumbUp from 'svelte-icons/md/MdThumbUp.svelte';
	import MdAccessTime from 'svelte-icons/md/MdAccessTime.svelte';

	import longpress from './lib/actions/longpress';
	import Button from './lib/Button.svelte';
	import ConfirmButton from './lib/ConfirmButton.svelte';
	import Counter from './lib/Counter.svelte';
	import Divider from './lib/Divider.svelte';
	import TodoList from './lib/TodoList.svelte';
	import type { Todo } from './models/Todo';
	import { onMount, tick } from 'svelte';

	// JS of image
	const imagedims = {
		width: 500,
		height: 250,
	};
	const imageUrl: string = `https://picsum.photos/${imagedims.width}/${imagedims.height}`;
	const name: string = 'World';

	// JS of text
	const htmlText: string = 'Here is some example text with some <em>HTML</em> tags';

	// JS of counter
	let maxCount: number = 1;

	// JS of button
	let btnSize: string = 'medium';

	// JS of confirm button
	const confirmButtonProps: {
		timeOut: number;
		onConfirm: () => void;
		btnText: string;
		clickText: string;
	} = {
		timeOut: 2000,
		onConfirm: () => {
			alert('Impatient are we?');
		},
		btnText: 'Do you want to wait 2 seconds?',
		clickText: "Don't click me again!",
	};

	// Js of todo list
	const API_URL: string = 'https://jsonplaceholder.typicode.com/todos';

	onMount(async () => {
		loadTodos();
	});

	let todoList = null;
	let todos: Todo[] = [];
	let completedTodos = null;
	let error = null;
	let isLoading = false;
	let isAdding = false;
	let disabledItems = [];

	$: {
		if (todos && todos.length > 0) {
			completedTodos = todos.filter((todo: Todo) => todo.completed).length;
		}
	}

	const loadTodos = async () => {
		isLoading = true;
		await fetch(`${API_URL}?_limit=10`).then(async (response) => {
			if (!response.ok) {
				error = 'Could not fetch the data for the todos';
			}
			todos = await response.json();
		});
		isLoading = false;
	};

	const handleAddTodo = async (e: CustomEvent) => {
		e.preventDefault();
		const newTodo = {
			...e.detail,
			id: uuid(),
			done: false,
		};
		isAdding = true;
		await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(newTodo),
		}).then(async (response) => {
			if (!response.ok) {
				error = 'Could not add the todo';
			}
			const todo = await response.json();
			todos = [...todos, { ...todo, id: uuid() }];
		});
		isAdding = false;

		await tick();

		todoList.clearInput();
		todoList.focusInput();
	};

	const handleDeleteTodo = async (e: CustomEvent) => {
		const { id } = e.detail as Todo;

		if (disabledItems.includes(id)) {
			return;
		}
		disabledItems = [...disabledItems, id];

		await fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
		}).then(async (response) => {
			if (!response.ok) {
				alert('Could not delete the todo');
			}

			todos = todos.filter((todo: Todo) => todo.id !== id);
		});
		disabledItems = disabledItems.filter((item) => item !== id);
	};

	const handleClearTodos = (e: CustomEvent) => {
		todos = [];
	};

	const handleDoneTodo = async (e: CustomEvent) => {
		const { id, completed } = e.detail;

		if (disabledItems.includes(id)) {
			return;
		}
		disabledItems = [...disabledItems, id];

		await fetch(`${API_URL}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ completed }),
		}).then(async (response) => {
			if (!response.ok) {
				alert('Could not update the todo');
			}
			const updatedTodo = await response.json();
			todos = todos.map((todo: Todo) => {
				if (todo.id === id) {
					return updatedTodo;
				}
				return todo;
			});
		});
		disabledItems = disabledItems.filter((item) => item !== id);
	};
</script>

<section>
	<img src={imageUrl} alt="an example placeholder" height="250" width="500" />
	<h1>Hello {name.toLocaleLowerCase()}</h1>
	<p>{@html htmlText}</p>
	<Divider />
	<div class="maxInput">
		<label for="maxCount">Max count:</label>
		<input type="number" id="maxCount" bind:value={maxCount} min="1" />
	</div>
	<div class="buttonRow">
		<Counter initialCount={5} {maxCount} />
	</div>
	<Divider />
	<div class="buttonRow">
		<Button size={btnSize} hasShadow>
			<span slot="leftContent">
				<MdThumbUp />
			</span>
			Other text
		</Button>
		<Button
			size={btnSize}
			hasShadow
			onLongpress={() => {
				alert('Longpress!');
			}}
			longpressDuration={1000}
		>
			<span slot="leftContent">
				<MdAccessTime />
			</span>
			Longpress me
		</Button>
	</div>
	<div class="buttonSizeSwitch">
		<label for="btnSize">Button size:</label>
		<select id="btnSize" bind:value={btnSize}>
			<option value="small">Small</option>
			<option value="medium">Medium</option>
			<option value="large">Large</option>
		</select>
	</div>
	<Divider />
	<div class="logoutSection">
		<ConfirmButton {...confirmButtonProps} />
	</div>
	<Divider />
	<TodoList
		{todos}
		{error}
		{isLoading}
		disableButton={isAdding}
		{disabledItems}
		on:addTodo={handleAddTodo}
		on:clearTodos={handleClearTodos}
		on:doneTodo={handleDoneTodo}
		on:deleteTodo={handleDeleteTodo}
		bind:this={todoList}
	/>
	{#if todos.length > 0}
		<p>
			{todos.length} todos {completedTodos} done
		</p>
	{/if}
</section>

<style lang="scss">
	@use 'src/styles/variables' as *;

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		padding: 2rem;
		border-radius: $border-radius;
	}
	img {
		border-radius: $border-radius;
	}
	.maxInput {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;

		input {
			padding: $padding;
			border-radius: $border-radius;
			border: none;
			background-color: $gray-light;
			color: $text-color;
			font-weight: bold;
			font-size: 1rem;
			width: 10rem;
			text-align: center;
			&:focus {
				outline: solid 2px $primary-color;
			}
		}
	}
	.buttonSizeSwitch {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		select {
			padding: $padding;
			border-radius: $border-radius;
			border: none;
			background-color: $gray-light;
			color: $text-color;
			font-weight: bold;
			font-size: 1rem;
			width: 10rem;
			text-align: center;
			&:focus {
				outline: solid 2px $primary-color;
			}
		}
	}
	.buttonRow {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 2rem;
	}

	.logoutSection {
		width: 10rem;
	}
</style>
