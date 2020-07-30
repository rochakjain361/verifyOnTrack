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
        academics: [],
        academicsBody: '',
        academicsId: '',
        academicsPics: ''
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 
    async fetchacademics() {
        const userId = this.props.userId;
      const code = this.props.code;
        let response = await fetch(api + "/api/v1/employees/" + userId + "/academics?code=" + code,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('academicsSuccess:', response)
        this.setState({ academics: response });
        this.setState({ academicsBody: this.state.academics[0]})
        console.log('academicsBody:', this.state.academicsBody)
        this.setState({ academicsId: this.state.academicsBody['id']})
        console.log('academicsId:', this.state.academicsId)
    }

    async fetchacademicsPics() {
        const userId = this.props.userId;
      const code = this.props.code;
        let response = await fetch(api + "/api/v1/employees/" + userId + "/idSources/"+ this.state.academicsId + "/pics?code=" + code,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('academicsPicsSuccess:', response)
        this.setState({ academicsPics: response });
    }

    async componentDidMount() {
        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

        this.fetchacademics()
        await this.fetchacademicsPics()
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
                                id="school"
                                label="Academic Type"
                                defaultValue={id.academicType_name_field}
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
