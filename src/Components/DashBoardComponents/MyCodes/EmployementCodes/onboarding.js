import React,{useState,useEffect} from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core/';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Fab,
   
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
import TabsEmployment from "../EmployementCodes/tabsEmployment";
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
const viewDialouge =()=>{
return(
    <div>
    <Dialog 
    // open={viewOfferButton} 
    // onClose={() => this.setState({ viewOfferButton: false })} 
    >
        <DialogTitle id="alert-dialog-title">{"Job Details"}</DialogTitle>
        <DialogContent>
            <Grid container justify='space-between' spacing={2}>

                <Grid item xs={6}>
                    <TextField
                        id="verifyOntracId"
                        label="Verify Ontrac Id"
                        // defaultValue={id.firstname}
                        type="text"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        size='small'
                    />
                </Grid>

                <Grid item>
                    {this.state.modifyOfferButton ? (
                        <>
                            <Fab
                                size="small"
                                color="default"
                                // onClick={() => this.setState({ modifyOfferButton: !this.state.modifyOfferButton })}
                            >
                                <ArrowBackIcon />
                            </Fab>
                        </>
                    ) : (
                            <>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    size='large'
                                    // onClick={() => this.setState({ modifyOfferButton: !this.state.modifyOfferButton })}
                                >
                                    Modify Offer
                                </Button>
                            </>
                        )}
                </Grid>

                {this.state.modifyOfferButton ? (
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
                                        <Autocomplete
                                            // options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                            // getOptionLabel={(option) => option.email}
                                            // groupBy={(option) => option.firstLetter}
                                            id="adminEmail"
                                            Username
                                            size='small'
                                            fullWidth
                                            value={this.state.selectedstate}
                                            // onChange={(event, value) => {
                                            //     this.setState({ selectedstate: value });
                                            //     this.setState({ assignAdminId: value['id'] })
                                            //     console.log("selectedstate", value);
                                            //     console.log("assignAdminID", this.state.assignAdminId);
                                            // }}
                                            inputValue={this.state.enteredUsername}
                                            // onInputChange={(event, newInputValue) => {
                                            //     this.setState({ enteredUsername: newInputValue });
                                            //     // console.log(newInputValue);
                                            // }}
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
                            </Paper>
                        </Grid>
                    </>
                ) : (
                        <>
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
                                            <Autocomplete
                                                // options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                                // getOptionLabel={(option) => option.email}
                                                // groupBy={(option) => option.firstLetter}
                                                id="adminEmail"
                                                Username
                                                size='small'
                                                fullWidth
                                                value={this.state.selectedstate}
                                                // onChange={(event, value) => {
                                                //     this.setState({ selectedstate: value });
                                                //     this.setState({ assignAdminId: value['id'] })
                                                //     console.log("selectedstate", value);
                                                //     console.log("assignAdminID", this.state.assignAdminId);
                                                // }}
                                                // inputValue={this.state.enteredUsername}
                                                // onInputChange={(event, newInputValue) => {
                                                //     this.setState({ enteredUsername: newInputValue });
                                                //     // console.log(newInputValue);
                                                // }}
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
                                            <Autocomplete
                                                // options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                                // getOptionLabel={(option) => option.email}
                                                // groupBy={(option) => option.firstLetter}
                                                id="adminEmail"
                                                Username
                                                size='small'
                                                fullWidth
                                                value={this.state.selectedstate}
                                                // onChange={(event, value) => {
                                                //     this.setState({ selectedstate: value });
                                                //     this.setState({ assignAdminId: value['id'] })
                                                //     console.log("selectedstate", value);
                                                //     console.log("assignAdminID", this.state.assignAdminId);
                                                // }}
                                                // inputValue={this.state.enteredUsername}
                                                // onInputChange={(event, newInputValue) => {
                                                //     this.setState({ enteredUsername: newInputValue });
                                                //     // console.log(newInputValue);
                                                // }}
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
                                </Paper>
                            </Grid>
                        </>
                    )}

            </Grid>

        </DialogContent>
        <DialogActions style={{ padding: 15 }}>
            {this.state.modifyOfferButton ? (
                <>
                    <Button
                        color="primary"
                        variant="contained"
                        // onClick={() => this.setState({ viewOfferButton: false, selectedIndex: -1 })}
                        style={{ minWidth: 200 }}
                    >
                        Send New Offer
            </Button>
                </>
            ) : (
                    <>
                        <Button
                            color="primary"
                            variant="contained"
                            // onClick={() => this.setState({ viewOfferButton: false, selectedIndex: -1 })}
                            style={{ minWidth: 200 }}
                        >
                            Confirm Employee Onboard
            </Button>
                    </>
                )}
            <Button
                color="secondary"
                variant="contained"
                // onClick={() => this.setState({ viewOfferButton: false, selectedIndex: -1 })}
                style={{ minWidth: 200 }}
            >
                Cancel Offer
            </Button>
        </DialogActions>
    </Dialog>
</div>
)
}
function Onboarding() {
    const [generateNewEmployementCodeDialog,setGenerateNewEmployementCodeDialog]=React.useState(false);
    return (
        <div>
             <Grid container justify='space-between' alignItems='center' spacing={4}>

<Grid item xs={8}>
    <Typography variant='h4'>
        Employement Codes
            </Typography>
</Grid>

<Grid item xs={4}>
    <Button color='secondary' variant='contained' onClick={() => setGenerateNewEmployementCodeDialog(true)} fullWidth>  Generate new employment code </Button>
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
            {["CreatedOn","EmployeeOntracid","Jobcategories","Jobtitle","Startdate","Obstatus","Action"].map((tablename)=>(
                <TableCell align="left">{tablename}</TableCell>
              
                ))}
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
                    <TableCell align="left"><FormControl style={{ minWidth: 85 }} variant="outlined" size='small' fullWidth>
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
                    </FormControl></TableCell>
                    <TableCell align="left"><Button size='small' color="primary" variant="outlined" onClick={()=>viewDialouge()}>View Details</Button></TableCell>
                   
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>

</Grid>
{/* </Paper> */}

{
<div>
    <Dialog open={generateNewEmployementCodeDialog} onClose={() =>  setGenerateNewEmployementCodeDialog(false)} >
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
            <Button color="secondary" variant="contained" onClick={() => setGenerateNewEmployementCodeDialog(false)}>
                Generate One-time Code
        </Button>
        </DialogActions>
    </Dialog>
</div>
}
        </div>
    )
}

export default Onboarding
