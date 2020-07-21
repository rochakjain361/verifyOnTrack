import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  Card,
  TextField,
  Button,
  Snackbar,
  Link,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class forgotpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      response: "",
      addsnackbar: false,
      sucess: false,
    };
  }

  async reset() {
    let bodyFormData = new FormData();
    bodyFormData.append("email", this.state.email);
    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/accounts/reset_password",
        bodyFormData
      )
      .then((res) => 
        res.status === 200 ? this.setState({ sucess: true }) : ""
      )
      .catch((err) => {
        console.log("err");
        this.setState({
          response: err.response.status,
          addsnackbar: true,
        });
      });
  }
  addsnackbar() {
    return this.state.response === 400 ? (
      <Snackbar
        open={this.state.addsnackbar}
        autoHideDuration={3000}
        onClick={() => {
          this.setState({
            addsnackbar: !this.state.addsnackbar,
          });
        }}
      >
        <Alert
          onClose={() => {
            this.setState({
              addsnackbar: !this.state.addsnackbar,
            });
          }}
          severity="error"
        >
            <CheckCircleIcon/>
          This Email Id is not registered please enter a valid Email Id
        </Alert>
      </Snackbar>
    ) : null;
  }
  render() {
    return (
      <div>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography display="block" variant="h5">
                Verify OnTrac
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        {this.state.sucess ? (
          <Box m={3} p={3}>
            <Grid
              container
              spacing={3}
              direction="column"
              justify="center"
              align="center"
            >
              <Grid item xs={12}>
                <Paper elevation={3} direction="column">
                  <Box
                    p={3}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: "50vh" }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      align="center"
                      justify="center"
                    >
                      You will receive an email with further instructions on how
                      to reset your password.
                    </Typography>
                  </Box>
                  <Box p={1}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      Back to &nbsp;
                      <Link title="Forgot Password" href="/signin">
                        Login
                      </Link>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box m={2} p={2}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Card
                  style={{ padding: 100 }}
                  //  spacing={3}
                  raised={true}
                >
                  <Grid
                    container
                    justify="flex-start"
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} justify="center">
                      <Grid container direction="row" justify="center">
                        <Typography
                          variant="h5"
                          gutterBottom
                          style={{ fontWeight: "bold" }}
                          color="primary"
                        >
                          Forgot Password
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* <Grid container direction="row" justify="center">
                      <Grid item xs={6}>
                        <Typography variant="subtitle" gutterBottom>
                          No Problem! Enter your email or username below and we
                          will send you an email with instruction to reset your
                          password.
                        </Typography>
                      </Grid>
                   
                  </Grid> */}
                    <Grid xs={12}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item xs={8}>
                          <TextField
                            variant="outlined"
                            required
                            margin="dense"
                            label="Email"
                            value={this.state.email}
                            type="email"
                            id="password"
                            autoComplete="current-password"
                            fullWidth
                            error={this.state.emailnf}
                            size="small"
                            helperText={"please enter your Email"}
                            onChange={(event) =>
                              this.setState({
                                email: event.target.value,
                              })
                            }
                          ></TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs={12}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            this.reset();
                          }}
                        >
                          Reset Password
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Box p={2}>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                          >
                            Back to &nbsp;
                            <Link title="Forgot Password" href="/signin">
                              Login
                            </Link>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
        {this.addsnackbar()}
      </div>
    );
  }
}
