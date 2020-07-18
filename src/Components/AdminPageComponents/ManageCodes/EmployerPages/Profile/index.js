import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Avatar,
    Paper
} from '@material-ui/core';

let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:8000"


const styles = theme => ({

})

class index extends React.Component {

    state = {
        profiles: [],
        user: '',
        approval: ''
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 

    async fetchProfiles() {
        const user = this.props.user;
        const approval = this.props.approval;
        console.log('user:', user)
        let response = await fetch(api + "/api/v1/employers/" + user + "/getdetails",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('profilesSuccess:', response)
        this.setState({ profiles: response });
    }

    async componentDidMount() {

        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

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
            ))
        );
    }
}

export default withStyles(styles)(index);


// import React, { Component } from 'react'
// import { withStyles } from '@material-ui/core/styles';
// import {
//     Grid,
//     TextField,
//     Paper,
//     Typography
// } from '@material-ui/core';

// let token1 = "";
// let token = "";
// let id = "";
// const api = "http://3.22.17.212:8000"

// const styles = theme => ({

// })

// class index extends React.Component {

//     state = {
//         locations: []
//     }

//     // constructor(props) {
//     //     super(props);
//     //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
//     //   } 
//     async fetchlocations() {
//         const user = this.props.user;
//       const approval = this.props.approval;
//         let response = await fetch(api + "/api/v1/employers/" + user + "/locations",
//             {
//                 headers: {
//                     'Authorization': token
//                 }
//             });
//         response = await response.json();
//         console.log('LocationSuccess:', response)
//         this.setState({ locations: response });
//     }

//     componentDidMount() {
       
//         token =  localStorage.getItem("Token");
//         id = localStorage.getItem("id");
//         this.fetchlocations()
//     }

//     render() {

//         const { classes } = this.props;

//         return (
//             this.state.locations.map((id) => (
//                 <Paper variant='outlined' style={{ marginTop: 20, padding: 20 }}>

//                     <Grid container justify='space-between' spacing={3} style={{ padding: 10 }}>
//                         <Typography variant='h6' fontWeight="fontWeightBold">Location Id: {id.id}</Typography>
//                     </Grid>

//                     <Grid container justify='center' direction='row' alignItems='center' spacing={1}>

//                         <Grid item fullWidth xs={12}>
//                             <TextField
//                                 id="suite"
//                                 label="Suite"
//                                 defaultValue={id.suite}
//                                 type="text"
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                                 fullWidth
//                                 size='small'
//                             />
//                         </Grid>

//                         <Grid item fullWidth xs={12}>
//                             <TextField
//                                 id="street"
//                                 label="Street"
//                                 defaultValue={id.street}
//                                 type="text"
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                                 fullWidth
//                                 size='small'
//                             />
//                         </Grid>

//                         <Grid item fullWidth xs={12}>
//                             <TextField
//                                 id="city"
//                                 label="City"
//                                 defaultValue={id.city_name_field}
//                                 type="text"
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                                 fullWidth
//                                 size='small'
//                             />
//                         </Grid>

//                         {id.city_other !== null ? (
//                             <Grid item fullWidth xs={12}>
//                             <TextField
//                                 id="cityOther"
//                                 label="City other"
//                                 defaultValue={id.city_other}
//                                 type="text"
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                                 fullWidth
//                                 size='small'
//                             />
//                         </Grid>
//                         ) : <div/>}

//                         <Grid item fullWidth xs={12}>
//                             <TextField
//                                 id="lga"
//                                 label="LGA"
//                                 defaultValue={id.lga_name_field}
//                                 type="text"
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                                 fullWidth
//                                 size='small'
//                             />
//                         </Grid>

//                         <Grid item fullWidth xs={12}>
//                             <TextField
//                                 id="state"
//                                 label="State"
//                                 defaultValue={id.state_name_field}
//                                 type="text"
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                                 fullWidth
//                                 size='small'
//                             />
//                         </Grid>


//                         <Grid item fullWidth xs={12}>
//                             <TextField
//                                 id="googleCoordinate1"
//                                 label="Google Coordinate 1"
//                                 defaultValue={id.google_coordinate1}
//                                 type="text"
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                                 fullWidth
//                                 size='small'
//                             />
//                         </Grid>

//                         <Grid item fullWidth xs={12}>
//                             <TextField
//                                 id="googleCoordinate2"
//                                 label="Google Coordinate 2"
//                                 defaultValue={id.google_coordinate2}
//                                 type="text"
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                                 fullWidth
//                                 size='small'
//                             />
//                         </Grid>

//                     </Grid>
//                 </Paper>
//             ))
//         );
//     }
// }

// export default withStyles(styles)(index);

