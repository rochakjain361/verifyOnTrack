import React, { Component, useEffect, useState } from "react";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  Button,
  TableContainer,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
  Radio,
  RadioGroup,
} from "@material-ui/core/";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
} from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { get, post, update } from "../../../../API";
function EmployerList(props) {
  const [data] = React.useState(props.data);
  const [Token] = React.useState(localStorage.getItem("Token"));
  const [id] = React.useState(localStorage.getItem("id"));
  const [Termination, setTermination] = React.useState(false);
  const [offboardingTypes, setOffboardTypes] = React.useState([]);
  const [leavingReason, setLeavingReasons] = React.useState([]);
  const [ratingdata, setRatingdata] = React.useState([]);
  const [Choice, setChoicedata] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  const [viewrating, setViewrating] = React.useState(false);
  const [viewsurvey, setViewsurvey] = React.useState(false);
  const [ratingentry, setRatingentry] = React.useState([]);
  const [choiceentry, setChoiceentry] = React.useState([]);
  const [updationdialouge, setUpdationdialog] = React.useState(false);
  const [Jobcategory, setJobcategory] = React.useState([]);
  const [employmentupdate,setEmploymentupdate]=React.useState({jobProfile : "",
  jobCategory: "",
  jobTitle : "",
  jobDescription : ""})
  const [offboarddata, setOffboarddata] = React.useState({
    offboard: {
      jobProfile: "",
      offboardType: "",
      leavingReason: "",
      description: "",
      endDate: "",
    },
  });
  useEffect(() => {
    getTerminationapi();
  }, []);

  const isloading = () => {
    return (
      <Grid
        container
        justify="flex-end"
        alignItems="center"
        // container
        // spacing={0}
        direction="column"
        // alignItems="center"
        // justify="center"
        // // display="flex"
        // style={{ minHeight: "10vh" }}
      >
        <Grid item xs={6} style={{ marginTop: 100 }}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  };
  const jobupdation=async()=>{
    setUpdationdialog(false);
    await update("http://3.22.17.212:8000/api/v1/employers/newEmpUpdate",Token,employmentupdate).then((response)=>{
      props.refresh()
      setEmploymentupdate({jobProfile : "",
      jobCategory: "",
      jobTitle : "",
      jobDescription : ""})

    })

  }
  const confirmupdates=async(id)=>{
    await post("http://3.22.17.212:8000/api/v1/employers/confirmEmpUpdate/"+id,Token,"").then((response)=>{
      
      props.refresh()
    })
  }
  const rejectupdates=async(id)=>{
    await post("http://3.22.17.212:8000/api/v1/employers/confirmEmpVerification/"+id,Token,"").then((response)=>{
      props.refresh()
    })
  }
  const getTerminationapi = async () => {
    setLoading(true);

    await get(
      "http://3.22.17.212:8000/api/v1/resManager/job/offboardTypes/",
      Token
    ).then((response) => {
      setOffboardTypes(response.data);
    });
    await get(
      "http://3.22.17.212:8000/api/v1/resManager/job/leaving-reasons/",
      Token
    ).then((response) => {
      setLeavingReasons(response.data);
    });
    await get(
      "http://3.22.17.212:8000/api/v1/resManager/job/surveyq/employer/rating/",
      Token
    ).then((response) => {
      setRatingdata(response.data);
      response.data.map((index) => {
        console.log("index", index);
        // let newdata={"question":index.id,"answerRating":index.question}
        setRatingentry((prevvalue) => {
          console.log(prevvalue);
          return { ...prevvalue, ["question" + index.id]: "" };
        });
        // setRatingentry({"question":index.id,"answerRating":index.question})

        // setRatingentry(ratingentry.push( {question:index.id}))
        // console.log("ratingentry",ratingentry)
      });
    });
    await get(
      "http://3.22.17.212:8000/api/v1/resManager/job/surveyq/employer/choice/",
      Token
    ).then((response) => {
      setChoicedata(response.data);
      response.data.map((index) => {
        setChoiceentry((prevvalue) => {
          console.log(prevvalue);
          return { ...prevvalue, ["question" + index.id]: "" };
        });
      });
    });
    await get(
      "http://3.22.17.212:8000/api/v1/resManager/job/categories/",
      Token
    ).then((response) => {
      setJobcategory(response.data);
    });
    setLoading(false);
  };

  const Ratingdialog = () => {
    return (
      <div>
        {ratingdata.map((question1, index) => (
          <>
            <div>
              <p>
                {question1.question} {question1.id}
              </p>
              <Rating
                // id={}
                name={question1.id}
                value={ratingentry["question" + question1.id]}
                onChange={(event, newValue) => {
                  console.log("event", event);
                  console.log("newvalue", newValue);
                  // console.log("question.id",{question.id)

                  setRatingentry({
                    ...ratingentry,
                    ["question" + event.currentTarget.name]: newValue,
                  });
                }}
              />
            </div>
          </>
        ))}
      </div>
    );
  };
  const Updationdialouge = () => {
    return (
      <div>
        <Dialog
          fullWidth={"sm"}
          maxWidth={"sm"}
          open={updationdialouge}
          onClose={() => {
            setUpdationdialog(false);
          }}
        >
          <DialogTitle id="form-dialog-title" align="center">
            Job Updation
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              // align="center"
              justify="center"
              direction="row"
              spacing={2}
            >
              <Grid item xs={8}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-required-label">
                    Jobcategory
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={employmentupdate.jobCategory}
                    onChange={(event)=>{setEmploymentupdate({...employmentupdate,jobCategory:event.target.value})}}
                    // className={classes.selectEmpty}
                  >
                    {Jobcategory.map((type) => (
                      <MenuItem value={type.id}>
                        {type.positionCategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
              <TextField id="standard-basic" 
              value={employmentupdate.jobTitle}
              label="Jobtitle" fullWidth autoFocus margin="dense" type="text" onChange={(event)=>{setEmploymentupdate({...employmentupdate,jobTitle:event.target.value})}} />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="newMessage"
                  label="Description"
                  type="text"
                  fullWidth
                  multiline
                  variant="outlined"
                  rows={4}
                  value={employmentupdate.jobDescription}
                  onChange={(event) => { setEmploymentupdate({...employmentupdate,jobDescription:event.target.value}) }}
                />
              </Grid>
             
            </Grid>
          </DialogContent>
          <DialogActions>
                
                <Button onClick={() => {jobupdation()}} color="primary">
                  Update
                </Button>
                <Button
                  onClick={() => {
                    setUpdationdialog(false);
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
        </Dialog>
      </div>
    );
  };
  const Survey = () => {
    return (
      <div>
        {Choice.map((choice) => (
          <div>
            <p>{choice.question}</p>
            <RadioGroup
              row
              name={choice.id}
              onChange={(event, newValue) => {
                setChoiceentry({
                  ...choiceentry,
                  ["question" + event.currentTarget.name]: event.target.value,
                });
              }}
              aria-label="position"
              value={choiceentry["question" + choice.id]}
              defaultValue="top"
            >
              <FormControlLabel
                value="Yes"
                control={<Radio color="primary" size="small" />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio color="primary" size="small" />}
                label="No"
              />
              <FormControlLabel
                value="Maybe"
                control={<Radio color="primary" size="small" />}
                label="Maybe"
              />
              <FormControlLabel
                value="NotApplicable"
                control={<Radio color="primary" size="small" />}
                label="NotApplicable"
              />
            </RadioGroup>
          </div>
        ))}
      </div>
    );
  };
  const Terminationdialouge = () => {
    return (
      <div>
        <Dialog
          fullWidth={"sm"}
          maxWidth={"sm"}
          open={Termination}
          onClose={() => {
            setTermination(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">
            Termination
          </DialogTitle>
          {Loading ? (
            isloading()
          ) : (
            <Grid>
              <DialogContent>
                <Grid
                  container
                  // align="center"
                  justify="center"
                  direction="row"
                  spacing={2}
                >
                  <Grid item xs={8}>
                    <FormControl fullWidth required>
                      <InputLabel id="demo-simple-select-required-label">
                        Offboarddata Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={offboardingTypes}
                        // onChange={}
                        // className={classes.selectEmpty}
                      >
                        {offboardingTypes.map((type) => (
                          <MenuItem value={type.id}>
                            {type.offboardType}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth required>
                      <InputLabel id="demo-simple-select-required-label">
                        Leaving Reason
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={offboardingTypes}
                        // onChange={}
                        // className={classes.selectEmpty}
                      >
                        {leavingReason.map((reason) => (
                          <MenuItem value={reason.id}>{reason.reason}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="newMessage"
                      label="Description"
                      type="text"
                      fullWidth
                      multiline
                      variant="outlined"
                      rows={4}
                      // onChange={(event) => { addSetMessage(event.target.value) }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      name="someDate"
                      label="Some Date"
                      InputLabelProps={{ shrink: true, required: true }}
                      type="date"
                      // defaultValue={values.someDate}
                    />
                  </Grid>
                  <DialogContentText align="center">
                    Do you want to rate your employer?
                    <Button
                      size="small"
                      onClick={() => {
                        setViewrating(true);
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setViewrating(false);
                      }}
                    >
                      No
                    </Button>
                  </DialogContentText>
                  <Grid item xs={8}>
                    {viewrating ? <Ratingdialog /> : null}
                  </Grid>{" "}
                  <DialogContentText align="center">
                    Would you like to fill this survey about your employer?
                    <Button
                      size="small"
                      onClick={() => {
                        setViewsurvey(true);
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setViewsurvey(false);
                      }}
                    >
                      No
                    </Button>
                  </DialogContentText>
                  <Grid item xs={8}>
                    {viewsurvey ? <Survey /> : null}
                  </Grid>{" "}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setTermination(false);
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={() => {}} color="primary">
                  Terminate
                </Button>
              </DialogActions>
            </Grid>
          )}
        </Dialog>
      </div>
    );
  };
  return (
    <div>
      <Grid container justify="flex-start" alignItems="center" spacing={2}>
        <TableContainer
          component={Paper}
          style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
          elevation={5}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "black" }}>
                {[
                  "Company Name",
                  "Start Date",
                  "End Date",
                  "Job Title",
                  "Job category",
                  "Termination",
                  "Updation",
                  "Comment",
                ].map((tablename) => (
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    {tablename}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="center">
                    {row.employer.companyName}
                  </TableCell>
                  <TableCell align="center">
                    {row.jobDetails.startDate}
                  </TableCell>
                  <TableCell align="center">
                    {row.jobDetails.endDate ? row.jobDetails.endDate : "--"}
                  </TableCell>
                  <TableCell align="center">
                    {row.jobDetails.jobTitle}
                  </TableCell>
                  <TableCell align="center">
                    {row.jobDetails.job_category_field}
                  </TableCell>

                  <TableCell align="center">
                    {row.showTerminate ? (
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          setTermination(true);
                        }}
                      >
                        Termination
                      </Button>
                    ) : null}
                    {row.showConfirmTermination ? (
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => {}}
                      >
                        Confirm Termination
                      </Button>
                    ) : null}
                  </TableCell>
                  <TableCell align="center">
                    {row.showUpdate ? (
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          console.log("row.jobDetails.id",row.jobDetails.id)
                          setUpdationdialog(true);
                          setEmploymentupdate({...employmentupdate,jobProfile:row.jobDetails.id})
                        }}
                      >
                        update
                      </Button>
                    ) : null}
                    {row.showConfirmRejectUpdates ? (
                      <>
                        <Button
                          size="small"
                          color="primary"
                          variant="outlined"
                          onClick={() => {confirmupdates(row.jobDetails.id)}}
                        >
                          Confirm updates
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          variant="outlined"
                          onClick={() => {rejectupdates(row.jobDetails.id)}}
                        >
                          Reject updates
                        </Button>
                      </>
                    ) : null}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => {}}
                    >
                      Comment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {Terminationdialouge()}
        {Updationdialouge()}
      </Grid>
    </div>
  );
}

export default EmployerList;
