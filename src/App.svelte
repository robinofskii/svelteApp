<script lang="ts">
	import { v4 as uuid } from 'uuid';
	import MdThumbUp from 'svelte-icons/md/MdThumbUp.svelte';

	import Button from './lib/Button.svelte';
	import ConfirmButton from './lib/ConfirmButton.svelte';
	import Counter from './lib/Counter.svelte';
	import Divider from './lib/Divider.svelte';
	import TodoList from './lib/TodoList.svelte';

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
		timeOut: 5000,
		onConfirm: () => {
			alert('Impatient are we?');
		},
		btnText: 'Do you want to wait 5 seconds?',
		clickText: "Don't click me again!",
	};

	// Js of todo list
	let todos: {
		id: string;
		text: string;
		done: boolean;
	}[] = [
		{ id: uuid(), text: 'Learn Svelte', done: true },
		{ id: uuid(), text: 'Learn Sapper', done: false },
		{ id: uuid(), text: 'Learn SvelteKit', done: false },
	];

	const handleAddTodo = (e: CustomEvent) => {
		const newTodo = {
			...e.detail,
			id: uuid(),
			done: false,
		};
		todos = [...todos, newTodo];
	};

	const handleClearTodos = (e: CustomEvent) => {
		todos = [];
	};

	const handleDoneTodo = (e: CustomEvent) => {
		const { id } = e.detail;

		todos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					done: !todo.done,
				};
			}
			return todo;
		});
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
		on:addTodo={handleAddTodo}
		on:clearTodos={handleClearTodos}
		on:doneTodo={handleDoneTodo}
	/>
	<p>
		{todos.length} todos ({todos.filter((todo) => todo.done).length} done)
	</p>
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

	h1 {
		color: $text-color;
	}
	img {
		border-radius: $border-radius;
	}
	p {
		color: $text-color;
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
