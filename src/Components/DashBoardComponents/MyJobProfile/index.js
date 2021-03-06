import { Button, CircularProgress, Grid, Paper, Typography, } from '@material-ui/core';
import React, { Component } from 'react'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

import DateFnsUtils from '@date-io/date-fns';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const rows = [
    {
        "startDate": "2016-12-01",
        "endDate": "2016-12-01",
        "jobTitle": "testEmployer",
        "position": "myPosition",
        "jobDescription": "testjobDescription",
        "actions": "testActions"
    },

    {
        "startDate": "2016-12-01",
        "endDate": "2016-12-01",
        "jobTitle": "testEmployer",
        "position": "myPosition",
        "jobDescription": "testjobDescription",
        "actions": "testActions"
    }

];

let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:9000"

let companyChoices = [];
let positionCategories = [];
let reasonsChoices = [];

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class myJobProfile extends Component {
  constructor(props) {
    super(props);
    this.addJobProfile = this.addJobProfile.bind(this);
    this.getTableOfEmployees = this.getTableOfEmployees.bind(this);
  }

  state = {
    myJobHistory: [],
    viewMyJobHistories: [],

    addDialogOpen: false,
    editActionsOpen: false,

    viewDialogOpen: false,

    tabularBoolean: false,
    isloading: false,
    selectedIndex: -1,
    updateJobId: -1,
    id: "",
    companies: [],
    positions: [],
    leavingReasons: [],
    updateMyJobData: [],

    snackbar: "",
    snackbarresponse: "",

    //ADD DIALOG STATES
    addJobDialogCompany: "",
    addJobDialogCompanyIndex: 0,
    addJobDialogCheck: false,
    addJobDialogOtherCompany: "",
    addJobDialogStartDate: new Date(),
    addJobDialogEndDate: new Date(),
    addJobDialogPosition: "",
    addJobDialogPositionIndex: 0,
    addJobDialogJobTitle: "",
    addJobDialogJobDescription: "",
    addJobDialogReasonForLeaving: "",
    addJobDialogReasonForLeavingIndex: null,
    addJobDialogRating: 0,
    employeeByRadio: "currentEmployee",

    //EDIT DIALOG STATES
    editJobDialogCompany: "",
    editJobDialogCompanyField: "",
    editJobDialogCheck: false,
    editJobDialogOtherCompany: "",
    editJobDialogStartDate: new Date(),
    editJobDialogEndDate: new Date(),
    editJobDialogPosition: 0,
    editJobDialogPositionField: "",
    editJobDialogJobTitle: "",
    editJobDialogJobDescription: "",
    editJobDialogReasonForLeaving: 0,
    editJobDialogReasonForLeavingField: "",
    editJobDialogRating: 0,
    editJobDialogUpdateReason: "",

    verificationData: [],
    verificationEmployeeID: "",

    availableCompanies: [],
    check: false,
    companyOptionDisable: false,
    isloading: true,

    addsnackbar: false,
    updatesnackbar: false,
    currentid:""
  };

  addsnackbar() {
    return this.state.addresponse === 200 ? (
      <div>
        <Snackbar
          open={this.state.addsnackbar}
          autoHideDuration={3000}
          onClick={() => {
            this.setState({ addsnackbar: !this.state.addsnackbar });
          }}
        >
          <Alert
            onClose={() => {
              this.setState({ addsnackbar: !this.state.addsnackbar });
            }}
            severity="error"
          >
            Something went wrong please try again
          </Alert>
        </Snackbar>
      </div>
    ) : (
      <Snackbar
        open={this.state.addsnackbar}
        autoHideDuration={3000}
        onClick={() => this.setState({ addsnackbar: false })}
      >
        <Alert
          onClose={() => {
            this.setState({ addsnackbar: !this.state.addasnackbar });
          }}
          severity="success"
        >
          Job added sucessfully
        </Alert>
      </Snackbar>
    );
  }
  updatesnackbar() {
    return this.state.updateresponse === 200 ? (
      <div>
        {console.log("//////////////////////////////////////")}

        <Snackbar
          open={this.state.updatesnackbar}
          autoHideDuration={3000}
          onClick={() => this.setState({ updatesnackbar: false })}
        >
          <Alert
            onClose={() => {
              this.setState({ updatesnackbar: !this.state.updatesnackbar });
            }}
            severity="success"
          >
            Job updated sucessfully
          </Alert>
        </Snackbar>
      </div>
    ) : (
      <Snackbar
        open={this.state.updatesnackbar}
        autoHideDuration={3000}
        onClick={() => {
          this.setState({ updatesnackbar: !this.state.updatesnackbar });
        }}
      >
        <Alert
          onClose={() => {
            this.setState({ updatesnackbar: !this.state.updatesnackbar });
          }}
          severity="error"
        >
          Something went wrong please try again
        </Alert>
      </Snackbar>
    );
  }

  async getJobProfiles() {
    this.setState({ isLoading: true });
    let response = await fetch(api + "/api/v1/employees/" + id + "/jobs", {
      headers: {
        Authorization: token,
      },
    });
    response = await response.json();
    console.log("allJobs:", response);
    this.setState({ myJobHistory: response });
  }

  async getMyJobProfileHistory(index) {
    let response = await fetch(
      api + "/api/v1/employees/" + id + "/jobs/" + index + "/history",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    response = await response.json();
    console.log("viewHistorySuccess:", response);
    this.setState({ viewMyJobHistories: response });
    console.log("created_on:");
    this.setState({ isLoading: false });
  }
  updateMyJob(index) {
    this.setState({ editActionsOpen: true });
    // console.log('jobIndex:',index)
  }
  async getamount() {
    await axios
      .get(
        "http://3.22.17.212:9000/api/v1/resManager/serviceAPI/?serviceName=myjobprofile"
      )
      .then((res) => this.setState({ amount: res.data[0].serviceCharge }));
  }
  async pay() {
    let transactionid = Math.floor(
      10000000000000000 + Math.random() * 9000000000000000
    );
    let headers1 = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .post(
        "http://3.22.17.212:9000/wallet/transaction?type=DEBIT&amount=" +
          this.state.amount +
          "&description=" +
          transactionid,
        "",
        headers1
      )
      .then((response) => {
        if (response.status === 200) {
          this.verification();
        }
      });
  }
  async verification() {
    let headers = {
      headers: {
        Authorization: token,
      },
    };
    let bodyFormData = {
      verType: "Job",
      objId: this.state.currentid,
    };
    await axios
      .post(
        "http://3.22.17.212:9000/api/v1/codes/evaluation/new-code",
        bodyFormData,
        headers
      )
      .then((res) => {
        window.location.reload(false);
      });
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");

    await this.getJobProfiles();

    await axios
      .get("http://3.22.17.212:9000/api/v1/employers/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        companyChoices = res.data;
        this.setState({ companies: companyChoices });
        console.log("companiesList:", this.state.companies);
      });

    await axios
      .get("http://3.22.17.212:9000/api/v1/resManager/job/categories/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        positionCategories = res.data;
        this.setState({ positions: positionCategories });
        // this.setState({ positions: positionCategories.map(position => position.id) })
        console.log("positionsList:", this.state.positions);
        console.log("testPositions:", positionCategories);
      });

    await axios
      .get("http://3.22.17.212:9000/api/v1/resManager/job/leaving-reasons/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        reasonsChoices = res.data;
        this.setState({ leavingReasons: reasonsChoices });
        console.log("reasonsList:", this.state.leavingReasons);
      });

    this.setState({ isloading: false });
  }

  isloading() {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          display="flex"
          style={{ minHeight: "0vh" }}
        >
          <CircularProgress />
        </Grid>
      </>
    );
  }

  render() {
    return (
      <div>
        {/* {this.state.myJobHistory.length === 0 ? (this.titleHeaderWhenNoRecordsExist()) : (this.titleHeaderWhenRecordsExist())} */}
        {this.state.isloading
          ? this.isloading()
          : this.state.myJobHistory.length === 0
          ? this.titleHeaderWhenNoRecordsExist()
          : this.titleHeaderWhenRecordsExist()}
        {this.addJoBHistoryDialog()}
        {this.editJobHistoryDialog()}
        {this.addsnackbar()}
        {this.updatesnackbar()}
      </div>
    );
  }

  titleHeaderWhenNoRecordsExist() {
    return (
      <Grid container spacing={3} justify="space-between">
        {/* <Grid item xs={6}>
                    <h1>My Job Profile</h1>
                </Grid> */}
        <Grid item xs={12}>
          <Paper style={{ padding: 20 }} elevation={3}>
            <Typography variant="h5" gutterBottom align="center">
              Add job profiles to improve ratings.
            </Typography>

            <Grid container justify="center" style={{ marginTop: 50 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => this.setState({ addDialogOpen: true })}
              >
                Add New Job History
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  titleHeaderWhenRecordsExist() {
    return (
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={6}>
          <h1>My Job Profile</h1>
        </Grid>
        <Grid item xs={3}>
          <Button
            color="secondary"
            style={{ marginTop: 25, marginLeft: 32 }}
            variant="contained"
            onClick={() => {
              this.setState({ addDialogOpen: true });
            }}
          >
            Add New Job History
          </Button>
        </Grid>

        <Grid item xs={12}>
          {this.getTableOfEmployees()}
        </Grid>
      </Grid>
    );
  }

  addJoBHistoryDialog() {
    return (
      <Dialog
        open={this.state.addDialogOpen}
        onClose={() => this.setState({ addDialogOpen: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new job profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details of your Job profile to be added
          </DialogContentText>

          <Grid
            container
            justify="flex-start"
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Type of employee:</FormLabel>
                <RadioGroup
                  name="searchCategory"
                  value={this.state.employeeByRadio}
                  onChange={(event) => {
                    this.setState({ employeeByRadio: event.target.value });
                    // console.log('Radio:', this.state.employeeByRadio);
                  }}
                >
                  <Grid container direction="row" style={{ marginTop: 10 }}>
                    <FormControlLabel
                      value="currentEmployee"
                      control={<Radio />}
                      label="Current employee"
                    />
                    <FormControlLabel
                      value="oldEmployee"
                      control={<Radio />}
                      label="Old employee"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl fullWidth size="small">
                <InputLabel id="companyLabel">Company</InputLabel>
                <Select
                  labelId="companyLabel"
                  id="company"
                  disabled={this.state.companyOptionDisable}
                  value={this.state.addJobDialogCompany}
                  onChange={(event) => {
                    this.setState({ addJobDialogCompany: event.target.value });
                  }}
                  fullWidth
                >
                  {
                    this.state.companies.map((company) => (
                      <MenuItem key={company} value={company}>
                        {company.companyName}
                      </MenuItem>
                    ))
                    // this.state.positions.map(position => <MenuItem key={position} value={position}>{position.positionCategory}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} style={{ marginTop: 15 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.addJobDialogCheck}
                    onChange={(event) => {
                      this.setState({
                        addJobDialogCheck: !this.state.addJobDialogCheck,
                      });
                      this.setState({
                        companyOptionDisable: !this.state.companyOptionDisable,
                      });
                    }}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Other"
              />
            </Grid>

            {this.state.addJobDialogCheck ? (
              <>
                <Grid item fullWidth xs={12}>
                  <TextField
                    id="otherCompany"
                    label="Other Company"
                    value={this.state.addJobDialogOtherCompany}
                    onChange={(event) =>
                      this.setState({
                        addJobDialogOtherCompany: event.target.value,
                      })
                    }
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </>
            ) : null}

            {this.state.employeeByRadio !== "currentEmployee" ? (
              <>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    onChange={(event) => {
                      this.setState({
                        addJobDialogStartDate: event.target.value,
                      });
                      console.log(event.target.value);
                    }}
                    helperText="Start Date"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    onChange={(event) => {
                      this.setState({
                        addJobDialogEndDate: event.target.value,
                      });
                      console.log(event.target.value);
                    }}
                    helperText="End Date"
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  onChange={(event) => {
                    this.setState({
                      addJobDialogStartDate: event.target.value,
                    });
                    console.log(event.target.value);
                  }}
                  helperText="Start Date"
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="positionLabel">Position</InputLabel>
                <Select
                  labelId="positionLabel"
                  id="position"
                  value={this.state.addJobDialogPosition}
                  onChange={(event) => {
                    // console.log('eventValue:', event.target.value)
                    this.setState({ addJobDialogPosition: event.target.value });
                    // console.log('positionValue:',this.state.addJobDialogPosition)
                  }}
                  fullWidth
                >
                  {this.state.positions.map((position) => (
                    <MenuItem key={position} value={position}>
                      {position.positionCategory}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="jobTitle"
                label="Job Title"
                value={this.state.addJobDialogJobTitle}
                onChange={(event) =>
                  this.setState({ addJobDialogJobTitle: event.target.value })
                }
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="jobDescription"
                label="Job Description"
                type="text"
                fullWidth
                multiline
                rows={3}
                value={this.state.addJobDialogJobDescription}
                onChange={(event) =>
                  this.setState({
                    addJobDialogJobDescription: event.target.value,
                  })
                }
              />
            </Grid>

            {this.state.employeeByRadio !== "currentEmployee" ? (
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="reasonForLeaving">
                    Reason for leaving
                  </InputLabel>
                  <Select
                    labelId="reasonForLeaving"
                    id="reasonForLeaving"
                    value={this.state.addJobDialogReasonForLeaving}
                    onChange={(event) => {
                      this.setState({
                        addJobDialogReasonForLeaving: event.target.value,
                      });
                    }}
                    label="resonForLeaving"
                    fullWidth
                  >
                    {this.state.leavingReasons.map((leavingReason) => (
                      <MenuItem key={leavingReason} value={leavingReason}>
                        {leavingReason.reason}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              <div />
            )}

            {/* <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Typography >How do you rate this company?</Typography>
                        </Grid> */}

            {/* <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Rating
                                name="simple-controlled"
                                value={this.state.addJobDialogRating}
                                onChange={(event, newValue) => this.setState({ addJobDialogRating: newValue })}
                                max={10}
                            />
                        </Grid> */}
          </Grid>
        </DialogContent>

        <DialogActions>
          {this.state.addJobDialogCheck ? (
            <>
              <Button
                style={{ width: 85 }}
                onClick={() => this.addJobProfileOther()}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.setState({ addDialogOpen: false, selectedIndex: -1 })
                }
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                style={{ width: 85 }}
                onClick={() => this.addJobProfile()}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.setState({ addDialogOpen: false, selectedIndex: -1 })
                }
              >
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }

  editJobHistoryDialog(index) {
    return (
      <Dialog
        open={this.state.editActionsOpen}
        onClose={() => this.setState({ editActionsOpen: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit your job profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details of your Job profile to be updated
          </DialogContentText>

          <Grid
            container
            justify="flex-start"
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={9}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-outlined-label">
                  Company
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  defaultValue={this.state.updateMyJobData.company}
                  onChange={(event) =>
                    this.setState(
                      { editJobDialogCompany: event.target.value },
                      (event) =>
                        console.log(
                          "jobId!!!!:",
                          this.state.editJobDialogCompany
                        )
                    )
                  }
                  label="company"
                >
                  {this.state.companies.map((row) => (
                    <MenuItem value={row.id}>{row.companyName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} style={{ marginTop: 15 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.editJobDialogCheck}
                    onChange={(event) => {
                      this.setState({
                        editJobDialogCheck: !this.state.editJobDialogCheck,
                      });
                      this.setState({
                        companyOptionDisable: !this.state.companyOptionDisable,
                      });
                    }}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="Other"
              />
            </Grid>

            {this.state.editJobDialogCheck ? (
              <>
                <Grid item fullWidth xs={12}>
                  <TextField
                    id="otherCompany"
                    label="Other Company"
                    value={this.state.editJobDialogOtherCompany}
                    onChange={(event) =>
                      this.setState({
                        editJobDialogOtherCompany: event.target.value,
                      })
                    }
                    type="text"
                    fullWidth
                  />
                  {/* } */}
                </Grid>
              </>
            ) : null}

            <Grid item xs={6}>
              {/* <input
                                class="w3-input"
                                type="date"
                                defaultValue={this.state.updateMyJobData.startDate}
                                onChange={(event) => {
                                    this.setState({ editJobDialogStartDate: event.target.value });
                                    console.log(event.target.value);
                                }}

                            /> */}
              <TextField
                fullWidth
                type="date"
                defaultValue={this.state.updateMyJobData.startDate}
                onChange={(event) => {
                  this.setState({ editJobDialogStartDate: event.target.value });
                  console.log(event.target.value);
                }}
                helperText="Start Date"
              />
            </Grid>

            <Grid item xs={6}>
              {/* <input
                                class="w3-input"
                                type="date"
                                defaultValue={this.state.updateMyJobData.endDate}
                                onChange={(event) => {
                                    this.setState({ editJobDialogEndDate: event.target.value });
                                    console.log(event.target.value);
                                }}

                            /> */}
              <TextField
                fullWidth
                type="date"
                defaultValue={this.state.updateMyJobData.endDate}
                onChange={(event) => {
                  this.setState({ editJobDialogEndDate: event.target.value });
                  console.log(event.target.value);
                }}
                helperText="End Date"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-outlined-label">
                  Job Position
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  defaultValue={this.state.updateMyJobData.jobCategory}
                  onChange={(event) =>
                    this.setState(
                      { editJobDialogPosition: event.target.value },
                      (event) =>
                        console.log(
                          "jobId!!!!:",
                          this.state.editJobDialogPosition
                        )
                    )
                  }
                  label="company"
                >
                  {this.state.positions.map((row) => (
                    <MenuItem value={row.id}>{row.positionCategory}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="jobTitle"
                label="Job Title"
                // value={this.state.editJobDialogJobTitle}
                defaultValue={this.state.updateMyJobData.jobTitle}
                onChange={(event) =>
                  this.setState({ editJobDialogJobTitle: event.target.value })
                }
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="jobDescription"
                label="Job Description"
                type="text"
                fullWidth
                multiline
                rows={3}
                // value={this.state.editJobDialogJobDescription}
                defaultValue={this.state.updateMyJobData.jobDescription}
                onChange={(event) =>
                  this.setState({
                    editJobDialogJobDescription: event.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-outlined-label">
                  Leaving Reason
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  defaultValue={this.state.updateMyJobData.leavingReason}
                  onChange={(event) =>
                    this.setState(
                      { editJobDialogReasonForLeaving: event.target.value },
                      (event) =>
                        console.log(
                          "jobId!!!!:",
                          this.state.editJobDialogReasonForLeaving
                        )
                    )
                  }
                  label="company"
                >
                  {this.state.leavingReasons.map((row) => (
                    <MenuItem value={row.id}>{row.reason}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Typography >How do you rate this company?</Typography>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Rating
                                name="simple-controlled"
                                // value={this.state.editJobDialogRating}
                                defaultValue={this.state.updateMyJobData.companyRating}
                                onChange={(event, newValue) => this.setState({ editJobDialogRating: newValue })}
                                max={10}
                            />
                        </Grid> */}

            <Grid item xs={12}>
              <TextField
                id="reasonForUpdate"
                label="Reason for Update"
                type="text"
                fullWidth
                multiline
                rows={3}
                value={this.state.editJobDialogUpdateReason}
                onChange={(event) =>
                  this.setState({
                    editJobDialogUpdateReason: event.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            // disabled={this.state.editJobDialogUpdateReason}
            style={{ width: 85 }}
            onClick={() => {
              this.editJobProfile(this.state.updateJobId);
              // console.log("hello",this.state.myJobHistory[this.state.updateJobId])
            }}
            color="primary"
            variant="contained"
          >
            Edit
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() =>
              this.setState({ editActionsOpen: false, selectedIndex: -1 })
            }
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  viewDetailsDialog() {
    return (
      <Dialog
        open={this.state.viewDialogOpen}
        onClose={() => this.setState({ viewDialogOpen: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Job History</DialogTitle>
        {/* <DialogContent> */}

        {this.state.isloading ? (
          this.isloading()
        ) : (
          <>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell align="left">Created on</TableCell>
                  <TableCell align="left">Update Reason</TableCell>
                  <TableCell align="left">Job Description</TableCell>
                  <TableCell align="left">Job Category</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.viewMyJobHistories.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">
                      {new Date(row.created_on).toDateString()}
                    </TableCell>
                    <TableCell align="left">{row.update_reason}</TableCell>
                    <TableCell align="left">{row.jobDescription}</TableCell>
                    <TableCell align="left">{row.job_category_field}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* </DialogContent> */}
            <DialogActions>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.setState({ viewDialogOpen: false, selectedIndex: -1 })
                }
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    );
  }

  getTableOfEmployees() {
    return (
      <div>
        {
          <TableContainer component={Paper} elevation={16}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">End Date</TableCell>
                  <TableCell align="left">Employer</TableCell>
                  <TableCell align="left">Position</TableCell>
                  <TableCell align="left">VON-Status</TableCell>
                  <TableCell align="left">View</TableCell>
                  <TableCell align="center">Actions</TableCell>
                  <TableCell align="center">Verification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.myJobHistory.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.startDate}</TableCell>
                    <TableCell align="left">{row.endDate}</TableCell>
                    <TableCell align="left">{row.company_name_field}</TableCell>
                    <TableCell align="left">{row.jobTitle}</TableCell>
                    <TableCell align="left">{row.vonStatus}</TableCell>
                    <TableCell align="left">
                      <Button
                        color="primary"
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                          this.getMyJobProfileHistory(row.id);
                          this.setState({
                            viewDialogOpen: true,
                          });
                        }}
                      >
                        History
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Grid container justify="column">
                        {row.show_update_field ? (
                          <Grid item xs={12}>
                            <Button
                              disabled={row.vonStatus === "Audit In Progress"}
                              style={{ minWidth: 200 }}
                              variant="outlined"
                              color="secondary"
                              onClick={() => {
                                this.setState(
                                  {
                                    updateMyJobData: this.state.myJobHistory[
                                      index
                                    ],
                                    updateJobId: row.id,
                                  },
                                  () => {
                                    console.log(
                                      "updateMyJobData:",
                                      this.state.updateMyJobData,
                                      this.state.updateJobId
                                    );
                                  }
                                );
                                this.updateMyJob(index);
                              }}
                            >
                              Update
                            </Button>
                          </Grid>
                        ) : (
                          "NA"
                        )}

                        <Grid item xs={12}>
                          {row.show_employer_ver_field === true ? (
                            <Button
                              style={{ marginTop: 5, minWidth: 200 }}
                              variant="outlined"
                              color="secondary"
                              // onClick={() => {this.setState({ verificationData: this.state.myJobHistory[index] },
                              //     () => { console.log('verificationData:', this.state.verificationData})}
                              onClick={() => {
                                this.setState(
                                  {
                                    verificationEmployeeID: this.state
                                      .myJobHistory[index].employee,
                                    verificationData: this.state.myJobHistory[
                                      index
                                    ],
                                  },
                                  () => {
                                    console.log(
                                      "verificationData:",
                                      this.state.verificationData,
                                      "emloyeeId:",
                                      this.state.verificationEmployeeID
                                    );
                                  }
                                );
                                this.employerVerification(
                                  row.employee,
                                  row.employer_id_field,
                                  row.id
                                );
                              }}
                            >
                              Get Employer Verification
                            </Button>
                          ) : (
                            <div />
                          )}
                        </Grid>
                      </Grid>
                    </TableCell>
                    {row.showVerifyOnTrac_btn === true ? (
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="default"
                          onClick={() => {
                            this.setState({
                              currentid: row.id,
                              walletdialog: true,
                            });
                            this.getamount();
                          }}
                        >
                          Request for Verification
                        </Button>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
        {this.viewDetailsDialog()}
        {
          <Dialog
            open={this.state.walletdialog}
            onClose={() => this.setState({ walletdialog: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" align="center" justify="center">
              You need to pay {this.state.amount} for this service from wallet
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  this.setState(
                    {
                      walletdialog: false,
                    },
                    this.pay
                  )
                }
              >
                Pay
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.setState({
                    walletdialog: false,
                  })
                }
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    );
  }

  async addJobProfile() {
    let bodyData = {
      employee: id,
      company: this.state.addJobDialogCompany.id,
      // 'company_other': this.state.addJobDialogOtherCompany,
      startDate: this.state.addJobDialogStartDate,
      // endDate: this.state.addJobDialogEndDate,
      jobCategory: this.state.addJobDialogPosition.id,
      jobTitle: this.state.addJobDialogJobTitle,
      jobDescription: this.state.addJobDialogJobDescription,
      leavingReason: this.state.addJobDialogReasonForLeaving.id,
      // companyRating: this.state.addJobDialogRating,
    };

    console.log("Body data:", bodyData);

    try {
      let response = await fetch(
        "http://3.22.17.212:9000/api/v1/employees/post-job",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );
      response = await response.json();
      console.log("AddJobSuccess:", response);

      this.setState({ addresponse: response.status, addsnackbar: true });

      await this.getJobProfiles();

      this.setState({ addDialogOpen: false });
      this.setState({ addJobDialogCompany: "" });
      this.setState({ addJobDialogOtherCompany: "" });
      this.setState({ addJobDialogStartDate: "" });
      this.setState({ addJobDialogEndDate: "" });
      this.setState({ addJobDialogPosition: "" });
      this.setState({ addJobDialogJobTitle: "" });
      this.setState({ addJobDialogJobDescription: "" });
      this.setState({ addJobDialogReasonForLeaving: "" });
      this.setState({ addJobDialogRating: "" });
    } catch (error) {
      console.log("[!ON_REGISTER] " + error);
      this.setState({ snackbar: true, snackbarresponse: error.response });
    }
  }

  async addJobProfileOther() {
    let bodyData = {
      employee: id,
      // 'company': this.state.addJobDialogCompany.id,
      company_other: this.state.addJobDialogOtherCompany,
      startDate: this.state.addJobDialogStartDate,
      endDate: this.state.addJobDialogEndDate,
      jobCategory: this.state.addJobDialogPosition.id,
      jobTitle: this.state.addJobDialogJobTitle,
      jobDescription: this.state.addJobDialogJobDescription,
      leavingReason: this.state.addJobDialogReasonForLeaving.id,
      // companyRating: this.state.addJobDialogRating,
    };

    console.log("Body data:", bodyData);

    try {
      let response = await fetch(
        "http://3.22.17.212:9000/api/v1/employees/post-job",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );
      response = await response.json();
      console.log("AddJobOtherSuccess:", response);

      await this.getJobProfiles();
      this.setState({ addresponse: response.status, addsnackbar: true });

      this.setState({ addDialogOpen: false });
      this.setState({ addJobDialogCompany: "" });
      this.setState({ addJobDialogOtherCompany: "" });
      this.setState({ addJobDialogStartDate: "" });
      this.setState({ addJobDialogEndDate: "" });
      this.setState({ addJobDialogPosition: "" });
      this.setState({ addJobDialogJobTitle: "" });
      this.setState({ addJobDialogJobDescription: "" });
      this.setState({ addJobDialogReasonForLeaving: "" });
      this.setState({ addJobDialogRating: "" });
    } catch (error) {
      console.log("[!ON_REGISTER] " + error);
      this.setState({ addresponse: error.response, addsnackbar: true });
    }
  }

  async editJobProfile(id) {
    let bodyData = {
      // 'employee': id,
      company: this.state.editJobDialogCompany.id,
      // 'company_other': this.state.editJobDialogOtherCompany,
      startDate: this.state.editJobDialogStartDate,
      // 'startDate': "2020-12-30",
      endDate: this.state.editJobDialogEndDate,
      jobCategory: this.state.editJobDialogPosition.id,
      jobTitle: this.state.editJobDialogJobTitle,
      jobDescription: this.state.editJobDialogJobDescription,
      leavingReason: this.state.editJobDialogReasonForLeaving.id,
      companyRating: this.state.editJobDialogRating,
      update_reason: this.state.editJobDialogUpdateReason,
    };
    console.log("editbody:", bodyData);

    let response = await fetch(
      "http://3.22.17.212:9000/api/v1/employees/update-job/" + id,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    );
    response = await response.json(bodyData);
    console.log("EditJobSuccess:", response);

    await this.getJobProfiles();
    await this.setState({ editActionsOpen: false });
    this.setState({ updateresponse: response.status, updatesnackbar: true });
  }

  async employerVerification(employeeId, employerId, rowId) {
    console.log(
      "employeeID:",
      this.state.verificationEmployeeID,
      "employerId:",
      this.state.verificationData["employer_id_field"]
    );

    let bodyData = {
      ee_employer: employerId,
      ee_employee: employeeId,
      category: "EmploymentVerification",
      requestJobProfile: true,
      jobProfile: rowId,
    };
    console.log("verificationBody:", bodyData);

    let response = await fetch(
      "http://3.22.17.212:9000/api/v1/employers/newEmpVerification",
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    );
    response = await response.json(bodyData);
    console.log("verificationSuccess:", response);
    this.setState({ snackbar: true, snackbarresponse: response });

    await this.getJobProfiles();
  }
}

export default myJobProfile