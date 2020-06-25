import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { deepOrange } from '@material-ui/core/colors';
import { SnackbarProvider } from 'notistack';

import './style.scss';
import StepperForm from '../components/StepperForm';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: deepOrange[500],
		},
	},
});

const App: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<div id='root'>
					<main className='content'>
						<StepperForm />
					</main>
				</div>
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default App;
