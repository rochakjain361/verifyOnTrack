import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { CircularProgress, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";

let token1 = "";
let token = "";
let id = "";
let result = [];
let history = [];
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
    };
  }
  async getphonedata(){
     await axios
       .get("http://3.22.17.212:8000/api/v1/employees/" + id + "/phones", {
         headers: {
           Authorization: token,
         },
       })
       .then((res) => {
         result = res.data;
         console.table("Phones", result);
         // console.log(result[0].phone_reason);
       });
  }
  async componentDidMount() {
    token1 = localStorage.getItem("Token");
     token = "Token " + token1;
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
      });
      await this.getphonedata();
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
        {result.length === 0 ? (
          <>
            <Grid container spacing={3} justify="space-between">
              <Grid item xs={6}>
                <h1>Phones</h1>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ padding: 20 }} elevation={3}>
                  <Typography variant="h5" gutterBottom align="center">
                    Add phone details to improve ratings.
                  </Typography>

                  <Grid container justify="center" style={{ marginTop: 50 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        this.setState({ addDialogOpen: true });
                      }}
                    >
                      Add New Phone
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <TableContainer component={Paper} elevation={16}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  {/* Date, Source, Fullname, DOB, Sex, Picture, VerifiedBy, Actions */}
                  <TableCell align="center">Start Date</TableCell>
                  <TableCell align="center">default phone</TableCell>
                  {/* <TableCell align="center">IdNumber</TableCell> */}
                  <TableCell align="center">source</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">IMEI</TableCell>
                  {/* <TableCell align="center">picture</TableCell> */}
                  <TableCell align="center">VerifiedBy</TableCell>
                  <TableCell align="center">Update</TableCell>
                  <TableCell align="center">History</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.created_on}</TableCell>
                    <TableCell align="center">{row.default_phone}</TableCell>
                    <TableCell align="center">
                      {row.source_name_field}
                    </TableCell>
                    <TableCell align="center">{row.phoneNumber}</TableCell>
                    <TableCell align="center">{row.imeiNumber}</TableCell>
                    <TableCell align="center">{row.owner_name_field}</TableCell>

                    <TableCell align="center">
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                          this.setState({
                            updateDialogOpen: true,
                            selectedIndex: index,

                            updatephoneType: result[index].phone_type,

                            updatephoneReason: result[index].phone_reason,

                            updateimeiNumber: result[index].imeiNumber,
                            updatephoneNumber: result[index].phoneNumber,
                            updatestartedusingon: result[index].dateObtained,
                            updatedefaultPhone: result[index].default_phone,
                          })
                        }
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          this.getHistory(row.id);
                        }}
                      >
                        history
                      </Button>
                    </TableCell>
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
                //  aria-labelledby="form-dialog-title"
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Updating the phone data
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
                        type="number"
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
                        onChange={(event) => {
                          this.setState({
                            updateReason: event.target.value,
                          });
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="primary"
                    onClick={() => {
                      this.updatePhones(result[this.state.selectedIndex].id);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    color="secondary"
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
          </TableContainer>
        )}
        <Dialog
          open={this.state.addDialogOpen}
          onClose={() => this.setState({ addDialogOpen: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            adding the phone data
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={1} justify="center" alignItems="center">
              
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
                  //   defaultValue={result[this.state.selectedIndex].fullname}
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
                  //   defaultValue={result[this.state.selectedIndex].dob}
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

                  //   defaultValue={result[this.state.selectedIndex].sex}
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
                  type="number"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ phoneNumber: event.target.value });
                  }}
                  //   defaultValue={result[this.state.selectedIndex].idSource}
                />
              </Grid>
              <Grid item fullWidth xs={12}>
                <InputLabel>IMEI number</InputLabel>
                <TextField
                  autoFocus
                  margin="dense"
                  id="dob"
                  label=""
                  type="number"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ imeiNumber: event.target.value });
                  }}
                  //   defaultValue={result[this.state.selectedIndex].idSource}
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
          <TableContainer component={Paper} elevation={16} p={3}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    phoneReason
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    phoneType
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    DefaultPhone
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    phonenumber
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    imeinumber
                  </TableCell>

                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    records updated date
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
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
                      <TableCell align="center">{row.phone_reason}</TableCell>
                      <TableCell align="center">{row.phone_type}</TableCell>
                      <TableCell align="center">{row.default_phone}</TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
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
    return (
      <>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <h1>Phones </h1>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                this.setState({ addDialogOpen: true });
              }}
            >
              Add Phone
            </Button>
          </Grid>
        </Grid>
        {this.getPhones()}
      </>
    );
  }
  render() {
    return <>{this.state.loading ? this.isloading() : this.gettable()}</>;
  }
}

export default Phones;
