import type { InputType } from '../../models/HtmlElement';

export default function setInputType(node: HTMLInputElement, type: InputType) {
	node.type = type;
}
