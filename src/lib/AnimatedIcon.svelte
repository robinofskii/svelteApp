<script lang="ts">
	import { spring, tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { interpolateRgb } from 'd3-interpolate';

	import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';

	type AnimationType = 'tweened' | 'spring';

	export let style: AnimationType = 'tweened';

	const refreshAnimationTweened = tweened(
		{ rotation: 0, color: 'white' },
		{
			duration: 800,
			easing: cubicOut,
			interpolate: (a, b) => (t) => {
				const rotation = a.rotation + (b.rotation - a.rotation) * t;
				const color = interpolateRgb(a.color, b.color)(t);

				return {
					rotation,
					color,
				};
			},
		}
	);

	const refreshAnimationSpringed = spring(
		{ rotation: 0 },
		{
			stiffness: 0.1,
			damping: 0.8,
			precision: 0.1,
		}
	);

	const animateRefresh = async (type: AnimationType): Promise<void> => {
		if (type === 'spring') {
			await refreshAnimationSpringed.set({ rotation: 1 });
			refreshAnimationSpringed.set({ rotation: 0 });
			return;
		}
		await refreshAnimationTweened.set({ rotation: 1, color: 'gray' });
		refreshAnimationTweened.set({ rotation: 0, color: 'white' }, { duration: 0 });
	};
</script>

<div
	class="iconContainer"
	on:click={() => animateRefresh(style)}
	on:keypress={() => animateRefresh(style)}
	style="--rotation: {style === 'spring'
		? $refreshAnimationSpringed.rotation * 360
		: $refreshAnimationTweened.rotation * 360}deg; --color: {$refreshAnimationTweened.color}"
>
	<MdRefresh />
</div>

<style lang="scss">
	.iconContainer {
		max-width: 100px;
		max-height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;

		transform: rotate(var(--rotation));
		color: var(--color);
	}
</style>
