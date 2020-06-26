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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
        allAddressReasons: [],
        selectedAddressReasons: [],

        addressReasonsArr: [],
        disabledbutton:true,
        loading:true,
        newAddressReason: "",
        deleteid:"",
        deleteDialogBox: false,
        snackbar: "",
        snackbarresponse: "",
    }

    async getAddressReasons() {
        let response = await fetch(api + "/api/v1/resManager/address/reasons/",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log("getAddressReasonsSuccess:", response)
        this.setState({ allAddressReasons: response });
        this.setState({ addressReasonsArr: this.state.allAddressReasons.map(addressReason => addressReason.addressReason) })
        console.log("allAddressReasons:", this.state.addressReasonsArr)
        console.log("alladdressReasonsArrList:", this.state.addressReasonsArr)
    }

    async componentDidMount() {
    
        await this.getAddressReasons();
        this.setState({loading:false});
    }

    render() {

        const allAddressReasonsList = {
            options: this.state.allAddressReasons,
            getOptionLabel: (address) => address.addressReason,
        };

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                {this.state.loading?  <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        display="flex"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>:<>
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item>
                        <Typography variant='h4'>
                            Address Reasons
                            </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="manageAddressReasons" style={{ marginLeft: 10 }}>Manage Address Reasons</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="manageAddressReasons"
                                id="manageAddressReasons"
                                value={this.state.selectedAddressReasons}
                                onChange={event => this.setState({ selectedAddressReasons: event.target.value })}
                            >
                                {
                                    this.state.addressReasonsArr.map(address => <MenuItem key={address} value={address}>{address}</MenuItem>)

                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* <Grid item xs={6}>
                        <Autocomplete
                            size='small'
                            {...allAddressReasonsList}
                            id="addressTypes"
                            Username
                            onChange={event => this.setState({ selectedAddressReasons: event.target.value })}
                            value={this.state.selectedAddressReasons}
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
                                event.target.value.length===0?this.setState({disabledbutton:true }):
                                this.setState({ newAddressReason: event.target.value,disabledbutton:false });
                            }}
                            // value={this.state.newAddressReason}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                        disabled={this.state.disabledbutton}
                            onClick={() => {
                                this.addAddressReason();
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
                                    <TableCell align="left">Adress Reason</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.allAddressReasons.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.addressReason}</TableCell>
                                        <TableCell align="right"><Button variant='outlined' size='small' onClick = {()=>{this.setState({deleteDialogBox: true,deleteid:row.id})}} color = 'secondary'>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog
            open={this.state.deleteDialogBox}
            onClose={() => this.setState({ deleteDialogBox: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this city?"}</DialogTitle>
            <DialogContent>
             
            </DialogContent>
            <DialogActions style={{ padding: 15 }}>
              <Button style={{ width: 85 }} color="primary" variant="contained"  onClick={() =>
              this.deleteAddressReason(this.state.deleteid)
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
                </Grid></>}
                {/* </Paper> */}
            </div>
        )
    }

    async addAddressReason() {
        let bodyData = {
            'addressReason': this.state.newAddressReason,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch( api + '/api/v1/resManager/address/reasons/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'addressReason': this.state.newAddressReason,
                    })
                }
            );
            this.setState({  snackbar: true, snackbarresponse: response });
           
            console.log('AddAddressSuccess:', response);
            await this.getAddressReasons();
            this.setState({newAddressReason: ""})
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ snackbar: true, snackbarresponse: error.response })
        }
    }

   
    async deleteAddressReason(index)  {
        this.setState({ deleteDialogBox: false })
        try {
            let response = await axios.delete(
                api + "/api/v1/resManager/address/reasons/" + index + "/",
              {
               
                headers: {
                  Authorization: token,
                  'Content-Type': 'application/json'
                },
              }
            );
            this.setState({  snackbar: true, snackbarresponse: response });
            console.log('delAddressSuccess:', response);
            await this.getAddressReasons();
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ snackbar: true, snackbarresponse: error.response })
        }
          this.getAddressReasons();
    }
}

export default withStyles(styles)(index);

