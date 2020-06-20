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
import axios from 'axios'

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"
const cors = "https://cors-anywhere.herokuapp.com/"

const styles = theme => ({

})

class index extends Component {

    state = {
        allPhoneReasons: [],
        selectedPhoneReasons: [],

        phoneReasonsArr: [],
        newPhoneReason: "",
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
                        <FormControl fullWidth>
                            <InputLabel id="managePhoneReasons" style={{ marginLeft: 10 }}>Search Phone Reasons</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="managePhoneReasons"
                                id="managePhoneReasons"
                                value={this.state.selectedPhoneReasons}
                                onChange={event => this.setState({ selectedPhoneReasons: event.target.value })}
                            >
                                {
                                    this.state.phoneReasonsArr.map(phone => <MenuItem key={phone} value={phone}>{phone}</MenuItem>)

                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* <Grid item xs={6}>
                        <Autocomplete
                            size='small'
                            {...allphoneReasonsList}
                            id="addressTypes"
                            Username
                            onChange={event => this.setState({ selectedPhoneReasons: event.target.value })}
                            value={this.state.selectedPhoneReasons}
                            renderInput={(params) => <TextField {...params} label="Search phone types" margin="normal" variant='outlined' size='small' />}
                        />
                    </Grid> */}

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
                                        <TableCell align="right"><Button variant='outlined' size='small' onClick={() => { this.deletePhoneReason(row.id) }} color='secondary'>Delete</Button>
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
            response = await response.json();
            console.log('AddPhoneSuccess:', response);
            await this.getPhoneReasons();
            this.setState({ newPhoneReason: "" })
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    // async deletePhoneReason(index) {
    //     try {
    //         let response = await fetch(api + "/api/v1/resManager/phone/reasons/" + index + "/",
    //             {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Authorization': token,
    //                     // 'Content-Type': 'application/json'
    //                 }
    //             }
    //         );
    //         response = await response.json();
    //         console.log('delPhoneSuccess:', response);
    //         await this.getPhoneReasons();
    //     } catch (error) {
    //         console.log("[!ON_REGISTER] " + error);
    //     }
    // }

    async deletePhoneReason(index)  {
        try {
            let response = await axios.delete(api + "/api/v1/resManager/phone/reasons/" + index + "/",
              {
               
                headers: {
                  Authorization: token,
                  'Content-Type': 'application/json'
                },
              }
            );
            response = await response.json();
            console.log('delPhoneSuccess:', response);
            await this.getPhoneReasons();
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
        await this.getPhoneReasons();
    }
}


export default withStyles(styles)(index);

