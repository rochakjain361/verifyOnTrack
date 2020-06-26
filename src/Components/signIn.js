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
import Link from '@material-ui/core/Link';
import LandingPage from "../Components/LandingPage/index";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ValidationMessage from "./ValidationMessage";
import Alert from "@material-ui/lab/Alert";
import CardMedia from '@material-ui/core/CardMedia';
import { Box } from "@material-ui/core";



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
  usernamecheck = (event) => {
    this.setState(
      { username: event.target.value })
    console.log(this.state.username)
    if (event.target.value.length === 0) {
      //  console.log(event.target.value);
      this.setState({ usernamevalid: true },);

    } else {
      this.setState({ usernamevalid: false },);
    }
  }
  passwordcheck = (event) => {
    if (event.target.value.length === 0) {
      //  console.log(event.target.value);
      this.setState({ passwordvalid: true },);
    }
    else {
      this.setState({ passwordvalid: false },);
    }
  }

  formvalid() {
    console.log("username", this.state.username)
    if (this.state.username.length > 0) {
      //  console.log(event.target.value);
      this.setState({ usernamevalid: false },);
    } else {
      this.setState({ usernamevalid: true },);
    }
    if (this.state.password.length > 0) {
      //  console.log(event.target.value);
      this.setState({ passwordvalid: false },);
    }
    else {
      this.setState({ passwordvalid: true },);
    }
    if (!this.state.usernamevalid && !this.state.passwordvalid) {
      this.onSignInButtonPress()
    }
  };


  render() {
    const { classes } = this.props;

    return (
      <Grid container
        direction="row"
        className={classes.root}
        justify="center">
        <Grid
          container
          align="center"
          direction="row"
          justify="center">
          <CssBaseline />

          <Grid container
            xs={6}
            direction="column"
            justify="center"
            align="center" >
            <Grid
              item >

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
           <Grid container xs={6}
            sm={6}
            md={8}
            direction="column"
            align="center"
            justify="center"
            >
              <Card
                style={{ padding: 50,}}
               
                
                spacing={3}

                raised={true}
              >
                <Grid  spacing={2} justify="center" direction="row" align="center">
                  {this.state.warning ? (
                    <Alert severity="error">Wrong username or password</Alert>
                  ) : null}

                  <Grid item xs={12} md={12}>

                    <Typography
                      // style={{ fontFamily: "Montserrat", fontWeight: "bold", }}
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
                      margin="dense"
                      id="username"
                      label="User Name"
                      value={this.state.username}
                      type="text"
                      autoComplete="username"
                      autoFocus
                      fullWidth
                      size="medium"
                      helperText={this.state.usernamevalid ? "please enter your username" : ""}
                      onChange={(event) =>
                        this.usernamecheck(event)


                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={10}>
                    <TextField
                      variant="standard"
                      margin="normal"
                      required
                      error={this.state.passwordvalid}
                      // style={{ marginRight: 10 }}
                      margin="dense"
                      label="Password"
                      value={this.state.password}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      fullWidth
                      size="small"
                      helperText={this.state.passwordvalid ? "please enter your password" : ""}
                      onChange={(event) =>
                        this.setState(
                          { password: event.target.value }, this.passwordcheck(event)

                        )
                      }
                    />
                  </Grid>


                  <Grid container spacing={1} sm={12} md={10}>
                    <Grid item xs={12}>
                      <GradientButton
                        onClick={() => this.formvalid()}
                        title={"SignIn"}
                        center
                        // disabled={this.state.submitDisabled}
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

                      <Link title="Don't have an account? Sign Up" href="/signup" >
                        Don't have an account?SignUp
                     </Link>
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
            pathname: "/manageStates",
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
    // backgroundImage: "url(/images/mainImage2.jpg)",
    backgroundRepeat: "no-repeat",
    
    backgroundColor:"#3f50b5",
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],
    // backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

export default withStyles(styles)(signIn);

