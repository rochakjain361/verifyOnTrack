import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core/";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
} from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TabsEmployment from "../EmployementCodes/tabsEmployment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Axios from "axios";
import { set } from "date-fns";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
function Onboarding(props) {
  const [Token] = React.useState(localStorage.getItem("Token"));
  const [modifyOfferButton, setModifyofferbutton] = React.useState(false);
  const [modifyOfferButtonshow, setModifyofferbuttonshow] = React.useState(
    false
  );
  const [viewOfferButton, setviewOfferButton] = React.useState(false);
  const [oboffer, setOboffer] = React.useState([]);
  const [modifyoboffer, setModifyOboffer] = React.useState({
    jobCategory: "",
    startSalary: "",
    startDate: "",
    jobDescription: "",
    conditions: "",
    jobTitle: "",
    jobCategory_name_field:""
  });
  const [acceptbutton, setAcceptbutton] = React.useState(false);
  const [rejectbutton, setRejectbutton] = React.useState(false);
  const [modifyofferform, setModifyofferform] = React.useState(false);
  const [Loading, setLoading] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [JobCateogry, setJobCateogry] = React.useState([]);

  //   const [jobCategory,setJobcateogry]=React.useState("")

  const [
    generateNewEmployementCodeDialog,
    setGenerateNewEmployementCodeDialog,
  ] = React.useState(false);
  // const [confirmoffer,setConfirmoffer]=React.useState()

  const Modifyofferformdetails = (offer) => {
    setModifyOboffer({
      ...modifyoboffer,
      jobCategory: oboffer[0].jobCategory,
      startSalary: offer[0].startSalary,
      startDate: offer[0].startDate,
      jobDescription: offer[0].jobDescription,
      conditions: offer[0].conditions,
      jobTitle: offer[0].jobTitle,
    });

    setModifyofferbutton(!modifyOfferButton);
  };
  const Modifyofferformpost = async (id) => {
    setviewOfferButton(false);

    console.log("modifyoboffer", modifyoboffer);
    await Axios.put(
      "http://3.22.17.212:8000/api/v1/employers/oboffers/" + id + "/modify",
      modifyoboffer,
      {
        headers: {
          Authorization: Token,
        },
      }
    ).then((response) => {
      console.log("acceptofferresponse", response);
      setOboffer([]);
      props.refresh();

      // props.data.refresh()
    });
  };
  const confirmoffer = async (id) => {
    setviewOfferButton(false);

    console.log("id", id);

    await Axios.put(
      "http://3.22.17.212:8000/api/v1/employers/oboffers/" + id + "/accept",
      "",
      {
        headers: {
          Authorization: Token,
        },
      }
    ).then((response) => {
      console.log("acceptofferresponse", response);
      setOboffer([]);
      props.refresh();
      // props.data.refresh()
    });
  };
  const canceloffer = async (id) => {
    setviewOfferButton(false);

    console.log("id", id);

    await Axios.put(
      "http://3.22.17.212:8000/api/v1/employers/oboffers/" + id + "/reject",
      "",
      {
        headers: {
          Authorization: Token,
        },
      }
    ).then((response) => {
      console.log("acceptofferresponse", response);
      setOboffer([]);
      props.refresh();

      // props.data.refresh()
    });
  };
  const handleopen = async (id) => {
    setviewOfferButton(true);
    setLoading(true);
    await Axios.get("http://3.22.17.212:8000/api/v1/employers/oboffers/" + id, {
      headers: {
        Authorization: Token,
      },
    }).then((response) => {
      console.log("response for oboffer", response.data);
      setOboffer(response.data);
      console.log("modify offer", response.data[0].showModify_field);
      setModifyofferform(response.data[0].showModify_field);
      setAcceptbutton(response.data[0].showAccept_field);
      setRejectbutton(response.data[0].showReject_field);
      setModifyofferbuttonshow(response.data[0].showModify_field);
      setLoading(false);
    });
    await Axios.get("http://3.22.17.212:8000/api/v1/resManager/job/categories/", {
      headers: {
        Authorization: Token,
      },
    }).then((response) => {
      console.log(response.data);
      setJobCateogry(response.data)
    })
    // ViewDialouge()
  };
  useEffect(() => {
    console.log("props from employment requests", props);
  });
  return (
    <div>
      <Grid container justify="space-between" alignItems="center" spacing={4}>
        {/* <Grid item xs={4}>
    <Button color='secondary' variant='contained' onClick={() => setGenerateNewEmployementCodeDialog(true)} fullWidth>  Generate new employment code </Button>
</Grid> */}

        {/* <Grid item>
    <FormControlLabel
        control={
            <Checkbox
                // checked={state.checkedB}
                // onChange={handleChange}
                name="checkedB"
                color="primary"
            />
        }
        label="Show open codes"
    />
</Grid> */}
      </Grid>

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
                  "CreatedOn",
                  "EmployerOntracid",
                  "Jobcategories",
                  "Jobtitle",
                  "Startdate",
                  "Onboarding Status",
                  "Action",
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
                    {new Date(row.created_on).toDateString()}
                  </TableCell>
                  <TableCell align="center">{row.employer_ontracid}</TableCell>
                  <TableCell align="center">{row.jobCategory_name_field}</TableCell>
                  <TableCell align="center">{row.jobTitle}</TableCell>
                  <TableCell align="center">{row.startDate}</TableCell>
                  <TableCell align="center">{row.obStatus}</TableCell>
                  {/* <TableCell align="left"><FormControl style={{ minWidth: 85 }} variant="outlined" size='small' fullWidth>
                        <InputLabel id="">Status</InputLabel>
                        <Select
                            labelId="statusOptionsEmployeeField"
                            id="statusOptionsEmployeeField"
                            fullWidth
                        // value={age}
                        // onChange={handleChange}
                        >
                            <MenuItem value={10}>Resend Request</MenuItem>
                            <MenuItem value={20}>Cancel Request</MenuItem>

                        </Select>
                    </FormControl></TableCell> */}
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        handleopen(row.id);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* </Paper> */}

      <Dialog
        fullWidth={"sm"}
        maxWidth={"sm"}
        open={viewOfferButton}
        onClose={() => {
          setviewOfferButton(false);
          setOboffer([]);
        }}
      >
        {" "}
        {Loading ? (
          <Grid
            container
            justify="flex-end"
            alignItems="center"
            direction="column"
          >
            <Grid item xs={6} style={{ marginTop: 100 }}>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : oboffer.length === 0 ? null : (
          <>
            <DialogTitle id="alert-dialog-title" align="center">
              {"Job Details"}
            </DialogTitle>
            <DialogContent>
              <Grid container justify="space-between" spacing={2}>
                {/* <Grid item xs={6}>
                <TextField
                  id="verifyOntracId"
                  label="Verify Ontrac Id"
                  defaultValue={oboffer[0].employer_ontracid}
                  type="text"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  size="small"
                />
              </Grid> */}
                {modifyofferform ? (
                  <Grid item xs={12}>
                    <Grid container direction="row-reverse">
                      {modifyOfferButton ? (
                        <>
                          <Fab
                            size="small"
                            color="default"
                            onClick={() =>
                              setModifyofferbutton(!modifyOfferButton)
                            }
                          >
                            <ArrowBackIcon />
                          </Fab>
                        </>
                      ) : (
                        <>
                          <Button
                            color="primary"
                            variant="outlined"
                            size="large"
                            onClick={() => Modifyofferformdetails(oboffer)}
                          >
                            Modify offer
                          </Button>
                        </>
                      )}
                    </Grid>
                  </Grid>
                ) : null}

                {modifyOfferButton ? (
                  <>
                    <Grid item xs={12}>
                      <Paper variant="outlined" style={{ padding: 15 }}>
                        <Grid
                          container
                          justify="flex-start"
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          // style={{ padding: 20 }}
                        >
                          <Grid item xs={12}>
                            <FormLabel component="legend">
                              Enter new offer details:
                            </FormLabel>
                          </Grid>

                          {/* <Grid item xs={12}>
                            <TextField
                              id="verifyOntracId"
                              label="JobCategory"
                              value={modifyoboffer.jobCategory}
                              onChange={(e) => {
                                setModifyOboffer({
                                  ...modifyoboffer,
                                  jobCategory: e.target.value,
                                });
                                console.log(
                                  "modifyoboffer.jobCategory",
                                  modifyoboffer.jobCategory
                                );
                              }}
                              type="text"
                              fullWidth
                              size="small"
                            />
                          </Grid> */}
                          <Grid item fullWidth xs={12}>
                                
                                  <InputLabel id="demo-simple-select-label">
                                  JobCategory
                                  </InputLabel>
                                  <Select
                                  fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={modifyoboffer.jobCategory}
                                    onChange={(e) => {
                                      setModifyOboffer({
                                        ...modifyoboffer,
                                        jobCategory: e.target.value,
                                      });
                                      console.log(
                                        "modifyoboffer.jobCategory",
                                        modifyoboffer.jobCategory
                                      );
                                    }}
                                  >
                                    {JobCateogry.map((job)=><MenuItem id={job.id}value={job.id}>{job.positionCategory}</MenuItem>)}
                                  
                                  </Select>
                                
                              </Grid>
                          <Grid item  fullWidth xs={12}>
                            <TextField
                              id="verifyOntracId"
                              label="JobTitle"
                              value={modifyoboffer.jobTitle}
                              
                              onChange={(e) => {
                                setModifyOboffer({
                                  ...modifyoboffer,
                                  jobTitle: e.target.value,
                                });
                                console.log(
                                  "modifyoboffer.jobCategory",
                                  modifyoboffer.jobTitle
                                );
                              }}
                              type="text"
                              fullWidth
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              id="startingSalary"
                              label="Starting Salary"
                              variant="outlined"
                              value={modifyoboffer.startSalary}
                              onChange={(e) => {
                                setModifyOboffer({
                                  ...modifyoboffer,
                                  startSalary: e.target.value,
                                });
                                console.log(
                                  "modifyoboffer.jobCategory",
                                  modifyoboffer.startSalary
                                );
                              }}
                              type="number"
                              fullWidth
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              id="startingDate"
                              // label="Starting Salary"
                              variant="outlined"
                              value={modifyoboffer.startDate}
                              onChange={(e) => {
                                setModifyOboffer({
                                  ...modifyoboffer,
                                  startDate: e.target.value,
                                });
                                console.log(
                                  "modifyoboffer.jobCategory",
                                  modifyoboffer.startDate
                                );
                              }}
                              type="date"
                              helperText="Starting date"
                              fullWidth
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              id="jobDescription"
                              label="Job Description"
                              variant="outlined"
                              value={modifyoboffer.jobDescription}
                              onChange={(e) => {
                                setModifyOboffer({
                                  ...modifyoboffer,
                                  jobDescription: e.target.value,
                                });
                                console.log(
                                  "modifyoboffer.jobCategory",
                                  modifyoboffer.jobDescription
                                );
                              }}
                              type="date"
                              fullWidth
                              multiline
                              rows={3}
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              id="otherConditions"
                              label="Other Conditions"
                              variant="outlined"
                              value={modifyoboffer.conditions}
                              onChange={(e) => {
                                setModifyOboffer({
                                  ...modifyoboffer,
                                  conditions: e.target.value,
                                });
                                console.log(
                                  "modifyoboffer.jobCategory",
                                  modifyoboffer.conditions
                                );
                              }}
                              type="date"
                              fullWidth
                              multiline
                              rows={3}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </>
                ) : (
                  <>
                    {oboffer.length === 1 ? (
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        backgroundColor="red"
                      >
                        <Grid item xs={12}>
                          <Paper variant="outlined" style={{ padding: 15 }}>
                            <Grid
                              container
                              justify="flex-start"
                              direction="row"
                              alignItems="center"
                              spacing={2}
                              // style={{ padding: 20 }}
                            >
                              <Grid item xs={12}>
                                <Typography
                                  variant="subtitle1"
                                  align="center"
                                  justify="center"
                                  gutterBottom
                                >
                                  Original offer:
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="verifyOntracId"
                                  label="JobCategory"
                                  defaultValue={oboffer[0].jobCategory_name_field}
                                  type="text"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  fullWidth
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="verifyOntracId"
                                  label="JobTitle"
                                  defaultValue={oboffer[0].jobTitle}
                                  type="text"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  fullWidth
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="startingSalary"
                                  label="Starting Salary"
                                  variant="outlined"
                                  value={oboffer[0].startSalary}
                                  // onChange={}
                                  type="number"
                                  fullWidth
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="startingDate"
                                  // label="Starting Salary"
                                  variant="outlined"
                                  value={oboffer[0].startDate}
                                  // onChange={}
                                  type="date"
                                  helperText="Starting date"
                                  fullWidth
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="jobDescription"
                                  label="Job Description"
                                  variant="outlined"
                                  value={oboffer[0].jobDescription}
                                  // onChange={}
                                  type="date"
                                  fullWidth
                                  multiline
                                  rows={3}
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="otherConditions"
                                  label="Other Conditions"
                                  variant="outlined"
                                  value={oboffer[0].conditions}
                                  // onChange={}
                                  type="date"
                                  fullWidth
                                  multiline
                                  rows={3}
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <Grid item xs={6}>
                          <Paper variant="outlined" style={{ padding: 15 }}>
                            <Grid
                              container
                              justify="flex-start"
                              direction="row"
                              alignItems="center"
                              spacing={2}
                              // style={{ padding: 20 }}
                            >
                              <Grid item xs={12}>
                                <Typography
                                  variant="subtitle1"
                                  align="center"
                                  justify="center"
                                  gutterBottom
                                >
                                  Original offer:
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="verifyOntracId"
                                  label="JobCategory"
                                  defaultValue={oboffer[1].jobCategory_name_field}
                                  type="text"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  fullWidth
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="verifyOntracId"
                                  label="JobTitle"
                                  defaultValue={oboffer[1].jobTitle}
                                  type="text"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  fullWidth
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="startingSalary"
                                  label="Starting Salary"
                                  variant="outlined"
                                  value={oboffer[1].startSalary}
                                  // onChange={}
                                  type="number"
                                  fullWidth
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="startingDate"
                                  // label="Starting Salary"
                                  variant="outlined"
                                  value={oboffer[1].startDate}
                                  // onChange={}
                                  type="date"
                                  helperText="Starting date"
                                  fullWidth
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="jobDescription"
                                  label="Job Description"
                                  variant="outlined"
                                  value={oboffer[1].jobDescription}
                                  // onChange={}
                                  type="date"
                                  fullWidth
                                  multiline
                                  rows={3}
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="otherConditions"
                                  label="Other Conditions"
                                  variant="outlined"
                                  value={oboffer[1].conditions}
                                  // onChange={}
                                  type="date"
                                  fullWidth
                                  multiline
                                  rows={3}
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper variant="outlined" style={{ padding: 15 }}>
                            <Grid
                              container
                              justify="flex-start"
                              direction="row"
                              alignItems="center"
                              spacing={2}
                              // style={{ padding: 20 }}
                            >
                              <Grid item xs={12}>
                                <Typography
                                  variant="subtitle1"
                                  align="center"
                                  justify="center"
                                  gutterBottom
                                >
                                  Modified offer:
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="verifyOntracId"
                                  label="JobCategory"
                                  value={oboffer[0].jobCategory_name_field}
                                  type="text"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  fullWidth
                                  size="small"
                                />
                              </Grid>
                              
                              <Grid item xs={12}>
                                <TextField
                                  id="verifyOntracId"
                                  label="JobTitle"
                                  defaultValue={oboffer[0].jobTitle}
                                  type="text"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  fullWidth
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="startingSalary"
                                  label="Starting Salary"
                                  variant="outlined"
                                  value={oboffer[0].startSalary}
                                  // onChange={}
                                  type="number"
                                  fullWidth
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="startingDate"
                                  // label="Starting Salary"
                                  variant="outlined"
                                  value={oboffer[0].startDate}
                                  // onChange={}
                                  type="date"
                                  helperText="Starting date"
                                  fullWidth
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="jobDescription"
                                  label="Job Description"
                                  variant="outlined"
                                  value={oboffer[0].jobDescription}
                                  // onChange={}
                                  type="date"
                                  fullWidth
                                  multiline
                                  rows={3}
                                  size="small"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  id="otherConditions"
                                  label="Other Conditions"
                                  variant="outlined"
                                  value={oboffer[0].conditions}
                                  // onChange={}
                                  type="date"
                                  fullWidth
                                  multiline
                                  rows={3}
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>

                      
                      </>
                    )}
                  </>
                )}
              </Grid>
            </DialogContent>
            <DialogActions style={{ padding: 15 }}>
              {modifyOfferButton ? (
                <>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => Modifyofferformpost(oboffer[0].id)}
                    style={{ minWidth: 200 }}
                  >
                    Send New Offer
                  </Button>
                </>
              ) : acceptbutton ? (
                <>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => confirmoffer(oboffer[0].id)}
                    style={{ minWidth: 200 }}
                  >
                    Confirm Employee Onboard
                  </Button>
                </>
              ) : null}
              {rejectbutton ? (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => canceloffer(oboffer[0].id)}
                  style={{ minWidth: 200 }}
                >
                  Cancel Offer
                </Button>
              ) : null}
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  setviewOfferButton(false);
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {
        <div>
          <Dialog
            open={generateNewEmployementCodeDialog}
            onClose={() => setGenerateNewEmployementCodeDialog(false)}
          >
            <DialogTitle id="alert-dialog-title">
              {"Code Generator"}
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                justify="flex-start"
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="searchEmployeeBy">
                      Search Employee by
                    </InputLabel>
                    <Select
                      labelId="statusOptionsEmployeeField"
                      id="statusOptionsEmployeeField"
                      fullWidth
                      // value={age}
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>User Name</MenuItem>
                      <MenuItem value={20}>Email</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="userName"
                    label="User Name"
                    // value={}
                    // onChange={event => this.setState({ addJobDialog: { jobTitle: event.target.value } })}
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    // value={}
                    // onChange={event => this.setState({ addJobDialog: { jobTitle: event.target.value } })}
                    type="email"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Employement code category
                    </FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="codeCategory"
                      // value={value}
                      // onChange={handleChange}
                    >
                      <FormControlLabel
                        value="employementEngagement"
                        control={<Radio />}
                        label="employementEngagement"
                      />
                      <FormControlLabel
                        value="employementTermination"
                        control={<Radio />}
                        label="employementTermination"
                      />
                      <FormControlLabel
                        value="employementUpdation"
                        control={<Radio />}
                        label="employementUpdation"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {/* FOR Employment Engagement Condition */}

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Request for:</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={employeeProfile}
                            // onChange={handleChange}
                            name="employeeProfile"
                          />
                        }
                        label="Employee-Profile"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={jobProfile}
                            // onChange={handleChange}
                            name="jobProfile"
                          />
                        }
                        label="Job-Profile"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

                {/* For Employement Termination */}

                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="selectJobProfileRecord">
                      Select Job-Profile Record
                    </InputLabel>
                    <Select
                      labelId="selectJobProfileRecord"
                      id="selectJobProfileRecord"
                      fullWidth
                      // value={age}
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Data1</MenuItem>
                      <MenuItem value={20}>Data2</MenuItem>
                      <MenuItem value={30}>Data3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* For Employement Updation  */}

                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="selectJobProfileRecord">
                      Select Job-Profile Record
                    </InputLabel>
                    <Select
                      labelId="selectJobProfileRecord"
                      id="selectJobProfileRecord"
                      fullWidth
                      // value={age}
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Data1</MenuItem>
                      <MenuItem value={20}>Data2</MenuItem>
                      <MenuItem value={30}>Data3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Request updates for:
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={employeeProfile}
                            // onChange={handleChange}
                            name="employeeProfile"
                          />
                        }
                        label="Employee-Profile"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={jobProfile}
                            // onChange={handleChange}
                            name="jobProfile"
                          />
                        }
                        label="Job-Profile"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="updateReason"
                    label="Update reason"
                    // value={}
                    // onChange={event => this.setState({ addJobDialog: { jobTitle: event.target.value } })}
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions style={{ padding: 15 }}>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setGenerateNewEmployementCodeDialog(false)}
              >
                Generate One-time Code
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      }
    </div>
  );
}

export default Onboarding;
