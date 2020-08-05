import React, { Component } from 'react'
import {
    Grid,
    Button,
    CircularProgress
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

const styles = theme => ({

})
let token1="";
let token="";
let id="";
class index extends Component {
  state = {
    confirmationDialogBox: false,
    requestconfirmationDialogBox: false,
  };
async getevaldata(){
  await axios
    .get("http://3.22.17.212:9000/api/v1/employees/" + id + "/needsEval", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      // result = res.data;
      this.setState({ result: res.data });
      // console.table("needeval data", this.state.result.needsEval);
    });
}
  async componentDidMount() {
    this.setState({ loading: true });
    
    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");
    await this.getevaldata();
    this.setState({ loading: false });
  }
  async requestconfirmation() {
    this.setState({ requestconfirmationDialogBox: false });
    console.log(token);

    let headers = {
      headers: {
        Authorization: token,
      },
    };
    //  let bodyFormData = new FormData();
    await axios
      .post(
        "http://3.22.17.212:9000/api/v1/codes/evaluation/new-code",
        "",

        headers
      )
      .then((response) => {
        console.log(response);
      });
       await this.getevaldata();
  }
  async confirmation() {
   
    console.log(token);

    let headers = {
      headers: {
        Authorization: token,
      },
    };
    //  let bodyFormData = new FormData();
    await axios
      .put(
        "http://3.22.17.212:9000/api/v1/codes/evaluation/cancel",
        "",

        headers
      )
      .then((response) => {
        console.log(response);
      });
      this.getevaldata();
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginTop: 20 }}>
        <Grid
        // style={{marginLeft:20}}
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {this.state.result ? (
            this.state.result.needsEval === true &&
            this.state.result.evalRequested === false ? (
              <Grid item xs={12}>
                <Button
                style={{maxHeight: 30}}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ requestconfirmationDialogBox: true });
                  }}
                >
                  Request VerifyOnTrac Evaluation
                </Button>
              </Grid>
            ) : this.state.result.evalRequested ? (
              <>
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
              </>
            ) : null
          ) : (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Dialog
          open={this.state.requestconfirmationDialogBox}
          onClose={() => this.setState({ requestconfirmationDialogBox: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              It is suggested that you complete profile updations before you
              request for VerifyOnTrac Evaluation. Do you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ padding: 15 }}>
            <Button
              style={{ width: 85 }}
              color="primary"
              variant="contained"
              onClick={()=>{ this.setState({ requestconfirmationDialogBox: false },this.requestconfirmation)}}
            >
              Yes
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() =>
                this.setState({
                  requestconfirmationDialogBox: false,
                  selectedIndex: -1,
                })
              }
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.confirmationDialogBox}
          onClose={() => this.setState({ confirmationDialogBox: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Verify OnTrac Evaluation is under progress. Do you want to cancel
              the evaluation?
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ padding: 15 }}>
            <Button style={{ width: 85 }} color="primary" variant="contained" onClick={()=>{this.setState({ confirmationDialogBox: false },this.confirmation)}}>
              Yes
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() =>
                this.setState({
                  confirmationDialogBox: false,
                  selectedIndex: -1,
                })
              }
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(index);
