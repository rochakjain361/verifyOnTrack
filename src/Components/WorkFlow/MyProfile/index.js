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
                            Profile Details
                    </Typography>

                        <Grid container justify='flex-start' spacing={4} style={{ marginTop: 20 }}>

                            <Grid item xs={6}>
                                <TextField
                                    id="firstName"
                                    label="First name"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="middleName"
                                    label="Middle name"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="surname"
                                    label="Surname"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item fullWidth xs={6}>
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

                            <Grid item xs={6}>
                                <TextField
                                    id="surname"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    size='small'
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

