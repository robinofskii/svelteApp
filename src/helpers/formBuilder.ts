import type { Validator } from './validators';
import type { InputType } from '../models/HtmlElement';

type FormValue<T> = {
	label: string;
	placeholder?: string;
	value: T;
	type: InputType;
	validators: Array<Validator>;
	isValid: boolean;
	errorMessage?: string;
	isTouched: boolean;
};

type FormBuilder<T> = {
	[K in keyof T]: FormValue<T[K]>;
};

export const buildForm = <T>(config: {
	[K in keyof T]: {
		label: string;
		placeholder: string;
		type: string;
		validators?: Array<Function>;
	};
}) => {
	const form: FormBuilder<T> = {} as FormBuilder<T>;

	Object.keys(config).forEach((key) => {
		const { label, placeholder, type, validators } = config[key];
		form[key as keyof T] = {
			label,
			placeholder: placeholder || '',
			value: '' as T[keyof T],
			type,
			validators,
			isValid: false,
			errorMessage: null,
			isTouched: false,
		};
	});

	return {
		data: form,
		isSubmitting: false,
		isValid: false,
	};
};
