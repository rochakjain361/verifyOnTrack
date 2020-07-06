import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { TextField, CircularProgress, Paper, Grid, Typography, Button, TableContainer } from '@material-ui/core/';
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

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from 'axios'

let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:8000"
const cors = "https://cors-anywhere.herokuapp.com/"

const styles = theme => ({

})

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class index extends Component {

    state = {
        allPhoneTypes: [],
        selectedPhoneType: [],
        phoneTypeSelected: "",
        enteredType: "",

        phoneTypesArr: [],
        newPhoneType: "",
        deleteDialogBox: false,
        deleteid: "",
        selectedIndex: "",
        loading: true,

        snackbar: "",
        snackbarresponse: "",
    }

    async getPhoneTypes() {
        this.setState({ loading: true });
        let response = await fetch(api + "/api/v1/resManager/phone/types/",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log("getPhoneTypesSuccess:", response)
        this.setState({ allPhoneTypes: response });
        this.setState({ phoneTypesArr: this.state.allPhoneTypes.map(phoneType => phoneType.phoneType) })
        console.log("allPhoneTypes:", this.state.phoneTypesArr)
        console.log("allphoneTypesArrList:", this.state.phoneTypesArr)
        this.setState({ loading: false });
    }

    async componentDidMount() {
        token1 = localStorage.getItem("Token");
        token = "Token " + token1;
        id = localStorage.getItem("id");
        this.getPhoneTypes();
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

    displaytable() {
        const allPhoneTypesList = {
            options: this.state.allPhoneTypes,
            getOptionLabel: (phone) => phone.phoneType,
        };
        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item>
                        <Typography variant='h4'>
                            Phone Types
                            </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Autocomplete
                            options={this.state.allPhoneTypes}
                            getOptionLabel={(option) => option.phoneType}
                            size="small"
                            id="phoneTypes"
                            Username
                            value={this.state.phoneTypeSelected}
                            onChange={(event, value) => {
                                this.setState({ phoneTypeSelected: value });
                                console.log("phoneTypeSelected", value);
                            }}
                            inputValue={this.state.enteredtext}
                            onInputChange={(event, newInputValue) => {
                                this.setState({ enteredType: newInputValue });
                                // console.log(newInputValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Phone Types"
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
                            label="Enter phone type to add"
                            variant='outlined'
                            size='medium'
                            fullWidth
                            onChange={(event) => {
                                this.setState({ newPhoneType: event.target.value });
                            }}
                            value={this.state.newPhoneType}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                            disabled={this.state.newPhoneType.length < 1}
                            onClick={() => {
                                this.addPhoneType();
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
                                    <TableCell align="left">Phone Type</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.allPhoneTypes.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.phoneType}</TableCell>
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
        );
    }

    snackBar() {
        return (
            <Snackbar
                open={this.state.snackbar}
                autoHideDuration={6000}
                onClick={() => { this.setState({ snackbar: !this.state.snackbar }) }}
            >
                {this.state.snackbarresponse.status === 201 ?
                    <Alert
                        onClose={() => { this.setState({ snackbar: !this.state.asnackbar }) }}
                        severity="success"
                    >
                        Added sucessfully
                </Alert> :
                    this.state.snackbarresponse.status === 204 ?
                        <Alert
                            onClose={() => { this.setState({ snackbar: !this.state.asnackbar }) }}
                            severity="success">
                            Deleted sucessfully
                </Alert> :
                        <Alert
                            onClose={() => { this.setState({ snackbar: !this.state.snackbar }) }}
                            severity="error"
                        >
                            Something went wrong please try again
                </Alert>}
            </Snackbar>
        );
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20 }}>
                {this.state.loading ? this.isloading() : this.displaytable()}
                {this.snackBar()}
            </div>
        );
    }

    async addPhoneType() {
        let bodyData = {
            'phoneType': this.state.newPhoneType,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/resManager/phone/types/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'phoneType': this.state.newPhoneType,
                    })
                }
            );
            await this.getPhoneTypes();
            this.setState({ snackbar: true, snackbarresponse: response, newPhoneType: "" });
            console.log('AddPhoneSuccess:', response);

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ snackbar: true, snackbarresponse: error.response })
        }
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
                                this.deletePhoneType(this.state.deleteid);
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

    // async deletePhoneType(id) {
    //     // console.log("......",id)
    //     await axios.delete(
    //         api + "/api/v1/resManager/phone/types/" + id + "/",
    //         {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         }
    //     );
    //     await this.getPhoneTypes();
    // }

    async deletePhoneType(id) {
        this.setState({ deleteDialogBox: false })
        try {
            let response = await axios.delete(
                api + "/api/v1/resManager/phone/types/" + id + "/",
                {

                    headers: {
                        Authorization: token,
                        // 'Content-Type': 'application/json'
                    },
                }
            );
            console.log('Success:', response);
            await this.getPhoneTypes();
            this.setState({ snackbar: true, snackbarresponse: response });

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ snackbar: true, snackbarresponse: error.response })
        }
        this.getPhoneTypes();
    }
}

export default withStyles(styles)(index);

