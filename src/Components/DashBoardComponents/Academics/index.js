import React, { Component } from "react";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableContainer,
  DialogActions,
  Dialog,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Avatar,
  Paper,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { get, update, post } from "../../../API";
let id = "";
export class index extends Component {
  state = {
    result: [
      {
        startDate: "",
        endDate: "",
        school: "",
        degree: "",
        status: "",
        update_reason: "",
      },
    ],
    updatedresult: {
      id: "",
      employee: "",
      startDate: "",
      endDate: "",
      school: "",
      degree: "",
      status: "",
      update_reason: "",
      created_on: "",
    },
    loading: false,
    history: [
      {
        startDate: "",
        endDate: "",
        school: "",
        degree: "",
        status: "",
        update_reason: "",
      },
    ],
    newAcademics: {
      degree: "",
      startDate: "",
      endDate: "",
      school: "",
    },
    historyloading: false,
    historyDialogeOpen: false,
    addnewdialog: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    id = localStorage.getItem("id");
    await this.getAcademics();
    this.setState({ loading: false });
  }
  async getAcademics() {
    await get(
      "http://3.22.17.212:8000/api/v1/employees/" + id + "/academics",
      ""
    ).then((response) => {
      console.log("response from api page", response);
      this.setState({ result: response.data });
    });
  }
  loading() {
    return (
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        display="flex"
        style={{ minHeight: "0vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }
  async fetchhistory(index) {
    this.setState({ historyDialogeOpen: true, historyloading: true });
    await get(
      "http://3.22.17.212:8000/api/v1/employees/" + id + "/academics/" + index,
      ""
    ).then((response) => {
      this.setState({ history: response.data, historyloading: false });
    });
  }
  async updatedetails(id) {
    this.setState({
      updateDialogOpen: false,
    });

    await update(
      "http://3.22.17.212:8000/api/v1/employees/update-academics/" + id,
      this.state.updatedresult
    ).then((response) => {
      console.log("update response", response);
    });
    await this.getAcademics();
  }
  async addacademics() {
    this.setState({ addnewdialog: false });
    await post(
      "http://3.22.17.212:8000/api/v1/employees/post-academics",
      this.state.newAcademics
    ).then((response) => {
      console.log(response);
    });
    this.getAcademics();
  }
  gettable() {
    return (
      <div>
        {this.state.result.length === 0 ? (
          <h1>hello</h1>
        ) : (
          <Grid>
            <Box p={2}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-end"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ addnewdialog: true });
                  }}
                >
                  Add Academics
                </Button>
              </Grid>
            </Box>
            <TableContainer component={Paper} elevation={16} p={3}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow style={{ backgroundColor: "black" }}>
                    {[
                      "StartDate",
                      "EndDate",
                      "School",
                      "Degree",
                      "Status",
                      "Createdon",
                      "Update",
                      "History",
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
                      <TableCell align="center"> {row.startDate} </TableCell>
                      <TableCell align="center">{row.endDate}</TableCell>
                      <TableCell align="center">{row.school}</TableCell>
                      <TableCell align="center">{row.degree}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell component="th" align="center">
                        {new Date(row.created_on).toDateString()}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() =>
                            this.setState({
                              updateDialogOpen: true,
                              selectedIndex: index,
                              updatedresult: this.state.result[index],
                            })
                          }
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => this.fetchhistory(row.id)}
                        >
                          History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Dialog
              open={this.state.updateDialogOpen}
              onClose={() =>
                this.setState({
                  updateDialogOpen: false,
                  buttondisabled: "disabled",
                })
              }
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" align="center">
                Update Profile
              </DialogTitle>
              <DialogContent>
                <DialogContentText align="center">
                  Enter the details of your profile to be updated
                </DialogContentText>

                <Grid
                  container
                  justify="flex-start"
                  direction="row"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item fullWidth xs={12}>
                    <TextField
                      id="dob"
                      label="Startdate"
                      defaultValue={this.state.updatedresult.startDate}
                      onChange={(event) => {
                        this.setState({
                          updatedresult: {
                            ...this.state.updatedresult,
                            startDate: event.target.value,
                          },
                        });
                        console.log(event.target.value);
                      }}
                      type="date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item fullWidth xs={12}>
                    <TextField
                      id="dob"
                      label="Enddate"
                      defaultValue={this.state.updatedresult.endDate}
                      onChange={(event) => {
                        this.setState({
                          updatedresult: {
                            ...this.state.updatedresult,
                            endDate: event.target.value,
                          },
                        });
                        console.log(event.target.value);
                      }}
                      type="date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item fullWidth xs={12}>
                    <TextField
                      id="middleName"
                      label="School"
                      defaultValue={this.state.updatedresult.school}
                      onChange={(event) =>
                        this.setState({
                          updatedresult: {
                            ...this.state.updatedresult,
                            school: event.target.value,
                          },
                        })
                      }
                      type="text"
                      fullWidth
                    />
                  </Grid>

                  <Grid item fullWidth xs={12}>
                    <TextField
                      id="surname"
                      label="Degree"
                      defaultValue={this.state.updatedresult.degree}
                      onChange={(event) => {
                        this.setState({
                          updatedresult: {
                            ...this.state.updatedresult,
                            degree: event.target.value,
                          },
                        });
                      }}
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item fullWidth xs={12}>
                    <TextField
                      id="reasonForUpdating"
                      label="Reason for updating:"
                      helperText="update reason can be less than 250 characters"
                      onChange={(event) =>
                        this.setState({
                          updatedresult: {
                            ...this.state.updatedresult,
                            update_reason: event.target.value,
                          },
                        })
                      }
                      type="text"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions style={{ padding: 10 }}>
                <Button
                  color="primary"
                  // disabled={this.state.updatedresult.update_reason.length === 0}
                  variant="contained"
                  onClick={() => {
                    this.updatedetails(this.state.updatedresult.id);
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
                      buttondisabled: "disabled",
                    })
                  }
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.addnewdialog}
              onClose={() =>
                this.setState({
                  updateDialogOpen: false,
                  buttondisabled: "disabled",
                })
              }
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" align="center">
                Add new academics
              </DialogTitle>
              <DialogContent>
                <DialogContentText align="center">
                  Enter the details of your acedamics to be added
                </DialogContentText>

                <Grid
                  container
                  justify="flex-start"
                  direction="row"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item fullWidth xs={12}>
                    <TextField
                      id="dob"
                      label="Startdate"
                      onChange={(event) => {
                        this.setState({
                          newAcademics: {
                            ...this.state.newAcademics,
                            startDate: event.target.value,
                          },
                        });
                        console.log(event.target.value);
                      }}
                      type="date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item fullWidth xs={12}>
                    <TextField
                      id="dob"
                      label="Enddate"
                      onChange={(event) => {
                        this.setState({
                          newAcademics: {
                            ...this.state.newAcademics,
                            endDate: event.target.value,
                          },
                        });
                        console.log(event.target.value);
                      }}
                      type="date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item fullWidth xs={12}>
                    <TextField
                      id="middleName"
                      label="School"
                      onChange={(event) =>
                        this.setState({
                          newAcademics: {
                            ...this.state.newAcademics,
                            school: event.target.value,
                          },
                        })
                      }
                      type="text"
                      fullWidth
                    />
                  </Grid>

                  <Grid item fullWidth xs={12}>
                    <TextField
                      id="surname"
                      label="Degree"
                      onChange={(event) => {
                        this.setState({
                          newAcademics: {
                            ...this.state.newAcademics,
                            degree: event.target.value,
                          },
                        });
                      }}
                      type="text"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions style={{ padding: 10 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    this.addacademics();
                  }}
                >
                  Add
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    this.setState({
                      addnewdialog: false,
                      selectedIndex: -1,
                      buttondisabled: "disabled",
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
              <DialogTitle id="form-dialog-title" align="center">
                Academics History
              </DialogTitle>
              {/* <DialogContent> */}
              <TableContainer p={3}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "black" }}>
                      {[
                        "StartDate",
                        "EndDate",
                        "School",
                        "Degree",
                        "Status",
                        "Createdon",
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

                  {this.state.historyloading ? (
                    this.loading()
                  ) : (
                    <TableBody>
                      {this.state.history.map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell align="center">
                            {" "}
                            {row.startDate}{" "}
                          </TableCell>
                          <TableCell align="center">{row.endDate}</TableCell>
                          <TableCell align="center">{row.school}</TableCell>
                          <TableCell align="center">{row.degree}</TableCell>
                          <TableCell align="center">{row.status}</TableCell>
                          <TableCell component="th" align="center">
                            {new Date(row.created_on).toDateString()}
                          </TableCell>
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
                    this.setState({
                      historyDialogeOpen: false,
                      selectedIndex: -1,
                    })
                  }
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            );
          </Grid>
        )}
      </div>
    );
  }
  render() {
    return this.state.loading ? this.loading() : this.gettable();
  }
}

export default index;
