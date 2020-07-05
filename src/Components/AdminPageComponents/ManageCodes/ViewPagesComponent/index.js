import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Profile from '../Pages/Profile'
import Address from '../Pages/Address'
import Identity from '../Pages/Identity'
import Phone from '../Pages/Phone'
import Job from '../Pages/Job'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['Profile', 'Addresses', 'Identities', 'Phones', 'Jobs'];
}

function getStepContent(step, user, approval, viewId) {
    switch (step) {
        case 0:
            return <Profile user={user} approval={approval}/>;
        case 1:
            return <Address user={user} approval={approval}/>;
        case 2:
            return <Identity user={user} approval={approval}/>;
        case 3:
            return <Phone user={user} approval={approval}/>;
        case 4:
            return <Job user={user} approval={approval}/>;
        default:
            return 'Unknown step';
    }
}

export default function VerticalLinearStepper(props) {
    const user = props.user;
    const approval = props.approval;
    console.log('user:',user, approval)
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index, user, approval)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button color='primary' variant='contained' onClick={handleReset} className={classes.button}>
                        Approve account
          </Button>
          <Button color='secondary' variant='contained' onClick={handleReset} className={classes.button}>
                        Reject account
          </Button>
                </Paper>
            )}
        </div>
    );
}
