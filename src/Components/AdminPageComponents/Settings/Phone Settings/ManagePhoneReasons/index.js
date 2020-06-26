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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
import axios from 'axios'

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"
const cors = "https://cors-anywhere.herokuapp.com/"

const styles = theme => ({

})
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class index extends Component {

    state = {
        allPhoneReasons: [],
        selectedPhoneReasons: [],
        phoneReasonSelected: "",
        enteredReason: "",

        phoneReasonsArr: [],
        newPhoneReason: "",
        deleteDialogBox: false,
        deleteid: "",
        selectedIndex: "",
        snackbar: "",
        snackbarresponse: "",
    }

    async getPhoneReasons() {
        let response = await fetch(cors + api + "/api/v1/resManager/phone/reasons",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log("getPhoneReasonsSuccess:", response)
        this.setState({ allPhoneReasons: response });
        this.setState({ phoneReasonsArr: this.state.allPhoneReasons.map(phoneReason => phoneReason.phoneReason) })
        console.log("allPhoneReasons:", this.state.phoneReasonsArr)
        console.log("allphoneReasonsArrList:", this.state.phoneReasonsArr)
    }

    async componentDidMount() {
        this.getPhoneReasons();
    }

    render() {

        const allphoneReasonsList = {
            options: this.state.allPhoneReasons,
            getOptionLabel: (phone) => phone.phoneReason,
        };

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item>
                        <Typography variant='h4'>
                            Phone Reasons
                            </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Autocomplete
                            options={this.state.allPhoneReasons}
                            getOptionLabel={(option) => option.phoneReason}
                            size="small"
                            id="phoneReasons"
                            Username
                            value={this.state.phoneReasonSelected}
                            onChange={(event, value) => {
                                this.setState({ phoneReasonSelected: value });
                                console.log("phoneReasonSelected", value);
                            }}
                            inputValue={this.state.enteredtext}
                            onInputChange={(event, newInputValue) => {
                                this.setState({ enteredReason: newInputValue });
                                // console.log(newInputValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Phone Reasons"
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                        />
                    </Grid>



                </Grid>

                <Grid container justify='flex-start' alignItems='center' style={{ marginTop: 20 }} spacing={2}>

                    <Grid item xs={3}>

                        <TextField
                            label="Enter phone reason to add"
                            variant='outlined'
                            size='medium'
                            fullWidth
                            onChange={(event) => {
                                this.setState({ newPhoneReason: event.target.value });
                            }}
                            value={this.state.newPhoneReason}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                            onClick={() => {
                                this.addPhoneReason();
                            }}
                            size="small"
                            color="secondary">
                            <AddIcon />
                        </Fab>
                    </Grid>

                    {this.snackBar()}

                    <TableContainer component={Paper} style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'black' }}>
                                    <TableCell align="left">Phone Reason</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.allPhoneReasons.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.phoneReason}</TableCell>
                                        <TableCell align="right"><Button variant='outlined' size='small'
                                            onClick={() => {
                                                this.setState({
                                                    deleteDialogBox: true,
                                                    selectedIndex: index,
                                                    deleteid: row.id,
                                                });
                                            }} color='secondary'>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
                {/* </Paper> */}
                {this.deleteDialog()}
            </div>
        )
    }

    snackBar() {
        return (
            <Snackbar open={this.state.snackbar} autoHideDuration={1000} onClick={() => { this.setState({ snackbar: !this.state.snackbar }) }}>
                                    {this.state.snackbarresponse.status === 201 ? <Alert onClose={() => { this.setState({ snackbar: !this.state.snackbar }) }} severity="success">
                                        AddressType added sucessfully
</Alert> : this.state.snackbarresponse.status === 204 ? <Alert onClose={() => { this.setState({ snackbar: !this.state.snackbar }) }} severity="success">
                                            AddressType deleted sucessfully
</Alert> : <Alert onClose={() => { this.setState({ snackbar: !this.state.snackbar }) }} severity="error">
                                                Something went wrong please try again
</Alert>}
                                </Snackbar>
        );
    }

    deleteDialog(selectedIndex) {
        return (
            <div>
                <Dialog
                    open={this.state.deleteDialogBox}
                    onClose={() => this.setState({ deleteDialogBox: false })}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Current entry will be deleted, do you want to
                            continue?
          </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                        <Button
                            style={{ width: 85 }}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                this.deletePhoneReason(this.state.deleteid);
                                this.setState({ deleteDialogBox: false })
                            }}
                        >
                            Delete
          </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => {
                                this.setState({ deleteDialogBox: false })
                            }}
                        >
                            Cancel
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    // async addPhoneReason() {
    //     let bodyData = {
    //         'phoneReason': this.state.newPhoneReason,
    //     }

    //     console.log('Body data:', bodyData)

    //     try {
    //         let response = await fetch(api + '/api/v1/resManager/phone/reasons/',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Authorization': token,
    //                     'Content-Reason': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     'phoneReason': this.state.newPhoneReason,
    //                 })
    //             }
    //         );
    //         response = await response.json();
    //         console.log('AddPhoneSuccess:', response);
    //         await this.getPhoneReasons();
    //         this.setState({ newPhoneReason: "" })
    //         this.setState({ snackbar: true, snackbarresponse: response });
    //     } catch (error) {
    //         console.log("[!ON_REGISTER] " + error);
    //         this.setState({ snackbar: true, snackbarresponse: error.response })
    //     }
    // }

    async addPhoneReason() {
        let bodyData = {
            'phoneReason': this.state.newPhoneReason,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/resManager/phone/reasons/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'phoneReason': this.state.newPhoneReason,
                    })
                }
            );
            this.setState({ snackbar: true, snackbarresponse: response });

            console.log('Success:', response);
            await this.getPhoneReasons();



        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ snackbar: true, snackbarresponse: error.response })
        }
    }

    async deletePhoneReason(id) {
        this.setState({ deleteDialogBox: false })
        try {
            let response = await axios.delete(
                api + "/api/v1/resManager/phone/reasons/" + id + "/",
                {

                    headers: {
                        Authorization: token,
                        // 'Content-Type': 'application/json'
                    },
                }
            );
            console.log('Success:', response);
            this.setState({ snackbar: true, snackbarresponse: response });

            await this.getPhoneReasons();
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ snackbar: true, snackbarresponse: error.response })
        }
        this.getPhoneReasons();
    }
}


export default withStyles(styles)(index);

