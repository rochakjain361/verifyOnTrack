import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    TextField,
    Paper,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"

const styles = theme => ({

})

class index extends React.Component {

    state = {
        jobs: []
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 
    async fetchJobs() {
        const userId = this.props.userId;
      const code = this.props.code;
        let response = await fetch(api + "/api/v1/employees/" + userId + "/jobs?code=" + code,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('JobsSuccess:', response)
        this.setState({ jobs: response });
    }

    componentDidMount() {
        const token1 = localStorage.getItem("Token");
        const token = "Token " + token1;
        const id = localStorage.getItem("id");
        this.fetchJobs()
    }

    render() {

        const { classes } = this.props;

        return (
            this.state.jobs.map((id) => (
                <div>

                    <Paper variant='outlined' style={{ marginTop: 20, padding: 20 }}>

                        <Grid container justify='space-between' spacing={3} style={{ padding: 10 }}>
                            <Typography variant='h6' fontWeight="fontWeightBold">Job Id: {id.id}</Typography>
                            <Typography variant='subtitle1'>{new Date(id.created_on).toDateString()}</Typography>
                        </Grid>

                        <Grid container justify='flex-start' spacing={1}>

                            <Grid item xs={12}>
                                {/* <Typography>
                                Company: {id.company === null? (id.company_other):(id.company)}
                            </Typography> */}
                                <TextField
                                    id="company"
                                    label="Company Name"
                                    defaultValue={id.company === null ? (id.company_other) : (id.company)}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={6}>
                                {/* <Typography>
                                Start date:  {id.startDate}
                            </Typography> */}
                                <TextField
                                    id="startDate"
                                    label="Start date"
                                    defaultValue={id.startDate}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={6}>
                                {/* <Typography>
                                End date:    {id.endDate}
                            </Typography> */}
                                <TextField
                                    id="endDate"
                                    label="End date"
                                    defaultValue={id.endDate}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {/* <Typography>
                                Job Category:    {id.job_category_field}
                            </Typography> */}
                                <TextField
                                    id="jobCategory"
                                    label="Job Category"
                                    defaultValue={id.job_category_field}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {/* <Typography>
                                Job Title:   {id.jobTitle}
                            </Typography> */}
                                <TextField
                                    id="jobTitle"
                                    label="Job Title"
                                    defaultValue={id.jobTitle}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {/* <Typography>
                                Job Description: {id.jobDescription}
                            </Typography> */}
                                <TextField
                                    id="jobDescription"
                                    label="Job Description"
                                    defaultValue={id.jobDescription}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {/* <Typography>
                                Leaving reason:  {id.leaving_reason_field}
                            </Typography> */}
                                <TextField
                                    id="leavingReason"
                                    label="Leaving reason"
                                    defaultValue={id.leaving_reason_field}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={6} style={{ marginTop: 5 }}>
                                <Typography >Company rating:    </Typography>
                            </Grid>

                            <Grid item xs={6} style={{ marginTop: 5 }}>
                                <Rating
                                    name="simple-controlled"
                                    value={id.companyRating}
                                    size='small'
                                    max={10}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            ))
        );
    }
}

export default withStyles(styles)(index);
