import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    CircularProgress,
    Grid,
    Typography,
    Paper,
} from '@material-ui/core/';

import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';


let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:8000"

const styles = theme => ({

})

class index extends Component {

    state = {
        allComments: [],

        isLoading: true
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   }

    isloading() {
        return (
            <>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    display="flex"
                    style={{ minHeight: "0vh" }}
                >
                    <CircularProgress />
                </Grid>
            </>
        );
    }


    async fetchAllComments() {

        let response = await fetch(api + "/api/v1/employers/" + id + "/comments",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('allcomments:', response)
        this.setState({ allComments: response });

    }

    componentDidMount() {

        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

        this.fetchAllComments();

        this.setState({ isLoading: false })

    }

    render() {

        const { classes } = this.props;
        console.log('Loading', this.state.isLoading)
        return (

            <div style={{ marginTop: 20 }}>

                {this.state.isLoading ? this.isloading() :
                    (
                        <>
                            <Grid container justify='space-between' alignItems='center' spacing={4}>

                                <Grid item xs={8}>
                                    <Typography variant='h4'>
                                        Comments
                                    </Typography>
                                </Grid>

                            </Grid>

                            {this.state.allComments.map((comment) => (
                                <Paper variant='outlined' style={{ padding: 10, marginTop: 20 }}>
                                    <Grid container justify='space-between' alignItems='flex-start' spacing={2}>

                                        <Grid item>
                                            <Typography variant='h6'>
                                                {comment.employee_name_field}
                                            </Typography>
                                            <Typography variant='subtitle1' color="textSecondary">
                                                {comment.company_name_field}
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Typography variant='subtitle2'>
                                                {new Date(comment.created_on).toDateString()}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography>
                                                {comment.comment}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </Paper>
                            ))}
                        </>

                    )}

            </div>
        );
    }

}

export default withStyles(styles)(index);
