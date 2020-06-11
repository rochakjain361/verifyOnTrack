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
import { CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
// import image from "../../../../public/images/mainImage.jpg";

const token1 = localStorage.getItem("Token");

const token = "Token " + token1;
const id = localStorage.getItem("id");
let result = [];
const rows = [
  {
    date: "2016-12-01",
    source: "nkjsadnsand",
    id: "89yh12e",
    fullname: "John Doe",
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
    fullname: "John Doe 2",
    dob: "2000-09-01",
    sex: "M",
    picture:
      "https://vengreso.com/wp-content/uploads/2016/03/LinkedIn-Profile-Professional-Picture-Sample-Bernie-Borges.png",
    verifier: "Verifier Name",
  },
];

class Identities extends Component {
  state = {
    updateDialogOpen: false,
    selectedIndex: -1,
    loading: true,
    viewDialougeOpen: false,
    uploadDialougeOpen: false,
    addDialogOpen: false,
  };

  async componentDidMount() {
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/employees/" +
          12 +
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
            <Grid item xs={4}>
              <Paper>item</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>item</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>item</Paper>
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
              <input type="file" className="w3-input"></input>
            </Grid>
          </DialogContent>
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
              // defaultValue={result[this.state.selectedIndex].dob}
            />
            <label>sex</label>
            <input
              className="w3-input"
              autoFocus
              margin="dense"
              id="name"
              label=""
              type="text"
              fullWidth
              // defaultValue={result[this.state.selectedIndex].sex}
            />
            <label>idNumber</label>
            <input
              className="w3-input"
              autoFocus
              margin="dense"
              id="dob"
              label=""
              type="text"
              fullWidth
              // defaultValue={result[this.state.selectedIndex].idSource}
            />
            <label>idSource</label>
            <input
              className="w3-input"
              autoFocus
              margin="dense"
              id="dob"
              label=""
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() =>
                this.setState({
                  addDialogOpen: false,
                  selectedIndex: -1,
                })
              }
            >
              Add
            </Button>
            <Button
              color="secondary"
              onClick={() =>
                this.setState({
                  addDialogOpen: false,
                  selectedIndex: -1,
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
                  {/* Date, Source, Fullname, DOB, Sex, Picture, VerifiedBy, Actions */}
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
                            onClick={() =>
                              this.setState({ viewDialougeOpen: true })
                            }
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
                              this.setState({ uploadDialougeOpen: true })
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
                        onClick={() =>
                          this.setState({
                            updateDialogOpen: true,
                            selectedIndex: index,
                          })
                        }
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
                  />
                  <label>sex</label>
                  <input
                    className="w3-input"
                    autoFocus
                    margin="dense"
                    id="name"
                    label=""
                    type="text"
                    fullWidth
                    defaultValue={result[this.state.selectedIndex].sex}
                  />
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
                  />

                  {/* <TextField
                    autoFocus
                    margin="dense"
                    id="sex"
                    label="Sex"
                    type="text"
                    fullWidth
                    value={rows[this.state.selectedIndex].sex}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    id="verifier"
                    label="Verifier"
                    type="text"
                    fullWidth
                    value={rows[this.state.selectedIndex].verifier}
                  /> */}
                </DialogContent>
                <DialogActions>
                  <Button color="primary">Update</Button>
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
      </>
    );
  }
}

export default Identities;
