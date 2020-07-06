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
import Link from '@material-ui/core/Link';
import axios from "axios";
import { Box } from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
// import ValidationMessage from './ValidationMessage';
function ValidationMessage(props) {
  if (!props.valid) {
    return <div className="error-msg">{props.message}</div>;
  }
  return null;
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
    firstnamevalid: false,
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
    Dob: "",
    gender: "",
    dobValue: false,
    genderValue: false,
    companyvalid: false,
    capthavalid:false,
    captha:"",
    signup:false,
    signupemail:false,
    signupusername:false
  };
  validatefirstname = (firstname1) => {
    console.log(firstname1.length)
    firstname1=firstname1.charAt(0).toUpperCase()+firstname1.slice(1)
   
    console.log("firstname",firstname1)
    this.setState({firstname:firstname1})
    let firstnameValid = true;
    if (firstname1.length === 0) {
      firstnameValid = false;

    }
    console.log("/////////////", firstnameValid)
    this.setState({ firstnamevalid: firstnameValid }, this.validateForm);

  }
  Capitalizemiddlename=(middlename1)=>{
    middlename1=middlename1.charAt(0).toUpperCase()+middlename1.slice(1)
   
    console.log("middlename",middlename1)
    this.setState({ middlename: middlename1 })

  }
  capitalizelastname=(lastname1)=>{
    lastname1=lastname1.charAt(0).toUpperCase()+lastname1.slice(1)
   
    console.log("lastname1",lastname1)
    this.setState({ surname: lastname1 })

  }
  companyvalue = (event) => {
    if (event.target.value.length > 0) { this.setState({ companyvalid: true }, this.validateForm, console.log("////////////", this.state.companyvalid)) }
    else {
      this.setState({ companyvalid: false }, this.validateForm)
    }
  }
  validateUsername = (event) => {
    const { username } = this.state;
    console.log("username",event);
    let usernameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (event.length < 5) {
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
  genderValidation = (data) => {
    if (data.target.value.length > 0) { this.setState({ genderValue: true }, this.validateForm) }

  }
  dobeval = (data) => {
    if (data.target.value.length > 0) { this.setState({ dobValue: true }, this.validateForm) }

  }
 
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
  handleChange = value => {
    console.log("Captcha value:", value);
    this.setState({captha:value,capthavalid:true},this.validateForm)

    if (value === null) this.setState({ expired: "true" });
  };
  validateForm = () => {
    // const {
    //   // firstnamevalid,
    //   usernameValid,
    //   emailValid,
    //   passwordValid,
    //   passwordConfirmValid,
    // } = this.state;
    // this.setState({
    //   formValid:this.state.firstnamevalid&&
    //      usernameValid && emailValid && passwordValid && passwordConfirmValid,
    // });
    // console.log("123456",this.state.firstnamevalid ,
    //   this.state.usernameValid ,
    //   this.state.emailValid ,
    //   this.state.passwordValid,
    //   this.state.passwordConfirmValid,
    //   this.state.genderValue,
    //   this.state.dobValue)
    if (this.state.designation === "Employee") {
      if (
        this.state.firstnamevalid &&
        this.state.usernameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordConfirmValid &&
        this.state.genderValue &&
        this.state.dobValue
        &&this.state.capthavalid


      ) {
        this.setState({ submitDisabled: false });
      } else {
        this.setState({ submitDisabled: true });
      }
    } else if (this.state.designation === "Employer") {
      if (
        this.state.firstnamevalid &&
        this.state.usernameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordConfirmValid 
        &&this.state.companyvalid&&
        this.state.capthavalid


      ) {
        this.setState({ submitDisabled: false });
      } else {
        this.setState({ submitDisabled: true });
      }
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
                  align="center"
                // style={{ fontFamily: "Montserrat", fontWeight: "bold" }}
                >
                  Sign Up
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" size="small">
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
                        onChange={(event) => {
                          this.setState({ companyName: event.target.value })
                          this.companyvalue(event)
                        }
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
                      onChange={(event) => {
                       
                        this.validatefirstname(event.target.value)
                      }
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
                       this.Capitalizemiddlename(event.target.value)
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
                       this.capitalizelastname(event.target.value)
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
                          this.validateUsername(event.target.value)
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
                  {this.state.designation === "Employee" ? <>
                    <Grid item fullWidth xs={12}>

                      <FormControl variant="outlined" fullWidth size="small">
                        <InputLabel htmlFor="gender" >Gender</InputLabel>
                        <Select

                          label="gender"
                          margin="dense"

                          // value={age}
                          onChange={(event) => {
                            this.setState({ gender: event.target.value, }, this.genderValidation(event))
                          }
                          }
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                      </FormControl>

                    </Grid>

                    <Grid item fullWidth xs={12}>

                      <TextField
                        id="dob"
                        size="small"
                        variant="outlined"
                        label="Date of birth"
                        format={false}
                        margin="dense"
                        InputLabelProps={{ shrink: true, required: true }}
                        // defaultValue={result[this.state.selectedIndex].dob}
                        onChange={(event) => {
                          this.setState({ Dob: event.target.value }, this.dobeval(event))


                        }}
                        type="date"
                        fullWidth
                      />
                    </Grid></> : null}
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
                  <Grid item xs={12} >
                    <Grid container justify="center" alignItems="center">

                      <ReCAPTCHA
                        style={{ display: "inline-block" }}
                        theme="light"
                        // ref={this._reCaptchaRef}
                        sitekey={"6LdDrqsZAAAAABrsnwXy1KB8r1dhblamd3rFz7wd"}
                        onChange={this.handleChange}
                      // asyncScriptOnLoad={this.asyncScriptOnLoad}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Snackbar open={this.state.signup} autoHideDuration={3000} onClick={() =>  this.setState({ signup: false }) }>
            <Alert onClose={() => { this.setState({ signup: !this.state.signup }) }} severity="error">
            This username and email already exists 
      </Alert>
          </Snackbar>
          <Snackbar open={this.state.signupusername} autoHideDuration={3000} onClick={() =>  this.setState({ signupusername: false }) }>
            <Alert onClose={() => { this.setState({ signupusername: !this.state.signupusername }) }} severity="error">
            This username already exists 
      </Alert>
          </Snackbar>
          <Snackbar open={this.state.signupemail} autoHideDuration={3000} onClick={() =>  this.setState({ signupemail: false }) }>
            <Alert onClose={() => { this.setState({ signupemail: !this.state.signupemail }) }} severity="error">
            This email already exists 
      </Alert>
          </Snackbar>
     
                
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
                    {/* <RouterLink title="Have an account? Sign In" to="/" /> */}
                    <Link title="Don't have an account? Sign Up" href="/signin" >
                      Have an account? Sign In
           </Link>
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
      console.log(this.state.designation)
      let apiEndpoint =
        "http://3.22.17.212:8000/api/v1/accounts/auth";
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
          dob: this.state.Dob,
          sex: this.state.gender,
        };
      }
      else if (this.state.designation === "Employer") {
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
      }
      else apiEndpoint += "/admin/register";



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
     
      if (response.token) {
        localStorage.setItem("Token", response.token);
        localStorage.setItem("id", response.user.id);


        if (response.user.is_admin) {
          this.props.history.push({
            pathname: "/admin",
          });
        } else if (response.user.is_employer) {
          this.props.history.push({
            pathname: "/employer",
          });
        } else {
          this.props.history.push({
            pathname: "/workflow",
            state: { detail: response }
          });
        }
      } else {
        this.setState({ warning: true });
        console.log("response", response.email);
        if(response.email&&response.username){
          this.setState({signup:true})
        }
        else if(response.email){

          this.setState({signupemail:true})
        }
        else if(response.username){
          this.setState({signupusername:true})
        }
       
        

      }
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
