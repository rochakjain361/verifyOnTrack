import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import GradientButton from './GradientButton'
import RouterLink from './RouterLink/index.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

class signIn extends Component {

  constructor(props) {
    super(props);
    this.onSignInButtonPress = this.onSignInButtonPress.bind(this);
  }

  state = {
    username: '',
    password: ''
  }
  
  render() {

    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root} direction="row" justify="center">
        <CssBaseline />
        <Grid container xs={false} sm={12} md={12} square className={classes.mainImage} direction="row" justify="center">

          <Grid item style={{ marginTop: 40, marginBottom: 40 }} sm={6} md={6}>
            <Card style={{ padding: 50, marginLeft: 40, marginRight: 40 }} raised={true}>
              <form className={classes.form} noValidate>

                <Typography style={{fontFamily: 'Montserrat', fontWeight: 'bold'}} variant="h4" gutterBottom color="primary">
                  Sign In
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      id="username"
                      label="User Name"
                      value={this.state.username}
                      type="text"
                      autoComplete="username"
                      autoFocus
                      fullWidth
                      size="medium"
                      onChange={event => this.setState({ username: event.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      label="Password"
                      value={this.state.password}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      fullWidth
                      size="small"
                      onChange={event => this.setState({ password: event.target.value })}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1} sm={12} md={12}>
                  <Grid item xs={12}>
                    <GradientButton
                      onClick={this.onSignInButtonPress}
                      title={'Sign Up'}
                      center
                      style={{ marginTop: 16, marginBottom: 16, fontFamily: 'Montserrat', fontWeight: 'bold' }}
                      fullWidth
                    />
                  </Grid>

                  <Grid container xs={12} justify="center">
                    <RouterLink title="Don't have an account? Sign Up" to="/signup" />
                  </Grid>
                </Grid>

              </form>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  async onSignInButtonPress() {
    try {
      let apiEndpoint = 'http://127.0.0.1:8000/api/v1/accounts/auth/login';

      var requestBody = {
        username: this.state.username,
        password: this.state.password,
      };
      console.log(requestBody);

      let response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      });
      response = await response.json();
      console.log(response);
    } catch (error) {
      console.log('[!ON_REGISTER] ' + error);
    }
  }

}
signIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    height: '100vh',
  },
  mainImage: {
    backgroundImage: 'url(/images/mainImage2.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
});

export default withStyles(styles)(signIn);