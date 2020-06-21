import React, { Component } from 'react'
import {
    Grid,
    Button,
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({

})

class index extends Component {

    state={
        confirmationDialogBox: false,
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 10 }}>
                <Grid container direction='row' alignItems='center' spacing={2}> 
                    <Grid item xs={6}>
                        <Button variant='contained' color='primary'>Request VerifyOnTrac Evaluation</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='contained' color='secondary'
                        onClick={this.confirmationDialog()}>Request Cancel Evaluation Request</Button>
                    </Grid>
                </Grid>
                {this.confirmationDialog()}
            </div>
            
        );
    }

    confirmationDialog() {
        return(
            <div>
                <Dialog
            open={this.state.confirmationDialogBox}
            onClose={() => this.setState({ confirmationDialogBox: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
              "It is suggested that you complete profile updations before you request for VerifyOnTrac Evaluation. Do you want to proceed?
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: 15 }}>
              <Button style={{ width: 85 }} color="primary" variant="contained">
                Yes
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.setState({ confirmationDialogBox: false, selectedIndex: -1 })
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
