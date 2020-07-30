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
const api = "http://3.22.17.212:8000"

const styles = theme => ({

})

class index extends React.Component {

  state = {
    identities: []
  }

  // constructor(props) {
  //     super(props);
  //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
  //   } 
  async fetchIdentities() {
    const userId = this.props.userId;
      const code = this.props.code;
    let response = await fetch(api + "/api/v1/employees/" + userId + "/identities?code=" + code,
      {
        headers: {
          'Authorization': token
        }
      });
    response = await response.json();
    console.log('IdentitiesSuccess:', response)
    this.setState({ identities: response });
  }

  async fetchIdentitiesPics() {
    const userId = this.props.userId;
      const code = this.props.code;
    let response = await fetch(api + "/api/v1/employees/" + userId + "/identities?code=" + code,
      {
        headers: {
          'Authorization': token
        }
      });
    response = await response.json();
    console.log('IdentitiesSuccess:', response, 'UserId', userId, 'accessCode', code)
    this.setState({ identities: response });
  }

  componentDidMount() {
    token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

    this.fetchIdentities()
  }

  render() {

    const { classes } = this.props;

    return (
      this.state.identities.map((id) => (
        <Paper variant='outlined' style={{ marginTop: 20, padding: 20 }}>

          <Grid container justify='space-between' spacing={3} style={{ padding: 10 }}>
            <Typography variant='h6' fontWeight="fontWeightBold">Id: {id.id}</Typography>
            <Typography variant='subtitle1'>{new Date(id.created_on).toDateString()}</Typography>
          </Grid>

          <Grid container justify='center' direction='row' alignItems='center' spacing={1}>

            <Grid item fullWidth xs={12}>
              <TextField
                id="fullName"
                label="Full Name"
                defaultValue={id.fullname}
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
                id="dob"
                label="Date of birth"
                defaultValue={id.dob}
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
                id="gender"
                label="Gender"
                defaultValue={id.sex}
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
                id="idSource"
                label="Id Source"
                defaultValue={id.idSource}
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
