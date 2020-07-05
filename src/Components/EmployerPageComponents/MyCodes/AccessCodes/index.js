import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, CircularProgress, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem, Divider } from '@material-ui/core/';

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

import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PaymentIcon from '@material-ui/icons/Payment';
import PhoneIcon from '@material-ui/icons/Phone';
import WorkIcon from '@material-ui/icons/Work';
import StarsIcon from '@material-ui/icons/Stars';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Profile from '../Pages/Profile'
import Address from '../Pages/Address'
import Identity from '../Pages/Identity'
import Phone from '../Pages/Phone'
import Job from '../Pages/Job'
import Ratings from '../Pages/Ratings';

import axios from 'axios'

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"

const styles = theme => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
})


class index extends Component {

    state = {
        generateNewEmployementCodeDialog: false,
        codeDetailsDialog: false,
        employeeDetailsDialog: false,
        pendingCodesCheck: false,

        employeeByRadio: "searchByPhone",
        generateCodeData: '',

        allCodes: [],
        pendingCodes: [],
        phones: [],
        onTracId: [],
        codeDetails: [],
        employeeDetailsData: [],
        selectedOnTracId: [],

        enteredOntracId: '',
        employeeVotId: '',
        selectedstate: '',
        status: '',
        employeeName: '',

        codeRatings: false,
        codeAddress: false,
        codeProfile: false,
        codeIdentities: false,
        codePhones: false,
        codeJobHistory: false,
        isLoading: true,
        // codeButton: true
    }

    constructor(props) {
        super(props);
        this.allCodesTable = this.allCodesTable.bind(this);
    }

    async fetchAllCodes() {
        let response = await fetch(api + "/api/v1/codes/access/codes",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('allCodesSuccess:', response)
        this.setState({ allCodes: response })
    }

    async fetchPendingCodes() {
        let response = await fetch(api + "/api/v1/codes/access/codes",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('pendingCodesSuccess:', response)
        this.setState({ pendingCodes: response });
    }

    // async fetchEmployeePhones() {
    //     let response = await fetch(api + "/api/v1/accounts/employee?phone=23456332",
    //         {
    //             headers: {
    //                 'Authorization': token
    //             }
    //         });
    //     response = await response.json();
    //     console.log('phoneSuccess:', response)
    //     this.setState({ phones: response });
    // }

    async fetchEmployeeOntracId() {
        let response = await fetch(api + "/api/v1/accounts/employee?ontrac_id",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('OTIDSuccess:', response)
        this.setState({ onTracId: response });
    }
    async selectedEmployeeOntracId() {
        let response = await fetch(api + "/api/v1/accounts/employee?ontrac_id",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('OTIDSuccess:', response)
        // this.setState({ selectedOnTracId: response, codeButton: false });
    }

    // async fetchCodeDetails(id) {
    //     this.setState({ codeDetailsDialog: true })
    //     let response = await fetch(api + "/api/v1/codes/access/codes/" + id,
    //         {
    //             headers: {
    //                 'Authorization': token
    //             }
    //         });
    //     response = await response.json();
    //     console.log('codeDetailsSuccess:', response)
    //     this.setState({ codeDetails: response });
    //     console.log('codeDetailsDialog:', this.state.codeDetails)
    // }

    viewEmployeeDetails(id) {
        // this.viewEmployeeDetailsDialog()
        this.setState({ employeeDetailsDialog: true })
    }


    async componentDidMount() {

        const token1 = localStorage.getItem("Token");
        const token = "Token " + token1;
        const id = localStorage.getItem("id");

        await this.fetchAllCodes();
        // await this.fetchEmployeePhones();
        await this.fetchEmployeeOntracId();
        await this.fetchPendingCodes();
        // await this.fetchCodeDetails();

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

                                    <Grid item xs={8}>
                                        <Typography variant='h4'>
                                            Access Codes
                                    </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Button
                                            color='secondary'
                                            variant='contained'
                                            onClick={() => this.setState({ generateNewEmployementCodeDialog: !this.state.generateNewEmployementCodeDialog })}
                                            fullWidth
                                        >
                                            Create New code
                            </Button>
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
                                            label="Show open codes"
                                        />
                                    </Grid>

                                </Grid>

                                <Grid container justify='flex-start' alignItems='center' spacing={2}>

                                    <TableContainer component={Paper} style={{ maxWidth: '94%', marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow style={{ backgroundColor: 'black' }}>
                                                    <TableCell align="left">Date</TableCell>
                                                    <TableCell align="left">Code</TableCell>
                                                    <TableCell align="left">Employee</TableCell>
                                                    <TableCell align="left">Code Status</TableCell>
                                                    <TableCell align="left">Last Updated</TableCell>
                                                    <TableCell align="center">View</TableCell>
                                                    <TableCell align="left">Actions</TableCell>
                                                    <TableCell align="left">Update Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {this.tableDisplayLogic()}
                                            {this.viewCodeDetails()}
                                            {this.viewEmployeeDetailsDialog()}
                                        </Table>
                                    </TableContainer>

                                </Grid>
                                {/* </Paper> */}

                                {/* GENERATE NEW CODE DIALOG DATA */}
                                {this.generateAccessCode()}

                            </div>
                        )
                }
            </>

        )
    }

    allCodesTable() {
        return (
            <TableBody>
                {this.state.allCodes.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align="left">{new Date(row.createdOn).toDateString()}</TableCell>
                        <TableCell align="left">{row.codeString}</TableCell>
                        <TableCell align="left">{row.employee_name_field.name}</TableCell>
                        <TableCell align="left">{row.codeStatus}</TableCell>
                        <TableCell align="left">{new Date(row.statusChangeDate).toDateString()}</TableCell>
                        <TableCell align="left">

                            {row.codeStatus == "AccessGranted" || row.codeStatus == "GrantViewed" ? (
                                <Button
                                    size='small'
                                    color="primary"
                                    variant="outlined"
                                    fullWidth
                                    style={{ minWidth: 120 }}
                                    onClick={() => {
                                        this.setState({ employeeDetailsData: this.state.allCodes[index], employeeName: this.state.allCodes[index].employee_name_field.name},
                                        () => console.log('employeeDetailsData;', this.state.employeeDetailsData))
                                        this.viewEmployeeDetails(row.id)
                                    }}
                                >
                                    Employee Details
                                </Button>) : <div />}

                            <Button
                                size='small'
                                color="primary"
                                variant="outlined"
                                fullWidth
                                onClick={() =>
                                    this.setState({ codeDetails: this.state.allCodes[index], employeeName: this.state.allCodes[index].employee_name_field.name, codeDetailsDialog: true }, console.log('object:', this.state.codeDetails))
                                    // this.fetchCodeDetails(row.id)
                                }
                                style={{ minWidth: 120, marginTop: 10 }}
                            >Code Details
                            </Button>
                        </TableCell>

                        <TableCell align="left">

                            <FormControl variant="outlined" size="medium" style={{ minWidth: 85 }}
                                fullWidth >
                                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    // value={this.state.status}
                                    onChange={(event) => { this.setState({ status: event.target.value }) }}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {row.status_options_employer_field.map((val) =>
                                        <MenuItem value={val.status}>{val.action}</MenuItem>
                                    )}

                                </Select>
                            </FormControl>

                        </TableCell>
                        <TableCell align="right">
                            <Button
                                size="small"
                                color="secondary"
                                variant="outlined"
                                fullWidth
                                onClick={() => { this.updatestatus(row.id) }}
                            >
                                Update Status
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
                {this.state.pendingCodes.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align="left">{new Date(row.createdOn).toDateString()}</TableCell>
                        <TableCell align="left">{row.codeString}</TableCell>
                        <TableCell align="left">{row.employee_name_field.name}</TableCell>
                        <TableCell align="left">{row.codeStatus}</TableCell>
                        <TableCell align="left">{new Date(row.statusChangeDate).toDateString()}</TableCell>
                        <TableCell align="left">

                            {row.codeStatus == "AccessGranted" || row.codeStatus == "GrantViewed" ? (
                                <Button
                                    size='small'
                                    color="primary"
                                    variant="outlined"
                                    fullWidth
                                    style={{ minWidth: 120 }}
                                    onClick={() => {
                                        this.setState({ employeeDetailsData: this.state.allCodes[index] },
                                            () => console.log('employeeDetailsData;', this.state.employeeDetailsData))
                                        this.viewEmployeeDetails(row.id)
                                    }}
                                >
                                    Employee Details
                                </Button>) : <div />}

                            <Button
                                size='small'
                                color="primary"
                                variant="outlined"
                                fullWidth
                                onClick={() =>
                                    this.setState({ codeDetails: this.state.allCodes[index], codeDetailsDialog: true })
                                    // this.fetchCodeDetails(row.id)
                                }
                                style={{ minWidth: 120, marginTop: 10 }}
                            >Code Details
                        </Button>
                        </TableCell>
                        <TableCell align="left">

                            <FormControl variant="outlined" size="medium" style={{ minWidth: 85 }}
                                fullWidth >
                                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    // value={this.state.status}
                                    onChange={(event) => { this.setState({ status: event.target.value }) }}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {row.status_options_employer_field.map((val) =>
                                        <MenuItem value={val.status}>{val.action}</MenuItem>
                                    )}

                                </Select>
                            </FormControl>

                        </TableCell>
                        <TableCell align="right">
                            <Button
                                size="small"
                                color="secondary"
                                variant="outlined"
                                fullWidth
                                onClick={() => { this.updatestatus(row.id) }}
                            >
                                Update Status
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
                <Dialog open={this.state.codeDetailsDialog} onClose={() => this.setState({ codeDetailsDialog: false })} >
                    <DialogTitle id="codeDetails">{"Code Details"}</DialogTitle>
                    <DialogContent>
                        <Paper variant='outlined' style={{ padding: 20 }}>
                            {/* <Grid container justify='space-between' direction='row' alignItems='center' spacing={2}>

                                <Typography>Code Id:</Typography>
                                <Typography>Created On:</Typography>

                            </Grid> */}

                            <Grid container justify='flex-start' direction='row' alignItems='center' spacing={2}>

                                <Grid item xs={6}>
                                    <TextField
                                        id="=viewCreatedOn"
                                        label="Created on"
                                        defaultValue={new Date(this.state.codeDetails['createdOn']).toDateString()}
                                        type="text"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        size='small'
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        id="=viewLastUpdated"
                                        label="Last updated"
                                        defaultValue={new Date(this.state.codeDetails['statusChangeDate']).toDateString()}
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
                                        id="=viewCodeString"
                                        label="Code String"
                                        defaultValue={this.state.codeDetails['codeString']}
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
                                        id="=viewEmployeeName"
                                        label="Employee Name"
                                        defaultValue={this.state.employeeName}
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
                                        id="=viewCurentStatus"
                                        label="Current Status"
                                        defaultValue={this.state.codeDetails['codeStatus']}
                                        type="text"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        size='small'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Access requested for:</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.codeDetails['canAccessRatings']}
                                                        name="ratings" />}
                                                label="Ratings"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.codeDetails['canAccessAddresses']}
                                                        name="address" />}
                                                label="Address"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.codeDetails['canAccessProfile']}
                                                        name="profile" />}
                                                label="Profile"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.codeDetails['canAccessIdentities']}
                                                        name="identites" />}
                                                label="Identities"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.codeDetails['canAccessPhones']}
                                                        name="phones" />}
                                                label="Phones"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.codeDetails['canAccessJobHistory']}
                                                        name="jobHistory" />}
                                                label="Job History"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Paper>
                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                        <Button color="secondary" variant="contained"
                            onClick={() =>
                                this.setState({ codeDetailsDialog: false, selectedIndex: -1 })
                            }>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    viewEmployeeDetailsDialog(id) {
        return (
            <div>
                <Dialog open={this.state.employeeDetailsDialog} onClose={() => this.setState({ employeeDetailsDialog: false })} >
                    <DialogTitle id="employeeDetails">{"Employee Details"}</DialogTitle>
                    <DialogContent>

                        {/* <Paper variant='outlined' style={{ padding: 20 }}> */}
                        {/* <Grid container justify='space-between' direction='row' alignItems='center' spacing={2}>

                                <Typography>Code Id:</Typography>
                                <Typography>Created On:</Typography>

                            </Grid> */}

                        <Grid container justify='flex-start' direction='row' alignItems='center' spacing={2}>


                            <Grid item xs={6}>
                                <TextField
                                    id="=viewEmployeeName"
                                    label="Employee Name"
                                    defaultValue={this.state.employeeName}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                    // variant='outlined'
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="=viewCodeString"
                                    label="Code String"
                                    defaultValue={this.state.employeeDetailsData['codeString']}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                    // variant='outlined'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1" fontWeight='bold'>
                                    Access granted for:
                                    </Typography>

                                <ExpansionPanel  disabled={this.state.canAccessProfile}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <Typography variant='subtitle2'>Profiles</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Profile userId={this.state.employeeDetailsData['employee']} code={this.state.employeeDetailsData['codeString']} />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel  disabled={this.state.canAccessAddresses}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <Typography variant='subtitle2'>Addresses</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Address userId={this.state.employeeDetailsData['employee']} code={this.state.employeeDetailsData['codeString']} />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel  disabled={this.state.canAccessIdentities}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <ListItemIcon>
                                            <PaymentIcon />
                                        </ListItemIcon>
                                        <Typography variant='subtitle2'>Identities</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Identity userId={this.state.employeeDetailsData['employee']} code={this.state.employeeDetailsData['codeString']} />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel  disabled={this.state.canAccessPhones}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <ListItemIcon>
                                            <PhoneIcon />
                                        </ListItemIcon>
                                        <Typography variant='subtitle2'>Phones</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Phone userId={this.state.employeeDetailsData['employee']} code={this.state.employeeDetailsData['codeString']} />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel  disabled={this.state.canAccessJobHistory}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <ListItemIcon>
                                            <WorkIcon />
                                        </ListItemIcon>
                                        <Typography variant='subtitle2'>Job profile history</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Job userId={this.state.employeeDetailsData['employee']} code={this.state.employeeDetailsData['codeString']} />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel  disabled={this.state.canAccessRatings}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <ListItemIcon>
                                            <StarsIcon />
                                        </ListItemIcon>
                                        <Typography variant='subtitle2'>Ratings</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Ratings userId={this.state.employeeDetailsData['employee']} code={this.state.employeeDetailsData['codeString']} />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>

                        </Grid>
                        {/* </Paper> */}

                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                        <Button color="secondary" variant="contained"
                            onClick={() =>
                                this.setState({ employeeDetailsDialog: false, selectedIndex: -1 })
                            }>
                            Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    generateAccessCode() {
        return (
            <div>
                <Dialog open={this.state.generateNewEmployementCodeDialog} onClose={() => this.setState({ generateNewEmployementCodeDialog: false })} >
                    <DialogTitle id="codegenerator">{"Code Generator"}</DialogTitle>
                    <DialogContent>
                        <Grid container justify='flex-start' direction='row' alignItems='center' spacing={2}>

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
                                    {/* <TextField
                                        id="searchByOntracId"
                                        label="OnTrac Id"
                                        variant="outlined"
                                        // helperText="Incorrect entry."
                                        fullWidth
                                        // value={this.state.generateCodeData}
                                        onChange={(event) => {
                                            this.setState({ generateCodeData: event.target.value })
                                            // this.fetchEmployeeOntracId(this.state.generateCodeData)
                                        }}
                                    /> */}

                                    {/* <Autocomplete
                                        id="combo-box-demo"
                                        options={this.state.onTracId}
                                        getOptionLabel={(option) => option.ontrac_id}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Verify OnTrac Id" variant="outlined" />}
                                        fullWidth
                                        Username
                                        // onChange={(event, value)=> {this.setState(employeeVotId: value)}}
                                    /> */}

                                    <Autocomplete
                                        id="searchByOntracId"
                                        options={this.state.onTracId}
                                        getOptionLabel={(VOTId) => VOTId.ontrac_id}
                                        Username
                                        fullWidth
                                        value={this.state.selectedstate}
                                        onChange={(event, value) => {
                                            this.setState({ selectedstate: value})
                                            this.setState({ employeeVotId: value['id'] }, console.log("employeeVotId", value['id']))
                                            console.log("selectedstate", value);

                                        }}
                                        inputValue={this.state.enteredOntracId}
                                        onInputChange={(event, newInputValue) => {
                                            this.setState({ enteredOntracId: newInputValue });
                                            // console.log(newInputValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Verify OnTrac Id"
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        )}
                                    />

                                </Grid>
                            ) : (
                                    <Grid item xs={12}>
                                        <TextField
                                            id="searchByPhone"
                                            label="Phone"
                                            variant="outlined"
                                            type='number'
                                            fullWidth
                                            // value={this.state.generateCodeData}
                                            onChange={(event) => this.setState({ generateCodeData: event.target.value })}
                                        />
                                    </Grid>)}


                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Provide access to:</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.codeRatings}
                                                    onChange={() => this.setState({ codeRatings: !this.state.codeRatings })}
                                                    name="ratings" />}
                                            label="Ratings"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.codeAddress}
                                                    onChange={() => this.setState({ codeAddress: !this.state.codeAddress })}
                                                    name="address" />}
                                            label="Address"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.codeProfile}
                                                    onChange={() => this.setState({ codeProfile: !this.state.codeProfile })}
                                                    name="profile" />}
                                            label="Profile"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.codeIdentities}
                                                    onChange={() => this.setState({ codeIdentities: !this.state.codeIdentities })}
                                                    name="identites" />}
                                            label="Identities"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.codePhones}
                                                    onChange={() => this.setState({ codePhones: !this.state.codePhones })}
                                                    name="phones" />}
                                            label="Phones"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.codeJobHistory}
                                                    onChange={() => this.setState({ codeJobHistory: !this.state.codeJobHistory })}
                                                    name="jobHistory" />}
                                            label="Job History"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                        </Grid>

                    </DialogContent>
                    {this.state.employeeByRadio !== 'searchByOntracId' ? (
                        <DialogActions style={{ padding: 15 }}>
                            <Button
                                color="secondary"
                                variant="contained"
                                disabled={this.state.codeButton}
                                onClick={() => this.postGenerateAccessCode()}
                            >
                                Generate One-time Code
                                 </Button>
                        </DialogActions>
                    ) : (
                            <DialogActions style={{ padding: 15 }}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => this.postGenerateAccessCode()}
                                >
                                    Generate One-time Code
                                 </Button>
                            </DialogActions>)}
                    {/* <DialogActions style={{ padding: 15 }}>
                        <Button 
                        color="secondary" 
                        variant="contained" 
                        onClick={() => console.log('gen:',this.state.generateCodeData)}>
                            Generate One-time Code
                         </Button>
                    </DialogActions> */}
                </Dialog>
            </div>
        );
    }

    async postGenerateAccessCode() {

        let bodyData = {
            "employer": id,
            "employee": this.state.employeeVotId,
            "canAccessProfile": this.state.codeProfile,
            "canAccessAddresses": this.state.codeAddress,
            "canAccessJobHistory": this.state.codeJobHistory,
            "canAccessPhones": this.state.codePhones,
            "canAccessIdentities": this.state.codeIdentities,
            "canAccessRatings": this.state.codeRatings
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/codes/access/new-code',
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
            console.log('postCodeSuccess:', response);

            await this.fetchAllCodes();
            await this.fetchPendingCodes();


            // this.setState({ addDialogOpen: false })
            // this.setState({ addJobDialogCompany: "" })
            // this.setState({ addJobDialogOtherCompany: "" })
            // this.setState({ addJobDialogStartDate: "" })
            // this.setState({ addJobDialogEndDate: "" })
            // this.setState({ addJobDialogPosition: "" })
            // this.setState({ addJobDialogJobTitle: "" })
            // this.setState({ addJobDialogJobDescription: "" })
            // this.setState({ addJobDialogReasonForLeaving: "" })
            // this.setState({ addJobDialogRating: "" })

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    // async updatestatus(id) {

    //     let bodyData = {
    //         "codeStatus": this.state.status,
    //     }

    //     console.log('Body data:', bodyData)

    //     try {
    //         let response = await fetch(api + '/api/v1/codes/access/codes' + id,
    //             {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Authorization': token,
    //                     'Content-Type': "multipart/form-data"
    //                 },
    //                 body: JSON.stringify(bodyData)
    //             }
    //         );
    //         response = await response.json();
    //         console.log('postCodeStatusSuccess:', response);

    //         await this.fetchAllCodes();
    //         await this.fetchPendingCodes();

    //     } catch (error) {
    //         console.log("[!ON_REGISTER] " + error);
    //     }
    // }

    async updatestatus(id) {
        let headers = {
            headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data",
            },
        };
        let bodyFormData = new FormData();
        bodyFormData.append("codeStatus", this.state.status);
        // console.log("check",this.state.status,id)


        await axios
            .put(
                "http://3.22.17.212:8000/api/v1/codes/access/update-code/" + id,
                bodyFormData,
                headers
            )
            .then((response) => {
                console.log(response);
            });
        await this.fetchAllCodes();
        await this.fetchPendingCodes();
    }
}

export default withStyles(styles)(index);
