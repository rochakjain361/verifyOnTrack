import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Paper,
    Box
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
                <Grid container spacing={4} justify="center" alignItems="center" direction="column">
                    <Grid item xs={6}>
                        <Paper elevation={3} xs={6}>



                            <Box p={5}>
                                <Grid container
                                    spacing={4}
                                    direction="row"
                                    justify="center"
                                    alignItems="center"

                                >
                                    <Grid item xs={8}>

                                    <Typography variant='h5'  justify="center"
                                    align="center">
                                        Profile Details
                            </Typography>
                                    </Grid>

                                    <Grid item  xs={8}  >

                                        <TextField
                                            id="firstName"
                                            label="First name"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            size='small'
                                        />
                                    </Grid>


                                    <Grid item fullWidth xs={8}>
                                        <TextField
                                            id="middleName"
                                            label="Middle name"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            size='small'
                                        />
                                    </Grid>

                                    <Grid item  xs={8}>
                                        <TextField
                                            id="surname"
                                            label="Surname"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            size='small'
                                        />
                                    </Grid>

                                    <Grid item  xs={8}>
                                        <FormControl variant="outlined" fullWidth size='small'>
                                            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                //   value={age}
                                                //   onChange={handleChange}
                                                label="Age"
                                            >
                                                <MenuItem value={"Male"}>Male</MenuItem>
                                                <MenuItem value={"Female"}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <TextField
                                            id="surname"
                                            variant="outlined"
                                            type="date"
                                            fullWidth
                                            size='small'
                                        />
                                    </Grid>


                                </Grid>  </Box>


                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }


}

export default withStyles(styles)(index);

