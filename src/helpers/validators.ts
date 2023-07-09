export type Validator = (value) => { isValid: boolean; errorMessage: string };

export const validateUsername: Validator = (username: string) => {
	let isValid = true;
	let errorMessage = '';

	if (username.trim().length === 0) {
		isValid = false;
		errorMessage = 'Username must not be empty';
	}

	return {
		isValid,
		errorMessage,
	};
};

export const validateEmail: Validator = (email: string) => {
	let isValid = true;
	let errorMessage = '';

	if (email.trim().length === 0) {
		isValid = false;
		errorMessage = 'Email must not be empty';
	} else if (!email.includes('@')) {
		isValid = false;
		errorMessage = 'Email must be valid';
	}

	return {
		isValid,
		errorMessage,
	};
};

export const validatePassword: Validator = (password: string) => {
	let isValid = true;
	let errorMessage = '';

	if (password.trim().length === 0) {
		isValid = false;
		errorMessage = 'Password must not be empty';
	} else if (password.trim().length < 6) {
		isValid = false;
		errorMessage = 'Password must be at least 6 characters long';
	}

	return {
		isValid,
		errorMessage,
	};
};

export const validateAge: Validator = (age: number) => {
	let isValid = true;
	let errorMessage = '';

	if (age < 18) {
		isValid = false;
		errorMessage = 'You must be at least 18 years old';
	}

	return {
		isValid,
		errorMessage,
	};
};
