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
import { CircularProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:9000"
const cors = "https://cors-anywhere.herokuapp.com/"

const styles = theme => ({

})
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class index extends Component {

    state = {
        allAddressTypes: [],
        selectedAddressType: [],
        loading: true,
        addressTypesArr: [],
        newAddressType: "",
        butttondisabled: true,
        deleteid: "",
        deleteDialogBox: false,
        snackbar: "",
        snackbarresponse: "",
    }

    async getAddressTypes() {
        let response = await fetch(api + "/api/v1/resManager/address/types/",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log("getAddressTypesSuccess:", response)
        this.setState({ allAddressTypes: response });
        this.setState({ addressTypesArr: this.state.allAddressTypes.map(addressType => addressType.addressType) })
        console.log("allAddressTypes:", this.state.addressTypesArr)
        console.log("alladdressTypesArrList:", this.state.addressTypesArr)
    }

    async componentDidMount() {
       
        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");
        this.setState({ loading: true })
        await this.getAddressTypes();
        this.setState({ loading: false })
    }

    render() {

        const allAddressTypesList = {
            options: this.state.allAddressTypes,
            getOptionLabel: (address) => address.addressType,
        };

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                {this.state.loading ? <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    display="flex"
                    style={{ minHeight: "100vh" }}
                >
                    <CircularProgress />
                </Grid> : <>
                        <Grid container justify='space-between' alignItems='center' spacing={4}>

                            <Grid item>
                                <Typography variant='h4'>
                                    Address Types
                            </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="manageAddressTypes" style={{ marginLeft: 10 }}>Manage Address Types</InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="manageAddressTypes"
                                        id="manageAddressTypes"
                                        value={this.state.selectedAddressType}
                                        onChange={event => this.setState({ selectedAddressType: event.target.value })}
                                    >
                                        {
                                            this.state.addressTypesArr.map(address => <MenuItem key={address} value={address}>{address}</MenuItem>)

                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* <Grid item xs={6}>
                        <Autocomplete
                            size='small'
                            {...allAddressTypesList}
                            id="addressTypes"
                            Username
                            onChange={event => this.setState({ selectedAddressType: event.target.value })}
                            value={this.state.selectedAddressType}
                            renderInput={(params) => <TextField {...params} label="Search address types" margin="normal" variant='outlined' size='small' />}
                        />
                    </Grid> */}

                        </Grid>

                        <Grid container justify='flex-start' alignItems='center' style={{ marginTop: 20 }} spacing={2}>

                            <Grid item xs={3}>

                                <TextField
                                    label="Enter address type to add"
                                    variant='outlined'
                                    size='medium'
                                    fullWidth
                                    onChange={(event) => {
                                       
                                            this.setState({ newAddressType: event.target.value});
                                    }}
                                 value={this.state.newAddressType}
                                />
                            </Grid>
                            <Grid item>
                                <Fab
                                    disabled={this.state.newAddressType.length<1}
                                    onClick={() => {
                                        this.addAddressType();
                                    }}
                                    size="small"
                                    color="secondary">
                                    <AddIcon />
                                </Fab>
                            </Grid>
                            <Grid>

                                <Snackbar open={this.state.snackbar} autoHideDuration={6000} onClick={() => { this.setState({ snackbar: !this.state.snackbar }) }}>
                                    {this.state.snackbarresponse.status === 201 ? <Alert onClose={() => { this.setState({ snackbar: !this.state.asnackbar }) }} severity="success">
                                        AddressType added sucessfully
</Alert> : this.state.snackbarresponse.status === 204 ? <Alert onClose={() => { this.setState({ snackbar: !this.state.asnackbar }) }} severity="success">
                                            AddressType deleted sucessfully
</Alert> : <Alert onClose={() => { this.setState({ snackbar: !this.state.snackbar }) }} severity="error">
                                                Something went wrong please try again
</Alert>}
                                </Snackbar>
                            </Grid>
                            <TableContainer component={Paper} style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: 'black' }}>
                                            <TableCell align="left">Adress Type</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.allAddressTypes.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell align="left">{row.addressType}</TableCell>
                                                <TableCell align="right"><Button variant='outlined' size='small' onClick={() => { this.setState({ deleteDialogBox: true, deleteid: row.id }) }} color='secondary'>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>
                    </>}
                {/* </Paper> */}
                <Dialog
                    open={this.state.deleteDialogBox}
                    onClose={() => this.setState({ deleteDialogBox: false })}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to this AddressReason??"}</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                        <Button style={{ width: 85 }} color="primary" variant="contained" onClick={() =>
                            this.deleteAddressType(this.state.deleteid)
                        }>
                            Delete
              </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() =>
                                this.setState({ deleteDialogBox: false, selectedIndex: -1 })
                            }
                        >
                            Cancel
              </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    async addAddressType() {
        let bodyData = {
            'addressType': this.state.newAddressType,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/resManager/address/types/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'addressType': this.state.newAddressType,
                    })
                }
            );
            this.setState({ snackbar: true, snackbarresponse: response,newAddressType:"" });

            console.log('AddAddressSuccess:', response);
            await this.getAddressTypes();



        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ snackbar: true, snackbarresponse: error.response })
        }
    }

    async deleteAddressType(index) {
        this.setState({ deleteDialogBox: false })
        try {
            let response = await axios.delete(
                "http://3.22.17.212:9000/api/v1/resManager/address/types/" +
                index +
                "/",
                {

                    headers: {
                        Authorization: token,
                        // 'Content-Type': 'application/json'
                    },
                }
            );
            console.log('delAddressSuccess:', response);
            this.setState({ snackbar: true, snackbarresponse: response });

            await this.getAddressTypes();
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ snackbar: true, snackbarresponse: error.response })
        }
        this.getAddressTypes();
    }


}

export default withStyles(styles)(index);

