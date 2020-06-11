import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

class PreRegistrationPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        component="main"
        className={classes.root}
        direction="row"
        justify="center"
      >
        <CssBaseline />

        <Grid
          container
          xs={12}
          sm={12}
          md={12}
          square
          className={classes.mainImage}
          direction="row"
          justify="flex-end"
          spacing={3}
          style={{padding: 20}}
        >
          <Grid item>
          <Button style={{color: 'white'}} variant="outlined" size="large" href="/signin">
            <Typography variant='h5'>Sign In</Typography>
          </Button>
          </Grid>
          <Grid item>
          <Button style={{color: 'white'}} variant="outlined" size="large" href="/signup">
            <Typography variant='h5'>Sign Up</Typography>
          </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
PreRegistrationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    height: '100vh',
  },
  mainImage: {
    backgroundImage: 'url(/images/PreRegistrationBG.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
});

export default withStyles(styles)(PreRegistrationPage);