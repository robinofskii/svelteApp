<script>
	import longpress from './actions/longpress';

	export let size = 'medium';
	export let hasShadow = false;
	export let onLongpress = () => {
		return;
	};
	export let longpressDuration = 500;

	const sizes = {
		small: 'size-sm',
		medium: 'size-md',
		large: 'size-lg',
	};
</script>

<button
	use:longpress={{ duration: longpressDuration }}
	on:longpress={onLongpress}
	class={sizes[size]}
	class:shadow={hasShadow}
	{...$$restProps}
>
	{#if $$slots.leftContent}
		<div class="left-content">
			<slot name="leftContent" />
		</div>
	{/if}
	<slot>Some text</slot>
</button>

<style lang="scss">
	button {
		background-color: var(--primary-color);
		color: var(--text-color);
		font-weight: bold;
		padding: var(--padding) var(--padding-large);
		border-radius: var(--border-radius);
		border: none;
		cursor: pointer;

		display: flex;
		justify-content: center;
		align-items: center;

		&:disabled {
			cursor: not-allowed;
			background-color: var(--gray-medium);

			&:active {
				color: inherit;
			}
		}

		.left-content {
			max-width: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		&.size-sm {
			padding: var(--padding) calc(var(--padding) * 1.5);
			font-size: 0.8rem;
			gap: 0.5rem;

			.left-content {
				max-width: 1rem;
			}
		}
		&.size-md {
			padding: var(--padding) var(--padding-large);
			font-size: 1rem;
			gap: 1rem;

			.left-content {
				max-width: 2rem;
			}
		}
		&.size-lg {
			padding: var(--padding-large) calc(var(--padding-large) * 2);
			font-size: 1.2rem;
			gap: 1.5rem;

			.left-content {
				max-width: 3rem;
			}
		}
		&.shadow {
			box-shadow: var(--box-shadow);
		}
		&:active {
			color: var(--gray-light);
			transition: background-color 0.3s var(--transition-cubic);
			background-color: var(--primary-color);

			&.shadow {
				box-shadow: var(--box-shadow-inset);
			}
		}
	}
</style>
