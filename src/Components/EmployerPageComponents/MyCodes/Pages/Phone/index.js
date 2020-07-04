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
    phones: []
  }

  // constructor(props) {
  //     super(props);
  //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
  //   } 
  async fetchPhones() {
    const userId = this.props.userId;
      const code = this.props.code;
    let response = await fetch(api + "/api/v1/employees/" + userId + "/phones?code=" + code,
      {
        headers: {
          'Authorization': token
        }
      });
    response = await response.json();
    console.log('PhonesSuccess:', response)
    this.setState({ phones: response });
  }

  componentDidMount() {
    const token1 = localStorage.getItem("Token");
    const token = "Token " + token1;
    const id = localStorage.getItem("id");
    this.fetchPhones()
  }

  render() {

    const { classes } = this.props;

    return (
      this.state.phones.map((id) => (
        <Paper variant='outlined' style={{ marginTop: 20, padding: 20 }}>

          <Grid container justify='space-between' spacing={3} style={{ padding: 10 }}>
            <Typography variant='h6' fontWeight="fontWeightBold">Phone Id: {id.id}</Typography>
            <Typography variant='subtitle1'>{new Date(id.created_on).toDateString()}</Typography>
          </Grid>

          <Grid container justify='center' direction='row' alignItems='center' spacing={1}>

            <Grid item fullWidth xs={12}>
              <TextField
                id="phoneReason"
                label="Phone Reason"
                defaultValue={id.phone_reason}
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
                id="phoneType"
                label="Phone Type"
                defaultValue={id.phone_type}
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
                id="defaultPhone"
                label="Default Phone"
                defaultValue={id.default_phone}
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
                id="phoneNumber"
                label="Phone Number"
                defaultValue={id.phoneNumber}
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
                id="imei"
                label="IMEI Number"
                defaultValue={id.imeiNumber}
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
                id="usingSince"
                label="Started using on"
                defaultValue={id.dateObtained}
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
