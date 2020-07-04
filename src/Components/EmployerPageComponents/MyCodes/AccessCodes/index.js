import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem, Divider } from '@material-ui/core/';

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

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Profile from '../Pages/Profile'
import Address from '../Pages/Address'
import Identity from '../Pages/Identity'
import Phone from '../Pages/Phone'
import Job from '../Pages/Job'

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"

const rows = [
    {
        "createdOn": "09/12/2020",
        "codeString": "testCodeString1",
        "employeeCompanyField": "testEmployeeCompanyField1",
        "codeStatus": "testCodeStatu1s",
        "statusChangeDate": "09/12/2020",
    },
    {
        "createdOn": "09/12/2020",
        "codeString": "testCodeString1",
        "employeeCompanyField": "testEmployeeCompanyField1",
        "codeStatus": "testCodeStatus2",
        "statusChangeDate": "09/12/2020",
    }
];

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

        codeRatings: false,
        codeAddress: false,
        codeProfile: false,
        codeIdentities: false,
        codePhones: false,
        codeJobHistory: false
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

    async fetchEmployeeOntracId(data) {
        let response = await fetch(api + "/api/v1/accounts/employee?ontrac_id=" + data,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('OTIDSuccess:', response)
        this.setState({ onTracId: response });
    }

    async fetchCodeDetails(id) {
        this.setState({ codeDetailsDialog: true })
        let response = await fetch(api + "/api/v1/codes/access/codes/" + id,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('codeDetailsSuccess:', response)
        this.setState({ codeDetails: response });
        console.log('codeDetailsDialog:', this.state.codeDetails)
    }

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
        // await this.fetchEmployeeOntracId();
        await this.fetchPendingCodes();
        // await this.fetchCodeDetails();

    }

    render() {

        const { classes } = this.props;

        const defaultProps = {
            options: top100Films,
            getOptionLabel: (option) => option.title,
        };

        return (
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
                                    <TableCell align="left">View</TableCell>
                                    {/* <TableCell align="left"></TableCell> */}
                                    <TableCell align="left">Actions</TableCell>
                                    {/* <TableCell align="left">Update</TableCell> */}
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
                                    color="default"
                                    variant="contained"
                                    style={{ minWidth: 120 }}
                                    onClick={() => {
                                        this.setState({ employeeDetailsData: this.state.allCodes[index] }, () => console.log('employeeDetailsData;', this.state.employeeDetailsData))
                                        this.viewEmployeeDetails(row.id)
                                    }}
                                >
                                    Employee Details
                                </Button>) : <div />}

                            <Button
                                size='small'
                                color="default"
                                variant="contained"
                                onClick={() => this.fetchCodeDetails(row.id)}
                                style={{ minWidth: 120, marginTop: 10 }}
                            >Code Details
                            </Button>
                        </TableCell>

                        <TableCell align="left">

                            <Grid container justify='row'>
                                <Grid item xs={12}>
                                    <Button
                                        size='small'
                                        color="primary"
                                        variant="outlined"
                                        style={{ minWidth: 120 }}
                                        onClick={() => this.postAccessCodeStatus(row.status_options_employer_field[0].status)}
                                    >
                                        {/* {row.status_options_employer_field[0].action} */}
                                    </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        size='small'
                                        color="secondary"
                                        variant="outlined"
                                        style={{ minWidth: 120, marginTop: 10 }}
                                        onClick={() => this.postAccessCodeStatus(row.status_options_employer_field[1].status)}

                                    >
                                        {/* {row.status_options_employer_field[1].action} */}
                                    </Button>
                                </Grid>

                            </Grid>

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
                            <Button
                                size='small'
                                color="default"
                                variant="contained"
                                style={{ minWidth: 120 }}
                                onClick={() => this.viewEmployeeDetails(row.id)}
                            >
                                Employee Details
                                    </Button>
                            <Button
                                size='small'
                                color="default"
                                variant="contained"
                                onClick={() => this.fetchCodeDetails(row.id)}
                                style={{ minWidth: 120, marginTop: 10 }}
                            >Code Details</Button>
                        </TableCell>
                        <TableCell align="left">
                            <Button size='small' color="primary" variant="outlined" style={{ minWidth: 120 }}>{row.status_options_employer_field[0].action}</Button>
                            <Button size='small' color="secondary" variant="outlined" style={{ minWidth: 120, marginTop: 10 }}>{row.status_options_employer_field[1].action}</Button>
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
                                        defaultValue={this.state.codeDetails['createdOn']}
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
                                        defaultValue={this.state.codeDetails['statusChangeDate']}
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
                                        // defaultValue={this.state.codeDetails.employee_name_field['name']}
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
                                    // defaultValue={this.state.employeeDetailsData.employee_name_field.name}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                    variant='outlined'
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
                                    variant='outlined'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1" fontWeight='bold'>
                                    Access granted for:
                                    </Typography>

                                <ExpansionPanel style={{ marginTop: 10 }}>
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
                                        <Profile />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel style={{ marginTop: 10 }}>
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
                                        <Address />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel style={{ marginTop: 10 }}>
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
                                        <Identity />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel style={{ marginTop: 10 }}>
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
                                        <Phone />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                <ExpansionPanel style={{ marginTop: 10 }}>
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
                                        <Job />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                                {/* <ExpansionPanel disabled>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3a-content"
                                            id="panel3a-header"
                                        >
                                            <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
                                        </ExpansionPanelSummary>
                                    </ExpansionPanel> */}

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
                                    <TextField
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

    async postGenerateAccessCode(id) {

        let bodyData = {
            "employer": id,
            "employee": 4,
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

    async postAccessCodeStatus(status) {

        let bodyData = {
            "codeStatus": status,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/codes/access/codes',
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
            console.log('postCodeStatusSuccess:', response);

            await this.fetchAllCodes();
            await this.fetchPendingCodes();

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default withStyles(styles)(index);
