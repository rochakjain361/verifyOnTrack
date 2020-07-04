import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Paper,
    Typography
} from '@material-ui/core';

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"

const styles = theme => ({

})

class index extends React.Component {

    state = {
        addresses: []
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 
    async fetchaddresses() {
        const userId = this.props.userId;
      const code = this.props.code;
        let response = await fetch(api + "/api/v1/employees/" + userId + "/addresses?code=" + code,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('addressesSuccess:', response)
        this.setState({ addresses: response });
    }

    componentDidMount() {
        const token1 = localStorage.getItem("Token");
        const token = "Token " + token1;
        const id = localStorage.getItem("id");
        this.fetchaddresses()
    }

    render() {

        const { classes } = this.props;

        return (
            this.state.addresses.map((id) => (
                <Paper variant='outlined' style={{ marginTop: 20, padding: 20 }}>

                    <Grid container justify='space-between' spacing={3} style={{ padding: 10 }}>
                        <Typography variant='h6' fontWeight="fontWeightBold">Address Id: {id.id}</Typography>
                        <Typography variant='subtitle1'>{new Date(id.created_on).toDateString()}</Typography>
                    </Grid>

                    <Grid container justify='center' direction='row' alignItems='center' spacing={1}>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="addressTypes"
                                label="Address Type"
                                defaultValue={id.address_type}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="addressReason"
                                label="Address Reason"
                                defaultValue={id.address_reason}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="defaultAddress"
                                label="Default address"
                                defaultValue={id.default_address}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="houseNumber"
                                label="House Number"
                                defaultValue={id.house_number}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="state"
                                label="State"
                                defaultValue={id.state_name_field}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="lga"
                                label="LGA"
                                defaultValue={id.lga_name_field}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="city"
                                label="City"
                                defaultValue={id.city_name_field}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="street"
                                label="Street"
                                defaultValue={id.state_name_field}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="hint1"
                                label="Address hint 1"
                                defaultValue={id.address_hint1}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="hint2"
                                label="Address hint 2"
                                defaultValue={id.address_hint2}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="hint3"
                                label="Address hint 3"
                                defaultValue={id.address_hint3}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="since"
                                label="Living since"
                                defaultValue={id.since}
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                size='small'
                            />
                        </Grid>

                    </Grid>
                </Paper>
            ))
        );
    }
}

export default withStyles(styles)(index);
