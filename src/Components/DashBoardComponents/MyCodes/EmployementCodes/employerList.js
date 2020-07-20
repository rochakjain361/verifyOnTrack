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
  Box,
  Divider,
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
import { get, post, update, put } from "../../../../API";
import { AddComment } from "@material-ui/icons";
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
  const [ratingSurvey, setRatingentry] = React.useState([]);
  const [choiceSurvey, setChoiceentry] = React.useState([]);
  // const[ratingsurvey,setRatingsurvey]=React.useState({})
  // const[choiceSurvey,setChoicesurvey]=React.useState({})
  const [updationdialouge, setUpdationdialog] = React.useState(false);
  const [Jobcategory, setJobcategory] = React.useState([]);
  const [commentdialog, setcommentdialog] = React.useState(false);
  const [updateid, setupdateid] = React.useState();
  const [commentbyemployer,setcommentbyemployer]=React.useState([])
const [getcommentemployerid,setemployerid]=React.useState()
  const [comentdata, setCommentdata] = React.useState({
    employer: "",
    comment: "",
  });
  const [offboardid, setoffboardid] = React.useState();
  const [updatedialog, setupdatedialog] = React.useState(false);
  const [employmentupdate, setEmploymentupdate] = React.useState({
    jobProfile: "",
    jobCategory: "",
    jobTitle: "",
    jobDescription: "",
  });
  const [currentupdateid, setcurrentupdateid] = React.useState(0);
  const [offboard, setOffboard] = React.useState({
    // offboard: {
    //   jobProfile: "",
    //   offboardType: "",
    //   leavingReason: "",
    //   description: "",
    //   endDate: "",
    // },
  });
  const [confirmterminationdailog, setconfirmTerminationdialg] = React.useState(
    false
  );
  // const getcommentbyemployer=async(employerid)=>{
  //   await get("http://3.22.17.212:8000/api/v1/employees/"+employerid+"/comments/mycomments",Token,"").then((res)=>{setcommentbyemployer(res.data)})
  //     }
  const confirmterminationapi = async () => {
    await put(
      "http://3.22.17.212:8000/api/v1/employers/confirmTermination/" +
        offboardid,
      Token,
      { ratingSurvey, choiceSurvey }
    ).then(() => {
      props.refresh();
      setconfirmTerminationdialg(false);
    });
  };
  const updatedilaogconfirmation = () => {
    return (
      <Dialog
        fullWidth={"sm"}
        maxWidth={"sm"}
        open={updatedialog}
        onClose={() => {
          setupdatedialog(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle align="center">
          <Typography variant="h5" component="h5" gutterBottom>
            Updated Job Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {data[currentupdateid].empUpdate.length > 0 ? (
            <>
              <Typography variant="body1" gutterBottom>
                <Grid container direction="row">
                  <Box fontWeight="fontWeightBold" p={1}>
                    Jobtitle:
                  </Box>
                  <Box fontWeight="fontWeightRegular" p={1}>
                    {data[currentupdateid].empUpdate[0].jobTitle}
                  </Box>
                </Grid>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <Grid container direction="row">
                  <Box fontWeight="fontWeightBold" p={1}>
                    JobDescription:
                  </Box>
                  <Box fontWeight="fontWeightRegular" p={1}>
                    {data[currentupdateid].empUpdate[0].jobDescription}
                  </Box>
                </Grid>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <Grid container direction="row">
                  <Box fontWeight="fontWeightBold" p={1}>
                    Jobcategory:
                  </Box>
                  <Box fontWeight="fontWeightRegular" p={1}>
                    {data[currentupdateid].empUpdate[0].jobCategory_name_field}
                  </Box>
                </Grid>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <Grid container direction="row">
                  <Box fontWeight="fontWeightBold" p={1}>
                    StatusReason:
                  </Box>
                  <Box fontWeight="fontWeightRegular" p={1}>
                    {data[currentupdateid].empUpdate[0].statusReason}
                  </Box>
                </Grid>
              </Typography>
            </>
          ) : (
            console.log(
              "data[currentupdateid].empUpdate.length",
              data[currentupdateid].empUpdate.length
            )
          )}
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-evenly">
            <Button
              size="small"
              color="primary"
              variant="outlined"
              onClick={() => {
                confirmupdates(updateid);
                setupdatedialog(false);
              }}
            >
              Confirm updates
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              onClick={() => {
                rejectupdates(updateid);
                setupdatedialog(false);
              }}
            >
              Reject updates
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  };
  const confirmtermination = () => {
    return (
      <div>
        <Dialog
          fullWidth={"sm"}
          maxWidth={"sm"}
          open={confirmterminationdailog}
          onClose={() => {
            setconfirmTerminationdialg(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">
            Confirm Termination
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              align="flex-start"
              justify="center"
              direction="row"
              spacing={2}
            >
              <Grid item xs={12}>
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
                    setRatingentry([])

                  }}
                >
                  No
                </Button>
                {viewrating ? <Ratingdialog /> : null}
              </Grid>{" "}
              {/* <DialogContentText align="center"> */}
              <Grid item xs={12}>
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
                    setChoiceentry([])
                    
                  }}
                >
                  No
                </Button>
                {/* </DialogContentText> */}
                {/* </DialogContentText> */}
                {viewsurvey ? <Survey /> : null}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                confirmterminationapi();
              }}
              color="primary"
            >
              Confirm termination
            </Button>
            <Button
              onClick={() => {
                setconfirmTerminationdialg(false);
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
  const terminateemployee = async () => {
    // await setRatingsurvey({"ratingSurvey":ratingentry})
    // await setChoicesurvey({"choiceSurvey":choiceentry})
    setTermination(false);
    await post("http://3.22.17.212:8000/api/v1/employers/newoffboard", Token, {
      offboard,
      ratingSurvey,
      choiceSurvey,
    }).then((response) => {
      console.log(response);
      props.refresh();
    });
  };
  const jobupdation = async () => {
    setUpdationdialog(false);
    await update(
      "http://3.22.17.212:8000/api/v1/employers/newEmpUpdate",
      Token,
      employmentupdate
    ).then((response) => {
      props.refresh();
      setEmploymentupdate({
        jobProfile: "",
        jobCategory: "",
        jobTitle: "",
        jobDescription: "",
      });
    });
  };
  const sendComment = async () => {
    await post(
      "http://3.22.17.212:8000/api/v1/employers/post-comments",
      Token,
      comentdata
    ).then((response) => {});
  };
  const confirmupdates = async (updateid) => {
    await put(
      "http://3.22.17.212:8000/api/v1/employers/confirmEmpUpdate/" + updateid,
      Token,
      ""
    ).then((response) => {
      props.refresh();
    });
  };
  const rejectupdates = async (updateid) => {
    await put(
      "http://3.22.17.212:8000/api/v1/employers/rejectEmpUpdate/" + updateid,
      Token,
      ""
    ).then((response) => {
      props.refresh();
    });
  };
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
          return { ...prevvalue, [index.id.toString()]: "" };
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
          let n = index.id.toString();
          console.log("typeof", typeof typeof index.id.toString());

          return { ...prevvalue, [index.id.toString()]: "" };
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
                value={ratingSurvey[question1.id]}
                onChange={(event, newValue) => {
                  console.log("event", event);
                  console.log("newvalue", newValue);
                  // console.log("question.id",{question.id)
                  console.log("typeof", typeof question1.id);
                  setRatingentry({
                    ...ratingSurvey,
                    [event.currentTarget.name]: newValue,
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
                    onChange={(event) => {
                      setEmploymentupdate({
                        ...employmentupdate,
                        jobCategory: event.target.value,
                      });
                    }}
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
                <TextField
                  id="standard-basic"
                  value={employmentupdate.jobTitle}
                  label="Jobtitle"
                  fullWidth
                  autoFocus
                  margin="dense"
                  type="text"
                  onChange={(event) => {
                    setEmploymentupdate({
                      ...employmentupdate,
                      jobTitle: event.target.value,
                    });
                  }}
                />
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
                  onChange={(event) => {
                    setEmploymentupdate({
                      ...employmentupdate,
                      jobDescription: event.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                jobupdation();
              }}
              color="primary"
            >
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
              name={choice.id.toString()}
              value={choiceSurvey[choice.id]}
              onChange={(event, newValue) => {
                setChoiceentry({
                  ...choiceSurvey,
                  [event.currentTarget.name.toString()]: event.target.value,
                });
              }}
              aria-label="position"
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
  const AddComment = () => {
    return (
      <div>
        <Dialog
          fullWidth={"sm"}
          maxWidth={"sm"}
          open={commentdialog}
          onClose={() => {
            setcommentdialog(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">
            Comment
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
                <TextField
                  autoFocus
                  margin="dense"
                  id="newMessage"
                  label="Please add your comment"
                  type="text"
                  fullWidth
                  multiline
                  variant="outlined"
                  rows={4}
                  value={comentdata.comment}
                  onChange={(event) => {
                    setCommentdata({
                      ...comentdata,
                      comment: event.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            {/* {commentbyemployer.map((comment) => (
                        // <Paper variant='outlined' style={{padding: 10, marginTop: 20}}>
                        <div style={{ padding: 10 }}>

                            <Grid container justify='space-between' alignItems='flex-start' spacing={2}>

                                <Grid item>
                                    <Typography variant='subtitle1'>
                                    {comment.company_name_field}
                                        
                                    </Typography>
                                   
                                </Grid>

                                <Grid item>
                                    <Typography variant='caption'>
                                        {new Date(comment.created_on).toDateString()}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} style={{ marginBottom: 10 }}>
                                    <Typography variant='body2'>
                                        {comment.comment}
                                    </Typography>
                                </Grid>
                                <Divider />
                            </Grid>
                            <Divider />
                            
                        </div>
                    ))} */}

          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setcommentdialog(false);
                sendComment();
              }}
              color="primary"
            >
              Add comment
            </Button>
            <Button
              onClick={() => {
                setcommentdialog(false);
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
                  align="flex-start"
                  justify="center"
                  direction="row"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel id="demo-simple-select-required-label">
                        Offboarddata Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={offboard.offboardType}
                        onChange={(event) => {
                          setOffboard({
                            ...offboard,
                            offboardType: event.target.value,
                          });
                        }}
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
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel id="demo-simple-select-required-label">
                        Leaving Reason
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={offboard.leavingReason}
                        onChange={(event) => {
                          setOffboard({
                            ...offboard,
                            leavingReason: event.target.value,
                          });
                        }}
                        // className={classes.selectEmpty}
                      >
                        {leavingReason.map((reason) => (
                          <MenuItem value={reason.id}>{reason.reason}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
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
                      value={offboard.description}
                      onChange={(event) => {
                        setOffboard({
                          ...offboard,
                          description: event.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="EndDate"
                      label="EndDate"
                      InputLabelProps={{ shrink: true, required: true }}
                      type="date"
                      value={offboard.endDate}
                      onChange={(event) => {
                        setOffboard({
                          ...offboard,
                          endDate: event.target.value,
                        });
                      }}
                    />
                  </Grid>
                  {/* <DialogContentText align="center"> */}
                  <Grid item xs={12}>
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
                        setRatingentry([])
                      }}
                    >
                      No
                    </Button>
                    {viewrating ? <Ratingdialog /> : null}
                  </Grid>{" "}
                  {/* <DialogContentText align="center"> */}
                  <Grid item xs={12}>
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
                        setChoiceentry([])
                      }}
                    >
                      No
                    </Button>
                    {/* </DialogContentText> */}
                    {/* </DialogContentText> */}
                    {viewsurvey ? <Survey /> : null}
                  </Grid>
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
                <Button
                  onClick={() => {
                    terminateemployee();
                  }}
                  color="primary"
                >
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
      {data.length == 0 ? (
        <h1>You have not yet onboarded any job</h1>
      ) : (
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
                {props.data.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      {row.company.companyName}
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
                            setOffboard({
                              ...offboard,
                              jobProfile: row.jobDetails.id,
                            });
                          }}
                        >
                          Terminate 
                        </Button>
                      ) : null}
                      {row.showConfirmTermination ? (
                        <Button
                          size="small"
                          color="primary"
                          variant="outlined"
                          onClick={() => {
                            setconfirmTerminationdialg(true);
                            setoffboardid(row.offboard.id);
                          }}
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
                            console.log("row.jobDetails.id", row.jobDetails.id);
                            setUpdationdialog(true);
                            setEmploymentupdate({
                              ...employmentupdate,
                              jobProfile: row.jobDetails.id,
                            });
                          }}
                        >
                          update
                        </Button>
                      ) : null}
                      {row.showConfirmRejectUpdates ? (
                        <Grid container justify="space-evenly">
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                              console.log("row.empUpdate.length", index);

                              setcurrentupdateid(index);
                              setupdateid(row.empUpdate[0].id);
                              setupdatedialog(true);
                            }}
                          >
                            View updates
                          </Button>
                        </Grid>
                      ) : null}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          
                          // getcommentbyemployer(row.company.employer)
                          setcommentdialog(true);
                          setCommentdata({
                            ...comentdata,
                            employer: row.company.employer,

                           
                          });
                        }}
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
          {AddComment()}
          {confirmtermination()}
          {updatedilaogconfirmation()}
        </Grid>
      )}
    </div>
  );
}

export default EmployerList;
