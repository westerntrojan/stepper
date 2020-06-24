import React, { useState, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
	},
	button: {
		marginTop: 20,
		marginRight: theme.spacing(1),
	},
}));

const getSteps = (): string[] => {
	return ['Basic', 'Contacts', 'Avatar', 'Finish'];
};

const getStepContent = (step: number): any => {
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
			return 'Unknown step';
	}
};

const StepperForm: React.FC = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set());

	const [state, dispatch] = useReducer(reducer, initialState);

	const steps = getSteps();

	const isStepOptional = (step: number): boolean => {
		return step === 2;
	};

	const isStepSkipped = (step: number): boolean => {
		return skipped.has(step);
	};

	const handleNext = (): void => {
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
		dispatch({
			type: commonTypes.SKIP_AVATAR,
		});

		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

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
					const stepProps: any = {};
					const labelProps: any = {};

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

					{activeStep === 3 ? (
						<Button
							onClick={handleReset}
							variant='contained'
							color='primary'
							className={classes.button}
						>
							Reset
						</Button>
					) : (
						<>
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

							<Button
								variant='contained'
								color='primary'
								onClick={handleNext}
								className={classes.button}
							>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</>
					)}
				</div>
			</div>
		</Paper>
	);
};

export default StepperForm;
