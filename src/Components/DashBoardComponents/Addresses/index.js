import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import RouterLink from "../../RouterLink";
import GradientButton from "../../GradientButton";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";



let result = [];
let state = [];
let lga = [];
let city = [];
const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
class Addresses extends Component {
  constructor(props) {
    super(props);
    //uncomment the below 2 lines after finishing address
    //     const data=props.data;
    // console.log("token data from address page",data.token);
    this.state = {
      location: {
        latitude: null,
        longtitude: null,
        currentstate: "",
        updateDialogOpen: false,
        addDialogOpen:false,
      },
      isloading: true,
    };

    
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      location: { latitude: e.latLng.lat(), longtitude: e.latLng.lng() },
    });

    console.log(this.state.location.latitude, this.state.location.longtitude);
  }
  async componentDidMount() {
    await axios
      .get("http://3.22.17.212:8000/api/v1/employees/"+id+"/addresses", {
        headers: {
          Authorization:
           token,
        },
      })
      .then((res) => {
        result = res.data;
        console.table("addresses",result);
      });
    await axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/address/states",
        {
          headers: {
            Authorization:
              token,
          },
        }
      )
      .then((res) => {
        state = res.data;
        console.table("statename", state);
      });
    await axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/address/lgas",
        {
          headers: {
            Authorization:
              token,
          },
        }
      )
      .then((res) => {
        lga = res.data;
        console.table(lga);
      });
    await axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/address/cities",
        {
          headers: {
            Authorization:
              token,
          },
        }
      )
      .then((res) => {
        city = res.data;
        console.log(city);
      });
    this.setState({ isloading: false });
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
  getaddress() {
    return (
      <>
        {result.length==0?this.addaddress():(
      
        <Grid container justify="space-between" alignItems="center">
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            display="flex"
          >
            <h1>My Address</h1>
          </Grid>

          <TableContainer component={Paper} elevation={16} p={1}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "white" }}>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    padding="none"
                  >
                    Startdate
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    size="small"
                    padding="1"
                  >
                    Addresssource
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    size="small"
                    padding="default"
                  >
                    Address
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    size="small"
                    padding="default"
                  >
                    State/LGA/City
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    size="small"
                    padding="default"
                  >
                    Address
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    size="small"
                    padding="default"
                  >
                    GoogleLink
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    size="small"
                    padding="default"
                  >
                    Image
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    size="small"
                    padding="default"
                  >
                    Verifier
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    size="small"
                    padding="default"
                  >
                    update
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                    size="small"
                    padding="none"
                  >
                    History
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center" size="small">
                      {row.since}
                    </TableCell>
                    <TableCell align="center" size="small" padding="none">
                      {row.source_name_field}
                    </TableCell>
                    <TableCell align="center" size="small" padding="none">
                      {row.default_address}
                    </TableCell>

                    <TableCell align="center" size="small" padding="none">
                      {row.state}/{row.lga}/{row.city}
                    </TableCell>
                    <TableCell align="center" size="small" padding="none">
                      {row.street_name},{row.house_number},{row.address_hint1},
                      {row.address_hint2} {row.address_hint3}
                    </TableCell>
                    <TableCell align="center" size="small">
                      <a
                        href={`http://www.google.com/maps/place/${row.google_coordinate1}+,+${row.google_coordinate2}`}
                        target=""
                      >
                        location
                      </a>
                    </TableCell>
                    <TableCell align="center" size="small" padding="none">
                      {}
                    </TableCell>
                    <TableCell align="center" size="small" padding="none">
                      {row.owner_name_field}
                    </TableCell>
                    <TableCell align="center" size="small" padding="none">
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
          </TableContainer>
          <Dialog
            open={this.state.updateDialogOpen}
            onClose={() => this.setState({ updateDialogOpen: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Updating the address
            </DialogTitle>

            <DialogContent>
              <Grid>
                <p>
                  <label>Addresses reason</label>
                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) =>
                      this.setState({ updatedfirstname: event.target.value })
                    }
                    // defaultValue={result[this.state.selectedIndex].firstname}
                  />
                </p>

                <p>
                  <label>address type</label>
                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) =>
                      this.setState({ updatedMiddlename: event.target.value })
                    }
                    // defaultValue={result[this.state.selectedIndex].middlename}
                  />
                </p>
                <p>
                  <label>default address</label>

                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) => {
                      this.setState({ updatedlastname: event.target.value });
                      console.log(this.state.updatedsex);
                    }}
                    // defaultValue={result[this.state.selectedIndex].surname}
                  />
                </p>

                <p>
                  <label>house number</label>
                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) => {
                      this.setState({ updatedDob: event.target.value });
                      console.log(event.target.value);
                    }}
                    // defaultValue={result[this.state.selectedIndex].dob}
                  />
                </p>
                <p>
                  <label> address image</label>
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
                  <label>LGA</label>
                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) => {
                      this.setState({ updatedDob: event.target.value });
                      console.log(event.target.value);
                    }}
                    // defaultValue={result[this.state.selectedIndex].dob}
                  />
                </p>
                <p>
                  <label>city</label>
                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) => {
                      this.setState({ updatedDob: event.target.value });
                      console.log(event.target.value);
                    }}
                    // defaultValue={result[this.state.selectedIndex].dob}
                  />
                </p>
                <p>
                  <label>Address Hint</label>
                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) => {
                      this.setState({ updatedDob: event.target.value });
                      console.log(event.target.value);
                    }}
                    // defaultValue={result[this.state.selectedIndex].dob}
                  />
                </p>
                <p>
                  <label> address hint2</label>
                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) => {
                      this.setState({ updatedDob: event.target.value });
                      console.log(event.target.value);
                    }}
                    // defaultValue={result[this.state.selectedIndex].dob}
                  />
                </p>
                <p>
                  <label>address hint3</label>
                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) => {
                      this.setState({ updatedDob: event.target.value });
                      console.log(event.target.value);
                    }}
                    // defaultValue={result[this.state.selectedIndex].dob}
                  />
                </p>
                <p>
                  <label>address hint3</label>
                  <input
                    class="w3-input"
                    type="text"
                    onChange={(event) => {
                      this.setState({ updatedDob: event.target.value });
                      console.log(event.target.value);
                    }}
                    // defaultValue={result[this.state.selectedIndex].dob}
                  />
                </p>
                <p>
                  <label>started living here</label>
                  <input
                    class="w3-input"
                    type="date"
                    onChange={(event) => {
                      this.setState({ updatedDob: event.target.value });
                      console.log(event.target.value);
                    }}
                    // defaultValue={result[this.state.selectedIndex].dob}
                  />
                </p>
                <p>
                  <label>update reason</label>
                  <input
                    class="w3-input"
                    type="date"
                    onChange={(event) => {
                      this.setState({ updatedDob: event.target.value });
                      console.log(event.target.value);
                    }}
                    // defaultValue={result[this.state.selectedIndex].dob}
                  />
                </p>
                <p>
                  <label>street</label>
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
                <Box>

                <Map
                  google={this.props.google}
                  zoom={1}
                  onClick={this.onMarkerClick}
                  style={{ height: "75%", width: "75%" }}
                  fullscreenControl={true}
                  >
                  <Marker
                    position={{
                      lat: this.state.location.latitude,
                      lng: this.state.location.longtitude,
                    }}
                    />
                  <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
                </Map>
              </Box>
              </Grid>
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
        </Grid>
        )}
      </>
    );
  }
  addaddressform(){
    return (
      <>
        <Grid container justify="flex-start" direction="row">
          <Grid class="w3-container">
            <p>
              <label>Addresses reason</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) =>
                  this.setState({ updatedfirstname: event.target.value })
                }
                // defaultValue={result[this.state.selectedIndex].firstname}
              />
            </p>

            <p>
              <label>address type</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) =>
                  this.setState({ updatedMiddlename: event.target.value })
                }
                // defaultValue={result[this.state.selectedIndex].middlename}
              />
            </p>
            <p>
              <label>default address</label>

              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ updatedlastname: event.target.value });
                  console.log(this.state.updatedsex);
                }}
                // defaultValue={result[this.state.selectedIndex].surname}
              />
            </p>

            <p>
              <label>house number</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ updatedDob: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label> address image</label>
              <input
                class="w3-input"
                type="file"
                onChange={(event) => {
                  this.setState({ file: event.target.files[0] });
                  console.log(event.target.files[0]);
                }}
              />
            </p>
            
              <InputLabel htmlFor="grouped-select">State</InputLabel>
              <Select defaultValue="" id="grouped-select">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <ListSubheader>Category 1</ListSubheader>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <ListSubheader>Category 2</ListSubheader>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem>
              </Select>
           
               
              <InputLabel htmlFor="grouped-select">LGA</InputLabel>
              <Select defaultValue="" id="grouped-select">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <ListSubheader>Category 1</ListSubheader>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <ListSubheader>Category 2</ListSubheader>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem>
              </Select>
            
              <InputLabel htmlFor="grouped-select">City</InputLabel>
              <Select defaultValue="" id="grouped-select">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <ListSubheader>Category 1</ListSubheader>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <ListSubheader>Category 2</ListSubheader>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem>
              </Select>
            
            <p>
              <label>Address Hint</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ updatedDob: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label> address hint2</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ updatedDob: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label>address hint3</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ updatedDob: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label>address hint3</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ updatedDob: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label>started living here</label>
              <input
                class="w3-input"
                type="date"
                onChange={(event) => {
                  this.setState({ updatedDob: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label>update reason</label>
              <input
                class="w3-input"
                type="date"
                onChange={(event) => {
                  this.setState({ updatedDob: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label>street</label>
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
            <p>
              <label>Google coordinates</label>
              <input
                class="w3-input"
                type="text"
                defaultValue={this.state.location.latitude}
              />
              <input
                class="w3-input"
                type="text"
                defaultValue={this.state.location.longtitude}
              />
            </p>
            <Grid
              display="flex"
              p={3}
              justify="space-around"
              // style={{ background: "red" }}
            >
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    this.setState({
                      addDialogOpen: false,
                    });
                  }}
                >
                  Submit Profile
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
              </Grid>
            </Grid>
          </Grid>
          <Box>
            <Map
              google={this.props.google}
              zoom={12}
              onClick={this.onMarkerClick}
              style={{
                width: "40%",
                height: "75%",
              }}
              fullscreenControl={true}
            >
              <Marker
                position={{
                  lat: this.state.location.latitude,
                  lng: this.state.location.longtitude,
                }}
              />
              <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
            </Map>
          </Box>
        </Grid>
      </>
    );
  }
  addaddress(){
    return (
      <>
        <Grid container direction="row" justify="space-between">
          <h1>My Address</h1>

          <Box m={3}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => this.setState({ addDialogOpen: true })}
            >
              Add Profile
            </Button>
          </Box>
        </Grid>
        <Grid container direction="row" justify="center">
          <h3>Add address to improve your rating</h3>
        </Grid>
        {this.state.addDialogOpen ? this.addaddressform() : null}
      </>
    );
  }

  render() {
    return <>{this.state.isloading ? this.isloading() : this.getaddress()} </>;
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCNFjFmnGwCekQz-GMUXupRUAEjSkqNmi8",
})(Addresses);