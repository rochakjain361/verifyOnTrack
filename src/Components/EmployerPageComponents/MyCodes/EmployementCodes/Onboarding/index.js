import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, CircularProgress, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core/';

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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from "@material-ui/core/Fab";
import CancelIcon from '@material-ui/icons/Cancel';

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
        viewOfferButton: false,
        modifyOfferButton: false,
        newOfferButton: false,
        cancelOfferButton: false,
        confirmOfferButton: false,
        confirmOpen: false,
        employeeByRadio: "searchByPhone",

        cancelButton: '',
        modifyButton: '',
        acceptButton: '',

        selectedVotId: "",
        selectedJobType: "",
        selectedJobTypeNumeric: "",
        jobSalary: "",
        startDate: "",
        jobDescription: "",
        otherConditions: "",
        jobTitle: "",
        showAccept_field: "",
        showCancelOffer_field: "",
        showEmpJoined_field: "",
        showModify_field: "",
        showNewOffer_field: "",
        showReject_field: "",

        selectedVotId1: "",
        selectedJobType1: "",
        jobSalary1: "",
        startDate1: "",
        jobDescription1: "",
        otherConditions1: "",
        jobTitle1: "",
        showAccept_field1: "",
        showCancelOffer_field1: "",
        showEmpJoined_field1: "",
        showModify_field1: "",
        showNewOffer_field1: "",
        showReject_field1: "",

        employeeId: '',

        onboardOffers: [],
        getEmployeeByOntracId: [],
        getEmployeePhone: [],
        getAllJobTypes: [],
        viewDetailsData: [],
        isLoading: true,
        joinId: '',
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   }

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

    async fetchAllEmployeesOntracId() {

        let response = await fetch(api + "/api/v1/accounts/employee?ontrac_id=",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('empAllOntracIds:', response)
        this.setState({ getEmployeeByOntracId: response });
    }

    async fetchAllEmployeesPhones(phone) {

        let response = await fetch(api + "/api/v1/accounts/employee?phone=" + phone,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('empAllPhones:', response)
        this.setState({ getEmployeePhone: response });
    }

    async fetchAllJobTypes() {

        let response = await fetch(api + "/api/v1/resManager/employer/categories/",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('getAllJobTypes:', response)
        this.setState({ getAllJobTypes: response });
    }


    async fetchOnboardOffers() {

        let response = await fetch(api + "/api/v1/employers/oboffers",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('obSuccess:', response)
        console.log("currentId:", id)
        this.setState({ onboardOffers: response });
    }

    async fetchOnboardOfferDetails(rowId) {

        let response = await fetch(api + "/api/v1/employers/oboffers/" + rowId,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        this.setState({ viewDetailsData: response });
        console.log('viewDetailsData:', response)
        console.log('Length:', this.state.viewDetailsData.length)
        console.log('firstStatus:', this.state.viewDetailsData[0].showNewOffer_field)

        this.setState({ employeeId: this.state.viewDetailsData[0].employee })

        this.state.viewDetailsData.length !== 1 ? (
            this.setState({

                selectedVotId: this.state.viewDetailsData[0].employee_ontracid,
                selectedJobType: this.state.viewDetailsData[0].jobCategory_name_field,
                selectedJobTypeNumeric: this.state.viewDetailsData[0].jobCategory,
                jobSalary: this.state.viewDetailsData[0].startSalary,
                startDate: this.state.viewDetailsData[0].startDate,
                jobDescription: this.state.viewDetailsData[0].jobDescription,
                otherConditions: this.state.viewDetailsData[0].conditions,
                jobTitle: this.state.viewDetailsData[0].jobTitle,
                

                selectedVotId1: this.state.viewDetailsData[1].employee_ontracid,
                selectedJobType1: this.state.viewDetailsData[1].jobCategory_name_field,
                jobSalary1: this.state.viewDetailsData[1].startSalary,
                startDate1: this.state.viewDetailsData[1].startDate,
                jobDescription1: this.state.viewDetailsData[1].jobDescription,
                otherConditions1: this.state.viewDetailsData[1].conditions,
                jobTitle1: this.state.viewDetailsData[1].jobTitle,
                

                viewOfferButton: true
            }, console.log('statusOffer:', this.state.showNewOffer_field, 'not 1'))
        ) : (
                this.setState({

                    selectedVotId: this.state.viewDetailsData[0].employee_ontracid,
                    selectedJobType: this.state.viewDetailsData[0].jobCategory_name_field,
                    jobSalary: this.state.viewDetailsData[0].startSalary,
                    startDate: this.state.viewDetailsData[0].startDate,
                    jobDescription: this.state.viewDetailsData[0].jobDescription,
                    otherConditions: this.state.viewDetailsData[0].conditions,
                    jobTitle: this.state.viewDetailsData[0].jobTitle,

                    viewOfferButton: true
                }, console.log('statusOffer2:', this.state.showNewOffer_field, 'this is 1'))
            )
    }

    async componentDidMount() {

        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

        this.fetchOnboardOffers();
        this.fetchAllEmployeesOntracId();
        this.fetchAllEmployeesPhones();
        this.fetchAllJobTypes();

        this.setState({ isLoading: false })
    }

    render() {

        const { classes } = this.props;

        return (

            this.state.isLoading ? this.isloading() : this.displayTable()

        );
    }

    displayTable() {
        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item xs={8}>
                        <Typography variant='h4'>
                            Onboarding
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Button
                            color='secondary'
                            variant='contained'
                            onClick={() => this.setState({ generateNewEmployementCodeDialog: true })} fullWidth
                        >
                            Generate New Onboarding Request
                        </Button>
                    </Grid>

                </Grid>

                <Grid container justify='flex-start' alignItems='center' spacing={2}>

                    <TableContainer component={Paper} style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'black' }}>
                                    <TableCell align="left">Created on</TableCell>
                                    <TableCell align="left">OnTrac Id</TableCell>
                                    <TableCell align="left">Job Category</TableCell>
                                    <TableCell align="left">Job title</TableCell>
                                    <TableCell align="left">Start date</TableCell>
                                    <TableCell align="left">Onboard Status</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                    {/* <TableCell align="left">Update</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.onboardOffers.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{new Date(row.created_on).toDateString()}</TableCell>
                                        <TableCell align="left">{row.employee_ontracid}</TableCell>
                                        <TableCell align="left">{row.jobCategory_name_field}</TableCell>
                                        <TableCell align="left">{row.jobTitle}</TableCell>
                                        <TableCell align="left">{row.startDate}</TableCell>
                                        <TableCell align="left">{row.obStatus}</TableCell>
                                        <TableCell align="left">
                                            <Grid
                                                container
                                                direction="column"
                                                justify="flex-start"
                                                alignItems="center"
                                            >
                                                <Button
                                                    style={{ minWidth: 125 }}
                                                    size='small'
                                                    color="primary"
                                                    variant="outlined"
                                                    onClick={
                                                        () => this.setState({
                                                            cancelButton: row.showCancelOffer_field,
                                                            modifyButton: row.showNewOffer_field,
                                                            acceptButton: row.showAccept_field,
                                                        }, () => this.fetchOnboardOfferDetails(row.id))
                                                    } >
                                                    View Details
                                                </Button>
                                                {row.showEmpJoined_field ? (
                                                    <Button
                                                        style={{ minWidth: 125, marginTop: 10 }}
                                                        size='small'
                                                        color="secondary"
                                                        variant="outlined"
                                                        onClick={() => this.setState({joinId: row.id, confirmOpen: true})}
                                                    >
                                                        Join Employee
                                                    </Button>
                                                ) : <div />}
                                            </Grid>
                                        </TableCell>
                                        {/* <TableCell align="right"><Button size='small' color="secondary" variant="outlined">Update</Button></TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
                {/* </Paper> */}

                {
                    this.generateNewEmploymentDialog()
                }
                {this.viewOfferDetailsDialog()}
                {this.confirmOfferDialog()}
                {this.cancelOfferDialog()}
                {this.newOfferDialog()}
                {this.confirmEmloyeeOnboardDialog()}
            </div>
        );
    }

    confirmEmloyeeOnboardDialog() {
        return (
            <Dialog open={this.state.confirmOpen} onClose={() => this.setState({ confirmOpen: false })} >
                <DialogTitle id="alert-dialog-title">{"Are you sure do you want to onboard this employee?"}</DialogTitle>

                <DialogActions style={{ padding: 15 }}>
                    <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                    onClick={()=>this.joinEmployee(this.state.joinId)}
                    >
                        Yes
                        </Button>

                    <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                        onClick={() => this.setState({ confirmOpen: false })}
                    >
                        No
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }

    generateNewEmploymentDialog() {
        // const options = this.state.adminList.map((option) => {
        //     const firstLetter = option.username[0].toUpperCase();
        //     return {
        //         firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        //         ...option,
        //     };
        // });
        return (
            <div>
                <Dialog
                    open={this.state.generateNewEmployementCodeDialog}
                    onClose={() => this.setState({
                        generateNewEmployementCodeDialog: false,
                        selectedVotId: "",
                        selectedJobType: "",
                        jobTitle: "",
                        startDate: "",
                        jobDescription: "",
                        otherConditions: "",
                        jobSalary: ""
                    })} >
                    <DialogTitle id="alert-dialog-title">{"New Request"}</DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            justify="flex-start"
                            direction="row"
                            alignItems="center"
                            spacing={2}
                        // style={{ padding: 20 }}
                        >

                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Search employee by:</FormLabel>
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
                                                value="searchByPhone"
                                                control={<Radio />}
                                                label="OnTrac Id"
                                            />
                                            <FormControlLabel
                                                value="searchByOntracId"
                                                control={<Radio />}
                                                label="Phone"

                                            />
                                        </Grid>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>


                            {this.state.employeeByRadio !== 'searchByOntracId' ? (
                                <Grid item xs={12}>

                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Verify Ontrac Id</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            // value={age}
                                            onChange={(event) => this.setState({ selectedVotId: event.target.value }, (event) => console.log('VotId:', this.state.selectedVotId))}
                                            label="Verify Ontrac Id"
                                        >
                                            {this.state.getEmployeeByOntracId.map((row) => (
                                                <MenuItem value={row.id}>{row.ontrac_id}</MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>

                                </Grid>
                            ) : (
                                    <Grid item xs={12}>

                                        <TextField
                                            id="searchByphone"
                                            label="Phone"
                                            variant="outlined"
                                            // error={this.state.getEmployeeByOntracId.length !== 1}
                                            // helperText={this.state.getEmployeeByOntracId.length !== 1 ? ('Please enter the correct Id!'):('')}
                                            fullWidth
                                            // value={this.state.generateCodeData}
                                            onChange={(event) => {
                                                this.fetchAllEmployeesPhones(event.target.value)
                                            }}
                                        />

                                    </Grid>)}

                            <Grid item xs={12}>
                                <FormLabel component="legend">Enter Job Details:</FormLabel>
                            </Grid>

                            <Grid item xs={12}>

                                <FormControl variant="outlined" fullWidth size='small'>
                                    <InputLabel id="demo-simple-select-outlined-label">Job Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        // value={age}
                                        onChange={(event) => this.setState({ selectedJobType: event.target.value },
                                            (event) => console.log('jobId:', this.state.selectedJobType))}
                                        label="Job Type"
                                    >
                                        {this.state.getAllJobTypes.map((row) => (
                                            <MenuItem value={row.id}>{row.positionCategory}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="jobTitle"
                                    label="Job Title"
                                    variant="outlined"
                                    value={this.state.jobTitle}
                                    onChange={(event) => { this.setState({ jobTitle: event.target.value }) }}
                                    type="text"
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="startingSalary"
                                    label="Starting Salary"
                                    variant="outlined"
                                    value={this.state.jobSalary}
                                    onChange={(event) => { this.setState({ jobSalary: event.target.value }) }}
                                    type="number"
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="startingDate"
                                    variant="outlined"
                                    value={this.state.startDate}
                                    onChange={(event) => { this.setState({ startDate: event.target.value }) }}
                                    type="date"
                                    helperText="Starting date"
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="jobDescription"
                                    label="Job Description"
                                    variant="outlined"
                                    value={this.state.jobDescription}
                                    onChange={(event) => { this.setState({ jobDescription: event.target.value }) }}
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="otherConditions"
                                    label="Other Conditions"
                                    variant="outlined"
                                    value={this.state.otherConditions}
                                    onChange={(event) => { this.setState({ otherConditions: event.target.value }) }}
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    size='small'
                                />
                            </Grid>

                        </Grid>

                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                        <Button color="primary" variant="contained" onClick={() => this.sendJobOffer()}>
                            Send Job Request
                            </Button>
                        <Button 
                        color="secondary" 
                        variant="contained" 
                        onClick={() => this.setState({
                            generateNewEmployementCodeDialog: false,
                            selectedVotId: "",
                            selectedJobType: "",
                            jobTitle: "",
                            startDate: "",
                            jobDescription: "",
                            otherConditions: "",
                            jobSalary: ""
                        })}>
                            Cancel
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    viewOfferDetailsDialog() {
        return (
            <div>
                <Dialog open={this.state.viewOfferButton} onClose={() => this.setState({ viewOfferButton: false, modifyOfferButton: false })} >
                    <DialogTitle id="alert-dialog-title">
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                Job Details
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => this.setState({ viewOfferButton: false, modifyOfferButton: false })}>
                                    <CancelIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                    </DialogTitle>
                    <DialogContent>
                        <Grid container justify='space-between' spacing={2}>

                            <Grid item xs={6}>
                                <TextField
                                    id="verifyOntracId"
                                    label="Verify Ontrac Id"
                                    defaultValue={this.state.selectedVotId}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>
                            {
                                // true
                                this.state.modifyButton
                                    ? (
                                        <>
                                            <Grid item>
                                                <Button
                                                    style={{ minWidth: 125 }}
                                                    color="primary"
                                                    variant="outlined"
                                                    size='large'
                                                    onClick={() => this.setState({ modifyOfferButton: !this.state.modifyOfferButton })}
                                                >
                                                    {this.state.modifyOfferButton ? ("Back") : ("Modify Offer")}

                                                </Button>
                                            </Grid>
                                        </>
                                    ) : <div />}

                            {
                                // true
                                this.state.modifyButton
                                    ? (
                                        this.state.modifyOfferButton ? (
                                            <>
                                                <Grid item xs={12}>
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
                                                                <FormLabel component="legend">Enter new offer details:</FormLabel>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                {/* <Autocomplete
                                    // options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    // getOptionLabel={(option) => option.email}
                                    // groupBy={(option) => option.firstLetter}
                                    id="adminEmail"
                                    Username
                                    size='small'
                                    fullWidth
                                    value={this.state.selectedstate}
                                    onChange={(event, value) => {
                                        this.setState({ selectedstate: value });
                                        this.setState({ assignAdminId: value['id'] })
                                        console.log("selectedstate", value);
                                        console.log("assignAdminID", this.state.assignAdminId);
                                    }}
                                    inputValue={this.state.enteredUsername}
                                    onInputChange={(event, newInputValue) => {
                                        this.setState({ enteredUsername: newInputValue });
                                        // console.log(newInputValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Job Type"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    )}
                                /> */}
                                                                <FormControl variant="outlined" fullWidth size='small'>
                                                                    <InputLabel id="demo-simple-select-outlined-label">Job Type</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="demo-simple-select-outlined"
                                                                        defaultValue={this.state.selectedJobTypeNumeric}
                                                                        onChange={(event) => this.setState({ selectedJobType: event.target.value },
                                                                            (event) => console.log('jobId:', this.state.selectedJobType))}
                                                                        label="Job Type"
                                                                    >
                                                                        {this.state.getAllJobTypes.map((row) => (
                                                                            <MenuItem value={row.id}>{row.positionCategory}</MenuItem>
                                                                        ))}

                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="jobTitle"
                                                                    label="Job Title"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.jobTitle}
                                                                    onChange={(event) => { this.setState({ jobTitle: event.target.value }) }}
                                                                    type="text"
                                                                    fullWidth
                                                                    size='small'
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="startingSalary"
                                                                    label="Starting Salary"
                                                                    variant="outlined"
                                                                    value={this.state.jobSalary}
                                                                    onChange={(event) => { this.setState({ jobSalary: event.target.value }) }}
                                                                    type="number"
                                                                    fullWidth
                                                                    size='small'
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="startingDate"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.startDate}
                                                                    onChange={(event) => { this.setState({ startDate: event.target.value }) }}
                                                                    type="date"
                                                                    helperText="Starting date"
                                                                    fullWidth
                                                                    size='small'
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="jobDescription"
                                                                    label="Job Description"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.jobDescription}
                                                                    onChange={(event) => { this.setState({ jobDescription: event.target.value }) }}
                                                                    type="text"
                                                                    fullWidth
                                                                    multiline
                                                                    rows={3}
                                                                    size='small'
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="otherConditions"
                                                                    label="Other Conditions"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.otherConditions}
                                                                    onChange={(event) => { this.setState({ otherConditions: event.target.value }) }}
                                                                    type="text"
                                                                    fullWidth
                                                                    multiline
                                                                    rows={3}
                                                                    size='small'
                                                                />
                                                            </Grid>

                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                            </>
                                        ) : (
                                                <>
                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center" spacing={2}>
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
                                                                        <FormLabel component="legend">Modified offer:</FormLabel>
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="ModifiedjobType"
                                                                            label="Job type"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.selectedJobType1}
                                                                            // onChange={}
                                                                            type="text"
                                                                            fullWidth
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="ModifiedjobTitle"
                                                                            label="Job title"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.jobTitle1}
                                                                            // onChange={}
                                                                            type="text"
                                                                            fullWidth
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="ModifiedstartingSalary"
                                                                            label="Starting Salary"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.jobSalary1}
                                                                            // onChange={}
                                                                            type="number"
                                                                            fullWidth
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="ModifiedstartingDate"
                                                                            // label="Starting Salary"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.startDate1}
                                                                            // onChange={}
                                                                            type="date"
                                                                            helperText="Starting date"
                                                                            fullWidth
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="ModifiedjobDescription"
                                                                            label="Job Description"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.jobDescription1}
                                                                            // onChange={}
                                                                            type="date"
                                                                            fullWidth
                                                                            multiline
                                                                            rows={3}
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="ModifiedotherConditions"
                                                                            label="Other Conditions"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.otherConditions1}
                                                                            // onChange={}
                                                                            type="date"
                                                                            fullWidth
                                                                            multiline
                                                                            rows={3}
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
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
                                                                        <FormLabel component="legend">Original offer:</FormLabel>
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="OriginaljobType"
                                                                            label="Job type"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.selectedJobType}
                                                                            // onChange={}
                                                                            type="text"
                                                                            fullWidth
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="OriginaljobTitle"
                                                                            label="Job title"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.jobTitle}
                                                                            // onChange={}
                                                                            type="text"
                                                                            fullWidth
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="OriginalstartingSalary"
                                                                            label="Starting Salary"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.jobSalary}
                                                                            // onChange={}
                                                                            type="number"
                                                                            fullWidth
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="OriginalstartingDate"
                                                                            // label="Starting Salary"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.startDate}
                                                                            // onChange={}
                                                                            type="date"
                                                                            helperText="Starting date"
                                                                            fullWidth
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="OriginaljobDescription"
                                                                            label="Job Description"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.jobDescription}
                                                                            // onChange={}
                                                                            type="date"
                                                                            fullWidth
                                                                            multiline
                                                                            rows={3}
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            id="OriginalotherConditions"
                                                                            label="Other Conditions"
                                                                            variant="outlined"
                                                                            defaultValue={this.state.otherConditions}
                                                                            // onChange={}
                                                                            type="date"
                                                                            fullWidth
                                                                            multiline
                                                                            rows={3}
                                                                            size='small'
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                </Grid>
                                                            </Paper>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )
                                    ) : (
                                        <>
                                            <Grid container
                                                direction="row"
                                                justify="center"
                                                alignItems="center" spacing={2}>

                                                <Grid item xs={12}>
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
                                                                <FormLabel component="legend">Original offer:</FormLabel>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="OriginaljobType"
                                                                    label="Job type"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.selectedJobType}
                                                                    // onChange={}
                                                                    type="text"
                                                                    fullWidth
                                                                    size='small'
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="OriginaljobTitle"
                                                                    label="Job title"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.jobTitle}
                                                                    // onChange={}
                                                                    type="text"
                                                                    fullWidth
                                                                    size='small'
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="OriginalstartingSalary"
                                                                    label="Starting Salary"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.jobSalary}
                                                                    // onChange={}
                                                                    type="number"
                                                                    fullWidth
                                                                    size='small'
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="OriginalstartingDate"
                                                                    // label="Starting Salary"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.startDate}
                                                                    // onChange={}
                                                                    type="date"
                                                                    helperText="Starting date"
                                                                    fullWidth
                                                                    size='small'
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="OriginaljobDescription"
                                                                    label="Job Description"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.jobDescription}
                                                                    // onChange={}
                                                                    type="date"
                                                                    fullWidth
                                                                    multiline
                                                                    rows={3}
                                                                    size='small'
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id="OriginalotherConditions"
                                                                    label="Other Conditions"
                                                                    variant="outlined"
                                                                    defaultValue={this.state.otherConditions}
                                                                    // onChange={}
                                                                    type="date"
                                                                    fullWidth
                                                                    multiline
                                                                    rows={3}
                                                                    size='small'
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </Grid>

                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}

                        </Grid>

                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                        {this.state.modifyButton && this.state.modifyOfferButton ? (
                            <>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => this.setState({ newOfferButton: true })}
                                    style={{ minWidth: 200 }}
                                >
                                    Send New Offer
                                </Button>
                            </>
                        ) : (
                                this.state.acceptButton ? (
                                    <>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => this.setState({ confirmOfferButton: true })}
                                            style={{ minWidth: 200 }}
                                        >
                                            Confirm Employee Onboard
                                        </Button>
                                    </>
                                ) : <div />

                            )}
                        {this.state.cancelButton ? (
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => this.setState({ cancelOfferButton: true })}
                                style={{ minWidth: 200 }}
                            >
                                Cancel Offer
                            </Button>
                        ) : <div />}
                    </DialogActions>
                </Dialog>
                {this.confirmOfferDialog()}
                {this.cancelOfferDialog()}
                {this.newOfferDialog()}
            </div>
        )
    }

    confirmOfferDialog() {
        return (
            <Dialog
                open={this.state.confirmOfferButton}
                onClose={() => this.setState({ confirmOfferButton: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure do you want to confirm this offer?"}</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={() => this.confirmJobOffer(this.state.employeeId)}
                        variant='contained'
                        color="primary">
                        Yes
              </Button>
                    <Button
                        onClick={() => this.setState({ confirmOfferButton: false })}
                        color="secondary"
                        variant='contained'
                        autoFocus>
                        No
              </Button>
                </DialogActions>
            </Dialog>
        );
    }

    cancelOfferDialog() {
        return (
            <Dialog
                open={this.state.cancelOfferButton}
                onClose={() => this.setState({ cancelOfferButton: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure do you want to cancel this offer?"}</DialogTitle>

                <DialogActions>
                    <Button
                        onClick={() => this.cancelJobOffer(this.state.viewDetailsData['employee'])}
                        variant='contained'
                        color="primary">
                        Yes
              </Button>
                    <Button
                        onClick={() => this.setState({ cancelOfferButton: false, viewOfferButton: false })}
                        color="secondary"
                        variant='contained'
                        autoFocus>
                        No
              </Button>
                </DialogActions>
            </Dialog>
        );
    }

    newOfferDialog() {
        return (
            <Dialog
                open={this.state.newOfferButton}
                onClose={() => this.setState({ newOfferButton: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure do you want to send this new offer?"}</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={() => this.newJobOffer(this.state.employeeId)}
                        variant='contained'
                        color="primary">
                        Yes
              </Button>
                    <Button
                        onClick={() => this.setState({ newOfferButton: false })}
                        color="secondary"
                        variant='contained'
                        autoFocus>
                        No
              </Button>
                </DialogActions>
            </Dialog>
        );
    }

    async sendJobOffer() {

        let bodyData = {
            "employee": this.state.selectedVotId,
            "jobCategory": this.state.selectedJobType,
            "jobTitle": this.state.jobTitle,
            "startSalary": this.state.jobSalary,
            "startDate": this.state.startDate,
            "jobDescription": this.state.jobDescription,
            "conditions": this.state.otherConditions,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/employers/newoboffer',
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
            console.log('jobOfferSuccess:', response);

            this.fetchOnboardOffers();

            this.setState({
                generateNewEmployementCodeDialog: false,
                selectedVotId: "",
                selectedJobType: "",
                jobTitle: "",
                startDate: "",
                jobDescription: "",
                otherConditions: "",
                jobSalary: ""
            })

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async confirmJobOffer(empId) {

        let bodyData = {}

        try {
            let response = await fetch(api + '/api/v1/employers/oboffers/' + empId + '/confirmJoined',
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
            console.log('confirmJob:', response);

            this.setState({ confirmOfferButton: false })
            this.fetchOnboardOffers();

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async cancelJobOffer(empId) {

        let bodyData = {}

        try {
            let response = await fetch(api + '/api/v1/employers/oboffers/' + this.state.employeeId + '/cancel',
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
            console.log('cancelJob:', response);

            this.setState({ cancelOfferButton: false, cancelOfferButton: false })
            this.fetchOnboardOffers();


        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async newJobOffer(empId) {

        let bodyData = {
            "employee": this.state.selectedVotId,
            "jobCategory": this.state.selectedJobType,
            "jobTitle": this.state.jobTitle,
            "startSalary": this.state.jobSalary,
            "startDate": this.state.startDate,
            "jobDescription": this.state.jobDescription,
            "conditions": this.state.otherConditions,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/employers/oboffers/' + empId + '/modify',
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }
            );
            response = await response.json();
            console.log('jobOfferSuccess:', response);

            this.fetchOnboardOffers();

            this.setState({
                selectedVotId: "",
                selectedJobType: "",
                jobTitle: "",
                startDate: "",
                jobDescription: "",
                otherConditions: "",
                jobSalary: ""
            })

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async joinEmployee(empId) {

        let bodyData = {}

        try {
            let response = await fetch(api + '/api/v1/employers/oboffers/' + empId + '/confirmJoined',
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
            console.log('cancelJob:', response);

            this.setState({ confirmOpen: false })
            this.fetchOnboardOffers();


        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }
}

export default withStyles(styles)(index);
