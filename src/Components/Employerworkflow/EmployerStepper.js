import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Employeelocation from '../EmployerPageComponents/Employeelocation/Employeelocation';
import Employeedetails from '../EmployerPageComponents/Employeedetails/Employeedetails';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import axios from 'axios'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    width:"100%"
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, #757ce8 0%, #3f50b5 50%, #002884 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, #6fbf73 0%, #4caf50 50%, #357a38 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <AccountCircleIcon />,
    2: <LocationOnIcon />,
   
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
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

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
}));

function getSteps() {
  return ['EmployerProfile', 'Location'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Employeedetails/>;
    case 1:
      return  <Employeelocation/>;
    default:
      return 'Unknown step';
  }
}

export default function EmployerStepper(props) {
  const [Token] = React.useState(localStorage.getItem("Token"));
  const [id] = React.useState(localStorage.getItem("id"));
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
    props.history.push("/signin");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography display="block" variant="h5" className={classes.title}>
            Verify OnTrac
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            size="medium"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
     
     
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
          
            <div>
            <Box m={3} p={2}>
              <Grid container justify="space-between" alignItems="center">
                <Button
                  style={{ minWidth: 200 }}
                  size="medium"
                  variant="contained"
                  color="primary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  <>
                    <ArrowBackIcon />
                    Previous
                  </>
                </Button>

                <Typography variant="h3" gutterBottom align="center">
                  {steps[activeStep]}
                </Typography>
                <Button
                  style={{ minWidth: 200 }}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  size="medium"
                >
                  {activeStep === steps.length - 1 ? (
                    "Finish"
                  ) : (
                    <>
                      Next
                      <ArrowForwardIcon />
                    </>
                  )}
                </Button>
              </Grid>
            </Box>
            </div>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
