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

let myJobHistory = [];
let companyChoices = [];
let positionCategories = [];
let reasonsChoices = [];

class myJobProfile extends Component {
    state = {
        updateDialogOpen: false,
        editActionsOpen: false,
        tabularBoolean: false,
        isloading: false,
        selectedIndex: -1,
        id: "",
        companies: [],
        positions: [],
        leavingReasons: [],
        addJobDialog: {
            company: '',
            // check
            otherCompany: '',
            startDate: new Date(),
            endDate: new Date(),
            position: '',
            jobTitle: '',
            jobDescription: '',
            reasonForLeaving: '',
            rating: 0,
        },
        editJobDialog: {
            company: '',
            // check
            otherCompany: '',
            startDate: new Date(),
            endDate: new Date(),
            position: '',
            jobTitle: '',
            jobDescription: '',
            reasonForLeaving: '',
            rating: 0,
        },
        availableCompanies: [],
        check: false,
        isloading: true
    }


    // async componentDidMount() {
    //     this.fetchFromFakeApi();
    //     this.fetchAllCompanies();
    //     await axios
    //         .get("http://3.22.17.212:8000/api/v1/employees/16/jobhistory", {
    //             headers: {
    //                 Authorization:
    //                     "Token c83a0089d10de372e7fc5f4d08f257a3dcc22f09a7071fed2d5a45fdfe87c26e",
    //             },
    //         })
    //         .then((res) => {
    //             result = res.data;
    //             this.setState({ id: result[0].id })
    //             this.setState({ isloading: false });
    //         });
    //     console.table(result);
    //     console.log(result[0].id);
    // }

    // async componentDidMount() {
    //     let response = await fetch('api',
    //     {
    //         headers: 'Authorization: Token'
    //     });
    //     console.log
    // }

    async componentDidMount() {
        await axios
            .get("http://3.22.17.212:8000/api/v1/employees/" + id + "/jobs", {
                headers: {
                    Authorization:
                        token,
                },
            })
            .then((res) => {
                myJobHistory = res.data;
                console.table("myJobHistory:", myJobHistory);
            });

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
                this.setState({ companies: companyChoices.map(company => company.companyName) })
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
                this.setState({ positions: positionCategories.map(position => position.positionCategory) })
                console.log("positionsList:", this.state.positions)
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
                this.setState({ leavingReasons: reasonsChoices.map(leavingReason => leavingReason.reason) })
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
                {/* ADD JOB HISTORY DIALOG BOX */}
                {
                    <Dialog open={this.state.updateDialogOpen} onClose={() => this.setState({ updateDialogOpen: false })} aria-labelledby="form-dialog-title">
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
                                            value={this.state.addJobDialog.company}
                                            onChange={event => {this.setState({ addJobDialog: { company: event.target.value } }); console.log(this.state.addJobDialog)} }                                            fullWidth
                                        >
                                            {
                                                this.state.companies.map(company => <MenuItem value={company}>{company}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={3} style={{ marginTop: 15 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.setState.check}
                                                // onChange={handleChange}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Other"
                                    />
                                </Grid>

                                {
                                    this.state.check === false ? (
                                        <Grid item fullWidth xs={12}>
                                            <TextField
                                                id="otherCompany"
                                                label="Other Company"
                                                value={this.state.addJobDialog.otherCompany}
                                                onChange={event => this.setState({ addJobDialog: { otherCompany: event.target.value } })}
                                                type="text"
                                                fullWidth
                                            />
                                        </Grid>
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
                                            value={this.state.addJobDialog.startDate}
                                            onChange={date => this.setState({ addJobDialog: { startDate: date } })}
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
                                            value={this.state.addJobDialog.endDate}
                                            style={{ marginLeft: 32 }}
                                            onChange={date => this.setState({ addJobDialog: { endDate: date } })}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth size='small'>
                                        <InputLabel id="positionLabel">
                                            Position
                                            </InputLabel>
                                        <Select
                                            labelId="positionLabel"
                                            id="position"
                                            value={this.state.addJobDialog.position}
                                            onChange={event => {this.setState({ addJobDialog: { position: event.target.value } }); console.log(this.state.addJobDialog)}}                                            fullWidth
                                        >
                                            {
                                                this.state.positions.map(position => <MenuItem value={position}>{position}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="jobTitle"
                                        label="Job Title"
                                        value={this.state.addJobDialog.jobTitle}
                                        onChange={event => this.setState({ addJobDialog: { jobTitle: event.target.value } })}
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
                                        value={this.state.addJobDialog.jd}
                                        onChange={event => this.setState({ addJobDialog: { jobDescription: event.target.value } })}
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
                                            value={this.state.addJobDialog.reasonForLeaving}
                                            onChange={event => this.setState({ addJobDialog: { reasonForLeaving: event.target.value } })}
                                            label="resonForLeaving"
                                            fullWidth
                                        >
                                            {
                                                this.state.leavingReasons.map(leavingReason => <MenuItem value={leavingReason}>{leavingReason}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} style={{marginTop: 15}} >
                                    <Typography >How do you rate this company?</Typography>
                                </Grid>

                                <Grid item xs={6} style={{marginTop: 15}} >
                                    <Rating
                                        name="simple-controlled"
                                        value={this.state.addJobDialog.rating}
                                        onChange={(event, newValue) => this.setState({ addJobDialog: { rating: newValue } })}
                                        max={10}
                                    />
                                </Grid>

                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button style={{ width: 85 }} onClick={this.addJobProfile} color="primary" variant="contained">
                                Add
                            </Button>
                            <Button color="secondary" variant="contained" onClick={() => this.setState({ updateDialogOpen: false, selectedIndex: -1 })}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
                {
                    this.state.isloading ?
                        (
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                display="flex"
                                style={{ minHeight: "100vh" }}
                            >
                                <CircularProgress />
                            </Grid>
                        )

                        :

                        (this.state.tabularBoolean ?

                            (
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
                                                <Button color="primary" variant='contained' onClick={() => this.setState({ updateDialogOpen: true })}>
                                                    Add New Job History
                                                </Button>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                </Grid>
                            )
                            :
                            (

                                <Grid container spacing={3} justify="space-between" >
                                    <Grid item xs={6}>
                                        <h1>My Job Profile</h1>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button color="secondary" style={{ marginTop: 25, marginLeft: 32 }} variant='contained' onClick={() => this.setState({ updateDialogOpen: true })} >
                                            Add New Job History
                                        </Button>
                                    </Grid>



                                    <Grid item xs={12} >
                                        {this.getTableOfEmployees()}
                                    </Grid>
                                </Grid>

                            )
                        )
                }

{
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
                                            value={this.state.editJobDialog.company}
                                            onChange={event => this.setState({ editJobDialog: { company: event.target.value } })}
                                            label="company"
                                            fullWidth
                                        >
                                            {
                                                this.state.companies.map(company => <MenuItem value={company}>{company}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={3} style={{ marginTop: 15 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.setState.check}
                                                // onChange={handleChange}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Other"
                                    />
                                </Grid>

                                {
                                    this.state.check === false ? (
                                        <Grid item fullWidth xs={12}>
                                            <TextField
                                                id="otherCompany"
                                                label="Other Company"
                                                value={this.state.editJobDialog.otherCompany}
                                                onChange={event => this.setState({ editJobDialog: { otherCompany: event.target.value } })}
                                                type="text"
                                                fullWidth
                                            />
                                        </Grid>
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
                                            value={this.state.editJobDialog.startDate}
                                            onChange={date => this.setState({ editJobDialog: { startDate: date } })}
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
                                            value={this.state.editJobDialog.endDate}
                                            style={{ marginLeft: 32 }}
                                            onChange={date => this.setState({ editJobDialog: { endDate: date } })}
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
                                            value={this.state.editJobDialog.position}
                                            onChange={event => this.setState({ editJobDialog: { position: event.target.value } })}
                                            label="position"
                                            fullWidth
                                        >
                                            {
                                                this.state.positions.map(position => <MenuItem value={position}>{position}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="jobTitle"
                                        label="Job Title"
                                        value={this.state.editJobDialog.jobTitle}
                                        onChange={event => this.setState({ editJobDialog: { jobTitle: event.target.value } })}
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
                                        value={this.state.editJobDialog.jd}
                                        onChange={event => this.setState({ editJobDialog: { jobDescription: event.target.value } })}
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
                                            value={this.state.editJobDialog.reasonForLeaving}
                                            onChange={event => this.setState({ editJobDialog: { reasonForLeaving: event.target.value } })}
                                            label="resonForLeaving"
                                            fullWidth
                                        >
                                            {
                                                this.state.leavingReasons.map(leavingReason => <MenuItem value={leavingReason}>{leavingReason}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} style={{marginTop: 15}} >
                                    <Typography >How do you rate this company?</Typography>
                                </Grid>

                                <Grid item xs={6} style={{marginTop: 15}} >
                                    <Rating
                                        name="simple-controlled"
                                        value={this.state.editJobDialog.rating}
                                        onChange={(event, newValue) => this.setState({ editJobDialog: { rating: newValue } })}
                                        max={10}
                                    />
                                </Grid>

                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button style={{ width: 85 }} onClick={this.editJobProfile} color="primary" variant="contained">
                                Edit
                            </Button>
                            <Button color="secondary" variant="contained" onClick={() => this.setState({ editActionsOpen: false, selectedIndex: -1 })}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
            </div>
        )
    }

    getTableOfEmployees() {
        return (
            <TableContainer component={Paper} elevation={16}>
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
                        {rows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.startDate}</TableCell>
                                <TableCell align="left">{row.endDate}</TableCell>
                                <TableCell align="left">{row.jobTitle}</TableCell>
                                <TableCell align="left">{row.position}</TableCell>
                                <TableCell align="left">{row.jobDescription}</TableCell>
                                <TableCell align="left" >
                                    <Button color="primary" variant="outlined">
                                        View Details
                                    </Button>

                                    <Button
                                        style={{ marginLeft: 10 }}
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() =>
                                            this.setState({
                                                editActionsOpen: true,
                                                selectedIndex: index
                                                // add the updatedstate elements here after passing the token and adding data
                                            })
                                        }
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </TableContainer>
        );
    }

    // async fetchAllCompanies() {
    //     let response = await fetch('http://3.22.17.212:8000/api/v1/employers',
    //         {
    //             headers: {
    //                 'Authorization': 'Token 300896c039a1e9513c44769461d9433beee5fd265ad258e38f39136600599671'
    //             }
    //         });
    //     console.log('http://3.22.17.212:8000/api/v1/employers');
    //     response = await response.json();
    //     let tempArr = [];
    //     response.forEach(element => {
    //         tempArr.push(element["companyName"]);
    //     });
    //     this.setState({ companies: tempArr });
    //     console.log(tempArr)
    // }

    // async fetchMyJobProfiles() {
    //     let response = await fetch('http://3.22.17.212:8000/api/v1/employees/3/jobs',
    //     {
    //         headers: {
    //             'Authorization': 'Token 300896c039a1e9513c44769461d9433beee5fd265ad258e38f39136600599671'
    //         }
    //     });
    //     console.log('http://3.22.17.212:8000/api/v1/employees/3/jobs');
    //     response = await response.json();
    //     let temArr2 = [];
    //     response.foreacch(element=> {
    //         tempArr2.push(element[""])
    //     })
    // }



    // async fetchFromFakeApi() {
    //     let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    //     response = await response.json();
    //     console.log(response["title"]);
    // }

    //     async fetchAllCompanies() {
    //     let response = await fetch('http://3.22.17.212:8000/api/v1/employers',
    //         {   
    //             method:'POST',
    //             body: 
    //             headers: {
    //                 'Authorization': token
    //             }
    //         });
    //     console.log('http://3.22.17.212:8000/api/v1/employers');
    //     response = await response.json();
    //     let tempArr = [];
    //     response.forEach(element => {
    //         tempArr.push(element["companyName"]);
    //     });
    //     this.setState({ companies: tempArr });
    //     console.log(tempArr)
    // }

    async addJobProfile() {
        try {
            let response = await fetch('http://3.22.17.212:8000/api/v1/employees/post-job',
                {   
                    method:'POST',
                    headers: {
                        'Authorization': 'Token '+token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'employee': id,
                        'company': this.state.company,
                        'startDate': this.state.startDate,
                        'endDate': this.state.endDate,
                        'jobCategory': this.state.position,
                        'jobTitle': this.state.jobTitle,
                        'jobDescription': this.state.jobDescription,
                        'leavingReason': this.state.reasonForLeaving,
                        'companyRating': this.state.rating,
                    })
                }
            );
            response = await response.json();
            console.log(response);
        } catch (error) {
          console.log("[!ON_REGISTER] " + error);
        }
    }

    async editJobProfile() {
        try {
            let headers = {
                headers: {
                  Authorization: token,
                  "Content-Type": "multipart/form-data",
                },
              };
              let bodyFormData = new FormData();
              bodyFormData.append("employee", id);
              bodyFormData.append("company", this.state.company);
              bodyFormData.append("startDate", this.state.startDate);
              bodyFormData.append("endDate", this.state.endDate);
              bodyFormData.append("jobCategory", this.state.position);
              bodyFormData.append("jobTitle", this.state.jobTitle);
              bodyFormData.append("jobDescription", this.state.jobDescription);
              bodyFormData.append("leavingReason", this.state.reasonForLeaving);
              bodyFormData.append("companyRating", this.state.rating);

              await axios
                .post(
                  "http://3.22.17.212:8000/api/v1/employees/update-jobhistory/<jobhistory Id being modified>", //Pending
                  bodyFormData,
                  headers
                )
                .then((response) => {
                  console.log(response);
                });
        } catch (error) {
          console.log("[!ON_REGISTER] " + error);
        }
    }

}

export default myJobProfile