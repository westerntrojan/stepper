import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextFiled from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Cotnext from '../context';
import { basicTypes } from '../types';

const useStyles = makeStyles({
	input: {
		marginBottom: 20,
	},
});

const BasicForm: React.FC = () => {
	const classes = useStyles();

	const {
		state: { basic: state },
		dispatch,
	} = useContext(Cotnext);

	const _handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch({
			type: basicTypes.CHANGE_FIRST_NAME,
			payload: {
				value: e.target.value,
			},
		});
	};

	const _handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch({
			type: basicTypes.CHANGE_LAST_NAME,
			payload: {
				value: e.target.value,
			},
		});
	};

	const _handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch({
			type: basicTypes.CHANGE_PASSWORD,
			payload: {
				value: e.target.value,
			},
		});
	};

	const _handleChangeRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch({
			type: basicTypes.CHANGE_REPEAT_PASSWORD,
			payload: {
				value: e.target.value,
			},
		});
	};

	const _handleChangeGender = (e: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch({
			type: basicTypes.CHANGE_GENDER,
			payload: {
				value: e.target.value,
			},
		});
	};

	return (
		<div className='state-form'>
			<TextFiled
				label='First name'
				variant='outlined'
				className={classes.input}
				value={state.firstName}
				onChange={_handleChangeFirstName}
				fullWidth
			/>
			<TextFiled
				label='Last name'
				variant='outlined'
				className={classes.input}
				value={state.lastName}
				onChange={_handleChangeLastName}
				fullWidth
			/>
			<TextFiled
				label='Password'
				variant='outlined'
				type='password'
				className={classes.input}
				value={state.password}
				onChange={_handleChangePassword}
				fullWidth
			/>
			<TextFiled
				label='Repeat password'
				variant='outlined'
				type='password'
				className={classes.input}
				value={state.repeatPassword}
				onChange={_handleChangeRepeatPassword}
				fullWidth
			/>

			<FormControl component='fieldset'>
				<FormLabel component='legend'>Gender</FormLabel>

				<RadioGroup value={state.gender} onChange={_handleChangeGender}>
					<FormControlLabel value='female' control={<Radio color='primary' />} label='Female' />
					<FormControlLabel value='male' control={<Radio color='primary' />} label='Male' />
				</RadioGroup>
			</FormControl>
		</div>
	);
};

export default BasicForm;
