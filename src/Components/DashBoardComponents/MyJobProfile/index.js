import React, { Component, useState } from 'react'
import { Typography, Grid, Paper } from '@material-ui/core'
import GradientButton from '../../GradientButton'
import { Button } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import axios from "axios";

const rows = [
    {
        "startDate": "2016-12-01",
        "endDate": "2016-12-01",
        "employer": "testEmployer",
        "position": "myPosition",
        "vonStatus": "testVONstatus",
        "actions": "testActions"
    },

    {
        "startDate": "2016-12-01",
        "endDate": "2016-12-01",
        "employer": "testEmployer",
        "position": "myPosition",
        "vonStatus": "testVONstatus",
        "actions": "testActions"
    }

];
let result = [];

class myJobProfile extends Component {
    state = {
        updateDialogOpen: false,
        tabularBoolean: false,
        isloading: false,
        selectedIndex: -1,
        id: "",
        dialogBoxData: {
            startDate: '',
            endDate: '',
            employer: '',
            position: '',
            vonStatus: '',
            actions: '',
        }
    }

    async componentDidMount() {
        await axios
            .get("http://3.22.17.212:8000/api/v1/employees/16/jobhistory", {
                headers: {
                    Authorization:
                        "Token fc4efcc952e2f668197c1a2d5dd5be77236de1d3fb16c2a04adabac02d5f58e3",
                },
            })
            .then((res) => {
                result = res.data;
                this.setState({ id: result[0].id })
                this.setState({ isloading: false });
            });
        console.table(result);
        console.log(result[0].id);
    }

    render() {
        return (

            <div>
                {
                    <Dialog open={this.state.updateDialogOpen} onClose={() => this.setState({ updateDialogOpen: false })} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add new job profile</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter the details of your Job profile to be added
                        </DialogContentText>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="startDate"
                                label="Start Date"
                                type="text"
                                fullWidth
                                value={this.state.dialogBoxData.startDate}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="endDate"
                                label="End Date"
                                type="text"
                                fullWidth
                                value={this.state.dialogBoxData.endDate}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="employer"
                                label="Employer"
                                type="text"
                                fullWidth
                                value={this.state.dialogBoxData.employer}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="position"
                                label="Position"
                                type="text"
                                fullWidth
                                value={this.state.dialogBoxData.position}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="vonStatus"
                                label="VON-Status"
                                type="text"
                                fullWidth
                                value={this.state.dialogBoxData.vonStatus}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="actions"
                                label="Actions"
                                type="text"
                                fullWidth
                                value={this.state.dialogBoxData.actions}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" variant="outlined">
                                Update
                            </Button>
                            <Button color="secondary" variant="outlined" onClick={() => this.setState({ updateDialogOpen: false, selectedIndex: -1 })}>
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
                                                <Button color="primary" variant='outlined' onClick={() => this.setState({ updateDialogOpen: true })}>
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
                                        <Button color="secondary" style={{ marginTop: 25 }} variant='outlined' onClick={() => this.setState({ updateDialogOpen: true })} >
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
                                <TableCell align="left">{row.employer}</TableCell>
                                <TableCell align="left">{row.position}</TableCell>
                                <TableCell align="left">{row.vonStatus}</TableCell>
                                <TableCell align="left">{row.actions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </TableContainer>
        );
    }
}

export default myJobProfile