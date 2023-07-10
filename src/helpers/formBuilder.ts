import type { Validator } from './validators';
import type { InputType } from '../models/HtmlElement';

/**
 * Defines types and classes for building and validating forms.
 */
type FormConfig<T> = {
	[K in keyof T]: {
		label: string;
		placeholder: string;
		type: string;
		validators?: Array<Function>;
	};
};

/**
 * Defines the structure of a form field value.
 */
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

/**
 * Defines the structure of a form builder object.
 */
type FormBuilder<T> = {
	[K in keyof T]: FormValue<T[K]>;
};

/**
 * Defines a Form class that handles building, validating, and submitting form data.
 * @template T - The type of the form data.
 */
export class Form<T> {
	data: FormBuilder<T>;
	isSubmitting: boolean;
	isValid: boolean;

	constructor(config: FormConfig<T>) {
		this.data = this.formatDataFromConfig(config);
		this.isSubmitting = false;
		this.isValid = false;
	}

	/**
	 * Formats the form data from the given configuration object.
	 * @param config - The configuration object containing the form data.
	 * @returns The formatted form data.
	 */
	private formatDataFromConfig<T>(config: FormConfig<T>) {
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

		return form;
	}

	/**
	 * Resets the form by setting all form values to their initial state.
	 */
	resetForm = () => {
		Object.keys(this.data).forEach((key) => {
			this.data[key].value = '' as T[keyof T];
			this.data[key].isValid = false;
			this.data[key].errorMessage = null;
			this.data[key].isTouched = false;
		});
		this.isValid = false;
		this.isSubmitting = false;
	};

	/**
	 * Returns the form data as an object with keys corresponding to the form field names and values corresponding to the form field values.
	 * @returns An object containing the form data.
	 */
	getFormData = () => {
		const data: FormBuilder<T> = {
			...this.data,
		};

		if (!data) throw new Error('Form data is not defined.');

		Object.keys(this.data).forEach((key) => {
			data[key] = this.data[key].value;
		});
		return data;
	};

	/**
	 * Sets the form data to the given data object.
	 * @param data - The data object to set the form data to.
	 */
	setFormData = (data: FormBuilder<T>) => {
		Object.keys(data).forEach((key) => {
			this.data[key].value = data[key];
		});
	};

	/**
	 * Returns the value of the form field with the given key.
	 * @param key - The key of the form field to get the value of.
	 * @returns The value of the form field.
	 */
	getInputValue = (key: keyof T) => {
		return this.data[key].value;
	};

	/**
	 * Sets the value of the form field with the given key to the given value.
	 * @param key - The key of the form field to set the value of.
	 * @param value - The value to set the form field to.
	 */
	setInputValue = (key: keyof T, value: T[keyof T]) => {
		this.data[key].value = value;
	};

	/**
	 * Runs validation on all form fields and sets the `isValid` property of each field accordingly.
	 * Also sets the `isValid` property of the form itself based on the validity of all fields.
	 */
	runValidation = () => {
		let isValid = true;

		Object.keys(this.data).forEach((key) => {
			const value = this.data[key].value;
			const validators = this.data[key].validators;
			let isValidInput = true;
			let errorMessageInput = null;

			if (validators) {
				validators.forEach((validator: Validator) => {
					const { isValid, errorMessage } = validator(value);
					isValidInput = isValid && isValidInput;
					errorMessageInput = errorMessage || errorMessageInput;
				});
			}

			this.data[key].isValid = isValidInput;
			this.data[key].errorMessage = errorMessageInput;
			isValid = isValidInput && isValid;
		});

		this.isValid = isValid;
	};

	/**
	 * Handles form submission by sending a POST, PUT, or PATCH request to the specified endpoint with the form data.
	 * @param event - The event object.
	 * @param endpoint - The endpoint to send the request to.
	 * @param method - The HTTP method to use for the request.
	 * @returns The form data.
	 */
	handleSubmitToEndpoint = (event: Event, endpoint: string, method: 'POST' | 'PUT' | 'PATCH') => {
		event.preventDefault();
		this.isSubmitting = true;
		const data = this.getFormData();
		fetch(endpoint, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				this.data = res;
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				this.isSubmitting = false;
			});

		return this.getFormData();
	};

	/**
	 * Handles form submission by sending a POST, PUT, or PATCH request to the specified endpoint with the form data.
	 * @param event - The event object.
	 * @param endpoint - The endpoint to send the request to.
	 * @param method - The HTTP method to use for the request.
	 * @returns The form data.
	 * @dev This is a test method that simulates a request to an endpoint.
	 */
	handleSubmitTest = async (event: Event, endpoint: string, method: 'POST' | 'PUT' | 'PATCH') => {
		event.preventDefault();
		this.isSubmitting = true;
		const data = {
			data: this.getFormData(),
			endpoint,
			method,
		};

		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(data);
			}, 2000);
		})
			.then((res) => {
				console.table(res);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				this.isSubmitting = false;
			});

		return this.getFormData();
	};
}
