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
        generateNewEmployementCodeDialog: false
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item xs={8}>
                        <Typography variant='h4'>
                            Employement Codes
                                </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Button color='secondary' variant='contained' onClick={() => this.setState({ generateNewEmployementCodeDialog: true })} fullWidth>  Generate new employment code </Button>
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
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Code</TableCell>
                                    <TableCell align="left">Employer</TableCell>
                                    <TableCell align="left">Code Status</TableCell>
                                    <TableCell align="left">Last Updated</TableCell>
                                    <TableCell align="left">Details</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                    <TableCell align="left">Update</TableCell>
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
                                        <TableCell align="left"><Button size='small' color="primary" variant="outlined">View Details</Button></TableCell>
                                        <TableCell align="left"><FormControl style={{ minWidth: 85 }} variant="outlined" size='small' fullWidth>
                                            <InputLabel id="">Status</InputLabel>
                                            <Select
                                                labelId="statusOptionsEmployeeField"
                                                id="statusOptionsEmployeeField"
                                                fullWidth
                                            // value={age}
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Decline Request</MenuItem>
                                                <MenuItem value={10}>Provide Profile Details</MenuItem>
                                                <MenuItem value={20}>Provide Job Details</MenuItem>

                                            </Select>
                                        </FormControl></TableCell>
                                        <TableCell align="right"><Button size='small' color="secondary" variant="outlined">Update</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
                {/* </Paper> */}

                {
                    <div>
                        <Dialog open={this.state.generateNewEmployementCodeDialog} onClose={() => this.setState({ generateNewEmployementCodeDialog: false })} >
                            <DialogTitle id="alert-dialog-title">{"Code Generator"}</DialogTitle>
                            <DialogContent>
                                <Grid container justify='flex-start' direction='row' alignItems='center' spacing={2}>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth size='small'>
                                            <InputLabel id="searchEmployeeBy">Search Employee by</InputLabel>
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
                                            <FormLabel component="legend">Employement code category</FormLabel>
                                            <RadioGroup
                                                aria-label="gender"
                                                name="codeCategory"
                                            // value={value}
                                            // onChange={handleChange}
                                            >
                                                <FormControlLabel value="employementEngagement" control={<Radio />} label="employementEngagement" />
                                                <FormControlLabel value="employementTermination" control={<Radio />} label="employementTermination" />
                                                <FormControlLabel value="employementUpdation" control={<Radio />} label="employementUpdation" />
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
                                                    name="employeeProfile" />}
                                                    label="Employee-Profile"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox
                                                    // checked={jobProfile}
                                                    // onChange={handleChange}
                                                    name="jobProfile" />}
                                                    label="Job-Profile"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* For Employement Termination */}

                                    <Grid item xs={12}>
                                    <FormControl fullWidth size='small'>
                                            <InputLabel id="selectJobProfileRecord">Select Job-Profile Record</InputLabel>
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
                                    <FormControl fullWidth size='small'>
                                            <InputLabel id="selectJobProfileRecord">Select Job-Profile Record</InputLabel>
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
                                            <FormLabel component="legend">Request updates for:</FormLabel>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox
                                                    // checked={employeeProfile}
                                                    // onChange={handleChange}
                                                    name="employeeProfile" />}
                                                    label="Employee-Profile"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox
                                                    // checked={jobProfile}
                                                    // onChange={handleChange}
                                                    name="jobProfile" />}
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
                                <Button color="secondary" variant="contained" onClick={() => this.setState({ generateNewEmployementCodeDialog: false, selectedIndex: -1 })}>
                                    Generate One-time Code
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }

            </div>
        )
    }

    // generateNewEmployementCodeButton() {
    //     return(
    //  
    //     )
    // }
}

export default withStyles(styles)(index);
