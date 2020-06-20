import React, { Component } from 'react'
import {
    Grid,
    Typography,
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';


const styles = theme => ({

})

class index extends Component {

    state = {
        overallProfileValue: 0,
        profileValue: 0,
        idValue: 0,
        addressValue: 0,
        phoneValue: 0,
        votValue: 0,
        otherJobsValue: 0
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 10 }}>
                <Typography style={{marginTop:10}} variant='h6'>Ratings</Typography>
                <Grid container style={{ marginTop: 15 }} >

                    <Grid item xs={3}>
                        <Typography>Profile:</Typography>
                    </Grid>
                    <Grid item xs={9}> 
                        <Rating
                            name="simple-controlled"
                            value={this.state.addJobDialogRating}
                            onChange={(event, newValue) => this.setState({ profileValue: newValue })}
                            max={10}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Typography>ID:</Typography>
                    </Grid>
                    <Grid item xs={9}> 
                        <Rating
                            name="simple-controlled"
                            value={this.state.addJobDialogRating}
                            onChange={(event, newValue) => this.setState({ idValue: newValue })}
                            max={10}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Typography>Address:</Typography>
                    </Grid>
                    <Grid item xs={9}> 
                        <Rating
                            name="simple-controlled"
                            value={this.state.addJobDialogRating}
                            onChange={(event, newValue) => this.setState({ addressValue: newValue })}
                            max={10}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Typography>Phone:</Typography>
                    </Grid>
                    <Grid item xs={9}> 
                        <Rating
                            name="simple-controlled"
                            value={this.state.addJobDialogRating}
                            onChange={(event, newValue) => this.setState({ phoneValue: newValue })}
                            max={10}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Typography>Other Jobs:</Typography>
                    </Grid>
                    <Grid item xs={9}> 
                        <Rating
                            name="simple-controlled"
                            value={this.state.addJobDialogRating}
                            onChange={(event, newValue) => this.setState({ otherJobsValue: newValue })}
                            max={10}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default withStyles(styles)(index);
