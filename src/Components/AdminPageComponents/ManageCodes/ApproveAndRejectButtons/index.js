import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"
const cors = "https://cors-anywhere.herokuapp.com/"

const styles = theme => ({

})

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class index extends React.Component {

    state = {
        reasons: [],
        rejectDialog: false,
        reasonList: '',

        snackbar: "",
        snackbarresponse: "",
    }

    constructor(props) {
        super(props);
        this.fetchrejectReasons = this.fetchrejectReasons.bind(this);
        this.approveAccount = this.approveAccount.bind(this);
      } 

    async fetchrejectReasons() {
        const approval = this.props.approval;
        const viewId = this.props.viewId;

        let response = await fetch(cors + api + "/api/v1/resManager/account/reject-reasons",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('reasonsSuccess:', response,'ApprovalCode:', approval)
        this.setState({ reasons: response });
    }

    async approveAccount() {
        const approval = this.props.approval;
        const viewId = this.props.viewId;
        let bodyData = {
        }

        console.log('Body data:', approval)

        try {
            let response = await fetch(api + '/api/v1/accounts/approve?approvalCode=' + approval + '-orMy&approve=true',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }
            );
            response = await response.json();
            console.log('approvalSuccess:', response);
            this.setState({ snackbar: true, snackbarresponse: response});

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ snackbar: true, snackbarresponse: error.response })
        }
    }

    async rejectAccount() {
        const approval = this.props.approval;
        const viewId = this.props.viewId;
        let bodyData = {
            "rejectReason": this.state.reasonList
        }

        console.log('Body data:', approval)

        try {
            let response = await fetch(api + '/api/v1/accounts/approve?approvalCode=' + approval + '&approve=false',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }
            );
            response = await response.json();
            console.log('approvalSuccess:', response);
            this.setState({ rejectDialog: false })
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
            this.setState({ rejectDialog: false })
        }
    }

    async componentDidMount() {
        const token1 = localStorage.getItem("Token");
        const token = "Token " + token1;
        const id = localStorage.getItem("id");

        this.fetchrejectReasons()
    }

    snackBar() {
        return (
            <Snackbar
                open={this.state.snackbar}
                autoHideDuration={6000}
                onClick={() => { this.setState({ snackbar: !this.state.snackbar }) }}
            >
                {this.state.snackbarresponse.status === 201 ?
                    <Alert
                        onClose={() => { this.setState({ snackbar: !this.state.asnackbar }) }}
                        severity="success"
                    >
                        Account Approved!
                </Alert> :
                    this.state.snackbarresponse.status === 204 ?
                        <Alert
                            onClose={() => { this.setState({ snackbar: !this.state.asnackbar }) }}
                            severity="success">
                            Deleted sucessfully
                </Alert> :
                        <Alert
                            onClose={() => { this.setState({ snackbar: !this.state.snackbar }) }}
                            severity="error"
                        >
                            Something went wrong please try again
                </Alert>}
            </Snackbar>
        );
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container justify='center' spacing={2}>

                    <Grid item>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            onClick={() => this.approveAccount()}
                        >
                            Approve account
                </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            color='secondary'
                            variant='contained'
                            onClick={() => this.setState({ rejectDialog: !this.state.rejectDialog })}
                        >
                            Reject account
                </Button>
                    </Grid>

                </Grid>
                {this.rejectionDialog()}
                {this.snackBar()}
            </div>
        );
    }

    rejectionDialog() {
        return (
            <div>
                <Dialog
                    open={this.state.rejectDialog}
                    onClose={() => this.setState({ rejectDialog: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            If you want to proceed with the rejection please select a reason and click 'Reject'.
                        </DialogContentText>
                        <Grid item xs={12}>
                            
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.reasonList}
                                        onChange={event => {
                                            this.setState({ reasonList: event.target.value }, ()=> console.log('reasonId:', event.target.value))
                                        }}
                                        label="Reason"
                                    >
                                        {
                                            this.state.reasons.map(row => <MenuItem key={row.id} value={row.id}>{row.reason}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                           
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{ minWidth: 125 }}
                            onClick={()=> this.rejectAccount()} 
                            color="secondary"
                            variant='contained'
                        >
                            Reject
                        </Button>
                        <Button
                            style={{ minWidth: 125 }}
                            onClick={()=> this.setState({ rejectDialog: false })}
                            color="primary"
                            variant='contained'
                            autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(index);

