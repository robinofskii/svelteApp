<script lang="ts">
	import { onMount } from 'svelte';

	import Home from './lib/pages/Home.svelte';
	import Settings from './lib/pages/Settings.svelte';
	import Location from './lib/pages/Location.svelte';
	import Forms from './lib/pages/Forms.svelte';

	import Head from './lib/Head.svelte';

	type RouteType = {
		title: string;
		route: string;
		component?: any;
	};

	export const ROUTES: RouteType[] = [
		{ title: 'Home', route: '/', component: Home },
		{ title: 'Forms', route: '/forms', component: Forms },
		{ title: 'Location', route: '/location', component: Location },
		{ title: 'Settings', route: '/settings', component: Settings },
	];

	let selectedPage = Home;

	const onRouteChange = () => {
		const route = window.location.hash.slice(1);

		ROUTES.forEach((r) => {
			if (r.route === route) {
				selectedPage = r.component;
			}
		});
	};

	onMount(onRouteChange);
</script>

<Head />

<svelte:window on:hashchange={onRouteChange} />

<nav>
	<ul>
		{#each ROUTES as route}
			<li>
				<a href={`#${route.route}`}>{route.title}</a>
			</li>
		{/each}
	</ul>
</nav>
<div>
	<svelte:component this={selectedPage} />
</div>

<style lang="scss">
	nav {
		background-color: var(--primary-color);
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
