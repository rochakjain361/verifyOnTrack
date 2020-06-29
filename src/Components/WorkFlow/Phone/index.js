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
                            Phone Details
                    </Typography>

                        <Grid container justify='flex-start' spacing={4} style={{ marginTop: 20 }}>

                            <Grid item fullWidth xs={6}  >
                                <InputLabel>Phone Reason</InputLabel>
                                <Select
                                    autoFocus
                                    margin="dense"
                                    id="source"
                                    label="fullname"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(event) => {
                                        this.setState({ phoneReason: event.target.value });
                                    }}
                                //   defaultValue={this.state.result[this.state.selectedIndex].fullname}
                                >
                                    {/* {this.state.phoneReasons.map((phonetype) => (
                                        <MenuItem id={phonetype.id} value={phonetype.id}>
                                            {phonetype.phoneReason}
                                        </MenuItem>
                                    ))} */}
                                </Select>
                            </Grid>

                            <Grid item fullWidth xs={6}>
                                <InputLabel>Phone Type</InputLabel>
                                <Select
                                    fullWidth
                                    onChange={(event) => {
                                        this.setState({ phoneType: event.target.value });
                                    }}
                                //   defaultValue={this.state.result[this.state.selectedIndex].dob}
                                >
                                    {/* {this.state.phoneTypes.map((phonetype) => (
                                        <MenuItem id={phonetype.id} value={phonetype.id}>
                                            {phonetype.phoneType}
                                        </MenuItem>
                                    ))} */}
                                </Select>
                            </Grid>

                            <Grid item fullWidth xs={6}>
                                <InputLabel>DefaultPhone</InputLabel>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    onChange={(event) => {
                                        this.setState({ defaultPhone: event.target.value });
                                    }}

                                //   defaultValue={this.state.result[this.state.selectedIndex].sex}
                                >
                                    <MenuItem id={1} value="Yes">
                                        Yes
                  </MenuItem>
                                    <MenuItem id={2} value="No">
                                        No
                  </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item fullWidth xs={6}>
                                <InputLabel>Phone number</InputLabel>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="dob"
                                    label=""
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(event) => {
                                        this.setState({ phoneNumber: event.target.value });
                                    }}
                                //   defaultValue={this.state.result[this.state.selectedIndex].idSource}
                                />
                            </Grid>
                            <Grid item fullWidth xs={6}>
                                <InputLabel>IMEI number</InputLabel>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="dob"
                                    label=""
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(event) => {
                                        this.setState({ imeiNumber: event.target.value });
                                    }}
                                //   defaultValue={this.state.result[this.state.selectedIndex].idSource}
                                />
                            </Grid>
                            <Grid item fullWidth xs={6}>
                                <InputLabel>Started using on</InputLabel>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="dob"
                                    label=""
                                    type="date"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(event) => {
                                        this.setState({ startedUsingOn: event.target.value });
                                    }}
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

