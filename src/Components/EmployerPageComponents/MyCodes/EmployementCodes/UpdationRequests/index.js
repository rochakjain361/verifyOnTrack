import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Avatar, CircularProgress, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core/';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from 'axios';

let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:8000"

const rows = [
    {
        "createdOn": "09/12/2020",
        "codeString": "testCodeString1",
        "employerCompanyField": "testEmployerCompanyField1",
        "codeStatus": "testCodeStatu1s",
        "statusChangeDate": "09/12/2020",
    },
    {
        "createdOn": "09/12/2020",
        "codeString": "testCodeString1",
        "employerCompanyField": "testEmployerCompanyField1",
        "codeStatus": "testCodeStatus2",
        "statusChangeDate": "09/12/2020",
    }
];

const styles = theme => ({

})

class index extends Component {

    state = {
        generateNewEmployementCodeDialog: false,
        pendingCodesCheck: false,
        codeDetailsDialog: false,

        allVerifications: [],
        pendingVerifications: [],
        codeMapLogic: '',
        viewDetails: [],
        updateDetails: [],

        employeeJobId: '',
        employeePicture: '',
        employeeFirstName: '',
        employeeMiddleName: '',
        employeeLastName: '',
        employeeEmail: '',
        employeeVotId: '',
        jobTitle: '',
        employeeJobCategory: '',
        employeeEndDate: '',
        employeeJobDescription: '',

        detailsStatus: '',
        isLoading: true
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   }

    async fetchVerifications() {

        let response = await fetch(api + "/api/v1/employers/empUpdations",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('verSuccess:', response)
        console.log("currentId:", id)
        this.setState({ allVerifications: response });
    }

    async fetchPendingVerifications() {

        let response = await fetch(api + "/api/v1/employers/empUpdations?pending=true",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('pendingVerSuccess:', response)
        this.setState({ pendingVerifications: response });
    }

    async componentDidMount() {

        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

        this.fetchVerifications();
        this.fetchPendingVerifications();

        this.setState({ isLoading: false })

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

        const { classes } = this.props;

        return (
            <>
                {
                    this.state.isLoading ? (this.isloading()) :
                        (
                            <div style={{ marginTop: 20, marginRight: 20 }}>

                                <Grid container justify='space-between' alignItems='center' spacing={4}>

                                    <Grid item xs={12}>
                                        <Typography variant='h4'>
                                            Employee Updations
                                    </Typography>
                                    </Grid>

                                    <Grid item >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.pendingCodesCheck}
                                                    onChange={event => {
                                                        this.setState({ pendingCodesCheck: !this.state.pendingCodesCheck })
                                                        console.log('check1:', this.state.pendingCodesCheck)
                                                    }}
                                                    name="checkedB"
                                                    color="primary"
                                                />
                                            }
                                            label="Pending verifications"
                                        />
                                    </Grid>

                                </Grid>

                                <Grid container justify='flex-start' alignItems='center' spacing={2}>

                                    <TableContainer component={Paper} style={{ maxWidth: '94%', marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow style={{ backgroundColor: 'black' }}>
                                                    <TableCell align="left">Picture</TableCell>
                                                    <TableCell align="left">Name</TableCell>
                                                    <TableCell align="left">Job Title</TableCell>
                                                    <TableCell align="left">Verify Ontrac ID</TableCell>
                                                    <TableCell align="left">Code String</TableCell>
                                                    <TableCell align="left">Status</TableCell>
                                                    <TableCell align="center">View</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {this.tableDisplayLogic()}
                                            {this.viewCodeDetails()}
                                        </Table>
                                    </TableContainer>

                                </Grid>
                            </div>
                        )
                }
            </>

        )
    }

    allCodesTable() {
        return (
            <TableBody>
                {this.state.allVerifications.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align="left">
                            <Avatar
                                src={row.employeeDetails.picture_url}
                                style={{ height: "4rem", width: "4rem" }}
                            >
                                <img src={id.picture} width="65" height="65" alt="" />
                            </Avatar>
                        </TableCell>
                        <TableCell align="left">{row.employeeDetails.firstname}</TableCell>
                        <TableCell align="left">{row.jobDetails.jobTitle}</TableCell>
                        <TableCell align="left">{row.employeeDetails.ontrac_id}</TableCell>
                        <TableCell align="left">{row.empUpdateDetails.codeString}</TableCell>
                        <TableCell align="left">{row.empUpdateDetails.updateStatus}</TableCell>
                        <TableCell align="left">
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => this.setState({
                                    viewDetails: [row],
                                    updateDetails: row.empUpdateDetails,

                                    employeeJobId: row.empUpdateDetails.id,
                                    employeePicture: row.employeeDetails.picture_url,
                                    employeeFirstName: row.employeeDetails.firstname,
                                    employeeMiddleName: row.employeeDetails.middlename,
                                    employeeLastName: row.employeeDetails.surname,
                                    employeeEmail: row.employeeDetails.email,
                                    employeeVotId: row.employeeDetails.ontrac_id,
                                    jobTitle: row.jobDetails.jobTitle,
                                    employeeJobCategory: row.jobDetails.job_category_field,
                                    employeeEndDate: row.jobDetails.endDate,
                                    employeeJobDescription: row.jobDetails.jobDescription,

                                    detailsStatus: row.empUpdateDetails.updateStatus,

                                    codeDetailsDialog: true,
                                },
                                    () => console.log('viewDetails:', this.state.viewDetails, this.state.updateDetails))}
                            >
                                Details
                                </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        );
    }

    openCodesTable() {
        return (
            <TableBody>
                {this.state.pendingVerifications.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align="left">
                            <Avatar
                                src={row.employeeDetails.picture_url}
                                style={{ height: "4rem", width: "4rem" }}
                            >
                                <img src={id.picture} width="65" height="65" alt="" />
                            </Avatar>
                        </TableCell>
                        <TableCell align="left">{row.employeeDetails.firstname}</TableCell>
                        <TableCell align="left">{row.jobDetails.jobTitle}</TableCell>
                        <TableCell align="left">{row.employeeDetails.ontrac_id}</TableCell>
                        <TableCell align="left">{row.empUpdateDetails.codeString}</TableCell>
                        <TableCell align="left">{row.empUpdateDetails.updateStatus}</TableCell>
                        <TableCell align="left">
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => this.setState({
                                    viewDetails: [row],

                                    employeeJobId: row.empUpdateDetails.id,
                                    employeePicture: row.employeeDetails.picture_url,
                                    employeeFirstName: row.employeeDetails.firstname,
                                    employeeMiddleName: row.employeeDetails.middlename,
                                    employeeLastName: row.employeeDetails.surname,
                                    employeeEmail: row.employeeDetails.email,
                                    employeeVotId: row.employeeDetails.ontrac_id,
                                    jobTitle: row.jobDetails.jobTitle,
                                    employeeJobCategory: row.jobDetails.job_category_field,
                                    employeeEndDate: row.jobDetails.endDate,
                                    employeeJobDescription: row.jobDetails.jobDescription,

                                    detailsStatus: row.empUpdateDetails.updateStatus,

                                    codeDetailsDialog: true,
                                },
                                    () => console.log('viewDetails:', this.state.viewDetails))}
                            >
                                Details
                                </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        );
    }

    tableDisplayLogic() {
        return (
            this.state.pendingCodesCheck ? (this.openCodesTable()) : (this.allCodesTable())
        );
    }

    viewCodeDetails() {
        return (
            <div>
                <Dialog open={this.state.codeDetailsDialog} onClose={() => this.setState({ codeDetailsDialog: false, viewDetails: '' })} >
                    <DialogTitle id="codeDetails">
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                Job Details
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => this.setState({ codeDetailsDialog: false })}>
                                    <CancelIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>



                        {/* <Paper variant='outlined' style={{ padding: 20 }}> */}

                        <Grid
                            container
                            justify="center"
                            direction="row"
                            alignItems="center"
                            spacing={1}
                        // style={{ padding: 20 }}
                        >
                            <Grid item xs={12}>
                                <FormLabel component="legend">Employee Details:</FormLabel>
                            </Grid>

                            <Grid item xs={12}>
                                <Avatar
                                    src={this.state.employeePicture}
                                    style={{ height: "8rem", width: "8rem" }}
                                >
                                    <img src={id.picture} width="130" height="130" alt="" />
                                </Avatar>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    id="fullName"
                                    label="Fisrt Name"
                                    defaultValue={this.state.employeeFirstName}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    id="middleName"
                                    label="Middle Name"
                                    defaultValue={this.state.employeeMiddleName}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    id="surname"
                                    label="Surname"
                                    defaultValue={this.state.employeeLastName}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label="Email Id"
                                    defaultValue={this.state.employeeEmail}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="emailId"
                                    label="Verify Ontrac Id"
                                    defaultValue={this.state.employeeVotId}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            {this.state.detailsStatus !== "UpdationRejected" && this.state.detailsStatus !== "UpdationConfirmed" ? null : (
                                <>
                                    <>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="jobTitle"
                                                label="Job Title"
                                                defaultValue={this.state.jobTitle}
                                                type="text"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                fullWidth
                                                size='small'
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                id="jobCategory"
                                                label="Job Category"
                                                defaultValue={this.state.employeeJobCategory}
                                                type="text"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                fullWidth
                                                size='small'
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                id="endDate"
                                                label="End Date"
                                                defaultValue={this.state.employeeEndDate === null ? 'NA' : this.state.employeeEndDate}
                                                type="text"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                fullWidth
                                                size='small'
                                            />
                                        </Grid>

                                        <Grid item xs={12} style={{ marginTop: 5 }}>
                                            <TextField
                                                id="jobDescription"
                                                label="Job Description"
                                                defaultValue={this.state.employeeJobDescription}
                                                type="text"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                fullWidth
                                                size='small'
                                                variant='outlined'
                                                multiline
                                                rows={3}
                                            />
                                        </Grid>
                                    </>
                                </>
                            )}

                        </Grid>

                        {this.state.detailsStatus !== "UpdationRejected" && this.state.detailsStatus !== "UpdationConfirmed" ? (
                            <>
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="center" spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            id="endDate2"
                                            label="End Date"
                                            defaultValue={this.state.employeeEndDate === null ? 'NA' : this.state.employeeEndDate}
                                            type="text"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                            size='small'
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Paper variant='outlined' style={{ padding: 15 }}>

                                            <Grid
                                                container
                                                justify="flex-start"
                                                direction="row"
                                                alignItems="center"
                                                spacing={2}
                                            // style={{ padding: 20 }}
                                            >
                                                <Grid item xs={12}>
                                                    <FormLabel component="legend">Original details:</FormLabel>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="originaljobTitle"
                                                        label="Job Title"
                                                        defaultValue={this.state.jobTitle}
                                                        type="text"
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        fullWidth
                                                        size='small'
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="originaljobCategory"
                                                        label="Job Category"
                                                        defaultValue={this.state.employeeJobCategory}
                                                        type="text"
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        fullWidth
                                                        size='small'
                                                    />
                                                </Grid>

                                                <Grid item xs={12} style={{ marginTop: 5 }}>
                                                    <TextField
                                                        id="originaljobDescription"
                                                        label="Job Description"
                                                        defaultValue={this.state.employeeJobDescription}
                                                        type="text"
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        fullWidth
                                                        size='small'
                                                        variant='outlined'
                                                        multiline
                                                        rows={3}
                                                    />
                                                </Grid>

                                            </Grid>

                                        </Paper>

                                    </Grid>

                                    <Grid item xs={6}>
                                        <Paper variant='outlined' style={{ padding: 15 }}>

                                            <Grid
                                                container
                                                justify="flex-start"
                                                direction="row"
                                                alignItems="center"
                                                spacing={2}
                                            // style={{ padding: 20 }}
                                            >
                                                <Grid item xs={12}>
                                                    <FormLabel component="legend">Updated details:</FormLabel>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="updatedjobTitle"
                                                        label="Job Title"
                                                        defaultValue={this.state.updateDetails['jobTitle']}
                                                        type="text"
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        fullWidth
                                                        size='small'
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="updatedjobCategory"
                                                        label="Job Category"
                                                        defaultValue={this.state.updateDetails['jobCategory_name_field']}
                                                        type="text"
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        fullWidth
                                                        size='small'
                                                    />
                                                </Grid>

                                                <Grid item xs={12} style={{ marginTop: 5 }}>
                                                    <TextField
                                                        id="updatedjobDescription"
                                                        label="Job Description"
                                                        defaultValue={this.state.updateDetails['jobDescription']}
                                                        type="text"
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        fullWidth
                                                        size='small'
                                                        variant='outlined'
                                                        multiline
                                                        rows={3}
                                                    />
                                                </Grid>

                                            </Grid>

                                        </Paper>
                                    </Grid>

                                </Grid>
                            </>
                        ) :
                            null}

                        {/* </Paper> */}
                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                        {this.state.detailsStatus !== "UpdationRejected" && this.state.detailsStatus !== "UpdationConfirmed" ? (
                            <>
                                <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                                    onClick={() => this.approveVerification(this.employeeJobId)}
                                >
                                    Confirm
                        </Button>

                                <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                                    onClick={() => this.rejectVerification(this.employeeJobId)}
                                >
                                    Reject
                        </Button>
                            </>
                        ) : <div />}

                    </DialogActions>
                </Dialog>
            </div >
        );
    }

    async approveVerification(JobId) {

        console.log('jobId:', this.state.employeeJobId)

        try {
            let response = await fetch(api + '/api/v1/employers/confirmEmpUpdate/' + this.state.employeeJobId,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify("")
                }
            );
            response = await response.json();
            console.log('approveJob:', response);

            this.setState({ codeDetailsDialog: false })
            this.fetchVerifications();
            this.fetchPendingVerifications();


        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async rejectVerification(JobId) {

        console.log('jobId:', this.state.employeeJobId)

        try {
            let response = await fetch(api + '/api/v1/employers/confirmEmpUpdate/' + this.state.employeeJobId,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify("")
                }
            );
            response = await response.json();
            console.log('approveJob:', response);

            this.setState({ codeDetailsDialog: false })
            this.fetchVerifications();
            this.fetchPendingVerifications();


        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }
}

export default withStyles(styles)(index);
