import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { Select } from "@material-ui/core";
import {MenuItem} from "@material-ui/core"                      
import {InputLabel} from "@material-ui/core"
import { CircularProgress } from "@material-ui/core";
import "./myprofile.css";
const token1 = localStorage.getItem("Token");
const token =
  "Token "+token1;
  const id = localStorage.getItem("id");
const rows = [
  {
    date: "2016-12-01",
    source: "nkjsadnsand",
    id: "89yh12e",
    firstname: "John Doe",
    dob: "2000-09-01",
    sex: "M",
    picture:
      "https://vengreso.com/wp-content/uploads/2016/03/LinkedIn-Profile-Professional-Picture-Sample-Bernie-Borges.png",
    verifier: "Verifier Name",
  },
  {
    date: "2016-12-01",
    source: "nkjsadnsand",
    id: "89yh142e",
    firstname: "John Doe 2",
    dob: "2000-09-01",
    sex: "M",
    picture:
      "https://vengreso.com/wp-content/uploads/2016/03/LinkedIn-Profile-Professional-Picture-Sample-Bernie-Borges.png",
    verifier: "Verifier Name",
  },
];
let result = [];
class MyProfile extends Component {
  state = {
    updateDialogOpen: false,
    addDialogOpen: false,
    selectedIndex: -1,
    result: null,
    isloading: true,
    updatedval: "",
    updatedfirstname: "",
    firstname: "",
    middlename: "",
    lastname: "",
    Dob: "",

    initialfile: "",

    updatedMiddlename: "",
    updatedlastname: "",
    updatedReasonforupdating: "",
    updatedName: "",
    updatedDob: "",
    buttondisabled: "disabled",
    id: "",
    file: null,
    gender: "",
  };
  async componentDidMount() {
    console.log(token);
    await axios
      .get("http://3.22.17.212:8000/api/v1/employees/"+id+"/profiles", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        result = res.data;
        // this.setState({ id: result[0].employee });
        // this.setState({ updatedfirstname: result[0].firstname });
        // this.setState({ updatedMiddlename: result[0].middlename });
        // this.setState({ updatedlastname: result[0].surname });
        // this.setState({ updatedDob: result[0].dob });
      });
    this.setState({ isloading: false });

    // console.table(result);
    // console.log(result[0].id);
  }

  _handleChangeEvent(event) {
    this.setState({ updatedval: event.target.value });
    console.log(this.state.updatedval);
    return this.state.updatedval;
  }

  reasonforupdatevalidcheck = (event) => {
    if (event.target.value.length > 0) {
      //  console.log(event.target.value);
      this.setState({ buttondisabled: "" });
    } else {
      this.setState({ buttondisabled: "disabled" });
    }
    
    
  };
   
// async updatedetails(){
//   console.log("///////////////////////////////////////////////");
//  let data = {
//     employee: this.state.id,
//     update_reason: this.state.updatedReasonforupdating,
//     sex: this.state.updatedsex,
//     dob: this.state.updatedDob,
//   };

  async updatedetails() {
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
    bodyFormData.append("employee", id);
    bodyFormData.append("update_reason", this.state.updatedReasonforupdating);
    bodyFormData.append("picture", this.state.file);
    bodyFormData.append("dob", this.state.updatedDob);
    bodyFormData.append("firstname", this.state.updatedfirstname);
    bodyFormData.append("middlename", this.state.updatedMiddlename);
    bodyFormData.append("surname", this.state.updatedlastname);

    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/update-profile",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });
  }
  async postprofile() {
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("employee", id);
    bodyFormData.append("sex", this.state.gender);
    bodyFormData.append("picture", this.state.initialfile);
    bodyFormData.append("dob", this.state.Dob);
    bodyFormData.append("firstname", this.state.firstname);
    bodyFormData.append("middlename", this.state.middlename);
    bodyFormData.append("surname", this.state.lastname);
    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/post-profile",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });
  }
  isloading() {
    return (
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
    );
  }

  tabledata() {
    return (
      <>
        {result.length == 0 ? (
          <div>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Box m={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.setState({ addDialogOpen: true })}
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  }}
                >
                  Add Profile
                </Button>
              </Box>
              <h3> Add details to your profile </h3>
            </Grid>
            <Dialog
              open={this.state.addDialogOpen}
              onClose={() => this.setState({ addDialogOpen: true })}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" justify="center">
                Add Profile
              </DialogTitle>
              <DialogContent>
                <DialogContentText justify="center">
                  Enter the following details
                </DialogContentText>

                <div class="w3-container">
                  <p>
                    <label>firstname</label>
                    <input
                      class="w3-input"
                      type="text"
                      onChange={(event) => {
                        this.setState({ firstname: event.target.value });
                        console.log(this.state.firstname);
                      }}
                      // defaultValue={result[this.state.selectedIndex].firstname}
                    />
                  </p>

                  <p>
                    <label>MiddleName</label>
                    <input
                      class="w3-input"
                      type="text"
                      onChange={(event) => {
                        this.setState({ middlename: event.target.value });
                        console.log(this.state.middlename);
                      }}
                      // defaultValue={result[this.state.selectedIndex].middlename}
                    />
                  </p>
                  <p>
                    <label>lastname</label>

                    <input
                      class="w3-input"
                      type="text"
                      onChange={(event) => {
                        this.setState({ lastname: event.target.value });
                        console.log(this.state.lastname);
                      }}
                      // defaultValue={result[this.state.selectedIndex].surname}
                    />
                  </p>
                  <p>
                    <label>Dob</label>
                    <input
                      class="w3-input"
                      type="date"
                      onChange={(event) => {
                        this.setState({ Dob: event.target.value });
                        console.log(this.state.Dob);
                      }}
                      // defaultValue={result[this.state.selectedIndex].dob}
                    />
                  </p>
                  <p>
                    <label>Picture</label>
                    <input
                      class="w3-input"
                      type="file"
                      onChange={(event) => {
                        this.setState({ initialfile: event.target.files[0] });
                        console.log(this.state.initialfile);
                      }}
                    />
                  </p>
                  <p>
                    <InputLabel id="demo-simple-select-label">sex</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(event) => {
                        this.setState({ gender: event.target.value });
                        console.log(this.state.gender);
                      }}
                    >
                      <MenuItem value={"Male"}>male</MenuItem>
                      <MenuItem value={"Female"}>female</MenuItem>
                    </Select>
                  </p>
                </div>
              </DialogContent>{" "}
              <DialogActions>
                <Button
                  color="primary"
                  onClick={() => {
                    this.setState(
                      {
                        addDialogOpen: false,
                      },
                      this.postprofile
                    );
                  }}
                >
                  Submit Profile
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
          </div>
        ) : (
          <div>
            <Box p={4}>
              <Grid
                container
                // style={{backgroundColor:"red"}}
              >
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  display="flex"
                >
                  <h1>My Profile</h1>
                </Grid>
                <Grid container spacing={3} m={3} p={3}>
                  <Grid
                    container
                    xs={9}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    // style={{backgroundColor:"red"}}
                  >
                    <Grid alignItems="left" elevation={6}>
                      <h3>
                        Name:{result[0].firstname} {result[0].middlename}
                        {result[0].surname}
                      </h3>
                      <h4>Dob:{result[0].dob}</h4>
                      <h4>Sex:{result[0].sex}</h4>
                      <h4>date:{result[0].created_on}</h4>
                      <h4>source:{result[0].source_name_field}</h4>
                    </Grid>
                  </Grid>

                  <Grid item xs={3} alignItems="flex-end" justify="flex-end">
                    <Avatar
                      src={result[0].picture}
                      style={{ height: "14rem", width: "14rem" }}
                    >
                      Picture
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            {this.getTableOfEmployees()}
          </div>
        )}
      </>
    );
  }

  getTableOfEmployees() {
    return (
      <>
        <TableContainer component={Paper} elevation={16} p={3}>
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "black" }}>
                <TableCell
                  style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                  align="center"
                >
                  Picture
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                  align="center"
                >
                  Date
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                  align="center"
                >
                  Source
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                  align="center"
                >
                  Fullname
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                  align="center"
                >
                  Dob
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                  align="center"
                >
                  Sex
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                  align="center"
                >
                  Verifier
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                  align="center"
                >
                  Update
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                  align="center"
                >
                  History
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {result.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="center">
                    <Avatar src={row.picture}>Picture</Avatar>
                  </TableCell>
                  <TableCell component="th" align="center">
                    {row.created_on}
                  </TableCell>
                  <TableCell align="center">{row.source_name_field}</TableCell>
                  <TableCell align="center">{row.firstname}</TableCell>
                  <TableCell align="center">{row.dob}</TableCell>
                  <TableCell align="center">{row.sex}</TableCell>
                  <TableCell align="center">{row.owner_name_field}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() =>
                        this.setState({
                          updateDialogOpen: true,
                          selectedIndex: index,
                          // add the updatedstate elements here after passing the token and adding data
                        })
                      }
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="secondary">
                      History
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
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the details of your profile to be updated
                </DialogContentText>

                <div class="w3-container">
                  <p>
                    <label>firstname</label>
                    <input
                      class="w3-input"
                      type="text"
                      onChange={(event) =>
                        this.setState({ updatedfirstname: event.target.value })
                      }
                      defaultValue={result[this.state.selectedIndex].firstname}
                    />
                  </p>

                  <p>
                    <label>MiddleName</label>
                    <input
                      class="w3-input"
                      type="text"
                      onChange={(event) =>
                        this.setState({ updatedMiddlename: event.target.value })
                      }
                      defaultValue={result[this.state.selectedIndex].middlename}
                    />
                  </p>
                  <p>
                    <label>lastname</label>

                    <input
                      class="w3-input"
                      type="text"
                      onChange={(event) => {
                        this.setState({ updatedlastname: event.target.value });
                        console.log(this.state.updatedsex);
                      }}
                      defaultValue={result[this.state.selectedIndex].surname}
                    />
                  </p>
                  <p>
                    <label>Dob</label>
                    <input
                      class="w3-input"
                      type="date"
                      onChange={(event) => {
                        this.setState({ updatedDob: event.target.value });
                        console.log(event.target.value);
                      }}
                      defaultValue={result[this.state.selectedIndex].dob}
                    />
                  </p>
                  <p>
                    <label>choose file</label>
                    <input
                      class="w3-input"
                      type="file"
                      onChange={(event) => {
                        this.setState({ file: event.target.files[0] });
                        console.log(event.target.files[0]);
                      }}
                    />
                  </p>
                  <p>
                    <label>Reason for updating</label>
                    <input
                      class="w3-input"
                      type="text"
                      onChange={(event) =>
                        this.setState(
                          {
                            updatedReasonforupdating: event.target.value,
                          },
                          this.reasonforupdatevalidcheck(event)
                        )
                      }
                    />
                  </p>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={this.state.buttondisabled}
                  color="primary"
                  onClick={() => {
                    this.updatedetails();
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
      </>
    );
  }
  render() {
    return <>{this.state.isloading ? this.isloading() : this.tabledata()}</>;
  }
}
 


export default MyProfile;
