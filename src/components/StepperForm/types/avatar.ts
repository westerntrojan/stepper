export const CHANGE_AVATAR = 'avatar/CHANGE_AVATAR';

type ChangeAvatar = {
	type: typeof CHANGE_AVATAR;
	payload: {
		value: string;
	};
};
export type Action = ChangeAvatar;
