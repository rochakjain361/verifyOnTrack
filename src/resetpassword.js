import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {
  CircularProgress,
  Typography,
  Box,
  Card,
  TextField,
  Button,
  Paper
} from "@material-ui/core";
function ValidationMessage(props) {
  if (!props.valid) {
    return <div className="error-msg">{props.message}</div>;
  }
  return null;
}
export class resetpassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      param: {
        uid: "",
        token: "",
      },
      result: [],
      loading: true,
      isuser: false,
      password: "",
      passwordValid: false,
      errorMsg: {},
      confirmpassword: "",
      passwordConfirmValid: false,
      tokenexpiration: false,
      resetpasswordsucess:true
    };
  }
  async resetpassword() {
    
    let bodyFormData = new FormData();
    bodyFormData.append("password", this.state.password);

    await axios
      .put(
        "http://3.22.17.212:8000/api/v1/accounts/" +
          this.state.result.user.id +
          "/resetPassword",
        bodyFormData,
      {
       headers: {
         Authorization:"Token "+this.state.param.token,
        
       },
     }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ resetpasswordsucess:false });
      });
  }
  isloading() {
    return (
      <Grid container justify="flex-end" alignItems="center" direction="column">
        <Grid item xs={6} style={{ marginTop: 150 }}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
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
    this.setState(
      { confirmpassword: passwordConfirm },
      this.validatePasswordConfirm
    );
  };
  validatePasswordConfirm = () => {
    const { passwordConfirm, password } = this.state;
    let passwordConfirmValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (this.state.password !== this.state.confirmpassword) {
      passwordConfirmValid = false;
      errorMsg.passwordConfirm = "Passwords do not match";
    }

    this.setState({ passwordConfirmValid, errorMsg }, this.validateForm);
  };
  async componentDidMount() {
    let url = this.props.location.search;
    let params = await queryString.parse(url);
    console.log("params", params);
    this.setState({ param: params });
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/accounts/verify_token?uid=" +
          params.uid,
        {
          headers: {
            Authorization: "Token " + params.token,
          },
        }
      )
      .then((res) =>
        res.status === 200
          ? this.setState({
              result: res.data,
              loading: false,
              isuser: true,
            })
          : this.setState({ loading: false })
      )
      .catch((err) =>
        err.response.status === 401 ? this.setState({ loading: false,tokenexpiration:true }) : null
      );
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          this.isloading()
        ) : this.state.tokenexpiration ? (
          <Box m={3} p={2}>
            <Paper elevation={3} direction="column">
              <Box
                p={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: "50vh" }}
              >
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  align="center"
                  direction="column"
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    justify="center"
                  >
                    Invalid Reset Link
                  </Typography>
                  <br />
                  <Grid item xs={12}>
                    <Button
                      // disabled={allData}

                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.props.history.push({
                          pathname: "/forgotpassword",
                        });
                      }}
                    >
                      Generate Reset Link
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        ) : this.state.resetpasswordsucess ? (
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-between"
          >
            <Box m={3} p={2}>
              <Typography
                display="block"
                variant="h3"
                gutterBottom
                style={{ fontWeight: "bold" }}
                color="primary"
              >
                Verify OnTrac
              </Typography>
            </Box>

            <Card
              style={{
                paddingLeft: 140,
                paddingRight: 140,
                paddingTop: 80,
                paddingBottom: 70,
              }}
              spacing={3}
              raised={true}
            >
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Typography display="block" variant="h5" align="center">
                    Enter your New Password
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ValidationMessage
                    valid={this.state.passwordValid}
                    message={this.state.errorMsg.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    margin="dense"
                    label="Password"
                    value={this.state.password}
                    type="password"
                    id="password"
                    fullWidth
                    //  error={this.state.this.state.passwordValid}
                    size="small"
                    helperText={"please enter your New Password"}
                    onChange={(event) => {
                      this.setState({
                        email: event.target.value,
                      });
                      this.updatePassword(event.target.value);
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <ValidationMessage
                    valid={this.state.passwordConfirmValid}
                    message={this.state.errorMsg.passwordConfirm}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    margin="dense"
                    label="Confirm Password"
                    value={this.state.confirmpassword}
                    type="password"
                    id="password"
                    fullWidth
                    //  error={this.state.passworderror}
                    size="small"
                    helperText={"please reenter your New Password"}
                    onChange={(event) => {
                      this.setState({
                        confirmpassword: event.target.value,
                      });
                      this.updatePasswordConfirm(event.target.value);
                    }}
                  ></TextField>
                </Grid>
                <Grid xs={12} align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      !this.state.passwordConfirmValid ||
                      !this.state.passwordValid
                    }
                    onClick={() => {
                      this.resetpassword();
                    }}
                  >
                    Reset Password
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ) : (
          <Box m={3} p={2}>
            <Paper elevation={3} direction="column">
              <Box
                p={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: "50vh" }}
              >
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  align="center"
                  direction="column"
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    justify="center"
                  >
                    Your Password has been changed please login into your
                    account
                  </Typography>
                  <br />
                  <Grid item xs={12}>
                    <Button
                      // disabled={allData}

                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.props.history.push({
                          pathname: "/",
                        });
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        )}
      </div>
    );
  }
}

export default resetpassword;
