import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Employeelocation from "../EmployerPageComponents/Employeelocation/Employeelocation";
import Employeedetails from "../EmployerPageComponents/Employeedetails/Employeedetails";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
const useQontoStepIconStyles = makeStyles({
  // root: {
  //   // color: '#eaeaf0',
  //   // display: 'flex',
  //   // height: 22,
  //   // alignItems: 'center',
  //   width:"100%"
  // },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  // title: {
  //   flexGrow: 1,
  // },
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
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
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
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,#757ce8 0%,#3f50b5 50%,#002884 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,#6fbf73 0%,#4caf50 50%,#357a38 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
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

function getSteps() {
  return ["Details", "Location"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Employeedetails />;
    case 1:
      return <Employeelocation />;
    default:
      return "Unknown step";
  }
}

export default function EmployerStepper(props) {
  const [Token] = React.useState(localStorage.getItem("Token"));
  const [id] = React.useState(localStorage.getItem("id"));
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [Approval, setApproval] = React.useState(false);
  const [ontracid] = React.useState(localStorage.getItem("ontrac_id"));

  useEffect(() => {
    if (
      props.location.state.detail.user.accountStatus === "Approval In Progress"
    ) {
      setApproval(true);
      setActiveStep(2);
    }
  }, []);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const requestconfirmation = async () => {
    let headers = {
      headers: {
        Authorization: Token,
      },
    };
    //  let bodyFormData = new FormData();
    await axios
      .post(
        "http://3.22.17.212:9000/api/v1/codes/approval/new-code",
        "",

        headers
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          reset()
         
        }
      });
  };
   const reset = async () => {
     let bodyFormData = new FormData();
     let headers = {
       headers: {
         Authorization: Token,
         "Content-Type": "multipart/form-data",
       },
     };
     bodyFormData.append("userid ", ontracid);
     await axios
       .post("http://3.22.17.212:9000/wallet/create", bodyFormData, headers)
       .then((res) => {
         setApproval(true);
       })

       .catch((err) => {
         console.log(err);
       });
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
        "http://3.22.17.212:9000/api/v1/accounts/auth/logout",
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
          <Box m={3} p={2}>
            {Approval === false ? (
              <Grid spacing={3} container direction="column">
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Button
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
                    </Grid>
                    <Grid item>
                      <Button
                        size="medium"
                        onClick={handleReset}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        <SettingsBackupRestoreIcon />
                        Reset
                      </Button>{" "}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  justify="center"
                  align="center"
                >
                  <Grid item xs={12}>
                    <Paper elevation={3} direction="column">
                      <Box
                        p={3}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{ height: "50vh" }}
                      >
                        <Grid container spacing={2} direction="column">
                          <Grid item xs={12}>
                            <Typography justify="center" align="center">
                              By submitting for approval you acknowlege that all
                              the information provided by you is authentic and
                              can be verified by our team.
                            </Typography>
                          </Grid>
                          <br />
                          <Grid xs={12}>
                            <Grid
                              container
                              justify="center"
                              alignItems="center"
                            >
                              <Button
                                // disabled={allData}
                                size="small"
                                variant="contained"
                                color="primary"
                                fullWidth={false}
                                onClick={() => {
                                  requestconfirmation();
                                  
                                }}
                              >
                                Submit for approval
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                spacing={3}
                direction="column"
                justify="center"
                align="center"
              >
                <Grid item xs={12}>
                  <Paper elevation={3} direction="column">
                    <Box
                      p={3}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      style={{ height: "50vh" }}
                    >
                      <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        justify="center"
                      >
                        You will be notified by mail soon.
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
        ) : (
          <div>
            <div>
              <Box m={3} p={2}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={12}></Grid>
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
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
