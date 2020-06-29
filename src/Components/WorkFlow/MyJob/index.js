import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField
} from '@material-ui/core/'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Rating from '@material-ui/lab/Rating';

const styles = theme => ({

})

class index extends Component {

    state = {

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Card elevation={3}>
                    <CardContent>
                        <Typography variant='h5'>
                            Job Details
                    </Typography>

                        <Grid container justify='flex-start' spacing={4} style={{ marginTop: 20 }}>

                        <Grid item xs={9}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="companyLabel">
                                    Company
                                        </InputLabel>
                                <Select
                                    labelId="companyLabel"
                                    id="company"
                                    disabled={this.state.comapnyOptionDisable}
                                    value={this.state.addJobDialogCompany}
                                    onChange={event => {
                                        this.setState({ addJobDialogCompany: event.target.value })
                                    }}
                                    fullWidth
                                >
                                    {/* {
                                        this.state.companies.map(company => <MenuItem key={company} value={company}>{company.companyName}</MenuItem>)
                                        // this.state.positions.map(position => <MenuItem key={position} value={position}>{position.positionCategory}</MenuItem>)

                                    } */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3} style={{ marginTop: 15 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.addJobDialogCheck}
                                        onChange={event => this.setState({ addJobDialogCheck: !this.state.addJobDialogCheck })}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Other"
                            />
                        </Grid>

                        {
                            this.state.addJobDialogCheck ? (
                                <>
                                    {/* {this.setState({comapnyOptionDisable: !this.state.comapnyOptionDisable})} */}
                                    <Grid item fullWidth xs={6}>
                                        <TextField
                                            id="otherCompany"
                                            label="Other Company"
                                            value={this.state.addJobDialogOtherCompany}
                                            onChange={event => this.setState({ addJobDialogOtherCompany: event.target.value })}
                                            type="text"
                                            fullWidth
                                        />
                                        {/* } */}
                                    </Grid>
                                </>
                            ) : null
                        }

                        <Grid item xs={6}>
                            <input
                                class="w3-input"
                                type="date"
                                onChange={(event) => {
                                    this.setState({ addJobDialogStartDate: event.target.value });
                                    console.log(event.target.value);
                                }}

                            />
                        </Grid>

                        <Grid item xs={6}>


                            <input
                                class="w3-input"
                                type="date"
                                onChange={(event) => {
                                    this.setState({ addJobDialogEndDate: event.target.value });
                                    console.log(event.target.value);
                                }}

                            />

                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="positionLabel">
                                    Position
                                        </InputLabel>
                                <Select
                                    labelId="positionLabel"
                                    id="position"
                                    value={this.state.addJobDialogPosition}
                                    onChange={event => {
                                        // console.log('eventValue:', event.target.value)
                                        this.setState({ addJobDialogPosition: event.target.value })
                                        // console.log('positionValue:',this.state.addJobDialogPosition)
                                    }}
                                    fullWidth
                                >
                                    {/* {
                                        this.state.positions.map(position => <MenuItem key={position} value={position}>{position.positionCategory}</MenuItem>)
                                    } */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="jobTitle"
                                label="Job Title"
                                value={this.state.addJobDialogJobTitle}
                                onChange={event => this.setState({ addJobDialogJobTitle: event.target.value })}
                                type="text"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="jobDescription"
                                label="Job Description"
                                type="text"
                                fullWidth
                                multiline
                                rows={3}
                                value={this.state.addJobDialogJobDescription}
                                onChange={event => this.setState({ addJobDialogJobDescription: event.target.value })}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="reasonForLeaving">
                                    Reason for leaving
                                        </InputLabel>
                                <Select
                                    labelId="reasonForLeaving"
                                    id="reasonForLeaving"
                                    value={this.state.addJobDialogReasonForLeaving}
                                    onChange={event => {
                                        this.setState({ addJobDialogReasonForLeaving: event.target.value })
                                    }}
                                    label="resonForLeaving"
                                    fullWidth
                                >
                                    {/* {
                                        this.state.leavingReasons.map(leavingReason => <MenuItem key={leavingReason} value={leavingReason}>{leavingReason.reason}</MenuItem>)

                                    } */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Typography >How do you rate this company?</Typography>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 15 }} >
                            <Rating
                                name="simple-controlled"
                                value={this.state.addJobDialogRating}
                                onChange={(event, newValue) => this.setState({ addJobDialogRating: newValue })}
                                max={10}
                            />
                        </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </div>
        );
    }


}

export default withStyles(styles)(index);

