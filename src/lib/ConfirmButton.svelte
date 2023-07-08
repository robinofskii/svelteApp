<script lang="ts">
	export let timeOut: number = 1500;
	export let onConfirm: () => void = () => {
		alert('Confirmed!');
	};
	export let btnText: string = 'Logout';
	export let clickText: string = 'Are you sure?';

	let clicked: boolean = false;

	$: if (clicked) {
		setTimeout(() => {
			clicked = false;
		}, timeOut);
	}

	const handleConfirm = () => {
		if (clicked) {
			onConfirm();
			return;
		}
		clicked = true;
	};
</script>

<span on:click={handleConfirm} on:keydown={handleConfirm} class:clicked>
	{#if clicked}
		<p>{clickText}</p>
	{:else}
		<p>{btnText}</p>
	{/if}
</span>

<style lang="scss">
	span {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		cursor: pointer;
		padding: var(--padding);
		border-radius: var(--border-radius);
		border: none;
		background-color: var(--gray-light);

		outline: solid 2px var(--primary-color);

		p {
			color: var(--text-color);
			font-weight: bold;
			font-size: 1rem;
			text-align: center;
		}

		&.clicked {
			background-color: var(--primary-color);
			color: var(--gray-light);
		}
	}
</style>
