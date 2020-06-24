import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Context from '../context';

const useStyles = makeStyles({
	avatar: {
		width: 200,
		height: 200,
		marginBottom: 20,
	},
	info: {
		marginBottom: 20,
	},
	contacts: {},
});

const Finish: React.FC = () => {
	const classes = useStyles();

	const { state } = useContext(Context);

	return (
		<div className='finish'>
			<div className={classes.info}>
				<Avatar variant='square' className={classes.avatar} src={state.avatar} />

				<Typography variant='h5'>
					{state.basic.firstName} {state.basic.lastName}
				</Typography>
			</div>

			<div className={classes.contacts}>
				<Typography variant='h6'>
					Email: <Typography style={{ display: 'inline' }}>{state.contacts.email}</Typography>
				</Typography>
				<Typography variant='h6'>
					Mobile: <Typography style={{ display: 'inline' }}>{state.contacts.mobile}</Typography>
				</Typography>
				<Typography variant='h6'>
					Location:{' '}
					<Typography style={{ display: 'inline' }}>
						{state.contacts.country}, {state.contacts.city}
					</Typography>
				</Typography>
			</div>
		</div>
	);
};

export default Finish;
