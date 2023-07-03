<script lang="ts">
	import { onMount } from 'svelte';
	import Home from './lib/pages/Home.svelte';
	import Settings from './lib/pages/Settings.svelte';
	import Head from './lib/Head.svelte';

	let selectedPage = Home;

	const onRouteChange = () => {
		const route = window.location.hash.slice(1);

		if (route === '/settings') {
			selectedPage = Settings;
		} else {
			selectedPage = Home;
		}
	};

	onMount(onRouteChange);
</script>

<Head />

<svelte:window on:hashchange={onRouteChange} />

<nav>
	<ul>
		<li>
			<a href="#/">Home</a>
		</li>
		<li>
			<a href="#/settings">Settings</a>
		</li>
	</ul>
</nav>
<div>
	<svelte:component this={selectedPage} />
</div>

<style lang="scss">
	@use 'src/styles/variables' as *;
	nav {
		background-color: $primary-color;
		padding: 1rem;
		border-bottom: solid 2px #fff;

		position: sticky;
		top: 0;
	}

	ul {
		display: flex;
		justify-content: center;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		margin: 0 0.5rem;
	}

	a {
		color: #fff;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
