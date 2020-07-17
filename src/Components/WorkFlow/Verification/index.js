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
import axios from "axios";
let token1 = "";
let token = "";
let id = "";
export class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            requestconfirmationDialogBox: false,
            confirmationDialogBox: false,
            approval: false,
        }
    }
    componentDidMount() {

        token1 = localStorage.getItem("Token");
        token = "Token " + token1;
        id = localStorage.getItem("id");

    }
   
    render() {

        return (
            <div>
                <Grid container direction="column" justify="center" alignItems="center" >
                    <Grid item xs={12}>
                        <Typography justify="center" align="center" >
                            Please request for approval if all details are entered.

                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            // disabled={!this.props.data.profile||!this.props.data.address||!this.props.data.phone||!this.props.data.jobHistory}
                            disabled={this.state.approval}
                            style={{ maxHeight: 30 }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.requestconfirmation()

                            }}
                        >
                            Submit for approval
                </Button>
                    </Grid>
                  
                </Grid>
            </div>
        )
    }
}

export default index
