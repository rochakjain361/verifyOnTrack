import React, { Component } from 'react'
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
import { Button } from "@material-ui/core";
const token1 = localStorage.getItem("Token");

const token = "Token " + token1;
const id = localStorage.getItem("id");
let result = [];
class Phones extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addDialogOpen: false,
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
      });
    this.setState({ loading: false });
  }
  getPhones(){
      return (
          <>
          {result.length===0?null:(
              
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
                  <TableCell align="center">{row.source_name_field}</TableCell>
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
                Updating the phone data
              </DialogTitle>

<DialogContent>
                <label>Phone Reason</label>
                <input
                  className="w3-input"
                  autoFocus
                  margin="dense"
                  id="source"
                  label="fullname"
                  type="text"
                  fullWidth
                  //   defaultValue={result[this.state.selectedIndex].fullname}
                  />
                <label>Phone Type</label>
                <input
                  className="w3-input"
                  autoFocus
                  margin="dense"
                  id="id"
                  label="dob"
                  type="text"
                  fullWidth
                  //   defaultValue={result[this.state.selectedIndex].dob}
                  />
                <label>DefaultPhone</label>
                <input
                  className="w3-input"
                  autoFocus
                  margin="dense"
                  id="name"
                  label=""
                  type="text"
                  fullWidth
                  //   defaultValue={result[this.state.selectedIndex].sex}
                  />
                <label>Phone number</label>
                <input
                  className="w3-input"
                  autoFocus
                  margin="dense"
                  id="dob"
                  label=""
                  type="text"
                  fullWidth
                  //   defaultValue={result[this.state.selectedIndex].idSource}
                  />
                <label>IMEI number</label>
                <input
                  className="w3-input"
                  autoFocus
                  margin="dense"
                  id="dob"
                  label=""
                  type="text"
                  fullWidth
                  //   defaultValue={result[this.state.selectedIndex].idSource}
                  />
                <label>Started using on</label>
                <input
                  className="w3-input"
                  autoFocus
                  margin="dense"
                  id="dob"
                  label=""
                  type="date"
                  fullWidth
                  //   defaultValue={result[this.state.selectedIndex].idSource}
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
                  //   defaultValue={result[this.state.selectedIndex].idSource}
                  />
              </DialogContent>
              <DialogActions>
                <Button
                  color="primary"
                  onClick={() =>
                    this.setState({
                        updateDialogOpen: false,
                        selectedIndex: -1,
                    })
                }
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
            </>
            );
        }
      
  render() {
    return (
      <div>
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
              style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              }}
            >
              Add Phone
            </Button>
          </Grid>
        </Grid>
        {this.getPhones()}
      </div>
    );
  }
}

export default Phones
