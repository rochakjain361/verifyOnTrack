import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import GradientButton from "./GradientButton";
import RouterLink from "./RouterLink/index.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import LandingPage from "../Components/LandingPage/index";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ValidationMessage from "./ValidationMessage";
import Alert from "@material-ui/lab/Alert";

class signIn extends Component {
  constructor(props) {
    super(props);
    this.onSignInButtonPress = this.onSignInButtonPress.bind(this);
  }

  state = {
    username: "",
    password: "",
    usernamevalid: false,
    passwordvalid: false,
    submitDisabled: "disabled",
    warning: false,
    response: "",
  };
  UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  usernamevalidcheck = (event) => {
    if (event.target.value.length > 0) {
      //  console.log(event.target.value);
      this.setState({ usernamevalid: true }, this.formvalid);
    }
  };
  passwordvalidcheck = (event) => {
    if (event.target.value.length > 0) {
      //  console.log(event.target.value);
      this.setState({ passwordvalid: true }, this.formvalid);
    }
  };
  formvalid = () => {
    if (this.state.usernamevalid && this.state.passwordvalid) {
      // console.log("////////////////////////////////")
      this.setState({ submitDisabled: "" });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <>
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
            xs={false}
            sm={12}
            md={12}
            square
            className={classes.mainImage}
            direction="row"
            justify="center"
          >
            <Grid
              item
              style={{ marginTop: 40, marginBottom: 40 }}
              sm={6}
              md={6}
            >
              <Card
                style={{ padding: 50, marginLeft: 40, marginRight: 40 }}
                raised={true}
              >
                {this.state.warning ? (
                  <Alert severity="error">Wrong username or password</Alert>
                ) : null}
                <form className={classes.form} noValidate>
                  <Typography
                    // style={{ fontFamily: "Montserrat", fontWeight: "bold", }}
                    variant="h4"
                    gutterBottom
                    color="primary"
                  >
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
                        onChange={(event) =>
                          this.setState(
                            { username: event.target.value },
                            this.usernamevalidcheck(event)
                          )
                        }
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
                        onChange={(event) =>
                          this.setState(
                            { password: event.target.value },
                            this.passwordvalidcheck(event)
                          )
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} sm={12} md={12}>
                    <Grid item xs={12}>
                      <GradientButton
                        onClick={this.onSignInButtonPress}
                        title={"Sign In"}
                        center
                        disabled={this.state.submitDisabled}
                        style={{
                          marginTop: 16,
                          marginBottom: 16,
                          // fontFamily: "Montserrat",
                          // fontWeight: "bold",
                          // fontSize: "18",
                          // color:"white"
                          
                        }}
                        fullWidth
                      />
                    </Grid>

                    <Grid container xs={12} justify="center">
                      <RouterLink
                        title="Don't have an account? Sign Up"
                        to="/signup"
                      />
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        {/* {this.state.response ? (
          <LandingPage data={this.state.response} />
        ) : (
          null
        )} */}
      </>
    );
  }

  async onSignInButtonPress() {
    try {
      let apiEndpoint = "http://3.22.17.212:8000/api/v1/accounts/auth/login";

      var requestBody = {
        username: this.state.username,
        password: this.state.password,
      };

      console.log(requestBody);
      let response = await fetch(apiEndpoint, {
        method: "POST",

        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const token = data["token"];
      console.log(data);

      if (data.token) {
        localStorage.setItem("Token", data.token);
        localStorage.setItem("id", data.user.id);

        this.setState({ response: data });
        if (data.user.is_admin) {
          this.props.history.push({
            pathname: "/admin",
          });
        } else if (data.user.is_employer) {
          this.props.history.push({
            pathname: "/employer",
          });
        } else {
          this.props.history.push({
            pathname: "/dashboard",
          });
        }
      } else {
        this.setState({ warning: true });
      }
    } catch (error) {
      console.log("[!ON_REGISTER] " + error);
      // return <Route exact path="/Homepage" component={LandingPage} />;
    }
  }
}
signIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  mainImage: {
    backgroundImage: "url(/images/mainImage2.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

export default withStyles(styles)(signIn);
