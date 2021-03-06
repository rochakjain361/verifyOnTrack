import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Academics from "../../DashBoardComponents/Academics/index";
import MyProfile from "../../DashBoardComponents/MyProfile/index";
import Addresses from "../../DashBoardComponents/Addresses/index";
import Identities from "../../DashBoardComponents/Identities/index";
import Phones from "../../DashBoardComponents/Phones/index";
import MyJobProfile from "../../DashBoardComponents/MyJobProfile/index";
import HomeIcon from "@material-ui/icons/Home";
import PaymentIcon from "@material-ui/icons/Payment";
import PhoneIcon from "@material-ui/icons/Phone";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Box from "@material-ui/core/Box";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import SchoolIcon from "@material-ui/icons/School";
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

function getSteps() {
  return ["Profile", "Address", "Identity", "Academics", "Phone", "MyJob"];
}

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <MyProfile />;
    case 1:
      return <Addresses />;
    case 2:
      return <Identities />;
    case 3:
      return <Academics />;
    case 4:
      return <Phones />;
    case 5:
      return <MyJobProfile />;
    // case 5:
    //     return <Verification data={props.location.state.detail.user.info_provided_field}/>;
    default:
      return "Unknown step";
  }
}
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonOutlineIcon />,
    2: <HomeIcon />,
    3: <PaymentIcon />,
    4: <SchoolIcon />,
    5: <PhoneIcon />,
    6: <WorkOutlineIcon />,
    // 6: <VerifiedUserIcon />
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

export default function HorizontalLinearStepper(props) {
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
           reset();
         
        }
      });
  };
  const [Approval, setApproval] = React.useState(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState();
  // const [profileDone, setProfiledone] = React.useState(false);
  // const [currentStep, setCurrentStep] = React.useState(() => {

  // });

  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  // const [Token1, setToken1] = React.useState();
  const [Token, setToken] = React.useState(localStorage.getItem("Token"));
  const [ontracid] = React.useState(localStorage.getItem("ontrac_id"));

  const [id, setid] = React.useState(localStorage.getItem("id"));
  const [approvalButton, setApprovalButton] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [allData, setallData] = React.useState(false);

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

  useEffect(() => {
    if (
      props.location.state.detail.user.info_provided_field.profile === false
    ) {
      setActiveStep(0);
    } else if (
      props.location.state.detail.user.info_provided_field.address === false
    ) {
      setActiveStep(1);
    } else if (
      props.location.state.detail.user.info_provided_field.identity === false
    ) {
      setActiveStep(2);
    }
     else if (
      props.location.state.detail.user.info_provided_field.academics === false
    ) {
      setActiveStep(3);
    }
     else if (
      props.location.state.detail.user.info_provided_field.phone === false
    ) {
      setActiveStep(4);
    } else if (
      props.location.state.detail.user.info_provided_field.jobHistory === false
    ) {
      setActiveStep(5);
    } else {
      if (
        props.location.state.detail.user.accountStatus ===
        "Approval In Progress"
      ) {
        setApproval(true);
        setActiveStep(6);
      } else {
        setActiveStep(5);
      }
    }
  }, []);
   const reset=async()=> {
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
      .then((res) =>{ setApproval(true);})
          
      
      .catch((err) => {
        console.log(err);
      });
  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const apiCheck = async () => {
    setLoading(true);
    console.log("check suceeded");
    let profiledata = await axios.get(
      "http://3.22.17.212:9000/api/v1/employees/" + id + "/profiles",
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    console.log("Profile Data from stepper", profiledata.data);
    if (profiledata.data.length === 0) {
      setLoading(false);
      setallData(true);
      console.log("else statement in profile stepper");
      return;
    }
    // else{
    //     setLoading(true)
    // }

    let addressdata = await axios.get(
      "http://3.22.17.212:9000/api/v1/employees/" + id + "/addresses",
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    // result = res.data;
    console.log("addressdata from stepper", addressdata.data);

    if (addressdata.data.length === 0) {
      setLoading(false);
      setallData(true);
      return;
    }

    console.log("its continuing //////////////////////////////////");
    let identitesdata = await axios.get(
      "http://3.22.17.212:9000/api/v1/employees/" + id + "/identities-by/" + id,
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    //result = res.data;
    console.table("identites from stepper", identitesdata.data);
    if (identitesdata.data.length === 0) {
      setLoading(false);
      setallData(true);
      return;
    }
    let Academicsdata = await axios.get(
        "http://3.22.17.212:9000/api/v1/employees/" + id + "/academics",
        {
          headers: {
            Authorization: Token,
          },
        }
      );   
      console.table("Academics from stepper", Academicsdata.data);
      if (Academicsdata.data.length === 0) {
        setLoading(false);
        setallData(true);
        return;
      }

    let phonedata = await axios.get(
      "http://3.22.17.212:9000/api/v1/employees/" + id + "/phones",
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    console.table("Phones from stepper", phonedata.data);
    if (phonedata.data.length === 0) {
      setLoading(false);
      setallData(true);
      return;
    } else {
      setLoading(false);
      setallData(false);
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === steps.length - 1) {
      apiCheck();
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
              loading ? (
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  display="flex"
                  style={{ minHeight: "100vh" }}
                >
                  <CircularProgress />
                </Grid>
              ) : (
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
                            <Typography justify="center" align="center">
                              By submitting for approval you acknowlege that all
                              the information provided by you is authentic and
                              can be verified by our team.
                            </Typography>
                            <br />
                          </Grid>
                            <Button
                              disabled={allData}
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                requestconfirmation();
                                
                               
                              }}
                            >
                              Submit for approval
                            </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              )
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
          <Box p={1}>
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
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep, props)}
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}
