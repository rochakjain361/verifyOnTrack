import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import GradientButton from "./GradientButton";



import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';


import ValidationMessage from "./ValidationMessage";
import Alert from "@material-ui/lab/Alert";

import { Box } from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";


// let IP=window.$IP;
class signIn extends Component {
  constructor(props) {
    super(props);
    this._reCaptchaRef = React.createRef();
    this.onSignInButtonPress = this.onSignInButtonPress.bind(this);
  }

  state = {
    username: "",
    password: "",
    usernamevalid: false,
    passwordvalid: false,
    submitDisabled: "disabled",
    warning: false,
    accountdeactivated: false,

    response: "",
    captha: "",
    capthavalid: false,
  };
  UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  usernamecheck = (event) => {
    this.setState({ username: event.target.value });
    console.log(this.state.username);
    if (event.target.value.length === 0) {
      //  console.log(event.target.value);
      this.setState({ usernamevalid: true });
    } else {
      this.setState({ usernamevalid: false });
    }
  };
  passwordcheck = (event) => {
    if (event.target.value.length === 0) {
      //  console.log(event.target.value);
      this.setState({ passwordvalid: true });
    } else {
      this.setState({ passwordvalid: false });
    }
  };

  formvalid() {
    console.log("username", this.state.username);
    if (this.state.username.length > 0) {
      //  console.log(event.target.value);
      this.setState({ usernamevalid: false });
    } else {
      this.setState({ usernamevalid: true });
    }
    if (this.state.password.length > 0) {
      //  console.log(event.target.value);
      this.setState({ passwordvalid: false });
    } else {
      this.setState({ passwordvalid: true });
    }
    if (this.state.captha === "") {
      console.log("captha", this.state.captha);
      this.setState({ capthavalid: false });
    } else {
      this.setState({ capthavalid: true });
    }
    if (
      !this.state.usernamevalid &&
      !this.state.passwordvalid &&
      this.state.capthavalid
    ) {
      this.onSignInButtonPress();
    }
  }
  handleChange = (value) => {
    console.log("Captcha value:", value);
    this.setState({ captha: value, capthavalid: true });

    if (value === null) this.setState({ expired: "true" });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="row" className={classes.root} justify="center">
        <Grid container align="center" direction="row" justify="center">
          <CssBaseline />

          <Grid
            container
            xs={6}
            direction="column"
            justify="center"
            align="center"
          >
            <Grid item>
              <img src="/images/VERIFY.png" width="385" height="385" alt="" />
            </Grid>
            <Grid item>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse faucibus interdum posuere lorem ipsum dolor sit. Sapien et ligula ullamcorper malesuada proin libero. Sed felis eget velit aliquet sagittis. Odio tempor orci dapibus ultrices in iaculis nunc. Et sollicitudin ac orci phasellus. Lectus arcu bibendum at varius vel pharetra vel turpis. Quis lectus nulla at volutpat diam ut. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Lacus sed turpis tincidunt id aliquet risus feugiat. Viverra adipiscing at in tellus integer feugiat scelerisque. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Odio ut sem nulla pharetra diam sit. At imperdiet dui accumsan sit amet nulla facilisi. At in tellus integer feugiat scelerisque varius morbi. Viverra vitae congue eu consequat ac. Lacus vel facilisis */}
            </Grid>
          </Grid>
          <Grid
            container
            xs={6}
            sm={6}
            md={6}
            square
            spacing={3}
            className={classes.mainImage}
            direction="row"
            justify="center"
          >
            <Grid
              container
              xs={6}
              sm={6}
              md={8}
              direction="column"
              align="center"
              justify="center"
            >
              <Card style={{ padding: 50 }} spacing={3} raised={true}>
                <Grid
                  spacing={2}
                  justify="center"
                  direction="row"
                  align="center"
                >
                  {this.state.warning ? (
                    <Alert severity="error">Wrong username or password</Alert>
                  ) : null}
                  {this.state.accountdeactivated ? (
                    <Alert severity="error">
                      Your Account has been deactivated please contact the admin
                    </Alert>
                  ) : null}

                  <Grid item xs={12} md={12}>
                    <Typography
                      style={{ fontWeight: "bold" }}
                      variant="h4"
                      gutterBottom
                      color="primary"
                    >
                      Sign In
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={10}>
                    <TextField
                      variant="standard"
                      margin="normal"
                      required
                      error={this.state.usernamevalid}
                      // style={{ marginRight: 10 }}
                      // margin="dense"
                      id="username"
                      label="User Name"
                      value={this.state.username}
                      type="text"
                      autoComplete="username"
                      autoFocus
                      fullWidth
                      size="medium"
                      helperText={
                        this.state.usernamevalid
                          ? "please enter your username"
                          : ""
                      }
                      onChange={(event) => this.usernamecheck(event)}
                    />
                  </Grid>

                  <Grid item xs={12} md={10}>
                    <TextField
                      variant="standard"
                      margin="normal"
                      required
                      error={this.state.passwordvalid}
                      // style={{ marginRight: 10 }}
                      // margin="dense"
                      label="Password"
                      value={this.state.password}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      fullWidth
                      size="small"
                      helperText={
                        this.state.passwordvalid
                          ? "please enter your password"
                          : ""
                      }
                      onChange={(event) =>
                        this.setState(
                          { password: event.target.value },
                          this.passwordcheck(event)
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <ValidationMessage
                      valid={!this.state.capthavalid}
                      // message={"please check this box"}
                    />
                    <Box p={2}>
                      <ReCAPTCHA
                        style={{ display: "inline-block" }}
                        theme="light"
                        // ref={this._reCaptchaRef}
                        sitekey={"6LdDrqsZAAAAABrsnwXy1KB8r1dhblamd3rFz7wd"}
                        onChange={this.handleChange}
                        // asyncScriptOnLoad={this.asyncScriptOnLoad}
                      />
                    </Box>
                  </Grid>

                  <Grid container spacing={1} sm={12} md={10}>
                    <Grid item xs={12}>
                      <GradientButton
                        onClick={() => this.formvalid()}
                        title={"SignIn"}
                        center
                        style={{
                          marginTop: 16,
                          marginBottom: 16,
                        }}
                        fullWidth
                      />
                    </Grid>

                    <Grid container xs={12} justify="center">
                      <Link
                        title="Don't have an account? Sign Up"
                        href="/signup"
                      >
                        Don't have an account?SignUp
                      </Link>
                    </Grid>

                    <Grid container xs={12} justify="center">
                      <Box p={2}>
                        <Link title="Forgot Password" href="/forgotpassword">
                          Forgot Password
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  async onSignInButtonPress() {
    try {
      let apiEndpoint =
        "http://" + window.$IP + ":9000/api/v1/accounts/auth/login";

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
        // localStorage.setItem("Token", data.token);
        localStorage.setItem("Token", "Token " + data.token);
        localStorage.setItem("id", data.user.id);

        localStorage.setItem(
          "name",
          data.user.firstname,
          data.user.middlename,
          data.user.surname
        );
        localStorage.setItem("email", data.user.email);

        this.setState({ response: data });
        if (data.user.is_admin) {
          this.props.history.push({
            pathname: "/admindashboard",
          });
        } else if (data.user.is_employer) {
          console.log("accountStatus", data.user.accountStatus);
          if (
            data.user.accountStatus === "Approved" ||
            data.user.accountStatus === "Account Reactivated"
          ) {
            this.props.history.push({
              pathname: "/employerDashboard",
            });
          } else if (data.user.accountStatus === "Profile In Progress") {
            this.props.history.push({
              pathname: "/employerworkflow",
              state: { detail: data },
            });
          }
        } else {
          if (
            data.user.accountStatus === "Approved" ||
            data.user.accountStatus === "Account Reactivated"
          ) {
            console.log("accountStatus", data.user.accountStatus);
            this.props.history.push({
              pathname: "/dashboard",
            });
          } else if (data.user.accountStatus === "Profile In Progress") {
            localStorage.setItem("ontrac_id", data.user.ontrac_id);
            console.log("accountStatus", data.user.accountStatus);
            this.props.history.push({
              pathname: "/workflow",
              state: { detail: data },
            });
          } else if (data.user.accountStatus === "Account Deactivated") {
            this.setState({ accountdeactivated: true });
          }
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
    // backgroundImage: "url(/images/mainImage2.jpg)",
    backgroundRepeat: "no-repeat",

    // backgroundColor: "#3f50b5",
    backgroundColor:"#2196f3"
  ,
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],
    // backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

export default withStyles(styles)(signIn);

