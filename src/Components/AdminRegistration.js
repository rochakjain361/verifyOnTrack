import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button } from "@material-ui/core/";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import axios from "axios";

const styles = (theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
export class AdminRegistration extends Component {
  state = {
    onSubmitConfirmation: false,
    
    emailError: false,
    error: false,
    passwordnumber: false,
    passwordlength: false,
    passwordCapitalchar: false,
    firstName: "",
    middeName: "",
    surName: "",
    email:"",
    username:"",
    password:"",
    confirmpassword: "",
    confirmvalidate: false,
  };
  validatepassword = () => {
    const { password } = this.state;
    password.length < 6
      ? this.setState({ error: true, passwordlength: true })
      : this.setState({ passwordlength: false });
    !/\d/.test(password)
      ? this.setState({ error: true, passwordnumber: true })
      : this.setState({ passwordnumber: false });
    !/[!@#$%^&*]/.test(password)
      ? this.setState({ error: true, passwordCapitalchar: true })
      : this.setState({ passwordCapitalchar: false });
    if (
      !password.length < 6 &&
      !!/\d/.test(password) &&
      !!/[!@#$%^&*]/.test(password)
    ) {
      this.setState({ error: false });
    }
  };
  confirmpasswordvalidate = () => {
    const { confirmpassword } = this.state;
    if (this.state.password === confirmpassword) {
      this.setState({ confirmvalidate: false });
    } else {
      this.setState({ confirmvalidate: true });
    }
  };

  async submit(){
    
     let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    
    bodyFormData.append("firstname", this.state.firstName);
    bodyFormData.append("middlename", this.state.middeName);
    bodyFormData.append("surname", this.state.surName);
    bodyFormData.append("username", this.state.username);
    bodyFormData.append("email", this.state.email);
    bodyFormData.append("password", this.state.password);
console.log(bodyFormData);
    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/accounts/auth/admin/register",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <SupervisorAccountIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Resgistration
              </Typography>
              
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
                  size="small"
                  className={classes.textField}
                  onChange={(e) => {
                    this.setState({ firstName: e.target.value });
                  }}
                  helperText="Please enter your firstname"
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
                  size="small"
                  helperText="Please enter your middlename"
                  onChange={(e) => {
                    this.setState({ middeName: e.target.value });
                  }}
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
                  size="small"
                  helperText="Please enter your surname"
                  onChange={(e) => {
                    this.setState({
                      surName: e.target.value,
                    });
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="text"
                  autoComplete="text"
                  autoFocus
                  size="small"
                  helperText="Please enter your username"
                  onChange={(e) => {
                    this.setState({
                      username: e.target.value,
                    });
                  }}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={false}
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                  helperText="Please enter your emailid"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  error={this.state.error}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                  helperText={
                    this.state.passwordlength
                      ? "Password must be at least 6 characters long"
                      : this.state.passwordCapitalchar
                      ? "Password must contain special character: !@#$%^&*"
                      : this.state.passwordnumber
                      ? "Password must contain a number"
                      : null
                  }
                  onChange={(event) =>
                    this.setState(
                      { password: event.target.value },
                      this.validatepassword
                    )
                  }
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={this.state.confirmvalidate}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="coonFirmpassword"
                  autoComplete="confirm-password"
                  size="small"
                  helperText={
                    this.state.confirmvalidate
                      ? "password should match"
                      : "Please reenter your password"
                  }
                  onChange={(e) => {
                    this.setState(
                      { confirmpassword: e.target.value },
                      this.confirmpasswordvalidate
                    );
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  //  className={classes.submit}
                   onClick={() => this.submit()}
                >
                  Submit
                </Button>
              
            </div>
          </Container>
        

      
      </div>
    );
  }
}

export default withStyles(styles)(AdminRegistration);
