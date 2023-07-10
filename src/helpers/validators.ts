import { EMAILREGEX, PASSWORDREGEX } from '../constants/REGEX';

type ValidatorOptions = {
	[key: string]: any;
};

export type Validator = (
	value: string | number,
	options?: ValidatorOptions
) => { isValid: boolean; errorMessage: string };

export const validateRequired: Validator = <T>(value: T) => {
	let isValid = true;
	let errorMessage = '';

	if (!value) {
		isValid = false;
		errorMessage = 'Value must not be empty';
	}

	return {
		isValid,
		errorMessage,
	};
};

export const validateMinMaxLength: Validator = (text: string, { min = 0, max = 0 }) => {
	let isValid = true;
	let errorMessage = '';

	if (min > 0 && text.length < min) {
		isValid = false;
		errorMessage = `Value must be at least ${min} characters long`;
	} else if (max > 0 && text.length > max) {
		isValid = false;
		errorMessage = `Value must be at most ${max} characters long`;
	}

	return {
		isValid,
		errorMessage,
	};
};

export const validateMinMaxNumber = (n: number, { min = 0, max = 0 }) => {
	let isValid = true;
	let errorMessage = '';

	if (min > 0 && n < min) {
		isValid = false;
		errorMessage = `Value must be at least ${min}`;
	} else if (max > 0 && n > max) {
		isValid = false;
		errorMessage = `Value must be at most ${max}`;
	}

	return {
		isValid,
		errorMessage,
	};
};

export const validateEmail: Validator = (email: string) => {
	let isValid = true;
	let errorMessage = '';

	if (!EMAILREGEX.test(email)) {
		isValid = false;
		errorMessage = 'Please enter a valid email address';
	}

	return {
		isValid,
		errorMessage,
	};
};

export const validatePassword: Validator = (password: string) => {
	let isValid = true;
	let errorMessage = '';

	if (!PASSWORDREGEX.test(password)) {
		isValid = false;
		errorMessage =
			'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number';
	}

	return {
		isValid,
		errorMessage,
	};
};
