import React, { Component } from 'react'
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
        id: ""
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
                        <Grid container spacing={3} justify='flex-end'>
                            
                            <Grid item xs={12}>

                                <Paper style={{ padding: 20 }} elevation={3}>
                                    <Typography variant="h5" gutterBottom align='center'>
                                        Add job profiles to improve ratings.
                                    </Typography>

                                    <Grid item >
                                        <Button color="primary" variant='outlined'>
                                            Add New Job History
                                        </Button>

                                    </Grid>
                                </Paper>
                            </Grid>

                        </Grid>
                    ) 
                    : 
                    (
                    
                    <Grid container spacing={3} justify='flex-end'>
                        <Grid item xs={3}>
                            <Button color="secondary" variant='outlined' >Add New Job History</Button>
                        </Grid>

                        <Grid item xs={12} >
                            {this.getTableOfEmployees()}
                        </Grid>
                    </Grid>
                    
                    )
                    )
                
        ) 
            
    }

    getTableOfEmployees() {
        return (
            <TableContainer component={Paper} elevation={16}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'black' }}>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">End Date</TableCell>
                            <TableCell align="right">Employer</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell align="right">VON-Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="right">{row.startDate}</TableCell>
                                <TableCell align="right">{row.endDate}</TableCell>
                                <TableCell align="right">{row.employer}</TableCell>
                                <TableCell align="right">{row.position}</TableCell>
                                <TableCell align="right">{row.vonStatus}</TableCell>
                                <TableCell align="right">{row.actions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {
                    this.state.selectedIndex === -1 ? <div /> : <Dialog open={this.state.updateDialogOpen} onClose={() => this.setState({ updateDialogOpen: false })} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update Identity</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter the details of your profile to be updated
                        </DialogContentText>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="source"
                                label="Source"
                                type="text"
                                fullWidth
                                value={rows[this.state.selectedIndex].source}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="id"
                                label="ID"
                                type="text"
                                fullWidth
                                value={rows[this.state.selectedIndex].id}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Full Name"
                                type="text"
                                fullWidth
                                value={rows[this.state.selectedIndex].fullname}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="dob"
                                label="DOB"
                                type="text"
                                fullWidth
                                value={rows[this.state.selectedIndex].dob}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="sex"
                                label="Sex"
                                type="text"
                                fullWidth
                                value={rows[this.state.selectedIndex].sex}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="verifier"
                                label="Verifier"
                                type="text"
                                fullWidth
                                value={rows[this.state.selectedIndex].verifier}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button color="primary">
                                Update
                            </Button>
                            <Button color="secondary" onClick={() => this.setState({ updateDialogOpen: false, selectedIndex: -1 })}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
            </TableContainer>
        );
    }
}

export default myJobProfile