const longpress = (node: any, options: { duration: number }) => {
	const { duration = 500 } = options;
	let timer: ReturnType<typeof setTimeout> | undefined;

	const handleMousedown = () => {
		timer = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, duration);
	};

	const handleMouseup = () => {
		clearTimeout(timer!);
	};

	node.addEventListener('mousedown', handleMousedown);
	node.addEventListener('mouseup', handleMouseup);

	return {
		destroy() {
			clearTimeout(timer);
			node.removeEventListener('mousedown', handleMousedown);
			node.removeEventListener('mouseup', handleMouseup);
		},
	};
};

export default longpress;
