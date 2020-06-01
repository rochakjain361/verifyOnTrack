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
        "picture": "https://vengreso.com/wp-content/uploads/2016/03/LinkedIn-Profile-Professional-Picture-Sample-Bernie-Borges.png",
        "verifier": "Verifier Name",
    },
    {
        "date": "2016-12-01",
        "source": "nkjsadnsand",
        "id": "89yh142e",
        "fullname": "John Doe 2",
        "dob": "2000-09-01",
        "sex": "M",
        "picture": "https://vengreso.com/wp-content/uploads/2016/03/LinkedIn-Profile-Professional-Picture-Sample-Bernie-Borges.png",
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
                        <Button variant="contained" color="secondary" style={{fontFamily: 'Montserrat', fontWeight: 'bold', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>Add Profile</Button>
                    </Grid>

                </Grid>
                {this.getTableOfEmployees()}
            </div>

        )
    }

    getTableOfEmployees() {
        return (
            <TableContainer component={Paper} elevation={16}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'black' }}>
                            <TableCell style={{ fontWeight: 'bolder', fontFamily: 'Montserrat' }} align="center">Picture</TableCell>
                            <TableCell style={{ fontWeight: 'bolder', fontFamily: 'Montserrat' }} align="center">Date</TableCell>
                            <TableCell style={{ fontWeight: 'bolder', fontFamily: 'Montserrat' }} align="center">Source</TableCell>
                            <TableCell style={{ fontWeight: 'bolder', fontFamily: 'Montserrat' }} align="center">Fullname</TableCell>
                            <TableCell style={{ fontWeight: 'bolder', fontFamily: 'Montserrat' }} align="center">Dob</TableCell>
                            <TableCell style={{ fontWeight: 'bolder', fontFamily: 'Montserrat' }} align="center">Sex</TableCell>
                            <TableCell style={{ fontWeight: 'bolder', fontFamily: 'Montserrat' }} align="center">Verifier</TableCell>
                            <TableCell style={{ fontWeight: 'bolder', fontFamily: 'Montserrat' }} align="center">Update</TableCell>
                            <TableCell style={{ fontWeight: 'bolder', fontFamily: 'Montserrat' }} align="center">History</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="center"><Avatar src='https://vengreso.com/wp-content/uploads/2016/03/LinkedIn-Profile-Professional-Picture-Sample-Bernie-Borges.png'>Picture</Avatar></TableCell>
                                <TableCell component="th" align="center">
                                    {row.date}
                                </TableCell>
                                <TableCell align="center">{row.source}</TableCell>
                                <TableCell align="center">{row.fullname}</TableCell>
                                <TableCell align="center">{row.dob}</TableCell>
                                <TableCell align="center">{row.sex}</TableCell>
                                <TableCell align="center">{row.verifier}</TableCell>
                                <TableCell align="center"><Button color="primary" variant="outlined" onClick={() => this.setState({ updateDialogOpen: true, selectedIndex: index })}>Update</Button></TableCell>
                                <TableCell align="center"><Button variant="outlined" color="secondary">History</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {
                    this.state.selectedIndex === -1 ? <div /> : <Dialog open={this.state.updateDialogOpen} onClose={() => this.setState({ updateDialogOpen: false })} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
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

export default MyProfile
