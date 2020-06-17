import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button } from '@material-ui/core/';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({

    paper: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

})

export class AdminRegistration extends Component {

    state={
        onSubmitConfirmation: false,

        emailError: false
    }

    emailvalidation() {

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                {
                    <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <SupervisorAccountIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Admin Resgistration
                        </Typography>
                        <form className={classes.form} noValidate>
    
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First name"
                                name="text"
                                autoComplete="text"
                                autoFocus
                                size='small'
                            />
    
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="middleName"
                                label="Middle name"
                                name="text"
                                autoComplete="text"
                                autoFocus
                                size='small'
                            />
    
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="surname"
                                label="Surname"
                                name="text"
                                autoComplete="text"
                                autoFocus
                                size='small'
                            />
    
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                size='small'
                            />
    
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                size='small'
                            />
    
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="coonFirmpassword"
                                autoComplete="confirm-password"
                                size='small'
                            />
    
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                // onClick={() => this.setState({ onSubmitConfirmation: true, selectedIndex: -1 })}
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </Container>
                }

                {
                    <Dialog open={this.state.onSubmitConfirmation} onClose={() => this.setState({ onSubmitConfirmation: false })} >
                    <DialogTitle id="form-dialog-title">Add new message</DialogTitle>
                    <DialogContent style={{ minWidth: 500 }}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="newMessage"
                        label="Type message"
                        type="text"
                        fullWidth
                        multiline
                        variant='outlined'
                        rows={4}
                      />
                    </DialogContent>
                    <DialogActions>
                    <Button variant='contained' color="primary" onClick={() => this.setState({ onSubmitConfirmation: false, selectedIndex: -1 })}>
                        Submit
                      </Button>
                      <Button variant='contained' color="secondary" onClick={() => this.setState({ onSubmitConfirmation: false, selectedIndex: -1 })}>
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                }
            </div>
        )
    }


}

export default withStyles(styles)(AdminRegistration);