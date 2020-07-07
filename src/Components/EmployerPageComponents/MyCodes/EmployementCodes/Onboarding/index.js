import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core/';

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

        onboardOffers: []
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   }

    async fetchOnboardOffers() {

        let response = await fetch(api + "/api/v1/employers/oboffers",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('obSuccess:', response)
        this.setState({ onboardOffers: response });
    }

    async componentDidMount() {
        token1 = localStorage.getItem("Token");
        token = "Token " + token1;
        id = localStorage.getItem("id");

        this.fetchOnboardOffers();
    }

    render() {

        const { classes } = this.props;

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
                        <Button color='secondary' variant='contained' onClick={() => this.setState({ generateNewEmployementCodeDialog: true })} fullWidth>  Generate New Onboarding Request </Button>
                    </Grid>

                    <Grid item>
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
                                {rows.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.createdOn}</TableCell>
                                        <TableCell align="left">{row.codeString}</TableCell>
                                        <TableCell align="left">{row.employerCompanyField}</TableCell>
                                        <TableCell align="left">{row.codeStatus}</TableCell>
                                        <TableCell align="left">{row.statusChangeDate}</TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"><Button size='small' color="primary" variant="outlined">View Details</Button></TableCell>
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

            </div>
        )
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
                <Dialog open={this.state.generateNewEmployementCodeDialog} onClose={() => this.setState({ generateNewEmployementCodeDialog: false })} >
                    <DialogTitle id="alert-dialog-title">{"Code Generator"}</DialogTitle>
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
                                            this.setState({ selectedstate: value })
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
                                        <Autocomplete
                                        id="searchByOntracId"
                                        options={this.state.onTracId}
                                        getOptionLabel={(VOTId) => VOTId.ontrac_id}
                                        Username
                                        fullWidth
                                        value={this.state.selectedstate}
                                        onChange={(event, value) => {
                                            this.setState({ selectedstate: value })
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
                                                label="Phone"
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                    </Grid>)}

                            <Grid item xs={12}>
                                <FormLabel component="legend">Enter Job Details:</FormLabel>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="verifyOntracId"
                                    label="Verify Ontrac Id"
                                    variant="outlined"
                                    // defaultValue={id.firstname}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Autocomplete
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
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="startingSalary"
                                    label="Starting Salary"
                                    variant="outlined"
                                    // value={id.firstname}
                                    // onChange={}
                                    type="number"
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="startingDate"
                                    // label="Starting Salary"
                                    variant="outlined"
                                    // value={id.firstname}
                                    // onChange={}
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
                                    // value={id.firstname}
                                    // onChange={}
                                    type="date"
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
                                    // value={id.firstname}
                                    // onChange={}
                                    type="date"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    size='small'
                                />
                            </Grid>

                        </Grid>

                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                        <Button color="secondary" variant="contained" onClick={() => this.setState({ generateNewEmployementCodeDialog: false, selectedIndex: -1 })}>
                            Send Job Request
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    // generateNewEmployementCodeButton() {
    //     return(
    //  
    //     )
    // }
}

export default withStyles(styles)(index);
