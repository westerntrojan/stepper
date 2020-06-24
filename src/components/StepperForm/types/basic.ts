export const CHANGE_FIRST_NAME = 'basic/CHANGE_FIRST_NAME';
export const CHANGE_LAST_NAME = 'basic/CHANGE_LAST_NAME';
export const CHANGE_PASSWORD = 'basic/CHANGE_PASSWORD';
export const CHANGE_REPEAT_PASSWORD = 'basic/CHANGE_REPEAT_PASSWORD';
export const CHANGE_GENDER = 'basic/CHANGE_GENDER';

type ChangeFirstNameAction = {
	type: typeof CHANGE_FIRST_NAME;
	payload: {
		value: string;
	};
};
type ChangeLastNameAction = {
	type: typeof CHANGE_LAST_NAME;
	payload: {
		value: string;
	};
};
type ChangePasswordAction = {
	type: typeof CHANGE_PASSWORD;
	payload: {
		value: string;
	};
};
type ChangeRepeatPasswordAction = {
	type: typeof CHANGE_REPEAT_PASSWORD;
	payload: {
		value: string;
	};
};
type ChangeGenderAction = {
	type: typeof CHANGE_GENDER;
	payload: {
		value: string;
	};
};

export type Action =
	| ChangeFirstNameAction
	| ChangeLastNameAction
	| ChangePasswordAction
	| ChangeRepeatPasswordAction
	| ChangeGenderAction;
