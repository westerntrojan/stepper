import { basicTypes, contactsTypes, avatarTypes, commonTypes } from './types';

type State = {
	basic: {
		firstName: string;
		lastName: string;
		password: string;
		repeatPassword: string;
		gender: string;
	};
	contacts: {
		email: string;
		mobile: string;
		country: string;
		city: string;
	};
	avatar: string;
};

type Action = basicTypes.Action | contactsTypes.Action | avatarTypes.Action | commonTypes.Action;

export const initialState: State = {
	basic: {
		firstName: '',
		lastName: '',
		password: '',
		repeatPassword: '',
		gender: 'female',
	},
	contacts: {
		email: '',
		mobile: '',
		country: '',
		city: '',
	},
	avatar: '',
};

export default (state: State, action: Action): State => {
	switch (action.type) {
		case basicTypes.CHANGE_FIRST_NAME:
			return {
				...state,
				basic: {
					...state.basic,
					firstName: action.payload.value,
				},
			};
		case basicTypes.CHANGE_LAST_NAME:
			return {
				...state,
				basic: {
					...state.basic,
					lastName: action.payload.value,
				},
			};
		case basicTypes.CHANGE_PASSWORD:
			return {
				...state,
				basic: {
					...state.basic,
					password: action.payload.value,
				},
			};
		case basicTypes.CHANGE_REPEAT_PASSWORD:
			return {
				...state,
				basic: {
					...state.basic,
					repeatPassword: action.payload.value,
				},
			};
		case basicTypes.CHANGE_GENDER:
			return {
				...state,
				basic: {
					...state.basic,
					gender: action.payload.value,
				},
			};

		case contactsTypes.CHANGE_EMAIL:
			return {
				...state,
				contacts: {
					...state.contacts,
					email: action.payload.value,
				},
			};
		case contactsTypes.CHANGE_MOBILE:
			return {
				...state,
				contacts: {
					...state.contacts,
					mobile: action.payload.value,
				},
			};
		case contactsTypes.CHANGE_COUNTRY:
			return {
				...state,
				contacts: {
					...state.contacts,
					country: action.payload.value,
				},
			};
		case contactsTypes.CHANGE_CITY:
			return {
				...state,
				contacts: {
					...state.contacts,
					city: action.payload.value,
				},
			};

		case avatarTypes.CHANGE_AVATAR:
			return {
				...state,
				avatar: action.payload.value,
			};

		case commonTypes.RESET:
			return initialState;
		case commonTypes.SKIP_AVATAR:
			return {
				...state,
				avatar: '',
			};

		default:
			return state;
	}
};
