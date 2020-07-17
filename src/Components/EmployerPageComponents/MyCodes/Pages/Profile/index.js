import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Avatar,
    Paper
    } from '@material-ui/core';

    const token1 = localStorage.getItem("Token");
    const token = "Token " + token1;
    const id = localStorage.getItem("id");
    const api = "http://3.22.17.212:8000"
  
const styles = theme => ({

})

class index extends React.Component{

    state = {
      profiles: [],
      userId: '',
      code: ''
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 

    async fetchProfiles() {
      const userId = this.props.userId;
      const code = this.props.code;
      let response = await fetch(api + "/api/v1/employees/" + userId + "/profiles?code=" + code,
          {
              headers: {
                  'Authorization': token
              }
          });
      response = await response.json();
      console.log('profilesSuccess:', response)
      this.setState({ profiles: response });
  }

  componentDidMount() {
    const token1 = localStorage.getItem("Token");
    const token = "Token " + token1;
    const id = localStorage.getItem("id");
    this.fetchProfiles()
  }

    render() {

        const { classes } = this.props;

        return (
          this.state.profiles.map((id) => (
            <Paper variant='outlined' style={{ marginTop: 20, padding: 20 }}>
            <Grid container justify='center' direction='row' alignItems='center' spacing={1}>

                        <Grid item>
                        <Avatar
                        // src={this.state.result[0].picture}
                        style={{ height: "8rem", width: "8rem" }}
                      >
                        <img src={id.picture} width="130" height="130" alt="" />
                      </Avatar>
                        </Grid>

                      <Grid item xs={12}>
                        <TextField
                          id="firstName"
                          label="First Name"
                          defaultValue={id.firstname}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size='small'
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          id="middleName"
                          label="Middle Name"
                          defaultValue={id.middlename}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size='small'
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          id="surname"
                          label="Surname"
                          defaultValue={id.surname}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size='small'
                        />
                      </Grid>

                      <Grid item xs={12}>
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

                      <Grid item xs={12}>
                      <TextField
                          id="email"
                          label="Email ID"
                          defaultValue={id.employee_email_field}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size='small'
                        />
                      </Grid>

                      <Grid item xs={12}>
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
                    </Grid>
                    </Paper>
          ))
        );
    }
}

export default withStyles(styles)(index);
