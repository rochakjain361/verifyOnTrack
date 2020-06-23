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
import FormControl from '@material-ui/core/FormControl';

let token1 = "";

let token = "";
let id = "";
// let result = [];
let history = [];
let pictures = [];

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
      updatereason: "",
      historyloading: true,
      historyDialogeOpen: false,
      uploadpictures: "",
      pictureloading: "false",
      result:[],
      buttondisabled: "disabled",
    };
    // this.updateidentites= this.updateidentites.bind();
  }
  reasonforupdatevalidcheck = (event) => {
    if (event.target.value.length > 0) {
      //  console.log(event.target.value);
      this.setState({ buttondisabled: "" });
    } else {
      this.setState({ buttondisabled: "disabled" });
    }


  };
async getidentites(){
  await axios
    .get(
      "http://3.22.17.212:8000/api/v1/employees/" + id + "/identities-by/" + id,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      //result = res.data;
      this.setState({result:res.data});
      console.table("identites", this.state.result);
    });
}
  async componentDidMount() {
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");
    await this.getidentites();
    let idSource = await axios.get(
      "http://3.22.17.212:8000/api/v1/resManager/id/sources/?excludeSystem=true",
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
        "http://3.22.17.212:8000/api/v1/employees/" +
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
        "http://3.22.17.212:8000/api/v1/employees/post-identity",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
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
    bodyFormData.append("idSource", idsource);
    bodyFormData.append("idNumber", this.state.updateidnumber);
    bodyFormData.append("fullname", this.state.updateFullName);
    bodyFormData.append("sex", this.state.updatesex);
    bodyFormData.append("dob", this.state.updatedob);
    bodyFormData.append("update_reason", this.state.updatereason);

    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/update-identity",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });
      await this.getidentites();
  }
  render() {
    return (
      <div>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <h1>My Identities</h1>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                this.setState({ addDialogOpen: true });
              }}
            >
              Add Identity
            </Button>
          </Grid>
        </Grid>
        {this.state.loading ? this.isloading() : this.getTableOfEmployees()}

        <Dialog
          fullWidth={"md"}
          maxWidth={"md"}
          open={this.state.viewDialogeOpen}
          onClose={() => this.setState({ viewDialogeOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">View pictures</DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              {this.state.pictureloading
                ? this.isloading()
                : pictures.map((picture, index) => (
                    //  <image src={picture.picture}/>
                    // <p> {picture.picture}</p>
                    <Grid container>
                      <Grid item xs={12}>
                        {picture.picture}
                      </Grid>
                    </Grid>
                  ))}
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
            <Box p={1}>

            <Grid
           
           container
           direction="column-reverse"
           
           alignItems="flex-end"
           >
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  this.postpictures(this.state.pictureid);
                }}
                >
                upload
              </Button>
            </Grid>
                </Box>
          </DialogContent>
        </Dialog>

        {
          <Dialog
            open={this.state.addDialogOpen}
            onClose={() => this.setState({ addDialogOpen: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" justify="center">
              Add Profile
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
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
                  <TextField
                    id="firstName"
                    label="First Name"
                    onChange={(event) => {
                      this.setState({ fullName: event.target.value });
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="dob"
                    variant="outlined"
                    helperText="Date of Birth"
                    onChange={(event) => {
                      this.setState({ dob: event.target.value });
                    }}
                    type="date"
                    fullWidth
                  />
                </Grid>

                <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      id="gender"
                      // value={age}
                      onChange={(event) => {
                        this.setState({ sex: event.target.value });
                      }}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="idNumber"
                    label="Id Number"
                    // defaultValue={result[this.state.selectedIndex].surname}
                    onChange={(event) => {
                      this.setState({ idNumber: event.target.value });
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="idSource">Id Source</InputLabel>
                    <Select
                      labelId="idSource"
                      id="idSource"
                      // value={age}
                      onChange={(event) => {
                        this.setState({ selectedidSource: event.target.value });
                      }}
                    >
                      {this.state.idSource.map((source) => (
                        <MenuItem id={source.id} value={source.id}>
                          {source.idSource}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      // selectedIndex: -1,
                    },
                    this.postidentites
                  )
                }
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
          </Dialog>
        }
      </div>
    );
  }

  adddata() {
    return (
      <>
        <h1>Add identity to increase your rating</h1>
      </>
    );
  }
  async getpictures(idsource) {
    this.setState({ viewDialogeOpen: true });
    this.setState({ pictureloading: true });
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/employees/" +
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
        "http://3.22.17.212:8000/api/v1/employees/post-identitiy-pic",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });
    this.setState({ uploadDialougeOpen: false });
    await this.getidentites();
  }

  getTableOfEmployees() {
    return (
      <>
        {this.state.result.length === 0 ? (
          this.adddata()
        ) : (
          <TableContainer component={Paper} elevation={16}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  {[
                    "Date",
                    "Source",
                    "Full Name",
                    "Date of birth",
                    "Sex",
                    "Picture",
                    "Verified by",
                    "Update",
                    "History",
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
              <TableBody>
                {this.state.result.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">
                      {new Date(row.created_on).toDateString()}
                    </TableCell>
                    <TableCell align="left">{row.idSource}</TableCell>
                    <TableCell align="left">{row.fullname}</TableCell>
                    <TableCell align="left">{row.dob}</TableCell>
                    <TableCell align="left">{row.sex}</TableCell>
                    <TableCell align="left">
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
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              this.setState(
                                {
                                  uploadDialougeOpen: true,
                                  pictureid: row.id,
                                },
                                console.log("picturedid", this.state.pictureid)
                              )
                            }
                          >
                            upload
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">{row.owner_name_field}</TableCell>

                    <TableCell align="center">
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                          this.setState({
                            updateDialogOpen: true,
                            selectedIndex: index,
                            updateFullName: this.state.result[index].fullname,
                            updatedob: this.state.result[index].dob,
                            updatesex: this.state.result[index].sex,
                            updateidnumber: this.state.result[index].idSource,
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
                        onClick={() => this.getHistory(row.idSource)}
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
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Update Identity
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
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
                      <TextField
                        id="fullName"
                        label="Full name"
                        defaultValue={this.state.updateFullName}
                        onChange={(event) => {
                          this.setState({ updateFullName: event.target.value });
                        }}
                        type="text"
                        fullWidth
                      />
                    </Grid>

                    <Grid item fullWidth xs={12}>
                      <TextField
                        id="dob"
                        label="Date of birth"
                        defaultValue={this.state.updatedob}
                        onChange={(event) => {
                          this.setState({ updatedob: event.target.value });
                        }}
                        type="date"
                        fullWidth
                      />
                    </Grid>

                    <Grid item fullWidth xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="gender">Gender</InputLabel>
                        <Select
                          labelId="gender"
                          id="gender"
                          // value={age}
                          defaultValue={this.state.updatesex}
                          onChange={(event) => {
                            this.setState({ updatesex: event.target.value });
                          }}
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item fullWidth xs={12}>
                      <Select
                        id="idSource"
                        label="Id Source"
                        defaultValue={this.state.updateidnumber}
                        onChange={(event) => {
                          this.setState({ updateidnumber: event.target.value });
                        }}
                        type="text"
                        fullWidth
                      >
                      {this.state.idSource.map((source) => (
                        <MenuItem id={source.id} value={source.id}>
                          {source.idSource}
                        </MenuItem>
                      ))}</Select>
                    </Grid>

                    <Grid item fullWidth xs={12}>
                      <TextField
                        id="updatereason"
                        label="Update Reason"
                        // defaultValue={this.state.result[this.state.selectedIndex].idSource}
                        onChange={(event) => {
                          this.setState({ updatereason: event.target.value },this.reasonforupdatevalidcheck(event));
                        }}
                        type="text"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </DialogContent>

                <DialogActions style={{ padding: 15 }}>
                  <Button
                    disabled={this.state.buttondisabled}
                    color="primary"
                    variant="contained"
                    disabled={this.state.buttondisabled}
                    onClick={() => {
                      this.updateidentites(
                        this.state.result[this.state.selectedIndex].idSource
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
          </TableContainer>
        )}

        <Dialog
          fullWidth={"md"}
          maxWidth={"md"}
          open={this.state.historyDialogeOpen}
          onClose={() => this.setState({ historyDialogeOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Identities History</DialogTitle>
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
                      <TableCell align="center">{row.fullname}</TableCell>
                      <TableCell align="center">{row.dob}</TableCell>
                      <TableCell align="center">{row.sex}</TableCell>
                      <TableCell align="center">{row.idSource}</TableCell>
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
