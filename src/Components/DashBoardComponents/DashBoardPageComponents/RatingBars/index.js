import React, { Component } from 'react'
import {
    Grid,
    Typography,
    Paper,
    ButtonGroup,
    Button,
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Chart from "react-apexcharts";

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
        otherJobsValue: 0,

        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 10 }}>
                {/* <Grid container style={{ marginTop: 15 }} >
                <Grid item xs={3}>
                        <Typography variant='h6'>Overall Profile:</Typography>
                    </Grid>
                    <Grid item xs={9}> 
                        <Rating
                            size="large"
                            name="simple-controlled"
                            value={this.state.addJobDialogRating}
                            onChange={(event, newValue) => this.setState({ overallProfileValue: newValue })}
                            max={10}
                        />
                    </Grid>

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
                        <Typography>VerifyOnTrac Jobs:</Typography>
                    </Grid>
                    <Grid item xs={9}> 
                        <Rating
                            name="simple-controlled"
                            value={this.state.addJobDialogRating}
                            onChange={(event, newValue) => this.setState({ votValue: newValue })}
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
                </Grid> */}

                <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
            </div>
        );
    }

}

export default withStyles(styles)(index);
