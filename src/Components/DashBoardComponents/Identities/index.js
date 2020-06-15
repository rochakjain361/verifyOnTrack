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

const token1 = localStorage.getItem("Token");

const token = "Token " + token1;
const id = localStorage.getItem("id");
let result = [];
let history = [];
let pictures = [];

class Identities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateDialogOpen: false,
      selectedIndex: -1,
      loading: true,
      viewDialougeOpen: false,
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
      historyDialougeOpen: false,
      uploadpictures: "",
      pictureloading:"false"
    };
    // this.updateidentites= this.updateidentites.bind();
  }

  async componentDidMount() {
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/employees/" +
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
        result = res.data;
        console.table("identites", result);
      });
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
      historyDialougeOpen: true,
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
              style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              }}
            >
              Add Identity
            </Button>
          </Grid>
        </Grid>
        {this.state.loading ? this.isloading() : this.getTableOfEmployees()}
        <Dialog
          open={this.state.viewDialougeOpen}
          onClose={() => this.setState({ viewDialougeOpen: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">View pictures</DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              {this.state.pictureloading ? (
                this.isloading()
              ) : (
                pictures.map((picture, index) => (
                //  <image src={picture.picture}/>
                <p> {picture.picture}</p>
              ))
              )}

              
            </Grid>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.uploadDialougeOpen}
          onClose={() => this.setState({ uploadDialougeOpen: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">choose your file</DialogTitle>
          <DialogContent>
            <Grid Container>
              <label></label>
              <input
                type="file"
                className="w3-input"
                onChange={(event) => {
                  this.setState({
                    uploadpictures: event.target.files[0],
                  });
                }}
              ></input>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.postpictures(this.state.pictureid);
              }}
            >
              upload
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.addDialogOpen}
          onClose={() => this.setState({ addDialogOpen: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            add the following details
          </DialogTitle>
          <DialogContent>
            <label>fullname</label>
            <input
              className="w3-input"
              autoFocus
              margin="dense"
              id="source"
              label="fullname"
              type="text"
              fullWidth
              onChange={(event) => {
                this.setState({ fullName: event.target.value });
              }}
              // defaultValue={result[this.state.selectedIndex].fullname}
            />
            <label>dob</label>
            <input
              className="w3-input"
              autoFocus
              margin="dense"
              id="id"
              label="dob"
              type="date"
              fullWidth
              onChange={(event) => {
                this.setState({ dob: event.target.value });
              }}
              // defaultValue={result[this.state.selectedIndex].dob}
            />
            <label>sex</label>
            <Select
              className="w3-input"
              onChange={(event) => {
                this.setState({ sex: event.target.value });
              }}

              // defaultValue={result[this.state.selectedIndex].sex}
            >
              <MenuItem id={1} value={"Male"}>
                {"Male"}
              </MenuItem>
              <MenuItem id={2} value={"Female"}>
                {"Female"}
              </MenuItem>
            </Select>
            <label>idNumber</label>
            <input
              className="w3-input"
              autoFocus
              margin="dense"
              id="dob"
              label=""
              type="text"
              fullWidth
              onChange={(event) => {
                this.setState({ idNumber: event.target.value });
              }}
              // defaultValue={result[this.state.selectedIndex].idSource}
            />
            <label>idSource</label>
            <Select
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
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
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
              Add
            </Button>
            <Button
              color="secondary"
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
    this.setState({ viewDialougeOpen: true });
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
  }

  getTableOfEmployees() {
    return (
      <>
        {result.length === 0 ? (
          this.adddata()
        ) : (
          <TableContainer component={Paper} elevation={16}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">source</TableCell>
                  {/* <TableCell align="center">IdNumber</TableCell> */}
                  <TableCell align="center">fullname</TableCell>
                  <TableCell align="center">Dob</TableCell>
                  <TableCell align="center">Sex</TableCell>
                  <TableCell align="center">picture</TableCell>
                  <TableCell align="center">VerifiedBy</TableCell>
                  <TableCell align="center">Update</TableCell>
                  <TableCell align="center">History</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.created_on}</TableCell>
                    <TableCell align="center">{row.idSource}</TableCell>
                    <TableCell align="center">{row.fullname}</TableCell>
                    <TableCell align="center">{row.dob}</TableCell>
                    <TableCell align="center">{row.sex}</TableCell>
                    <TableCell align="center">
                      <Grid
                        container
                        display="flex"
                        flexDirection="row"
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
                                console.log("picturedid",this.state.pictureid)
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
                    Updating the {result[this.state.selectedIndex].idSource}
                    identity
                  </DialogContentText>
                  <label>fullname</label>
                  <input
                    className="w3-input"
                    autoFocus
                    margin="dense"
                    id="source"
                    label="fullname"
                    type="text"
                    fullWidth
                    defaultValue={result[this.state.selectedIndex].fullname}
                    onChange={(event) => {
                      this.setState({ updateFullName: event.target.value });
                    }}
                  />
                  <label>dob</label>
                  <input
                    className="w3-input"
                    autoFocus
                    margin="dense"
                    id="id"
                    label="dob"
                    type="date"
                    fullWidth
                    defaultValue={result[this.state.selectedIndex].dob}
                    onChange={(event) => {
                      this.setState({ updatedob: event.target.value });
                    }}
                  />
                  <label>sex</label>
                  <Select
                    fullWidth
                    defaultValue={result[this.state.selectedIndex].sex}
                    onChange={(event) => {
                      this.setState({ updatesex: event.target.value });
                    }}
                  >
                    <MenuItem id={1} value={"Male"}>
                      {"Male"}
                    </MenuItem>
                    <MenuItem id={2} value={"Female"}>
                      {"Female"}
                    </MenuItem>
                  </Select>
                  <label>idNumber</label>
                  <input
                    className="w3-input"
                    autoFocus
                    margin="dense"
                    id="dob"
                    label=""
                    type="text"
                    fullWidth
                    defaultValue={result[this.state.selectedIndex].idSource}
                    // onChange={(event) => {
                    //   this.setState({ updateidnumber: event.target.value });
                    // }}
                  />
                  <label>Update Reason</label>
                  <input
                    className="w3-input"
                    autoFocus
                    margin="dense"
                    id="dob"
                    label=""
                    type="text"
                    fullWidth
                    // defaultValue={result[this.state.selectedIndex].idSource}
                    onChange={(event) => {
                      this.setState({ updatereason: event.target.value });
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    color="primary"
                    onClick={() => {
                      this.updateidentites(
                        result[this.state.selectedIndex].idSource
                      );
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
                    fullName
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    dob
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    sex
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    idSource
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    idNumber
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
                      <TableCell align="center">{row.fullname}</TableCell>
                      <TableCell align="center">{row.dob}</TableCell>
                      <TableCell align="center">{row.sex}</TableCell>
                      <TableCell align="center">{row.idSource}</TableCell>
                      <TableCell align="center">{row.idNumber}</TableCell>{" "}
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
}

export default Identities;
