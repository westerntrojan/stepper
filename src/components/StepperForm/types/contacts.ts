export const CHANGE_EMAIL = 'contacts/CHANGE_EMAIL';
export const CHANGE_MOBILE = 'contacts/CHANGE_MOBILE';
export const CHANGE_COUNTRY = 'contacts/CHANGE_COUNTRY';
export const CHANGE_CITY = 'contacts/CHANGE_CITY';

type ChangeEmail = {
	type: typeof CHANGE_EMAIL;
	payload: {
		value: string;
	};
};
type ChangeMobile = {
	type: typeof CHANGE_MOBILE;
	payload: {
		value: string;
	};
};
type ChangeCountry = {
	type: typeof CHANGE_COUNTRY;
	payload: {
		value: string;
	};
};
type ChangeCity = {
	type: typeof CHANGE_CITY;
	payload: {
		value: string;
	};
};

export type Action = ChangeEmail | ChangeMobile | ChangeCountry | ChangeCity;
