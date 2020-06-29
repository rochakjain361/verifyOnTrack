import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button
} from '@material-ui/core/'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            requestconfirmationDialogBox: false,
            confirmationDialogBox: false

        }
    }

    render() {
        return (
            <div>
                <Grid container direction="column" justify="center" alignItems="center" >
                    <Grid item xs={12}>
                        <Typography justify="center" align="center" >
                            Please request for verification if all details are entered.

                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            style={{ maxHeight: 30 }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.setState({ requestconfirmationDialogBox: true });
                            }}
                        >
                            Request VerifyOnTrac Evaluation
                </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                this.setState({ confirmationDialogBox: true });
                            }}
                        >
                            Request Cancel Evaluation Request
                  </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default index
