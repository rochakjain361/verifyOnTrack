import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const rows = [
    {
        "date": "2016-12-01",
        "source": "nkjsadnsand",
        "id": "89yh12e",
        "fullname": "John Doe",
        "dob": "2000-09-01",
        "sex": "M",
        "picture": "https://sampleimage.com/sample",
        "verifier": "Verifier Name",
    },
    {
        "date": "2016-12-01",
        "source": "nkjsadnsand",
        "id": "89yh142e",
        "fullname": "John Doe 2",
        "dob": "2000-09-01",
        "sex": "M",
        "picture": "https://sampleimage.com/sample",
        "verifier": "Verifier Name",
    },
];

class MyProfile extends Component {
    state = {
        updateDialogOpen: false,
        selectedIndex: -1
    }

    render() {

        return (
            <div>
                <Grid container justify="space-between" alignItems="center">

                    <Grid item>
                        <h1>My Profile</h1>
                    </Grid>

                    <Grid item>
                        <Button variant="contained" color="secondary">Add Profile</Button>
                    </Grid>

                </Grid>
                {this.getTableOfEmployees()}
            </div>

        )
    }

    getTableOfEmployees() {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Source</TableCell>
                            <TableCell align="right">IdNumber</TableCell>
                            <TableCell align="right">Fullname</TableCell>
                            <TableCell align="right">Dob</TableCell>
                            <TableCell align="right">Sex</TableCell>
                            <TableCell align="right">Picture</TableCell>
                            <TableCell align="right">Verifier</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">History</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="right">{row.source}</TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.fullname}</TableCell>
                                <TableCell align="right">{row.dob}</TableCell>
                                <TableCell align="right">{row.sex}</TableCell>
                                <TableCell align="right"><Avatar>H</Avatar></TableCell>
                                <TableCell align="right">{row.verifier}</TableCell>
                                <TableCell align="right"><Button color="primary" onClick={() => this.setState({ updateDialogOpen: true, selectedIndex: index })}>Update</Button></TableCell>
                                <TableCell align="right"><Button color="secondary">History</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {
                    this.state.selectedIndex === -1 ? <div /> : <Dialog open={this.state.updateDialogOpen} onClose={() => this.setState({ updateDialogOpen: false })} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send updates
                                occasionally.
                        </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Full Name"
                                type="text"
                                fullWidth
                                value={rows[this.state.selectedIndex].fullname}
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

export default MyProfile
