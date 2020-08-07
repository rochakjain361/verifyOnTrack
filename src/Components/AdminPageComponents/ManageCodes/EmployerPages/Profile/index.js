import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Paper,
    Avatar,
    CircularProgress,
} from '@material-ui/core';

let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:9000"

let user = ""

const styles = theme => ({

})

class index extends React.Component {

    state = {
        profiles: [],
        isloading: true,
    }

    constructor(props) {
        super(props);
        this.fetchProfiles = this.fetchProfiles.bind(this);
      } 
        async fetchProfiles() {
        const user = this.props.user;
        const approval = this.props.approval;

        console.log("ProfileUserId:", user)

        let response = await fetch(api + "/api/v1/employers/" + user + "/getdetails",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('profileSuccess:', response)
        this.setState({ profiles: [response] });
    }

    componentDidMount() {
       
        token =  localStorage.getItem("Token");
        id = localStorage.getItem("id");

        console.log("ProfileUserId:", this.props.user)

        this.fetchProfiles()

        // this.setState({isloading: false})
    }

    isloading() {
        return (
            <>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    display="flex"
                    style={{ minHeight: "0vh" }}
                >
                    <CircularProgress />
                </Grid>
            </>
        );
    }

    render() {

        const { classes } = this.props;
        console.log("profilesdata:", this.state.profiles)
        return (
            // <p>Hi</p>
            <>
            {

            // this.state.isloading ? this.isloading() : 
            // (
                // this.state.profiles.length !== 0 ? (

                    this.state.profiles.map((id) => (
                        <Paper variant='outlined' style={{ marginTop: 20, padding: 20 }}>
                        <Grid container justify='center' direction='row' alignItems='center' spacing={1}>
                    
                            <Grid item>
                                <Avatar
                                    // src={this.state.result[0].picture}
                                    style={{ height: "8rem", width: "8rem" }}
                                >
                                    <img src={id.logo} width="130" height="130" alt="" />
                                </Avatar>
                            </Grid>
                    
                            <Grid item fullWidth xs={12}>
                                <TextField
                                    id="companyName"
                                    label="Comapny Name"
                                    defaultValue={id.companyName}
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
                                    id="emailId"
                                    label="Email"
                                    defaultValue={id.email}
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
                                    id="category_name_field"
                                    label="Category"
                                    defaultValue={id.category_name_field}
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
                                    id="regNum"
                                    label="Registration Number"
                                    defaultValue={id.regNum}
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
                                    id="regDate"
                                    label="Registration Date"
                                    defaultValue={id.regDate}
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
                                    id="phone"
                                    label="Phone"
                                    defaultValue={id.phone}
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
                                    id="fax"
                                    label="Fax"
                                    defaultValue={id.fax}
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
                    )
                    )
                // ) : ("No data")
            // )

            
            }
          </>  
        );
    }
}

export default withStyles(styles)(index);


