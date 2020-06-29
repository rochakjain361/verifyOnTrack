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
                            Identity Details
                    </Typography>

                        <Grid container justify='flex-start' spacing={4} style={{ marginTop: 20 }}>

                        <Grid item fullWidth xs={6}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    onChange={(event) => {
                      this.setState({ fullName: event.target.value });
                    }}
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item fullWidth xs={6}>
                  <TextField
                    id="idNumber"
                    label="Id Number"
                    // defaultValue={result[this.state.selectedIndex].surname}
                    onChange={(event) => {
                      this.setState({ idNumber: event.target.value });
                    }}
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item fullWidth xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      id="gender"
                      // value={age}
                      onChange={(event) => {
                        this.setState({ sex: event.target.value });
                      }}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>


                <Grid item fullWidth xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="idSource">Id Source</InputLabel>
                    <Select
                      labelId="idSource"
                      id="idSource"
                      // value={age}
                      onChange={(event) => {
                        this.setState({ selectedidSource: event.target.value });
                      }}
                    >
                      {/* {this.state.idSource.map((source) => (
                        <MenuItem id={source.id} value={source.id}>
                          {source.idSource}
                        </MenuItem>
                      ))} */}
                    </Select>
                  </FormControl>
                  </Grid>

                  <Grid item fullWidth xs={6}>
                  <TextField
                    id="dob"
                    variant="outlined"
                    // label="Date of birth"
                    onChange={(event) => {
                      this.setState({ dob: event.target.value });
                    }}
                    type="date"
                    fullWidth
                    variant="outlined"
                    helperText="Date of Birth"
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

