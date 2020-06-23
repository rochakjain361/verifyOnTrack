import { Button, CircularProgress, Grid, Paper, Typography, } from '@material-ui/core';
import React, { Component } from 'react'
import GradientButton from '../../GradientButton'
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
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

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"

let companyChoices = [];
let positionCategories = [];
let reasonsChoices = [];

class myJobProfile extends Component {
    constructor(props) {
        super(props);
        this.addJobProfile = this.addJobProfile.bind(this);
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
        selectedEditIndex: -1,
        id: "",
        companies: [],
        positions: [],
        leavingReasons: [],

        //ADD DIALOG STATES
        addJobDialogCompany: '',
        addJobDialogCompanyIndex: 0,
        addJobDialogCheck: false,
        addJobDialogOtherCompany: '',
        addJobDialogStartDate: new Date(),
        addJobDialogEndDate: new Date(),
        addJobDialogPosition: '',
        addJobDialogPositionIndex: 0,
        addJobDialogJobTitle: '',
        addJobDialogJobDescription: '',
        addJobDialogReasonForLeaving: '',
        addJobDialogReasonForLeavingIndex: null,
        addJobDialogRating: 0,

        //EDIT DIALOG STATES
        editJobDialogCompany: 0,
        editJobDialogCompanyField: '',
        editJobDialogCheck: false,
        editJobDialogOtherCompany: '',
        editJobDialogStartDate: new Date(),
        editJobDialogEndDate: new Date(),
        editJobDialogPosition: 0,
        editJobDialogPositionField: '',
        editJobDialogJobTitle: '',
        editJobDialogJobDescription: '',
        editJobDialogReasonForLeaving: 0,
        editJobDialogReasonForLeavingField: '',
        editJobDialogRating: 0,
        editJobDialogUpdateReason: '',

        availableCompanies: [],
        check: false,
        comapnyOptionDisable: false,
        isloading: true
    }

    async getJobProfiles() {
        this.setState({ isLoading: true })
        let response = await fetch("http://3.22.17.212:8000/api/v1/employees/" + id + "/jobs",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log(response)
        this.setState({ myJobHistory: response });
    }

    async getMyJobProfileHistory(index) {
        // this.setState({ viewDialogOpen: true });
        let response = await fetch(api + "/api/v1/employees/" + id + "/jobs/" + index + "/history",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('viewHistorySuccess:', response)
        this.setState({ viewMyJobHistories: response });
        console.log("created_on:",)
    }

    async componentDidMount() {

        await this.getJobProfiles();

        await axios
            .get(
                "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/employers",
                {
                    headers: {
                        Authorization:
                            token,
                    },
                }
            )
            .then((res) => {
                companyChoices = res.data;
                this.setState({ companies: companyChoices })
                console.log("companiesList:", this.state.companies)
            });

        await axios
            .get("https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/job/categories", {
                headers: {
                    Authorization:
                        token,
                },
            })
            .then((res) => {
                positionCategories = res.data;
                this.setState({ positions: positionCategories })
                // this.setState({ positions: positionCategories.map(position => position.id) })
                console.log("positionsList:", this.state.positions)
                console.log("testPositions:", positionCategories)
            });

        await axios
            .get("https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/job/leaving-reasons", {
                headers: {
                    Authorization:
                        token,
                },
            })
            .then((res) => {
                reasonsChoices = res.data;
                this.setState({ leavingReasons: reasonsChoices })
                console.log('reasonsList:', this.state.leavingReasons)
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
                {
                    this.state.isloading ?
                        (this.isloading()) : (false ?
                            (this.state.titleHeaderWhenRecordsExist()) : (this.titleHeaderWhenRecordsExist()))
                }
                {this.addJoBHistoryDialog()}
                {this.editJobHistoryDialog()}
            </div>
        )
    }

    titleHeaderWhenNoRecordsExist() {
        return (
            <Grid container spacing={3} justify="space-between" >
                <Grid item xs={6}>
                    <h1>My Job Profile</h1>
                </Grid>
                <Grid item xs={12}>

                    <Paper style={{ padding: 20 }} elevation={3}>
                        <Typography variant="h5" gutterBottom align='center'>
                            Add job profiles to improve ratings.
                                            </Typography>

                        <Grid container justify='center' style={{ marginTop: 50 }}>
                            <Button color="primary" variant='contained' onClick={() => this.setState({ addDialogOpen: true })}>
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
            <Grid container spacing={3} justify="space-between" >
                <Grid item xs={6}>
                    <h1>My Job Profile</h1>
                </Grid>
                <Grid item xs={3}>
                    <Button color="secondary" style={{ marginTop: 25, marginLeft: 32 }} variant='contained' onClick={() => { this.setState({ addDialogOpen: true }) }} >
                        Add New Job History
                                        </Button>
                </Grid>



                <Grid item xs={12} >
                    {this.getTableOfEmployees()}
                </Grid>
            </Grid>
        );
    }

    addJoBHistoryDialog() {
        return (
            <Dialog open={this.state.addDialogOpen} onClose={() => this.setState({ addDialogOpen: false })} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new job profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the details of your Job profile to be added
                            </DialogContentText>

                    <Grid container justify='flex-start' direction='row' alignItems='center' spacing={3}>

                        <Grid item xs={9}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="companyLabel">
                                    Company
                                        </InputLabel>
                                <Select
                                    labelId="companyLabel"
                                    id="company"
                                    disabled={this.state.comapnyOptionDisable}
                                    value={this.state.addJobDialogCompany}
                                    onChange={event => {
                                        this.setState({ addJobDialogCompany: event.target.value })
                                    }}
                                    fullWidth
                                >
                                    {
                                        this.state.companies.map(company => <MenuItem key={company} value={company}>{company.companyName}</MenuItem>)
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
                                        onChange={event => this.setState({ addJobDialogCheck: !this.state.addJobDialogCheck })}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Other"
                            />
                        </Grid>

                        {
                            this.state.addJobDialogCheck ? (
                                <>
                                    {/* {this.setState({comapnyOptionDisable: !this.state.comapnyOptionDisable})} */}
                                    <Grid item fullWidth xs={12}>
                                        <TextField
                                            id="otherCompany"
                                            label="Other Company"
                                            value={this.state.addJobDialogOtherCompany}
                                            onChange={event => this.setState({ addJobDialogOtherCompany: event.target.value })}
                                            type="text"
                                            fullWidth
                                        />
                                        {/* } */}
                                    </Grid>
                                </>
                            ) : null
                        }

                        <Grid item xs={6}>
                            <input
                                class="w3-input"
                                type="date"
                                onChange={(event) => {
                                    this.setState({ addJobDialogStartDate: event.target.value });
                                    console.log(event.target.value);
                                }}

                            />
                        </Grid>

                        <Grid item xs={6}>


                            <input
                                class="w3-input"
                                type="date"
                                onChange={(event) => {
                                    this.setState({ addJobDialogEndDate: event.target.value });
                                    console.log(event.target.value);
                                }}

                            />

                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="positionLabel">
                                    Position
                                        </InputLabel>
                                <Select
                                    labelId="positionLabel"
                                    id="position"
                                    value={this.state.addJobDialogPosition}
                                    onChange={event => {
                                        // console.log('eventValue:', event.target.value)
                                        this.setState({ addJobDialogPosition: event.target.value })
                                        // console.log('positionValue:',this.state.addJobDialogPosition)
                                    }}
                                    fullWidth
                                >
                                    {
                                        this.state.positions.map(position => <MenuItem key={position} value={position}>{position.positionCategory}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="jobTitle"
                                label="Job Title"
                                value={this.state.addJobDialogJobTitle}
                                onChange={event => this.setState({ addJobDialogJobTitle: event.target.value })}
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
                                onChange={event => this.setState({ addJobDialogJobDescription: event.target.value })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="reasonForLeaving">
                                    Reason for leaving
                                        </InputLabel>
                                <Select
                                    labelId="reasonForLeaving"
                                    id="reasonForLeaving"
                                    value={this.state.addJobDialogReasonForLeaving}
                                    onChange={event => {
                                        this.setState({ addJobDialogReasonForLeaving: event.target.value })
                                    }}
                                    label="resonForLeaving"
                                    fullWidth
                                >
                                    {
                                        this.state.leavingReasons.map(leavingReason => <MenuItem key={leavingReason} value={leavingReason}>{leavingReason.reason}</MenuItem>)

                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Typography >How do you rate this company?</Typography>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Rating
                                name="simple-controlled"
                                value={this.state.addJobDialogRating}
                                onChange={(event, newValue) => this.setState({ addJobDialogRating: newValue })}
                                max={10}
                            />
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button style={{ width: 85 }} onClick={this.addJobProfile} color="primary" variant="contained">
                        Add
                            </Button>
                    <Button color="secondary" variant="contained" onClick={() => this.setState({ addDialogOpen: false, selectedIndex: -1 })}>
                        Cancel
                            </Button>
                </DialogActions>
            </Dialog>
        );
    }

    editJobHistoryDialog() {
        return (
            <Dialog open={this.state.editActionsOpen} onClose={() => this.setState({ editActionsOpen: false })} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit your job profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the details of your Job profile to be edited
                            </DialogContentText>

                    <Grid container justify='flex-start' direction='row' alignItems='center' spacing={3}>

                        <Grid item xs={9}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="company">
                                    Company
                                        </InputLabel>
                                <Select
                                    labelId="company"
                                    id="company"
                                    defaultValue={this.state.editJobDialogCompany}
                                    onChange={
                                        event => {
                                            console.log('editEvent:', event.target.value)
                                            this.setState({ editJobDialogCompany: event.target.value })
                                        }}

                                    label="company"
                                    fullWidth
                                >
                                    {
                                        this.state.companies.map(company => <MenuItem key={company} value={this.state.editJobDialogCompany}>{company.companyName}</MenuItem>)
                                        // this.state.companies.map(company => <MenuItem key={company} value={company}>{company}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={3} style={{ marginTop: 15 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.editJobDialogCheck}
                                        onChange={event => this.setState({ editJobDialogCheck: !this.state.editJobDialogCheck })}
                                        name="checkedA"
                                        color="primary"
                                    />
                                }
                                label="Other"
                            />
                        </Grid>

                        {
                            this.state.editJobDialogCheck ? (
                                <>
                                    {/* {this.setState({comapnyOptionDisable: !this.state.comapnyOptionDisable})} */}
                                    <Grid item fullWidth xs={12}>
                                        <TextField
                                            id="otherCompany"
                                            label="Other Company"
                                            value={this.state.editJobDialogOtherCompany}
                                            onChange={event => this.setState({ editJobDialogOtherCompany: event.target.value })}
                                            type="text"
                                            fullWidth
                                        />
                                        {/* } */}
                                    </Grid>
                                </>
                            ) : null
                        }

                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy/MM/dd"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Start Date"
                                    // value={this.state.editJobDialogStartDate}
                                    defaultValue={this.state.editJobDialogStartDate}
                                    onChange={date => this.setState({ editJobDialogStartDate: date.getDate().format("YYYY-MM-DD") })}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy/MM/dd"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="End Date"
                                    // value={this.state.editJobDialogEndDate}
                                    defaultValue={this.state.editJobDialogEndDate}
                                    style={{ marginLeft: 32 }}
                                    onChange={date => this.setState({ editJobDialogEndDate: date.getDate().format("YYYY-MM-DD") })}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="position">
                                    Position
                                            </InputLabel>
                                <Select
                                    labelId="position"
                                    id="position"
                                    // value={this.state.editJobDialogPosition}
                                    defaultValue={this.state.editJobDialogPosition}
                                    onChange={event => this.setState({ editJobDialogPosition: event.target.value })}
                                    label="position"
                                    fullWidth
                                >
                                    {
                                        this.state.positions.map(position => <MenuItem key={position} value={this.state.editJobDialogPosition}>{position.positionCategory}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="jobTitle"
                                label="Job Title"
                                // value={this.state.editJobDialogJobTitle}
                                defaultValue={this.state.editJobDialogJobTitle}
                                onChange={event => this.setState({ editJobDialogJobTitle: event.target.value })}
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
                                defaultValue={this.state.editJobDialogJobDescription}
                                onChange={event => this.setState({ editJobDialogJobDescription: event.target.value })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="reasonForLeaving">
                                    Reason for leaving
                                        </InputLabel>
                                <Select
                                    labelId="reasonForLeaving"
                                    id="reasonForLeaving"
                                    // value={this.state.editJobDialogReasonForLeaving}
                                    defaultValue={this.state.editJobDialogReasonForLeaving}
                                    onChange={event => this.setState({ editJobDialogReasonForLeaving: event.target.value })}
                                    label="resonForLeaving"
                                    fullWidth
                                >
                                    {
                                        this.state.leavingReasons.map(leavingReason => <MenuItem key={leavingReason} value={this.state.editJobDialogReasonForLeaving}>{leavingReason.reason}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Typography >How do you rate this company?</Typography>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Rating
                                name="simple-controlled"
                                // value={this.state.editJobDialogRating}
                                defaultValue={this.state.editJobDialogRating}
                                onChange={(event, newValue) => this.setState({ editJobDialogRating: newValue })}
                                max={10}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="reasonForUpdate"
                                label="Reason for Update"
                                type="text"
                                fullWidth
                                multiline
                                rows={3}
                                // value={this.state.editJobDialogUpdateReason}
                                onChange={event => this.setState({ editJobDialogUpdateReason: event.target.value })}
                            />
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button style={{ width: 85 }} onClick={() => {
                        this.editJobProfile(this.state.myJobHistory[this.state.selectedEditIndex])
                        // console.log("hello",this.state.myJobHistory[this.state.selectedEditIndex])
                    }} color="primary" variant="contained">
                        Edit
                            </Button>
                    <Button color="secondary" variant="contained" onClick={() => this.setState({ editActionsOpen: false, selectedIndex: -1 })}>
                        Cancel
                            </Button>
                </DialogActions>
            </Dialog>
        );
    }

    viewDetailsDialog() {
        return (
            <Dialog open={this.state.viewDialogOpen} onClose={() => this.setState({ viewDialogOpen: false })} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Job details</DialogTitle>
                {/* <DialogContent> */}

                <Table stickyHeader>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "black" }}>
                            {['Created on',
                                'Update Reason',
                                'Job Description',
                                'Job Category',
                            ].map((text, index) => (
                                <TableCell
                                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                                    align="left"
                                >
                                    {text}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.viewMyJobHistories.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{new Date(this.state.viewMyJobHistories[0].created_on).toDateString()}</TableCell>
                                <TableCell align="left">{this.state.viewMyJobHistories[0].update_reason}</TableCell>
                                <TableCell align="left">{this.state.viewMyJobHistories[0].jobDescription}</TableCell>
                                <TableCell align="left">{this.state.viewMyJobHistories[0].jobCategory}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* </DialogContent> */}
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={() => this.setState({ viewDialogOpen: false, selectedIndex: -1 })}>
                        Close
                        </Button>
                </DialogActions>
            </Dialog>
        )
    }

    getTableOfEmployees() {
        return (
            <div>
                {<TableContainer component={Paper} elevation={16}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'black' }}>
                                <TableCell align="left">Start Date</TableCell>
                                <TableCell align="left">End Date</TableCell>
                                <TableCell align="left">Employer</TableCell>
                                <TableCell align="left">Position</TableCell>
                                <TableCell align="left">VON-Status</TableCell>
                                <TableCell align="left">Actions</TableCell>

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
                                    <TableCell align="left" >
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => {
                                                this.getMyJobProfileHistory(row.id);
                                                this.setState({
                                                    viewDialogOpen: true,

                                                });
                                            }
                                            }
                                        >
                                            View Details
                                    </Button>

                                        <Button
                                            style={{ marginLeft: 10 }}
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => {
                                                this.setState({
                                                    editActionsOpen: true,
                                                    selectedEditIndex: index,

                                                    editJobDialogCompany: this.state.myJobHistory[index].company,
                                                    editJobDialogCheck: false,
                                                    editJobDialogOtherCompany: this.state.myJobHistory[index].company_other,
                                                    editJobDialogOtherCompanyField: this.state.myJobHistory[index].company_name_field,
                                                    editJobDialogStartDate: this.state.myJobHistory[index].startDate,
                                                    editJobDialogEndDate: this.state.myJobHistory[index].endDate,
                                                    editJobDialogPosition: this.state.myJobHistory[index].jobCategory,
                                                    editJobDialogPositionField: this.state.myJobHistory[index].job_category_field,
                                                    editJobDialogJobTitle: this.state.myJobHistory[index].jobTitle,
                                                    editJobDialogJobDescription: this.state.myJobHistory[index].jobDescription,
                                                    editJobDialogReasonForLeaving: this.state.myJobHistory[index].leavingReason,
                                                    editJobDialogReasonForLeavingField: this.state.myJobHistory[index].leaving_reason_field,
                                                    editJobDialogRating: this.state.myJobHistory[index].companyRating,
                                                    editJobDialogUpdateReason: this.state.myJobHistory[index].update_reason
                                                });
                                                console.log("hello", this.state.editJobDialogCompany);

                                            }
                                                // this.setState({
                                                //     editActionsOpen: true,
                                                //     selectedIndex: index
                                                // })
                                            }
                                        >
                                            Edit
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
                {this.viewDetailsDialog()}
            </div>

        );
    }

    async addJobProfile() {

        let bodyData = {
            'employee': id,
            'company': this.state.addJobDialogCompany.id,
            'company_other': this.state.addJobDialogOtherCompany,
            'startDate': this.state.addJobDialogStartDate,
            'endDate': this.state.addJobDialogEndDate,
            'jobCategory': this.state.addJobDialogPosition.id,
            'jobTitle': this.state.addJobDialogJobTitle,
            'jobDescription': this.state.addJobDialogJobDescription,
            'leavingReason': this.state.addJobDialogReasonForLeaving.id,
            'companyRating': this.state.addJobDialogRating,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch('http://3.22.17.212:8000/api/v1/employees/post-job',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }
            );
            response = await response.json();
            console.log('AddJobSuccess:', response);

            await this.getJobProfiles();

            this.setState({ addDialogOpen: false })
            this.setState({ addJobDialogCompany: "" })
            this.setState({ addJobDialogOtherCompany: "" })
            this.setState({ addJobDialogStartDate: "" })
            this.setState({ addJobDialogEndDate: "" })
            this.setState({ addJobDialogPosition: "" })
            this.setState({ addJobDialogJobTitle: "" })
            this.setState({ addJobDialogJobDescription: "" })
            this.setState({ addJobDialogReasonForLeaving: "" })
            this.setState({ addJobDialogRating: "" })

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async editJobProfile(index) {

        console.log('index',this.state.selectedEditIndex)

        // this.setState({ editActionsOpen: true });

        // const editJobDialogReasonForLeavingIndex = this.state.leavingReasons.indexOf(this.state.editJobDialogReasonForLeaving) + 1;
        // const editJobDialogPositionIndex = this.state.positions.indexOf(this.state.editJobDialogPosition) + 1;
        // const editJobDialogCompanyIndex = this.state.companies.indexOf(this.state.editJobDialogCompany) + 1;

        let bodyData = {
            'employee': id,
            'company': this.state.editJobDialogCompany,
            'company_other': this.state.editJobDialogOtherCompany,
            'startDate': this.state.editJobDialogStartDate,
            'endDate': this.state.editJobDialogEndDate,
            'jobCategory': this.state.editJobDialogPosition,
            'jobTitle': this.state.editJobDialogJobTitle,
            'jobDescription': this.state.editJobDialogJobDescription,
            'leavingReason': this.state.editJobDialogReasonForLeaving,
            'companyRating': this.state.editJobDialogRating,
            'update_reason': this.state.editJobDialogUpdateReason
        }

        let response = await fetch(api + '/employees/update-job/' + this.state.selectedEditIndex,
            {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            });
        response = await response.json(bodyData);
        console.log('EditJobSuccess:', response);

        await this.getJobProfiles();
    }

}

export default myJobProfile