import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button
} from '@material-ui/core/'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from "@material-ui/core/Box";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";


const styles = theme => ({

})

class index extends Component {

    state = {

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Card elevation={3}>
                    <CardContent>
                        <Typography variant='h5'>
                            Address Details
                    </Typography>

                        <Grid container justify='flex-start' spacing={4} style={{ marginTop: 20 }}>

                            <Box display="flex" flexDirection="row" width={1} style={{ padding: 20 }}>
                                <Box width={1 / 2}>
                                    <Grid
                                        container
                                        justify="flex-start"
                                        direction="row"
                                        alignItems="center"
                                        spacing={3}
                                    >
                                        <Grid item xs={6}>
                                            <FormControl fullWidth variant='outlined'>
                                                <InputLabel id="addressType">Address types</InputLabel>
                                                <Select
                                                    labelId="addressType"
                                                    id="addresType"
                                                    onChange={(event) => {
                                                        this.setState({
                                                            selectedaddressType: event.target.value,
                                                        });
                                                    }}
                                                >
                                                    {/* {this.state.addressTypes.map((address) => (
                        <MenuItem id={address.id} value={address.id}>
                          {address.addressType}
                        </MenuItem>
                      ))} */}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormControl fullWidth variant='outlined'>
                                                <InputLabel id="addressReason">Address Reason</InputLabel>
                                                <Select
                                                    labelId="addressReason"
                                                    id="addresReason"
                                                    onChange={(event) => {
                                                        this.setState({
                                                            selectedaddressReason: event.target.value,
                                                        });
                                                    }}
                                                >
                                                    {/* {this.state.addressReasons.map((address) => (
                        <MenuItem id={address.id} value={address.id}>
                          {address.addressReason}
                        </MenuItem>
                      ))} */}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormControl fullWidth variant='outlined'>
                                                <InputLabel id="defaultAddress">Default address</InputLabel>
                                                <Select
                                                    labelId="defaultAddress"
                                                    id="defaultAddress"
                                                    onChange={(event) => {
                                                        this.setState(
                                                            { defaultaddress: event.target.value },

                                                            console.log(
                                                                "defaultadress",
                                                                this.state.defaultaddress
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <MenuItem id={1} value="Yes">
                                                        Yes
                      </MenuItem>
                                                    <MenuItem id={2} value="No">
                                                        No
                      </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item fullWidth xs={6}>
                                            <TextField
                                                id="houseNumber"
                                                label="House number"
                                                onChange={(event) => {
                                                    this.setState({ housenumber: event.target.value });
                                                    console.log(event.target.value);
                                                }}
                                                type="text"
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Button
                                                variant="contained"
                                                color="default"
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Choose file
                  </Button>
                                        </Grid>

                                        <Grid item fullWidth xs={6}>
                                            <TextField
                                                id="addressImage"
                                                // label="Choose Image"
                                                onChange={(event) => {
                                                    this.setState({
                                                        addressimage: event.target.files[0],
                                                    });
                                                    console.log(event.target.files[0]);
                                                }}
                                                type="file"
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormControl fullWidth variant='outlined'>
                                                <InputLabel id="states">States</InputLabel>
                                                <Select
                                                    labelId="states"
                                                    id="states"
                                                    onChange={(event) => {
                                                        this.setState({
                                                            selectedState: event.target.value,
                                                        });
                                                        // console.log(
                                                        //   "selectedstate",
                                                        //   this.state.selectedState,
                                                        //   event.target.value
                                                        // );
                                                        this.lganames(event.target.value, "add");
                                                    }}
                                                >
                                                    {/* {this.state.stateName.map((states) => (
                        <MenuItem id={states.id} value={states.id}>
                          {states.stateName}
                        </MenuItem>
                      ))} */}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormControl fullWidth variant='outlined'>
                                                <InputLabel id="lga">LGA</InputLabel>
                                                <Select
                                                    labelId="lga"
                                                    id="lga"
                                                    onChange={(e) => {
                                                        this.setState({ selectedLga: e.target.value });
                                                        this.citynames(e.target.value, "add");
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>

                                                    {/* {this.state.lgaStates.map((lgas) => (
                        <MenuItem value={lgas.id}>{lgas.lgaName} </MenuItem>
                      ))} */}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormControl fullWidth variant='outlined'>
                                                <InputLabel id="city">City</InputLabel>
                                                <Select
                                                    labelId="city"
                                                    id="city"
                                                    onChange={(event) => {
                                                        this.setState({
                                                            selectedCity: event.target.value,
                                                        });
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>

                                                    {/* {this.state.cityStates.map((city) => (
                        <MenuItem value={city.id}>{city.cityName}</MenuItem>
                      ))} */}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item fullWidth xs={6}>
                                            <TextField
                                                id="addressHint1"
                                                label="Address hint 1"
                                                onChange={(event) => {
                                                    this.setState({ addresshint1: event.target.value });
                                                    console.log(event.target.value);
                                                }}
                                                type="text"
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </Grid>

                                        <Grid item fullWidth xs={6}>
                                            <TextField
                                                id="addressHint2"
                                                label="Address hint 2"
                                                onChange={(event) => {
                                                    this.setState({ addresshint2: event.target.value });
                                                    console.log(event.target.value);
                                                }}
                                                type="text"
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </Grid>

                                        <Grid item fullWidth xs={6}>
                                            <TextField
                                                id="addressHint3"
                                                label="Address hint 3"
                                                onChange={(event) => {
                                                    this.setState({ addresshint3: event.target.value });
                                                    console.log(event.target.value);
                                                }}
                                                type="text"
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </Grid>

                                        <Grid item fullWidth xs={6}>
                                            <TextField
                                                id="startedLivingHereSince"
                                                helperText="Started living here since"
                                                onChange={(event) => {
                                                    this.setState({
                                                        startedLivingHere: event.target.value,
                                                    });
                                                    console.log(event.target.value);
                                                }}
                                                type="date"
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </Grid>

                                        <Grid item fullWidth xs={6}>
                                            <TextField
                                                id="street"
                                                label="Street"
                                                onChange={(event) =>
                                                    this.setState(
                                                        {
                                                            Streetname: event.target.value,
                                                        }
                                                        // this.reasonforupdatevalidcheck(event)
                                                    )
                                                }
                                                type="text"
                                                fullWidth
                                                variant='outlined'
                                            />
                                        </Grid>
                                        {/* <Grid container justify="flex-start" direction="row">
                  <Grid class="w3-container">
                    <p>
                      <label>Google coordinates</label>
                      <input
                        class="w3-input"
                        type="text"
                        defaultValue={this.state.location.latitude}
                      />
                      <input
                        class="w3-input"
                        type="text"
                        defaultValue={this.state.location.longtitude}
                      />
                    </p>
                  </Grid>
                </Grid> */}
                                    </Grid>
                                </Box>
                                <Box p={1} width={1 / 2}>
                                    <Map
                                        google={this.props.google}
                                        zoom={12}
                                        onClick={this.onMarkerClick}
                                        style={{
                                            width: "40%",
                                            height: "75%",
                                        }}
                                        fullscreenControl={true}
                                    >
                                        <Marker
                                            position={{
                                                // lat: this.state.location.latitude,
                                                // lng: this.state.location.longtitude,
                                            }}
                                        />
                                        <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
                                    </Map>
                                </Box>
                            </Box>

                        </Grid>

                    </CardContent>
                </Card>
            </div>
        );
    }


}

export default withStyles(styles)(index);

