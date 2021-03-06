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
        academics: []
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 
    async fetchAcademics() {
        const user = this.props.user;
      const approval = this.props.approval;
        let response = await fetch(api + "/api/v1/employees/" + user + "/academics?approvalcode=" + approval,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('academicsSuccess:', response)
        this.setState({ academics: response });
    }

    componentDidMount() {
       
        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");
        
        this.fetchAcademics()
    }

    render() {

        const { classes } = this.props;

        return (
            this.state.academics.map((id) => (
                <Paper variant='outlined' style={{ marginTop: 20, padding: 20 }}>

                    <Grid container justify='space-between' spacing={3} style={{ padding: 10 }}>
                        <Typography variant='h6' fontWeight="fontWeightBold">Academics Id: {id.id}</Typography>
                        <Typography variant='subtitle1'>{new Date(id.created_on).toDateString()}</Typography>
                    </Grid>

                    <Grid container justify='center' direction='row' alignItems='center' spacing={1}>

                    <Grid item fullWidth xs={12}>
                            <TextField
                                id="degree"
                                label="Degree"
                                defaultValue={id.degree}
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
                                id="school"
                                label="School"
                                defaultValue={id.school}
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
                                id="startDate"
                                label="Start Date"
                                defaultValue={id.startDate}
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
                                id="endDate"
                                label="End Date"
                                defaultValue={id.endDate}
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
