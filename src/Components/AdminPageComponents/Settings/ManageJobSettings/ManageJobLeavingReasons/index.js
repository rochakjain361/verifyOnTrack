import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer } from '@material-ui/core/';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"
const cors = "https://cors-anywhere.herokuapp.com/"

const styles = theme => ({

})

class index extends Component {

    state = {
        allJobLeavingReasons: [],
        selectedJobLeavingReasons: [],

        jobLeavingReasonsArr: [],
        newjobLeavingReason: "",
    }

    async getJobLeavingReasons() {
        let response = await fetch(cors + api + "/api/v1/resManager/job/leaving-reasons",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log("getJobLeavingReasonsSuccess:", response)
        this.setState({ allJobLeavingReasons: response });
        this.setState({ jobLeavingReasonsArr: this.state.allJobLeavingReasons.map(addJobLeavingReason => addJobLeavingReason.reason) })
        console.log("allJobLeavingReasons:", this.state.jobLeavingReasonsArr)
        console.log("allJobLeavingReasonsArrList:", this.state.jobLeavingReasonsArr)
    }

    async componentDidMount() {
        this.getJobLeavingReasons();
    }

    render() {

        const allJobLeavingReasonsList = {
            options: this.state.allJobLeavingReasons,
            getOptionLabel: (jobLeaving) => jobLeaving.addJobLeavingReason,
        };

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item>
                        <Typography variant='h4'>
                            Job Leaving Reasons
                            </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="manageJobLeavingReasons" style={{ marginLeft: 10 }}>Search Job Leaving Reasons</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="manageJobLeavingReasons"
                                id="manageJobLeavingReasons"
                                value={this.state.selectedJobLeavingReasons}
                                onChange={event => this.setState({ selectedJobLeavingReasons: event.target.value })}
                            >
                                {
                                    this.state.jobLeavingReasonsArr.map(jobLeaving => <MenuItem key={jobLeaving} value={jobLeaving}>{jobLeaving}</MenuItem>)

                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* <Grid item xs={6}>
                        <Autocomplete
                            size='small'
                            {...allJobLeavingReasonsList}
                            id="addressTypes"
                            Username
                            onChange={event => this.setState({ selectedJobLeavingReasons: event.target.value })}
                            value={this.state.selectedJobLeavingReasons}
                            renderInput={(params) => <TextField {...params} label="Search jobLeaving types" margin="normal" variant='outlined' size='small' />}
                        />
                    </Grid> */}

                </Grid>

                <Grid container justify='flex-start' alignItems='center' style={{ marginTop: 20 }} spacing={2}>

                    <Grid item xs={3}>

                        <TextField
                            label="Enter Job Leaving reason to add"
                            variant='outlined'
                            size='medium'
                            fullWidth
                            onChange={(event) => {
                                this.setState({ newjobLeavingReason: event.target.value });
                            }}
                            value={this.state.newjobLeavingReason}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                            onClick={() => {
                                this.addJobLeavingReason();
                            }}
                            size="small"
                            color="secondary">
                            <AddIcon />
                        </Fab>
                    </Grid>

                    <TableContainer component={Paper} style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'black' }}>
                                    <TableCell align="left">Job Leaving Reason</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.allJobLeavingReasons.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.reason}</TableCell>
                                        <TableCell align="right"><Button variant='outlined' size='small' onClick={() => { this.deleteJobLeavingReason(index) }} color='secondary'>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
                {/* </Paper> */}
            </div>
        )
    }

    async addJobLeavingReason() {
        let bodyData = {
            'reason': this.state.newjobLeavingReason,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(cors + api + '/api/v1/resManager/job/leaving-reasons',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'reason': this.state.newjobLeavingReason,
                    })
                }
            );
            response = await response.json();
            console.log('AddJobLeavingSuccess:', response);
            await this.getJobLeavingReasons();
            this.setState({ newjobLeavingReason: "" })
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async deleteJobLeavingReason(index) {
        try {
            let response = await fetch(api + "/api/v1/resManager/job/categories/" + index + "/",
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': token,
                        // 'Content-Type': 'application/json'
                    }
                }
            );
            response = await response.json();
            console.log('delJobLeavingSuccess:', response);
            await this.getJobLeavingReasons();
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }
}

export default withStyles(styles)(index);

