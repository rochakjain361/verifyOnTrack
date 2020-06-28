import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

// import Address from '../Address'
// import Identity from '../Identity'
// import MyProfile from '../MyProfile'
// import Phone from '../Phone'
// import MyJob from '../MyJob'
import MyProfile from "../../DashBoardComponents/MyProfile/index"
import Addresses from "../../DashBoardComponents/Addresses/index"
import Identities from "../../DashBoardComponents/Identities/index"
import Phones from "../../DashBoardComponents/Phones/index"
import MyJobProfile from "../../DashBoardComponents/MyJobProfile/index"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
}));

function getSteps() {
    return ['Profile', 'Address', 'Identity', 'Phone', 'MyJob'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <MyProfile />;
        case 1:
            return <Addresses />;
        case 2:
            return <Identities />;
        case 3:
            return <Phones />;
        case 4:
            return <MyJobProfile/>;
        default:
            return 'Unknown step';
    }
}

export default function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (

        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography display='block' variant="h5" className={classes.title}>
                        Verify OnTrac
                    </Typography>
                    <Button color="inherit" variant='outlined' size='medium'>Logout</Button>
                </Toolbar>
            </AppBar>

            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Grid container justify="center">
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button></Grid>
                    </div>
                ) : (
                        <div style={{ padding: 20 }}>
                            <Grid></Grid>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div style={{marginTop: 20}}>
                                <Grid container  justify="space-evenly" alignItems="center">
                                <Button style={{minWidth: 200}} size='medium' variant="contained" color='default' disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>

                                <Button
                                style={{minWidth: 200}}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                    size='medium'
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Save & Next'}
                                </Button>
                                </Grid>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
