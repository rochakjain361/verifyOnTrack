import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import GradientButton from "./GradientButton";
import RouterLink from "./RouterLink/index.js";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";

// import ValidationMessage from './ValidationMessage';
function ValidationMessage(props) {
  if (!props.valid) {
    return <div className="error-msg">{props.message}</div>;
  }
  return null;
}
class signUp extends Component {
  constructor(props) {
    super(props);
    this.onRegisterButtonPress = this.onRegisterButtonPress.bind(this);
  }

  state = {
    designation: "",
    companyName: "",
    firstname: "",
    middlename: "",
    surname: "",
    username: "",
    usernameValid: false,
    email: "",
    emailValid: false,
    password: "",
    passwordValid: false,
    passwordConfirm: "",
    passwordConfirmValid: false,
    errorMsg: {},
    formValid: "disabled",
    submitDisabled: "disabled",
  };
  validateUsername = () => {
    const { username } = this.state;
    let usernameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (username.length < 5) {
      usernameValid = false;
      errorMsg.username = "Must be at least 5 characters long";
    }

    this.setState({ usernameValid, errorMsg }, this.validateForm);
  };

  updateEmail = (email) => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
      errorMsg.email = "Invalid email format";
    }

    this.setState({ emailValid, errorMsg }, this.validateForm);
  };

  updatePassword = (password) => {
    this.setState({ password }, this.validatePassword);
  };

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // must be 6 chars
    // must contain a number
    // must contain a special character

    if (password.length < 6) {
      passwordValid = false;
      errorMsg.password = "Password must be at least 6 characters long";
    } else if (!/\d/.test(password)) {
      passwordValid = false;
      errorMsg.password = "Password must contain a digit";
    } else if (!/[!@#$%^&*]/.test(password)) {
      passwordValid = false;
      errorMsg.password = "Password must contain special character: !@#$%^&*";
    }

    this.setState({ passwordValid, errorMsg }, this.validateForm);
  };

  updatePasswordConfirm = (passwordConfirm) => {
    this.setState({ passwordConfirm }, this.validatePasswordConfirm);
  };

  validatePasswordConfirm = () => {
    const { passwordConfirm, password } = this.state;
    let passwordConfirmValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (password !== passwordConfirm) {
      passwordConfirmValid = false;
      errorMsg.passwordConfirm = "Passwords do not match";
    }

    this.setState({ passwordConfirmValid, errorMsg }, this.validateForm);
  };
  validateForm = () => {
    const {
      usernameValid,
      emailValid,
      passwordValid,
      passwordConfirmValid,
    } = this.state;
    this.setState({
      formValid:
        usernameValid && emailValid && passwordValid && passwordConfirmValid,
    });
    if (
      this.state.username &&
      this.state.emailValid &&
      this.state.passwordValid &&
      this.state.passwordConfirmValid
    ) {
      this.setState({ submitDisabled: "" });
    }
  };
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
          xs={false}
          sm={12}
          md={12}
          square
          className={classes.mainImage}
          direction="row"
          justify="center"
        >
          <Grid item style={{ marginTop: 40, marginBottom: 40 }} sm={6} md={6}>
            <Card
              style={{ padding: 50, marginLeft: 40, marginRight: 40 }}
              raised="true"
            >
              <form className={classes.form} noValidate>
                <Typography
                  variant="h4"
                  gutterBottom
                  color="primary"
                  style={{ fontFamily: "Montserrat", fontWeight: "bold" }}
                >
                  Register
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Designation
                      </InputLabel>
                      <Select
                        xs={12}
                        labelId="designation"
                        id="designation"
                        value={this.state.designation}
                        onChange={(event) =>
                          this.setState({ designation: event.target.value })
                        }
                        label="registerType"
                        fullWidth
                        size="medium"
                      >
                        <MenuItem value="Employer">Employer</MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                      </Select>
                      <FormHelperText>Select your designation:</FormHelperText>
                    </FormControl>
                  </Grid>
                  {this.state.designation === "Employer" ? (
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        style={{ marginRight: 10 }}
                        margin="dense"
                        id="companyName"
                        label="Company Name"
                        value={this.state.companyName}
                        onChange={(event) =>
                          this.setState({ companyName: event.target.value })
                        }
                        type="text"
                        autoComplete="companyName"
                        autoFocus
                        fullWidth
                        size="medium"
                      />
                    </Grid>
                  ) : null}

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      id="firstname"
                      label="First Name"
                      value={this.state.firstname}
                      onChange={(event) =>
                        this.setState({ firstname: event.target.value })
                      }
                      type="text"
                      autoComplete="firstname"
                      autoFocus
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      id="middlename"
                      label="Middle Name"
                      value={this.state.middlename}
                      onChange={(event) =>
                        this.setState({ middlename: event.target.value })
                      }
                      type="text"
                      autoComplete="middlename"
                      autoFocus
                      fullWidth
                      size="medium"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      id="surname"
                      label="Surname"
                      value={this.state.surname}
                      onChange={(event) =>
                        this.setState({ surname: event.target.value })
                      }
                      type="text"
                      autoComplete="surname"
                      autoFocus
                      fullWidth
                      size="medium"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ValidationMessage
                      valid={this.state.usernameValid}
                      message={this.state.errorMsg.username}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      id="username"
                      label="Username"
                      value={this.state.username}
                      onChange={(event) =>
                        this.setState(
                          { username: event.target.value },
                          this.validateUsername
                        )
                      }
                      type="text"
                      autoComplete="username"
                      autoFocus
                      fullWidth
                      size="medium"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ValidationMessage
                      valid={this.state.emailValid}
                      message={this.state.errorMsg.email}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      id="email"
                      label="Email Address"
                      value={this.state.email}
                      onChange={(event) =>
                        this.setState(
                          { email: event.target.value },
                          this.validateEmail
                        )
                      }
                      name="email"
                      autoComplete="email"
                      autoFocus
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ValidationMessage
                      valid={this.state.passwordValid}
                      message={this.state.errorMsg.password}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      name="password"
                      label="Password"
                      value={this.state.password}
                      onChange={(event) =>
                        this.setState(
                          { password: event.target.value },
                          this.validatePassword
                        )
                      }
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ValidationMessage
                      valid={this.state.passwordConfirmValid}
                      message={this.state.errorMsg.passwordConfirm}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      name="confirmPassword"
                      label="Confirm Password"
                      value={this.state.passwordConfirm}
                      onChange={(event) =>
                        this.setState(
                          { passwordConfirm: event.target.value },
                          this.validatePasswordConfirm
                        )
                      }
                      type="password"
                      id="confirmPassword"
                      autoComplete="current-password"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <GradientButton
                      onClick={this.onRegisterButtonPress}
                      title={"Sign Up"}
                      disabled={this.state.submitDisabled}
                      center
                      style={{
                        marginTop: 16,
                        marginBottom: 16,
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid container xs={12} justify="center">
                    <RouterLink title="Have an account? Sign In" to="/" />
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  async onRegisterButtonPress() {
    try {
      console.log(this.state.designation);
      let apiEndpoint = "http://3.22.17.212:8000/api/v1/accounts/auth";
      var requestBody;
      if (this.state.designation === "Employee") {
        apiEndpoint += "/employee/register";
        requestBody = {
          firstname: this.state.firstname,
          middlename: this.state.middlename,
          surname: this.state.surname,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        };
      } else if (this.state.designation === "Employer") {
        apiEndpoint += "/employer/register";
        requestBody = {
          designation: this.state.designation,
          companyName: this.state.companyName,
          firstname: this.state.firstname,
          middlename: this.state.middlename,
          surname: this.state.surname,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        };
      } else apiEndpoint += "/admin/register";

      console.log("reqestBody", requestBody);

      let response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });
      console.log("..................................................");
      response = await response.json();
      console.log("response", response);
    } catch (error) {
      console.log("[!ON_REGISTER] " + error);
    }
  }
}
signUp.propTypes = {
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

export default withStyles(styles)(signUp);
