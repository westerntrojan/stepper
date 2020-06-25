import React, { useState, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import BasicForm from './components/BasicForm';
import ContactsForm from './components/ContactsForm';
import AvatarForm from './components/AvatarForm';
import Finish from './components/Finish';
import Context from './context';
import reducer, { initialState } from './reducer';
import { commonTypes } from './types';

const useStyles = makeStyles(theme => ({
	root: {
		width: 650,
		display: 'flex',
		flexDirection: 'column',
		padding: 40,
	},
	contentWrapper: {
		width: '100%',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	content: {
		width: '100%',
		marginBottom: 20,
	},
	button: {
		marginRight: theme.spacing(1),
	},
}));

const getSteps = (): string[] => {
	return ['Basic', 'Contacts', 'Avatar', 'Finish'];
};

const getStepContent = (step: number): JSX.Element => {
	switch (step) {
		case 0:
			return <BasicForm />;
		case 1:
			return <ContactsForm />;
		case 2:
			return <AvatarForm />;
		case 3:
			return <Finish />;
		default:
			return <Finish />;
	}
};

const StepperForm: React.FC = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set<number>());

	const [state, dispatch] = useReducer(reducer, initialState);

	const steps = getSteps();

	const isStepOptional = (step: number) => {
		return step === 2;
	};

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep(prevActiveStep => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		dispatch({
			type: commonTypes.SKIP_AVATAR,
		});

		setActiveStep(prevActiveStep => prevActiveStep + 1);
		setSkipped(prevSkipped => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		dispatch({
			type: commonTypes.RESET,
		});

		setActiveStep(0);
	};

	return (
		<Paper className={classes.root}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: { optional?: React.ReactNode } = {};
					if (isStepOptional(index)) {
						labelProps.optional = <Typography variant='caption'>Optional</Typography>;
					}
					if (isStepSkipped(index)) {
						stepProps.completed = false;
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>

			<div className={classes.contentWrapper}>
				<Context.Provider value={{ state, dispatch }}>
					<div className={classes.content}>{getStepContent(activeStep)}</div>
				</Context.Provider>

				<div className='buttons'>
					<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
						Back
					</Button>

					{activeStep === steps.length - 1 ? (
						<Button
							color='primary'
							variant='contained'
							onClick={handleReset}
							className={classes.button}
						>
							Reset
						</Button>
					) : (
						<>
							<Button
								variant='contained'
								color='primary'
								onClick={handleNext}
								className={classes.button}
							>
								Next
							</Button>

							{isStepOptional(activeStep) && (
								<Button
									variant='contained'
									color='primary'
									onClick={handleSkip}
									className={classes.button}
								>
									Skip
								</Button>
							)}
						</>
					)}
				</div>
			</div>
		</Paper>
	);
};

export default StepperForm;
