import React, { Component } from "react";
import { Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
// import Box from "@material-ui/core/Box";
// import CardMedia from "@material-ui/core/CardMedia";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
// import image from "../../../../public/images/mainImage.jpg";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormikTextField } from 'formik-material-fields'; 
import FormikSelectField from "formik-material-fields/lib/FormikSelectField";
let token1 = "";

let token = "";
let id = "";
// let result = [];
let history = [];
let pictures = [];
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Identities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateDialogOpen: false,
      selectedIndex: -1,
      loading: true,
      viewDialogeOpen: false,
      uploadDialougeOpen: false,
      pictureid: "",
      addDialogOpen: false,
      idSource: [],
      selectedidSource: "",
      fullName: "",
      idNumber: "",
      sex: "",
      dob: "",
      updateFullName: "",
      updatedob: "",
      updatesex: "",
      updateidnumber: "",
      updateidSource: "",
      updatereason: "",
      historyloading: true,
      historyDialogeOpen: false,
      uploadpictures: "",
      pictureloading: "false",
      result: [],
      buttondisabled: "disabled",
      addsnackbar: false,
      addresponse: "",
      updateresponse: "",
      updatesnackbar: false,
      amount: "",
      debitresponse: "",
      currentid: "",
      uploadsnackbar: false,
      uploadresponse: "",
    };
    // this.updateidentites= this.updateidentites.bind();
  }
  reasonforupdatevalidcheck = (event) => {
    if (event.target.value.length > 0) {
      //  console.log(event.target.value);
      this.setState({ buttondisabled: "" });
    } else if (event.target.value > 250) {
      this.setState({ buttondisabled: "disabled" });
    } else {
      this.setState({ buttondisabled: "disabled" });
    }
  };
  addsnackbar() {
    return this.state.addresponse === 200 ? (
      <div>
        <Snackbar
          open={this.state.addsnackbar}
          autoHideDuration={3000}
          onClick={() => this.setState({ addsnackbar: false })}
        >
          <Alert
            onClose={() => {
              this.setState({ addsnackbar: !this.state.addasnackbar });
            }}
            severity="success"
          >
            Identites added sucessfully
          </Alert>
        </Snackbar>
      </div>
    ) : (
      <Snackbar
        open={this.state.addsnackbar}
        autoHideDuration={3000}
        onClick={() => {
          this.setState({ addsnackbar: !this.state.addsnackbar });
        }}
      >
        <Alert
          onClose={() => {
            this.setState({ addsnackbar: !this.state.addsnackbar });
          }}
          severity="error"
        >
          Something went wrong please try again
        </Alert>
      </Snackbar>
    );
  }
  updatesnackbar() {
    return this.state.updateresponse === 200 ? (
      <div>
        <Snackbar
          open={this.state.updatesnackbar}
          autoHideDuration={3000}
          onClick={() => this.setState({ updatesnackbar: false })}
        >
          <Alert
            onClose={() => {
              this.setState({ updatesnackbar: !this.state.updatesnackbar });
            }}
            severity="success"
          >
            Identites updated sucessfully
          </Alert>
        </Snackbar>
      </div>
    ) : (
      <Snackbar
        open={this.state.updatesnackbar}
        autoHideDuration={3000}
        onClick={() => {
          this.setState({ updatesnackbar: !this.state.updatesnackbar });
        }}
      >
        <Alert
          onClose={() => {
            this.setState({ updatesnackbar: !this.state.updatesnackbar });
          }}
          severity="error"
        >
          Something went wrong please try again
        </Alert>
      </Snackbar>
    );
  }
  async getidentites() {
    await axios
      .get(
        "http://3.22.17.212:9000/api/v1/employees/" +
          id +
          "/identities-by/" +
          id,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        //result = res.data;
        this.setState({ result: res.data });
        console.table("identites", this.state.result);
      });
  }
  async componentDidMount() {
    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");
    await this.getidentites();
    let idSource = await axios.get(
      "http://3.22.17.212:9000/api/v1/resManager/id/sources/?excludeSystem=true",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    idSource = idSource.data;
    console.log("idSource", idSource);
    this.setState({ idSource: idSource });
    this.setState({ loading: false });
  }
  isloading() {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          display="flex"
          style={{ minHeight: "100vh" }}
        >
          <CircularProgress />
        </Grid>
      </>
    );
  }
  async getHistory(index) {
    this.setState({
      historyDialogeOpen: true,
    });
    await axios
      .get(
        "http://3.22.17.212:9000/api/v1/employees/" +
          id +
          "/identities-by/" +
          id +
          "/idSources/" +
          index +
          "/history",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        history = res.data;
        console.log("history", history);
        this.setState({ historyloading: false });
      });
  }
  async postidentites() {
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("employee", id);
    bodyFormData.append("fullname", this.state.fullName);
    bodyFormData.append("idNumber", this.state.idNumber);
    bodyFormData.append("sex", this.state.sex);
    bodyFormData.append("dob", this.state.dob);
    bodyFormData.append("idSource", this.state.selectedidSource);

    await axios
      .post(
        "http://3.22.17.212:9000/api/v1/employees/post-identity",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
        this.setState({ addresponse: response.status, addsnackbar: true });
      });
    await this.getidentites();
  }
  async updateidentites(idsource) {
    this.setState({
      updateDialogOpen: false,
    });
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("idSource", this.state.updateidSource);
    bodyFormData.append("idNumber", this.state.updateidnumber);
    bodyFormData.append("fullname", this.state.updateFullName);
    bodyFormData.append("sex", this.state.updatesex);
    bodyFormData.append("dob", this.state.updatedob);
    bodyFormData.append("update_reason", this.state.updatereason);

    await axios
      .post(
        "http://3.22.17.212:9000/api/v1/employees/update-identity",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
        this.setState({
          updateresponse: response.status,
          updatesnackbar: true,
        });
      });
    await this.getidentites();
  }

  handleSubmit = (values, { 
    props = this.props, 
    setSubmitting 
  }) => {
    this.setState(
      {
        addDialogOpen: false,
        // selectedIndex: -1,
      },
      this.postidentites
    )
    setSubmitting(false);
    return;
  }
  handleUpdateSubmit = (values, {
    props = this.props, 
    setSubmitting 
  }) => {
    this.setState({
      updateDialogOpen: false,
    })
    this.updateidentites(
      this.state.result[this.state.selectedIndex].idSource
    );
    setSubmitting(false);
    return;
  }

  render() {
    var options = []; 
    this.state.idSource.map((source) => {
      options.push({label: source.idSource, value: source.id})
    })
    console.log(options)
    return (
      <div>
        {this.state.loading ? this.isloading() : this.getTableOfEmployees()}
        <Dialog
          //  fullWidth={"sm"}
          //  maxWidth={"sm"}
          open={this.state.viewDialogeOpen}
          onClose={() => this.setState({ viewDialogeOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <Typography variant="subtitle1" gutterBottom align="center">
              View pictures
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <GridList
                cellHeight={160}
                style={{ height: 500, width: 500 }}
                cols={3}
              >
                {this.state.pictureloading
                  ? this.isloading()
                  : pictures.map((pic, index) => (
                      <GridListTile key={pic.id} cols={1}>
                        <img src={pic.picture} />
                      </GridListTile>

                      // <Grid container>
                      //     <Grid item xs={12}>
                      // <image src={pic.picture}/>
                      //       {/* {pic.picture} */}
                      //     </Grid>
                      //   </Grid>
                    ))}{" "}
              </GridList>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: 15 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                this.setState({ viewDialogeOpen: false, selectedIndex: -1 })
              }
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {
          <Dialog
            open={this.state.uploadDialougeOpen}
            onClose={() => this.setState({ uploadDialougeOpen: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">choose your file</DialogTitle>
            <DialogContent>
              <Grid container p={1}>
                <TextField
                  type="file"
                  onChange={(event) => {
                    this.setState({ uploadpictures: event.target.files[0] });
                  }}
                ></TextField>
              </Grid>

              <DialogActions style={{ padding: 15 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    this.postpictures(this.state.pictureid);
                  }}
                >
                  upload
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    this.setState({
                      uploadDialougeOpen: false,
                      selectedIndex: -1,
                    })
                  }
                >
                  Close
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        }
        {this.updatesnackbar()}
        {
          <Dialog
            open={this.state.walletdialog}
            onClose={() => this.setState({ walletdialog: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" align="center" justify="center">
              You need to pay {this.state.amount} for this service from wallet
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  this.setState(
                    {
                      walletdialog: false,
                    },
                    this.pay
                  )
                }
              >
                Pay
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.setState({
                    walletdialog: false,
                  })
                }
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        }
        {
          <Dialog
            open={this.state.addDialogOpen}
            onClose={() => this.setState({ addDialogOpen: false })}
            aria-labelledby="form-dialog-title"
          >
            <Formik
            initialValues={{
              firstName: '',
              gender: '',
              idNumber: '',
              idSource: '',
              dob: ''
            }}
            validate={(values) => {
              let errors = {};
              if(!values.firstName){
                errors.firstName = "First Name Required";
              } else if(values.firstName.length > 15){
                errors.firstName = "Must be 15 characters or less";
              }

              if(!values.gender){
                errors.gender = "Gender Required";
              }

              if(!values.idNumber){
                errors.idNumber = "Id Number Required";
              } else if(!/^[1-9]\d*$/i.test(values.idNumber)){
                errors.idNumber = "Invalid Id Number";
              }

              if(!values.idSource){
                errors.idSource = "Id Source Required";
              }

              if(!values.dob){
                errors.dob = "Date of Birth Required";
              } else if(!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/i.test(values.dob)){
                errors.dob = "Invalid Date of Birth";
              }
              return errors;
            }}
            onSubmit={this.handleSubmit}
            render={(formprops) => {
              return(
              <Form>
                <DialogTitle id="form-dialog-title" align="center" justify="center">
                  Add Identity
                </DialogTitle>
                <DialogContent>
                  <DialogContentText align="center">
                    Enter the details of your identity
                  </DialogContentText>
                <Grid
                  container
                  justify="flex-start"
                  direction="row"
                  alignItems="center"
                  spacing={3}
                >
                <Grid item fullWidth xs={12}>
                  <FormikTextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ fullName: event.target.value });
                  }}
                  />
                </Grid>
                <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <FormikSelectField
                    name="gender"
                    label="Gender"
                    id="gender"
                    options={[
                      {label: 'Male', value: 'Male'},
                      {label: 'Female', value: 'Female'}
                    ]}
                    fullWidth
                    onChange={(event) => {
                      this.setState({ sex: event.target.value });
                    }}
                    />
                  </FormControl>
                </Grid>

                <Grid item fullWidth xs={12}>
                  <FormikTextField
                  id="idNumber"
                  name="idNumber"
                  label="Id Number"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ idNumber: event.target.value });
                  }}
                  />
                </Grid>

                <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <FormikSelectField
                    name="idSource"
                    label="Id Source"
                    id="Id Source"
                    options={options}
                    fullWidth
                    onChange={(event) => {
                      this.setState({ selectedidSource: event.target.value });
                    }}
                    />
                  </FormControl>
                </Grid>

                <Grid item fullWidth xs={12}>
                <InputLabel id="dob">Date of birth</InputLabel>
                  <FormikTextField
                  id="dob"
                  name="dob"
                  type="date"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ dob: event.target.value });
                    console.log(event.target.value)
                  }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={formprops.isSubmitting}
              >
                Submit Identity
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.setState({
                    addDialogOpen: false,
                    // selectedIndex: -1,
                  })
                }
              >
                Cancel
              </Button>
            </DialogActions>
              </Form>)}}
            />
          </Dialog>
        }
        {this.addsnackbar()}
      </div>
    );
  }

  adddata() {
    return (
      <>
        <Grid item xs={12}></Grid>

        <Grid item xs={12}>
          <Paper style={{ padding: 20 }} elevation={3}>
            <Box
              p={8}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{ height: "50vh" }}
            >
              <Typography variant="h5" gutterBottom align="center">
                Add Identites to improve ratings.
              </Typography>

              <Grid container justify="center" style={{ marginTop: 50 }}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.setState({ addDialogOpen: true });
                    }}
                  >
                    Add Identity
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </>
    );
  }
  async getpictures(idsource) {
    this.setState({ viewDialogeOpen: true });
    this.setState({ pictureloading: true });
    await axios
      .get(
        "http://3.22.17.212:9000/api/v1/employees/" +
          id +
          "/idSources/" +
          idsource +
          "/pics",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        pictures = res.data;
        console.log("pictures", pictures);
        this.setState({ pictureloading: false });
      });
  }
  async postpictures(id) {
    this.setState({ uploadDialougeOpen: false });
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("empIdentity", id);
    bodyFormData.append("picture", this.state.uploadpictures);

    await axios
      .post(
        "http://3.22.17.212:9000/api/v1/employees/post-identitiy-pic",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
        this.setState({
          uploadresponse: response.status,
          uploadsnackbar: true,
        });
        response.status===200?
        alert("Your image has been uploaded succesfully"):alert("Something went wrong please try again")
      });
  }
  async getamount() {
    await axios
      .get(
        "http://3.22.17.212:9000/api/v1/resManager/serviceAPI/?serviceName=identityverification"
      )
      .then((res) => this.setState({ amount: res.data[0].serviceCharge }));
  }
  async pay() {
    let transactionid = Math.floor(
      10000000000000000 + Math.random() * 9000000000000000
    );
    let headers1 = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .post(
        "http://3.22.17.212:9000/wallet/transaction?type=DEBIT&amount=" +
          this.state.amount +
          "&description=" +
          transactionid,
        "",
        headers1
      )
      .then((response) => {
        if (response.status === 200) {
          this.verification();
        }
      });
  }
  async verification() {
    let headers = {
      headers: {
        Authorization: token,
      },
    };
    let bodyFormData = {
      verType: "Identity",
      objId: this.state.currentid,
    };

    await axios
      .post(
        "http://3.22.17.212:9000/api/v1/codes/evaluation/new-code",
        bodyFormData,
        headers
      )
      .then((res) => {
        window.location.reload(false);
      });
  }

  getTableOfEmployees() {
    return (
      <>
        {this.state.result.length === 0 ? (
          this.adddata()
        ) : (
          <>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-end"
            >
              <Box p={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.setState({ addDialogOpen: true });
                    }}
                  >
                    Add Identity
                  </Button>
                </Grid>
              </Box>
            </Grid>
            <TableContainer component={Paper} elevation={16}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow style={{ backgroundColor: "black" }}>
                    {[
                      " Created Date",
                      "Full Name",
                      "Date of birth",
                      "Sex",
                      "Identity Source",
                      "Identity Number",
                      "Source",
                      "Picture",
                      "Verified by",
                      "Update",
                      "History",
                      "Verification",
                    ].map((text, index) => (
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        {text}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.result.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">
                        {new Date(row.created_on).toDateString()}
                      </TableCell>
                      <TableCell align="center">{row.fullname}</TableCell>
                      <TableCell align="center">{row.dob}</TableCell>
                      <TableCell align="center">{row.sex}</TableCell>
                      <TableCell align="center">
                        {row.idSource_name_field}
                      </TableCell>
                      <TableCell align="center">{row.idNumber}</TableCell>

                      <TableCell align="center">
                        {row.idSource_name_field}
                      </TableCell>
                      <TableCell align="center">
                        <Grid
                          container
                          display="flex"
                          direction="row"
                          alignItems="center"
                          justify="center"
                          spacing={1}
                        >
                          <Grid item>
                            <Button
                              size="small"
                              color="primary"
                              variant="outlined"
                              onClick={() => this.getpictures(row.idSource)}
                            >
                              View
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              size="small"
                              color="secondary"
                              variant="outlined"
                              onClick={() =>
                                this.setState(
                                  {
                                    uploadDialougeOpen: true,
                                    pictureid: row.id,
                                  },
                                  console.log(
                                    "picturedid",
                                    this.state.pictureid
                                  )
                                )
                              }
                            >
                              upload
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="center">
                        {row.owner_name_field}
                      </TableCell>

                      <TableCell align="center">
                        <Button
                          size="small"
                          disabled={row.status === "Audit In Progress"}
                          color="primary"
                          variant="outlined"
                          onClick={() =>
                            this.setState({
                              updateDialogOpen: true,
                              selectedIndex: index,
                              updateFullName: this.state.result[index].fullname,
                              updatedob: this.state.result[index].dob,
                              updatesex: this.state.result[index].sex,
                              updateidnumber: this.state.result[index].idNumber,
                              updateidSource: this.state.result[index].idSource,
                            })
                          }
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          color="secondary"
                          variant="outlined"
                          onClick={() => this.getHistory(row.idSource)}
                        >
                          history
                        </Button>
                      </TableCell>
                      {row.showVerifyOnTrac_btn === true ? (
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="outlined"
                            color="default"
                            onClick={() => {
                              this.setState({
                                walletdialog: true,
                                currentid: row.id,
                              });
                              this.getamount();
                            }}
                          >
                            Request for verification
                          </Button>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {this.state.selectedIndex === -1 ? (
                <div />
              ) : (
                <Dialog
                  open={this.state.updateDialogOpen}
                  onClose={() => this.setState({ updateDialogOpen: false })}
                  aria-labelledby="form-dialog-title"
                >
                  <Formik
                  initialValues={{
                    fullName: this.state.updateFullName,
                    idNumber: this.state.updateidnumber,
                    dob: this.state.updatedob,
                    gender: this.state.updatesex,
                    updatereason: '',
                  }}
                  validate={(values) => {
                    let errors = {};

                    if(!values.fullName){
                      errors.fullName = "Full Name Required";
                    }
                    else if(values.fullName.length > 30){
                      errors.fullName = "Must be 30 characters or less";
                    }
                    
                    if(!values.idNumber){
                      errors.idNumber = "Id Number Required";
                    } else if(!/^[1-9]\d*$/i.test(values.idNumber)){
                      errors.idNumber = "Invalid Id Number";
                    }

                    if(!values.dob){
                      errors.dob = "Date of Birth Required";
                    } else if(!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/i.test(values.dob)){
                      errors.dob = "Invalid Date of Birth";
                    }

                    if(!values.gender){
                      errors.gender = "Gender Required";
                    }

                    if(!values.updatereason){
                      errors.updatereason = "Reason for Update Required";
                    } else if(values.updatereason.length > 250){
                      errors.updatereason = "Character Limit Exceeded";
                    }

                    return errors;
                    
                  }}
                  onSubmit={this.handleUpdateSubmit}
                  render={(formprops) => {
                    return(
                      <Form>
                  <DialogTitle id="form-dialog-title" align="center">
                    Update Identity
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText align="center">
                      Type in details to update
                    </DialogContentText>

                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item fullWidth xs={12}>
                        <FormikTextField
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        onChange={(event) => {
                          this.setState({
                            updateFullName: event.target.value,
                          });
                        }}
                        type="text"
                        fullWidth
                        />
                      </Grid>
                      <Grid item fullWidth xs={12}>
                        <FormikTextField
                        id="idNumber"
                        name="idNumber"
                        label="Id Number"
                        onChange={(event) => {
                          this.setState({
                            updateidnumber: event.target.value,
                          });
                        }}
                        type="text"
                        fullWidth
                        />
                      </Grid>

                      <Grid item fullWidth xs={12}>
                        <InputLabel id="dob">Date of birth</InputLabel>
                        <FormikTextField
                          id="dob"
                          name="dob"
                          type="date"
                          fullWidth
                          onChange={(event) => {
                          this.setState({ updatedob: event.target.value });
                          }}
                        />
                      </Grid>

                      <Grid item fullWidth xs={12}>
                        <FormControl fullWidth>
                        <FormikSelectField
                          name="gender"
                          labelId=""
                          label="Gender"
                          id="gender"
                          options={[
                          {label: 'Male', value: 'Male'},
                          {label: 'Female', value: 'Female'}
                          ]}
                          fullWidth
                          onChange={(event) => {
                            this.setState({ updatesex: event.target.value });
                          }}
                        />
                        </FormControl>
                      </Grid>

                      {/* <Grid item fullWidth xs={12}>
                      <Select
                        id="idSource"
                        label="Id Source"
                        defaultValue={this.state.updateidSource}
                        onChange={(event) => {
                          this.setState({ updateidSource: event.target.value });
                        }}
                        type="text"
                        fullWidth
                      >
                      {this.state.idSource.map((source) => (
                        <MenuItem id={source.id} value={source.id}>
                          {source.idSource}
                        </MenuItem>
                      ))}</Select>
                    </Grid> */}

                      <Grid item fullWidth xs={12}>
                        <FormikTextField
                        id="updatereason"
                        label="Update Reason"
                        name="updatereason"
                        helperText="update reason should be less than 250 characters"
                        onChange={(event) => {
                          this.setState(
                            { updatereason: event.target.value },
                            this.reasonforupdatevalidcheck(event)
                          );
                        }}
                        type="text"
                        fullWidth
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>

                  <DialogActions style={{ padding: 15 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit" 
                      disabled={this.state.buttondisabled || formprops.isSubmitting}
                    >
                      Update
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() =>
                        this.setState({
                          updateDialogOpen: false,
                          selectedIndex: -1,
                        })
                      }
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                      </Form>
                    )
                  }}
                  />
                </Dialog>
              )}
            </TableContainer>
          </>
        )}

        <Dialog
          fullWidth={"md"}
          maxWidth={"md"}
          open={this.state.historyDialogeOpen}
          onClose={() => this.setState({ historyDialogeOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">
            Identities History
          </DialogTitle>
          {/* <DialogContent> */}
          <TableContainer p={3}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  {[
                    "Full Name",
                    "Date of birth",
                    "Sex",
                    "Id Source",
                    "Id Number",
                    "Records Updated Date",
                    "Update Reason",
                  ].map((text, index) => (
                    <TableCell style={{ fontWeight: "bolder" }} align="center">
                      {text}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {this.state.historyloading ? (
                this.isloading()
              ) : (
                <TableBody>
                  {history.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.fullname}</TableCell>
                      <TableCell align="center">{row.dob}</TableCell>
                      <TableCell align="center">{row.sex}</TableCell>
                      <TableCell align="center">
                        {row.idSource_name_field}
                      </TableCell>
                      <TableCell align="center">{row.idNumber}</TableCell>{" "}
                      <TableCell component="th" align="center">
                        {new Date(row.created_on).toDateString()}
                      </TableCell>
                      <TableCell align="center">{row.update_reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {/* </DialogContent> */}
          <DialogActions style={{ padding: 15 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                this.setState({ historyDialogeOpen: false, selectedIndex: -1 })
              }
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default Identities;
