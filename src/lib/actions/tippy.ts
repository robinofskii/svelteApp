import tippy, { type Props } from 'tippy.js';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';

export default function (node: Element, options: Partial<Props>) {
	const instance = tippy(node, options);

	return {
		update(options: Partial<Props>) {
			instance.setProps(options);
		},
		destroy() {
			instance.destroy();
		},
	};
}
