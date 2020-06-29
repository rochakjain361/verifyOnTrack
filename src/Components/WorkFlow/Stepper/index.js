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
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
// import Address from '../Address'
// import Identity from '../Identity'
// import MyProfile from '../MyProfile'
// import Phone from '../Phone'
// import MyJob from '../MyJob'
import Verification from '../Verification/index'
import MyProfile from "../../DashBoardComponents/MyProfile/index"
import Addresses from "../../DashBoardComponents/Addresses/index"
import Identities from "../../DashBoardComponents/Identities/index"
import Phones from "../../DashBoardComponents/Phones/index"
import MyJobProfile from "../../DashBoardComponents/MyJobProfile/index"
import HomeIcon from '@material-ui/icons/Home';
import PaymentIcon from '@material-ui/icons/Payment';
import PhoneIcon from '@material-ui/icons/Phone';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import  { useState, useEffect } from 'react';
import axios from "axios";
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
    return ['Profile', 'Address', 'Identity', 'Phone', 'MyJob','Approval'];
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
            return <MyJobProfile />;
        case 5:
            return <Verification />;
        default:
            return 'Unknown step';
    }
} function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <PersonOutlineIcon />,
        2: <HomeIcon />,
        3: <PaymentIcon />,
        4: <PhoneIcon />,
        5: <WorkOutlineIcon />,
        6: <VerifiedUserIcon />
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
} const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, #757ce8 0%, #3f50b5 50%, #002884 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, #6fbf73 0%, #4caf50 50%, #357a38 100%)',
    },
});

export default function HorizontalLinearStepper(props) {
    
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState( );
    const [currentStep,setCurrentStep]=React.useState(()=>{  if(props.location.state.detail.user.info_provided_field.profile===false){
        setActiveStep(0)
   }
   else if(props.location.state.detail.user.info_provided_field.address===false){
         setActiveStep(1)
       console.log("activeStep",activeStep)
   }
   else if(props.location.state.detail.user.info_provided_field.identity===false){
    setActiveStep(3)
   }
   else if(props.location.state.detail.user.info_provided_field.phone===false){
    setActiveStep(4)
   }
   else if(props.location.state.detail.user.info_provided_field.jobHistory===false){
    setActiveStep(5)
   }  else {
    setActiveStep(6)
   }  });
  
    
    
   
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();
    const [Token,setToken]=React.useState("");
    const [Token1,setToken1]=React.useState("");
    const [id,setid]=React.useState("");
    const ColorlibConnector = withStyles({
        alternativeLabel: {
            top: 22,
        },
        active: {
            '& $line': {
                backgroundImage:
                'linear-gradient( 95deg,#757ce8 0%,#3f50b5 50%,#002884 100%)',
            },
        },
        completed: {
            '& $line': {
                backgroundImage:
                'linear-gradient( 95deg,#6fbf73 0%,#4caf50 50%,#357a38 100%)',
            },
        },
        line: {
            height: 3,
            border: 0,
            backgroundColor: '#eaeaf0',
            borderRadius: 1,
        },
    })(StepConnector);
    
    useEffect( () => {
        console.log("currentStep",currentStep);
    // initialstep(props.location.state.detail.user.info_provided_field);
        
        
        setToken1(localStorage.getItem("Token"));
        setToken("Token " + Token1);
        setid(localStorage.getItem("id"));
        // setActiveStep(2);
    });
    
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
    const logout = async () => {
       
        let headers = {
          headers: {
            Authorization: Token,
            "Content-Type": "multipart/form-data",
          },
        };
        await axios
          .post(
            "http://3.22.17.212:8000/api/v1/accounts/auth/logout",
            {},
    
            headers
          )
          .then((response) => {
            localStorage.clear();
            console.log(response);
          });
    
        console.log("////////////////////////////////////////");
        props.history.push('/signin')
      }
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
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography display='block' variant="h5" className={classes.title}>
                        Verify OnTrac
                    </Typography>
                    <Button color="inherit" variant='outlined' size='medium' onClick={()=>logout()}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label, index) => {

                    return (
                        <Step key={label} >
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <Box m={3} p={2}>
                        <Grid container spacing={3} direction="column" align="center" justify="center">
                            <Grid item xs={12}>

                                {/* <Typography justify="center" align="center" >
                                    All steps completed - you&apos;re finished
                        </Typography> */}
                        <Typography justify="center" align="center" >
                                    You will be notified soon by mail
                        </Typography>
                        </Grid>
                            <Grid item xs={12}>
                                <Grid container justify="space-between" alignItems="center">
                                    <Button size='medium' variant="contained" color='primary' disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                        <><ArrowBackIcon />Previous</>
                                    </Button>
                                    <Button size='medium' onClick={handleReset} variant="contained" color="primary" className={classes.button} >
                                        <SettingsBackupRestoreIcon />
                            Reset
                        </Button></Grid></Grid>
                        </Grid>
                    </Box>
                ) : (
                        <Box p={1}>

                            <Box m={3} p={2}>
                                <Grid container justify="space-between" alignItems="center">
                                    <Button style={{ minWidth: 200 }} size='medium' variant="contained" color='primary' disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                        <><ArrowBackIcon />Previous</>
                                    </Button>
                                   
                                    <Typography variant="h3" gutterBottom align="center">{steps[activeStep]}</Typography>
                                    <Button
                                        style={{ minWidth: 200 }}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                        size='medium'
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : <>Next<ArrowForwardIcon /></>}
                                    </Button>
                                </Grid>
                            </Box>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        </Box>
                    )}
            </div>
        </div>
    );
}
