import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { CircularProgress, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { Button } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
let token1 = "";
let token = "";
let id = "";
// let result = [];
let history = [];
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Phones extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addDialogOpen: false,
      updateDialogOpen: false,
      selectedIndex: -1,
      phoneReason: "",
      phoneType: "",
      defaultPhone: "",
      phoneNumber: "",
      imeiNumber: "",
      startedUsingOn: "",
      updateReason: "",
      phoneReasons: "",
      PhoneTypes: "",
      phoneTypeOther: "",
      phoneReasonOther: "",
      loading: true,
      updatephoneType: "",
      updatephoneTypeother: "",
      updatephoneReason: "",
      updatephoneReasonother: "",
      updateimeiNumber: "",
      updatephoneNumber: "",
      updatestartedusingon: "",
      updatedefaultPhone: "",
      historyloading: true,
      historyDialougeOpen: false,
      result: [],
      buttondisabled: "disabled",
      addsnackbar: false,
      addresponse: "",
      updateresponse: "",
      updatesnackbar: false,
    };
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
  async getphonedata() {
    await axios
      .get("http://3.22.17.212:8000/api/v1/employees/" + id + "/phones", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        //  result = res.data;
        this.setState({ result: res.data });
        console.table("Phones", this.state.result);
        // console.log(result[0].phone_reason);
      });
  }
  async componentDidMount() {
    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");
    await this.getphonedata();
    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/phone/reasons/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({ phoneReasons: res.data });
        console.table("PhonesReason", this.state.phoneReasons);
      });
    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/phone/types/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({ phoneTypes: res.data });
        console.table("PhonesTypes", this.state.phoneTypes);
      });
    this.setState({ loading: false });
  }
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
            Phone added sucessfully
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
        {console.log("//////////////////////////////////////")}

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
            Phone updated sucessfully
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
  async postPhones() {
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("employee", id);
    bodyFormData.append("phone_type", this.state.phoneType);
    bodyFormData.append("phone_type_other", this.state.phoneTypeOther);
    bodyFormData.append("phone_reason", this.state.phoneReason);
    bodyFormData.append("phone_reason_other", this.state.phoneReasonOther);
    bodyFormData.append("imeiNumber", this.state.imeiNumber);
    bodyFormData.append("phoneNumber", this.state.phoneNumber);
    bodyFormData.append("dateObtained", this.state.startedUsingOn);
    bodyFormData.append("default_phone", this.state.defaultPhone);

    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/post-phone",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
        this.setState({ addresponse: response.status, addsnackbar: true });
      });
    await this.getphonedata();
  }
  async verification(id) {
    let headers = {
      headers: {
        Authorization: token,
      },
    };
    let bodyFormData = {
      verType: "Phone",
      objId: id,
    };
    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/codes/evaluation/new-code",
        bodyFormData,
        headers
      )
      .then((res) => {
        this.getphonedata();
      });
  }
  async updatePhones(phoneid) {
    this.setState({
      updateDialogOpen: false,
      selectedIndex: -1,
    });
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("employee", id);
    bodyFormData.append("phone_type", this.state.updatephoneType);
    bodyFormData.append("phone_type_other", this.state.updatephoneTypeother);
    bodyFormData.append("phone_reason", this.state.updatephoneReason);
    bodyFormData.append(
      "phone_reason_other",
      this.state.updatephoneReasonother
    );
    bodyFormData.append("imeiNumber", this.state.updateimeiNumber);
    bodyFormData.append("phoneNumber", this.state.updatephoneNumber);
    bodyFormData.append("dateObtained", this.state.updatestartedusingon);
    bodyFormData.append("default_phone", this.state.updatedefaultPhone);
    bodyFormData.append("update_reason", this.state.updateReason);

    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/update-phone/" + phoneid,
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
    await this.getphonedata();
  }
  async getHistory(index) {
    this.setState({
      historyDialougeOpen: true,
    });
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/employees/" +
          id +
          "/phones/" +
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
  getPhones() {
    return (
      <>
        {this.state.result.length === 0 ? (
          <>
            <Grid container spacing={3} justify="space-between">
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
                      Add phone details to improve ratings.
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.setState({ addDialogOpen: true });
                      }}
                    >
                      Add Phone
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
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
                    Add Phone
                  </Button>
                </Grid>
              </Box>
            </Grid>
            <TableContainer component={Paper} elevation={16}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow
                    style={{ backgroundColor: "black", fontWeight: "bolder" }}
                  >
                    {/* Date, Source, Fullname, DOB, Sex, Picture, VerifiedBy, Actions */}
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Phone
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      IMEI
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Default phone
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      PhoneType
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      VerifiedBy
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Start Date
                    </TableCell>
                    {/* <TableCell align="center">IdNumber</TableCell> */}
                    {/* <TableCell align="center">picture</TableCell> */}
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Update
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      History
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Verification
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.result.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">{row.imeiNumber}</TableCell>
                      <TableCell align="center">{row.default_phone}</TableCell>
                      <TableCell align="center">
                        {row.phone_type_name_field}
                      </TableCell>

                      <TableCell align="center">
                        {row.owner_name_field}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(row.created_on).toDateString()}
                      </TableCell>

                      <TableCell align="center">
                        <Button
                          disabled={row.status === "Audit In Progress"}
                          color="primary"
                          variant="outlined"
                          onClick={() =>
                            this.setState({
                              updateDialogOpen: true,
                              selectedIndex: index,

                              updatephoneType: this.state.result[index]
                                .phone_type,

                              updatephoneReason: this.state.result[index]
                                .phone_reason,

                              updateimeiNumber: this.state.result[index]
                                .imeiNumber,
                              updatephoneNumber: this.state.result[index]
                                .phoneNumber,
                              updatestartedusingon: this.state.result[index]
                                .dateObtained,
                              updatedefaultPhone: this.state.result[index]
                                .default_phone,
                            })
                          }
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => {
                            this.getHistory(row.id);
                          }}
                        >
                          history
                        </Button>
                      </TableCell>
                      {row.showVerifyOnTrac_btn === true ? (
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="default"
                            onClick={() => {
                              this.verification(row.id);
                            }}
                          >
                            Request for verification
                          </Button>
                        </TableCell>
                      ) : <></> }
                    </TableRow>
                  ))}
                  {this.addsnackbar()}
                </TableBody>
              </Table>
              {this.state.selectedIndex === -1 ? (
                <div />
              ) : (
                <Dialog
                  open={this.state.updateDialogOpen}
                  onClose={() => this.setState({ updateDialogOpen: false })}
                  //  aria-labelledby="form-dialog-title"
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="form-dialog-title" align="center">
                    Update phone data
                  </DialogTitle>

                  <DialogContent>
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item fullWidth xs={12}>
                        <InputLabel>Phone Reason</InputLabel>
                        <Select
                          // className="w3-input"
                          autoFocus
                          margin="dense"
                          id="source"
                          label="phonereason"
                          type="text"
                          fullWidth
                          onChange={(event) => {
                            this.setState({
                              updatephoneReason: event.target.value,
                            });
                          }}
                          defaultValue={this.state.updatephoneReason}
                        >
                          {this.state.phoneReasons.map((phonetype) => (
                            <MenuItem id={phonetype.id} value={phonetype.id}>
                              {phonetype.phoneReason}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item fullWidth xs={12}>
                        <InputLabel>Phone Type</InputLabel>
                        <Select
                          autoFocus
                          margin="dense"
                          id="id"
                          label="phone type"
                          type="text"
                          fullWidth
                          onChange={(event) => {
                            this.setState({
                              updatephoneType: event.target.value,
                            });
                          }}
                          defaultValue={this.state.updatephoneType}
                        >
                          {this.state.phoneTypes.map((phonetype) => (
                            <MenuItem id={phonetype.id} value={phonetype.id}>
                              {phonetype.phoneType}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item fullWidth xs={12}>
                        <InputLabel>DefaultPhone</InputLabel>
                        <Select
                          autoFocus
                          margin="dense"
                          id="name"
                          label=""
                          type="text"
                          fullWidth
                          onChange={(event) => {
                            this.setState({
                              updatedefaultPhone: event.target.value,
                            });
                          }}
                          defaultValue={this.state.updatedefaultPhone}
                        >
                          <MenuItem id={1} value="Yes">
                            Yes
                          </MenuItem>
                          <MenuItem id={2} value="No">
                            No
                          </MenuItem>
                        </Select>
                      </Grid>
                      <Grid item fullWidth xs={12}>
                        <InputLabel>Phone number</InputLabel>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="dob"
                          label=""
                          type="text"
                          fullWidth
                          onChange={(event) => {
                            this.setState({
                              updatephoneNumber: event.target.value,
                            });
                          }}
                          defaultValue={this.state.updatephoneNumber}
                        />
                      </Grid>
                      <Grid item fullWidth xs={12}>
                        <InputLabel>IMEI number</InputLabel>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="dob"
                          label=""
                          type="text"
                          fullWidth
                          onChange={(event) => {
                            this.setState({
                              updateimeiNumber: event.target.value,
                            });
                          }}
                          defaultValue={this.state.updateimeiNumber}
                        />
                      </Grid>
                      <Grid item fullWidth xs={12}>
                        <InputLabel>Started using on</InputLabel>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="dob"
                          label=""
                          type="date"
                          fullWidth
                          onChange={(event) => {
                            this.setState({
                              updatestartedusingon: event.target.value,
                            });
                          }}
                          defaultValue={this.state.updatestartedusingon}
                        />
                      </Grid>
                      <Grid item fullWidth xs={12}>
                        <InputLabel>Update Reason</InputLabel>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="dob"
                          label=""
                          type="text"
                          helperText="update reason can be less than 250 characters"
                          onChange={(event) => {
                            this.setState(
                              {
                                updateReason: event.target.value,
                              },
                              this.reasonforupdatevalidcheck(event)
                            );
                          }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={this.state.buttondisabled}
                      onClick={() => {
                        this.updatePhones(
                          this.state.result[this.state.selectedIndex].id
                        );
                      }}
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
                </Dialog>
              )}
              {this.updatesnackbar()}
            </TableContainer>
          </>
        )}
        <Dialog
          open={this.state.addDialogOpen}
          onClose={() => this.setState({ addDialogOpen: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">
            Add new phone data
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item fullWidth xs={12}>
                <InputLabel>Phone Reason</InputLabel>
                <Select
                  autoFocus
                  margin="dense"
                  id="source"
                  label="fullname"
                  type="text"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ phoneReason: event.target.value });
                  }}
                  //   defaultValue={this.state.result[this.state.selectedIndex].fullname}
                >
                  {this.state.phoneReasons.map((phonetype) => (
                    <MenuItem id={phonetype.id} value={phonetype.id}>
                      {phonetype.phoneReason}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item fullWidth xs={12}>
                <InputLabel>Phone Type</InputLabel>
                <Select
                  fullWidth
                  onChange={(event) => {
                    this.setState({ phoneType: event.target.value });
                  }}
                  //   defaultValue={this.state.result[this.state.selectedIndex].dob}
                >
                  {this.state.phoneTypes.map((phonetype) => (
                    <MenuItem id={phonetype.id} value={phonetype.id}>
                      {phonetype.phoneType}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item fullWidth xs={12}>
                <InputLabel>DefaultPhone</InputLabel>
                <Select
                  fullWidth
                  onChange={(event) => {
                    this.setState({ defaultPhone: event.target.value });
                  }}

                  //   defaultValue={this.state.result[this.state.selectedIndex].sex}
                >
                  <MenuItem id={1} value="Yes">
                    Yes
                  </MenuItem>
                  <MenuItem id={2} value="No">
                    No
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item fullWidth xs={12}>
                <InputLabel>Phone number</InputLabel>
                <TextField
                  autoFocus
                  margin="dense"
                  id="dob"
                  label=""
                  type="text"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ phoneNumber: event.target.value });
                  }}
                  //   defaultValue={this.state.result[this.state.selectedIndex].idSource}
                />
              </Grid>
              <Grid item fullWidth xs={12}>
                <InputLabel>IMEI number</InputLabel>
                <TextField
                  autoFocus
                  margin="dense"
                  id="dob"
                  label=""
                  type="text"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ imeiNumber: event.target.value });
                  }}
                  //   defaultValue={this.state.result[this.state.selectedIndex].idSource}
                />
              </Grid>
              <Grid item fullWidth xs={12}>
                <InputLabel>Started using on</InputLabel>
                <TextField
                  autoFocus
                  margin="dense"
                  id="dob"
                  label=""
                  type="date"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ startedUsingOn: event.target.value });
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                this.setState(
                  {
                    addDialogOpen: false,
                  },
                  this.postPhones
                )
              }
            >
              submit
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() =>
                this.setState({
                  addDialogOpen: false,
                })
              }
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullWidth={"md"}
          maxWidth={"md"}
          open={this.state.historyDialougeOpen}
          onClose={() => this.setState({ historyDialougeOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
         
          <DialogTitle id="form-dialog-title" align="center">
            Phone History
          </DialogTitle>
          <TableContainer p={3}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    phonenumber
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    phoneReason
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    phoneType
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    DefaultPhone
                  </TableCell>

                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    imeinumber
                  </TableCell>

                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    records updated date
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    Update reason
                  </TableCell>
                </TableRow>
              </TableHead>

              {this.state.historyloading ? (
                this.isloading()
              ) : (
                <TableBody>
                  {history.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">
                        {row.phone_reason_name_field}
                      </TableCell>
                      <TableCell align="center">
                        {row.phone_type_name_field}
                      </TableCell>
                      <TableCell align="center">{row.default_phone}</TableCell>
                      <TableCell align="center">
                        {row.imeiNumber}
                      </TableCell>{" "}
                      <TableCell component="th" align="center">
                        {row.created_on}
                      </TableCell>
                      <TableCell align="center">{row.update_reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <DialogActions style={{ padding: 15 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                this.setState({ historyDialougeOpen: false, selectedIndex: -1 })
              }
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
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
  gettable() {
    return <>{this.getPhones()}</>;
  }
  render() {
    return <>{this.state.loading ? this.isloading() : this.gettable()}</>;
  }
}

export default Phones;
