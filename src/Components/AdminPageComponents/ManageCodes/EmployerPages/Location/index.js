import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Paper,
    Typography
} from '@material-ui/core';

let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:9000"

const styles = theme => ({

})

class index extends React.Component {

    state = {
        locations: []
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 
    async fetchlocations() {
        const user = this.props.user;
      const approval = this.props.approval;
        let response = await fetch(api + "/api/v1/employers/" + user + "/locations",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('LocationSuccess:', response)
        this.setState({ locations: response });
    }

    componentDidMount() {
       
        token =  localStorage.getItem("Token");
        id = localStorage.getItem("id");

        const user = this.props.user;
        const approval = this.props.approval;
        console.log("LocationUserId:", this.props)
        this.fetchlocations()
    }

    render() {

        const { classes } = this.props;

        return (
            this.state.locations.map((id) => (
                <Paper variant='outlined' style={{ marginTop: 20, padding: 20 }}>

                    <Grid container justify='space-between' spacing={3} style={{ padding: 10 }}>
                        <Typography variant='h6' fontWeight="fontWeightBold">Location Id: {id.id}</Typography>
                    </Grid>

                    <Grid container justify='center' direction='row' alignItems='center' spacing={1}>

                        <Grid item fullWidth xs={12}>
                            <TextField
                                id="location"
                                label="Location Name"
                                defaultValue={id.locationName}
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
                                id="address"
                                label="Address"
                                defaultValue={id.address}
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

                    </Grid>
                </Paper>
            ))
        );
    }
}

export default withStyles(styles)(index);
