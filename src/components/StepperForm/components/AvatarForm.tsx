import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Context from '../context';
import { avatarTypes } from '../types';

const useStyles = makeStyles({
	avatar: {
		width: '100%',
		height: '100%',
		marginBottom: 20,
	},
	avatarIcon: {
		width: '100%',
		height: '100%',
	},
});

const checkImage = (file: File): { success: boolean; message?: string } => {
	const types = ['image/jpg', 'image/jpeg', 'image/png'];

	if (!types.includes(file.type)) {
		return { success: false, message: 'Invalid file type (only: jpg, jpeg, png)' };
	}

	if (file.size > 5 * 1024 * 1024) {
		return { success: false, message: 'Invalid file size (max: 5MB)' };
	}

	return { success: true };
};

const AvatarForm: React.FC = () => {
	const classes = useStyles();

	const { state, dispatch } = useContext(Context);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const _handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files) {
			const file = e.target.files[0];

			const checkImageResult = checkImage(file);

			if (checkImageResult.success) {
				const reader = new FileReader();

				reader.onload = (data: any): void => {
					dispatch({
						type: avatarTypes.CHANGE_AVATAR,
						payload: {
							value: data.target.result,
						},
					});
				};

				reader.readAsDataURL(file);
			} else {
				console.log(checkImageResult.message);

				enqueueSnackbar(checkImageResult.message, {
					variant: 'error',
					action: key => (
						<IconButton onClick={() => closeSnackbar(key)}>
							<CloseIcon />
						</IconButton>
					),
				});
			}
		}
	};

	return (
		<div className='avatar-form'>
			<Avatar variant='square' className={classes.avatar} src={state.avatar} />

			<Button variant='contained' color='primary' component='label' fullWidth>
				<input type='file' style={{ display: 'none' }} onChange={_handleChangeImage} />
				Upload
			</Button>
		</div>
	);
};

export default AvatarForm;
