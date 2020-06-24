export const RESET = 'common/RESET';
export const SKIP_AVATAR = 'common/SKIP_AVATAR';

type Reset = {
	type: typeof RESET;
};
type SkipAvatar = {
	type: typeof SKIP_AVATAR;
};

export type Action = Reset | SkipAvatar;
