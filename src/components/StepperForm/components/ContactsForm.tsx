import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Context from '../context';
import { contactsTypes } from '../types';

const useStyles = makeStyles({
	input: {
		marginBottom: 20,
	},
});

const ContactsForm: React.FC = () => {
	const classes = useStyles();

	const {
		state: { contacts: state },
		dispatch,
	} = useContext(Context);

	const _handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch({
			type: contactsTypes.CHANGE_EMAIL,
			payload: {
				value: e.target.value,
			},
		});
	};

	const _handleChangeMobile = (e: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch({
			type: contactsTypes.CHANGE_MOBILE,
			payload: {
				value: e.target.value,
			},
		});
	};

	const _handleChangeCountry = (e: any): void => {
		dispatch({
			type: contactsTypes.CHANGE_COUNTRY,
			payload: {
				value: e.target.value,
			},
		});
	};

	const _handleChangeCity = (e: any): void => {
		dispatch({
			type: contactsTypes.CHANGE_CITY,
			payload: {
				value: e.target.value,
			},
		});
	};

	return (
		<div className='contacts-form'>
			<TextField
				label='Email'
				variant='outlined'
				className={classes.input}
				value={state.email}
				onChange={_handleChangeEmail}
				fullWidth
			/>
			<TextField
				label='Mobile'
				variant='outlined'
				className={classes.input}
				value={state.mobile}
				onChange={_handleChangeMobile}
				type='tel'
				fullWidth
			/>

			<FormControl variant='outlined' className={classes.input} fullWidth>
				<InputLabel>Country</InputLabel>

				<Select value={state.country} onChange={_handleChangeCountry} label='Country'>
					<MenuItem value={'USA'}>USA</MenuItem>
					<MenuItem value={'Canada'}>Canada</MenuItem>
					<MenuItem value={'Uzbekistan'}>Uzbekistan</MenuItem>
				</Select>
			</FormControl>

			<FormControl variant='outlined' fullWidth>
				<InputLabel>City</InputLabel>

				<Select value={state.city} onChange={_handleChangeCity} label='City'>
					<MenuItem value={'New York'}>New York</MenuItem>
					<MenuItem value={'Toronto'}>Toronto</MenuItem>
					<MenuItem value={'Tahskent'}>Tahskent</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

export default ContactsForm;
