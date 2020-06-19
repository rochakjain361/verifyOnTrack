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
import axios from "axios";
const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"
const cors = "https://cors-anywhere.herokuapp.com/"

const styles = theme => ({

})

class index extends Component {

    state = {
        allAddressTypes: [],
        selectedAddressType: [],

        addressTypesArr: [],
        newAddressType: "",
    }

    async getAddressTypes() {
        let response = await fetch(cors + api + "/api/v1/resManager/address/types",
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
        this.getAddressTypes();
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
                                this.setState({ newAddressType: event.target.value });
                            }}
                            value={this.state.newAddressType}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                            onClick={() => {
                                this.addAddressType();
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
                                    <TableCell align="left">Adress Type</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.allAddressTypes.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.addressType}</TableCell>
                                        <TableCell align="right"><Button variant='outlined' size='small' onClick = {()=>{this.deleteAddressType(row.id)}} color = 'secondary'>Delete</Button>
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

    async addAddressType() {
        let bodyData = {
            'addressType': this.state.newAddressType,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch( api + '/api/v1/resManager/address/types/',
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
            response = await response.json();
            console.log('AddAddressSuccess:', response);
            await this.getAddressTypes();
            this.setState({newAddressType: ""})
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async deleteAddressType(index) {
        try {
            let response = await axios.delete(
              "http://3.22.17.212:8000/api/v1/resManager/address/types/" +
                index +
                "/",
              {
               
                headers: {
                  Authorization: token,
                  // 'Content-Type': 'application/json'
                },
              }
            );
            response = await response.json();
            console.log('delAddressSuccess:', response);
            await this.getAddressTypes();
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
          this.getAddressTypes();
    }
}

export default withStyles(styles)(index);

