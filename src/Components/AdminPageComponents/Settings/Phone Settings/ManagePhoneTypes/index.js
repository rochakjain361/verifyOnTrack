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
        allPhoneTypes: [],
        selectedPhoneType: [],

        phoneTypesArr: [],
        newPhoneType: "",
    }

    async getPhoneTypes() {
        let response = await fetch(cors + api + "/api/v1/resManager/phone/types",
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
    }

    async componentDidMount() {
        this.getPhoneTypes();
    }

    render() {

        const allPhoneTypesList = {
            options: this.state.allPhoneTypes,
            getOptionLabel: (phone) => phone.phoneType,
        };

        const { classes } = this.props;

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
                        <FormControl fullWidth>
                            <InputLabel id="managePhoneTypes" style={{ marginLeft: 10 }}>Search Phone Types</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="managePhoneTypes"
                                id="managePhoneTypes"
                                value={this.state.selectedPhoneType}
                                onChange={event => this.setState({ selectedPhoneType: event.target.value })}
                            >
                                {
                                    this.state.phoneTypesArr.map(phone => <MenuItem key={phone} value={phone}>{phone}</MenuItem>)

                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* <Grid item xs={6}>
                        <Autocomplete
                            size='small'
                            {...allPhoneTypesList}
                            id="addressTypes"
                            Username
                            onChange={event => this.setState({ selectedPhoneType: event.target.value })}
                            value={this.state.selectedPhoneType}
                            renderInput={(params) => <TextField {...params} label="Search phone types" margin="normal" variant='outlined' size='small' />}
                        />
                    </Grid> */}

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
                                        <TableCell align="right"><Button variant='outlined' size='small' onClick = {()=>{this.deletePhoneType(index)}} color = 'secondary'>Delete</Button>
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

    async addPhoneType() {
        let bodyData = {
            'phoneType': this.state.newPhoneType,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch( api + '/api/v1/resManager/phone/types/',
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
            response = await response.json();
            console.log('AddPhoneSuccess:', response);
            await this.getPhoneTypes();
            this.setState({newPhoneType: ""})
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async deletePhoneType(index) {
        try {
            let response = await fetch(api + "/api/v1/resManager/phone/types/" + index + "/",
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': token,
                        // 'Content-Type': 'application/json'
                    }
                }
            );
            response = await response.json();
            console.log('delPhoneSuccess:', response);
            await this.getPhoneTypes();
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }
}

export default withStyles(styles)(index);

