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
import FormControl from '@material-ui/core/FormControl';

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
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
      historyDialogeOpen: false,
    };
  }
  async componentDidMount() {
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
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/resManager/phone/reasons/",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        this.setState({ phoneReasons: res.data });
        console.table("PhonesReason", this.state.phoneReasons);
      });
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/resManager/phone/types/",
        {
          headers: {
            Authorization: token,
          },
        }
      )
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
  }
  async getHistory(index) {
    this.setState({
      historyDialogeOpen: true,
    });
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/employees/" + id + "/phones/" + index + "/history",
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
            <Grid container spacing={3} justify="space-between" >
              <Grid item xs={6}>
                <h1>Phones</h1>
              </Grid>
              <Grid item xs={12}>

                <Paper style={{ padding: 20 }} elevation={3}>
                  <Typography variant="h5" gutterBottom align='center'>
                    Add phone details to improve ratings.
              </Typography>

                  <Grid container justify='center' style={{ marginTop: 50 }}>
                    <Button color="primary" variant='contained' onClick={() => {
                      this.setState({ addDialogOpen: true });
                    }}>
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
                    <TableCell align="left">Start Date</TableCell>
                    <TableCell align="left">Default phone</TableCell>
                    {/* <TableCell align="center">IdNumber</TableCell> */}
                    <TableCell align="left">Source</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">IMEI</TableCell>
                    {/* <TableCell align="center">picture</TableCell> */}
                    <TableCell align="left">Verified by</TableCell>
                    <TableCell align="left">Update</TableCell>
                    <TableCell align="left">History</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell align="left">{new Date(row.created_on).toDateString()}</TableCell>
                      <TableCell align="left">{row.default_phone}</TableCell>
                      <TableCell align="left">
                        {row.source_name_field}
                      </TableCell>
                      <TableCell align="left">{row.phoneNumber}</TableCell>
                      <TableCell align="left">{row.imeiNumber}</TableCell>
                      <TableCell align="left">{row.owner_name_field}</TableCell>

                      <TableCell align="left">
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() =>
                            this.setState({
                              updateDialogOpen: true,
                              selectedIndex: index,
                            })
                          }
                        >
                          Update
                      </Button>
                      </TableCell>
                      <TableCell align="left">
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
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">Update Phone Data</DialogTitle>

                    <DialogContent>

                      <Grid container justify='flex-start' direction='row' alignItems='center' spacing={3}>


                        <Grid item fullWidth xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="phoneReason">Phone Reason</InputLabel>
                            <Select
                              labelId="phoneReason"
                              id="phoneReason"
                              onChange={(event) => {
                                this.setState({
                                  updatephoneReason: event.target.value,
                                });
                              }}
                              defaultValue={result[this.state.selectedIndex].phone_reason}
                            >
                              {this.state.phoneReasons.map((phonetype) => (
                                <MenuItem id={phonetype.id} value={phonetype.id}>
                                  {phonetype.phoneReason}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="phoneType">Phone Type</InputLabel>
                            <Select
                              labelId="phoneType"
                              id="phoneType"
                              onChange={(event) => {
                                this.setState({
                                  updatephoneType: event.target.value,
                                });
                              }}
                              defaultValue={result[this.state.selectedIndex].phone_type}
                            >
                              {this.state.phoneTypes.map((phonetype) => (
                                <MenuItem id={phonetype.id} value={phonetype.id}>
                                  {phonetype.phoneType}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="defaultPhone">Default Phone</InputLabel>
                            <Select
                              labelId="defaultPhone"
                              id="defaultPhone"
                              onChange={(event) => {
                                this.setState({
                                  updatedefaultPhone: event.target.value,
                                });
                              }}
                              defaultValue={
                                result[this.state.selectedIndex].default_phone
                              }
                            >
                              <MenuItem id={1} value="Yes">
                                Yes
              </MenuItem>
                              <MenuItem id={2} value="No">
                                No
              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            type='number'
                            onChange={(event) => {
                              this.setState({
                                updatephoneNumber: event.target.value,
                              });
                            }}
                            defaultValue={result[this.state.selectedIndex].phoneNumber}
                            fullWidth
                          />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="imeiNumber"
                            label="IMEI Number"
                            type='number'
                            onChange={(event) => {
                              this.setState({
                                updateimeiNumber: event.target.value,
                              });
                            }}
                            defaultValue={result[this.state.selectedIndex].imeiNumber}
                            fullWidth
                          />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="startedUsingOn"
                            variant='outlined'
                            helperText="Started using on"
                            onChange={(event) => {
                              this.setState({
                                updatestartedusingon: event.target.value,
                              });
                            }}
                            defaultValue={result[this.state.selectedIndex].dateObtained}
                            type="date"
                            fullWidth
                          />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="updateReason"
                            label="Update Reason"
                            onChange={(event) => {
                              this.setState({
                                updateReason: event.target.value,
                              });
                            }}
                            type="text"
                            fullWidth
                          />
                        </Grid>

                        {/* <label>Update Reason</label>
              <input
                className="w3-input"
                autoFocus
                margin="dense"
                id="dob"
                label=""
                type="text"
                fullWidth
                onChange={(event) => {
                  this.setState({ updateReason: event.target.value });
                }}
                //   defaultValue={result[this.state.selectedIndex].idSource}
              /> */}
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          this.updatePhones(result[this.state.selectedIndex].id);
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
            </TableContainer>
          )}

        <Dialog
          open={this.state.addDialogOpen}
          onClose={() => this.setState({ addDialogOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Phone Data</DialogTitle>

          <DialogContent>

            <Grid container justify='flex-start' direction='row' alignItems='center' spacing={3}>


              <Grid item fullWidth xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="phoneReason">Phone Reason</InputLabel>
                  <Select
                    labelId="phoneReason"
                    id="phoneReason"
                    onChange={(event) => {
                      this.setState({ phoneReason: event.target.value });
                    }}
                  >
                    {this.state.phoneReasons.map((phonetype) => (
                      <MenuItem id={phonetype.id} value={phonetype.id}>
                        {phonetype.phoneReason}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item fullWidth xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="phoneType">Phone Type</InputLabel>
                  <Select
                    labelId="phoneType"
                    id="phoneType"
                    //   defaultValue={result[this.state.selectedIndex].dob}
                    onChange={(event) => {
                      this.setState({ phoneType: event.target.value });
                    }}
                  >
                    {this.state.phoneTypes.map((phonetype) => (
                      <MenuItem id={phonetype.id} value={phonetype.id}>
                        {phonetype.phoneType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item fullWidth xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="defaultPhone">Default Phone</InputLabel>
                  <Select
                    labelId="defaultPhone"
                    id="defaultPhone"
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
                </FormControl>
              </Grid>

              <Grid item fullWidth xs={12}>
                <TextField
                  id="phoneNumber"
                  label="Phone Number"
                  type='number'
                  onChange={(event) => {
                    this.setState({ phoneNumber: event.target.value });
                  }}
                  //   defaultValue={result[this.state.selectedIndex].idSource}
                  fullWidth
                />
              </Grid>

              <Grid item fullWidth xs={12}>
                <TextField
                  id="imeiNumber"
                  label="IMEI Number"
                  type='number'
                  onChange={(event) => {
                    this.setState({ imeiNumber: event.target.value });
                  }}
                  //   defaultValue={result[this.state.selectedIndex].idSource}
                  fullWidth
                />
              </Grid>

              <Grid item fullWidth xs={12}>
                <TextField
                  id="startedUsingOn"
                  variant='outlined'
                  helperText="Started using on"
                  onChange={(event) => {
                    this.setState({ startedUsingOn: event.target.value });
                  }}
                  //   defaultValue={result[this.state.selectedIndex].idSource}
                  type="date"
                  fullWidth
                />
              </Grid>

              {/* <label>Update Reason</label>
              <input
                className="w3-input"
                autoFocus
                margin="dense"
                id="dob"
                label=""
                type="text"
                fullWidth
                onChange={(event) => {
                  this.setState({ updateReason: event.target.value });
                }}
                //   defaultValue={result[this.state.selectedIndex].idSource}
              /> */}
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
              Submit
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
          open={this.state.historyDialogeOpen}
          onClose={() => this.setState({ historyDialogeOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Phones History</DialogTitle>
          {/* <DialogContent> */}
         <TableContainer>
            <Table stickyHeader>
              <TableHead>

              <TableRow style={{ backgroundColor: "black" }}>
                    {['Phone reason',
                      'Phone type',
                      'Default Phone',
                      'Phone number',
                      'IMEI Number',
                      'Records Updated',
                      'Update reason'
                    ].map((text, index) => (
                      <TableCell
                        style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                        align="left"
                      >
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
                        <TableCell align="center">{row.phone_reason}</TableCell>
                        <TableCell align="center">{row.phone_type}</TableCell>
                        <TableCell align="center">{row.default_phone}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">
                          {row.imeiNumber}
                        </TableCell>{" "}
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
              variant='contained'
              color="secondary"
              onClick={() => this.setState({ historyDialogeOpen: false, selectedIndex: -1 })}
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
