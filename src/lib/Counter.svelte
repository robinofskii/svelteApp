<script lang="ts">
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

<button on:mousedown={handleClick} on:keypress={handleClick}>Clicks: {count}</button>
<p>{countState} <span on:click={resetCount} on:keypress={resetCount}>(resetCount)</span></p>

<style lang="scss">
	@use 'src/styles/variables' as *;

	button {
		background-color: $gray-dark;
		color: $gray-light;
		padding: 10px 20px;
		border-radius: $border-radius;
		border: none;
		cursor: pointer;
		&:active {
			animation: ripple 0.5s ease-out;
		}
	}
	p {
		span {
			color: $primary-color;
			cursor: pointer;
		}
	}
	@keyframes ripple {
		0% {
			background-color: #3f3f3f;
		}
		100% {
			background-color: #2f2f2f;
		}
	}
</style>
