<script lang="ts">
	import tippy from './actions/tippy';

	export let initialCount: number = 0;
	export let maxCount: number | null = null;

	let count: number = initialCount;
	$: countState = `You have clicked ${count} times`;

	const isMaxCountReached = (): boolean => {
		return maxCount !== null && count >= maxCount;
	};

	const handleClick = (): void => {
		if (isMaxCountReached()) {
			count = 0;
		}
		count += 1;
	};

	const resetCount = (): void => {
		count = 0;
	};
</script>

<button
	on:mousedown={handleClick}
	on:keypress={handleClick}
	use:tippy={{ content: `Button will count to: ${maxCount}`, theme: 'light', hideOnClick: false }}
	>Clicks: {count}</button
>
<p>{countState} <span on:click={resetCount} on:keypress={resetCount}>(resetCount)</span></p>

<style lang="scss">
	button {
		background-color: var(--gray-dark);
		color: var(--gray-light);
		padding: 10px 20px;
		border-radius: var(--border-radius);
		border: none;
		cursor: pointer;
		&:active {
			animation: ripple 0.5s ease-out;
		}
	}
	p {
		span {
			color: var(--primary-color);
			cursor: pointer;
		}
	}
	@keyframes ripple {
		0% {
			background-color: var(--gray-dark);
		}
		100% {
			background-color: var(--gray-darker);
		}
	}
</style>
