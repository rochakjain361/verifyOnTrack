import React, { Component } from "react";
import { get, post, put, update } from "../../../API";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  Paper,
  Box,
  Typography,
  Button,
  TableContainer,
  FormControl,
  Avatar,
} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { AddLocation } from "@material-ui/icons";
import axios from 'axios';
let token = "";
let id = "";
export class Employeelocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      states: [],
      lga: [],
      city: [],
      updatedlgastates:[],
      updatedcityStates:[],
      loading: true,
      addDialogOpen: false,
      updateDialogOpen:false,
      addstate: "",
      addlga: "",
      addcity: "",
      buildingno: "",
      street: "",
      updatestate:"",
      updatelga:"",
      updatecity:"",
      updatebuildingno:"",
      updatestreet:"",
      selectedlga:"",
      selectedState:"",
      updateid:"",
      location: {
        latitude: null,
        longtitude: null,
        updatedlatitude: null,
        updatedlongititude: null,
      },
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      location: {
        latitude: e.latLng.lat(),
        longtitude: e.latLng.lng(),
      },
    });
    // this.setState({location:{latitude:this.state.location.latitude.slice(0,8),longtitude:this.state.location.longtitude.slice(0,8)}})
    let lat = this.state.location.latitude.toString();
    let long = this.state.location.longtitude.toString();

    lat = lat.slice(0, 11);
    long = long.slice(0, 11);
    lat = parseFloat(lat);
    long = parseFloat(long);
    this.setState({
      location: {
        latitude: lat,
        longtitude: long,
      },
    });
    console.log(
      lat,
      this.state.location.latitude,
      this.state.location.longtitude
    );
  }
  postlocation() {
    let bodyFormData = new FormData();
    bodyFormData.append("state", this.state.addstate);
    bodyFormData.append("lga", this.state.addlga);
    // bodyFormData.append("city", this.state.addcity);
    bodyFormData.append("address", this.state.buildingno);
    bodyFormData.append("locationName", this.state.street);
    // bodyFormData.append("google_coordinate1", this.state.location.latitude);
    // bodyFormData.append("google_coordinate2", this.state.location.longtitude);

    post(
      "http://3.22.17.212:8000/api/v1/employers/post-location",
      token,
      bodyFormData
    ).then(() => {
      this.getlocationdata();
    });
  }
  updatelocationdata() {
    let bodyFormData = new FormData();
    bodyFormData.append("state", this.state.updatestate);
    bodyFormData.append("lga", this.state.updatelga);
    // bodyFormData.append("city", this.state.updatecity);
    bodyFormData.append("address", this.state.updatebuildingno);
    bodyFormData.append("locationName", this.state.updatestreet);
    // bodyFormData.append("google_coordinate1", this.state.location.latitude);
    // bodyFormData.append("google_coordinate2", this.state.location.longtitude);

    put(
      "http://3.22.17.212:8000/api/v1/employers/update-location/"+this.state.updateid,
      token,
      bodyFormData
    ).then(() => {
      this.getlocationdata();
    });
  }
  async getlocationdata() {
    await get(
      "http://3.22.17.212:8000/api/v1/employers/" + id + "/locations",
      token,
      ""
    ).then((res) => {
      this.setState({ result: res.data });
    });
  }
  async lganames(stateid, val) {
    this.setState({ selectedState: stateid });
    // await get(
    //   "http://3.22.17.212:8000/api/v1/resManager/address/lgas/stateId="+this.state.selectedState,
    //   token,
    //   ""
    // ).then((res) => {
    //   val === "update"
    //     ? this.setState({ updatedlgastates: res.data })
    //     : this.setState({ lga: res.data });
    // });
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/resManager/address/lgas/?stateId=" +
          stateid,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        val === "update"
        ? this.setState({ updatedlgastates: res.data })
        : this.setState({ lga: res.data });
      });
  }
 
  AddLocation() {
    return (
      <Dialog
        fullWidth={"sm"}
        maxWidth={"sm"}
        open={this.state.addDialogOpen}
        onClose={() => this.setState({ addDialogOpen: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" justify="center">
          Add company location details
        </DialogTitle>
       
            <DialogContent>
              {/* <DialogContentText>
                  Enter the details of your profile to be added
            </DialogContentText> */}

              <Grid
                container
                justify="flex-start"
                direction="row"
                alignItems="center"
                spacing={3}
              >
                <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">State</InputLabel>
                    <Select
                      label="State"
                      id="gender"
                      // value={age}
                      onChange={(event) => {
                        this.setState({ addstate: event.target.value });
                        this.lganames(event.target.value, "add");
                        // console.log(this.state.gender);
                      }}
                    >
                      {this.state.states.map((cat) => (
                        <MenuItem value={cat.id}>{cat.stateName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Lga</InputLabel>
                    <Select
                      label="gender"
                      id="gender"
                      // value={age}
                      onChange={(event) => {
                        this.setState({ addlga: event.target.value });
                        // this.citynames(event.target.value, "add");
                        // console.log(this.state.gender);
                      }}
                    >
                      {this.state.lga.map((cat) => (
                        <MenuItem value={cat.id}>{cat.lgaName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">City</InputLabel>
                    <Select
                      label="City"
                      id="gender"
                      // value={age}
                      onChange={(event) => {
                        this.setState({ addcity: event.target.value });

                        // console.log(this.state.gender);
                      }}
                    >
                      {this.state.city.map((cat) => (
                        <MenuItem value={cat.id}>{cat.cityName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item fullWidth xs={12}>
                  <TextField
                    id="firstName"
                    label="Address"
                    value={this.state.buildingno}
                    // defaultValue={result[this.state.selectedIndex].firstname}
                    onChange={(event) => {
                      // this.capitalizefirstname(event.target.value)
                      this.setState({ buildingno: event.target.value });

                      // console.log(this.state.firstname);
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="middleName"
                    label="Location Name"
                    value={this.state.street}
                    // defaultValue={result[this.state.selectedIndex].middlename}
                    onChange={(event) => {
                      // this.capitalizemiddlename(event.target.value)
                      this.setState({ street: event.target.value });
                      // console.log(this.state.middlename);
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
          

        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              this.setState(
                {
                  addDialogOpen: false,
                },
                this.postlocation()
              );
            }}
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
    );
  }
  updatelocation() {
    return (
      <Dialog
        fullWidth={"sm"}
        maxWidth={"sm"}
        open={this.state.updateDialogOpen}
        onClose={() => this.setState({ updateDialogOpen: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" justify="center">
          update company location details
        </DialogTitle>
       
            <DialogContent>
              {/* <DialogContentText>
                  Enter the details of your profile to be added
            </DialogContentText> */}

              <Grid
                container
                justify="flex-start"
                direction="row"
                alignItems="center"
                spacing={3}
              >
                <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">State</InputLabel>
                    <Select
                      label="State"
                      id="gender"
                      // value={age}
                      defaultValue={this.state.updatestate}
                      onChange={(event) => {
                        this.setState({ updatestate: event.target.value });
                        this.lganames(event.target.value, "update");
                        // console.log(this.state.gender);
                      }}
                    >
                      {this.state.states.map((cat) => (
                        <MenuItem value={cat.id}>{cat.stateName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Lga</InputLabel>
                    <Select
                      label="gender"
                      id="gender"
                      // value={age}
                      defaultValue={this.state.updatelga}
                      onChange={(event) => {
                        this.setState({ updatelga: event.target.value });
                        // this.citynames(event.target.value, "update");
                        // console.log(this.state.gender);
                      }}
                    >
                      {this.state.updatedlgastates.map((cat) => (
                        <MenuItem value={cat.id}>{cat.lgaName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item fullWidth xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">City</InputLabel>
                    <Select
                      label="City"
                      id="gender"
                      // value={age}
                      defaultValue={this.state.updatecity}
                      onChange={(event) => {
                        this.setState({ updatecity: event.target.value });

                        // console.log(this.state.gender);
                      }}
                    >
                      {this.state.updatedcityStates.map((cat) => (
                        <MenuItem value={cat.id}>{cat.cityName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item fullWidth xs={12}>
                  <TextField
                    id="firstName"
                    label="Location Name"
                    defaultValue={this.state.updatebuildingno}
                    // defaultValue={result[this.state.selectedIndex].firstname}
                    onChange={(event) => {
                      // this.capitalizefirstname(event.target.value)
                      this.setState({ updatebuildingno: event.target.value });

                      // console.log(this.state.firstname);
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="middleName"
                    label="Address"
                    defaultValue={this.state.updatestreet}
                    // defaultValue={result[this.state.selectedIndex].middlename}
                    onChange={(event) => {
                      // this.capitalizemiddlename(event.target.value)
                      this.setState({ updatestreet: event.target.value });
                      // console.log(this.state.middlename);
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
         

        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              this.setState(
                {
                  updateDialogOpen: false,
                },
                this.updatelocationdata()
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
              })
            }
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  isloading() {
    return (
      <Grid
        container
        justify="flex-end"
        alignItems="center"
        // container
        // spacing={0}
        direction="column"
        // alignItems="center"
        // justify="center"
        // // display="flex"
        // style={{ minHeight: "10vh" }}
      >
        <Grid item xs={6}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  async componentDidMount() {
    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");
    await this.getlocationdata();
    await get(
      "http://3.22.17.212:8000/api/v1/resManager/address/states/",
      token,
      ""
    ).then((res) => {
      this.setState({ states: res.data, loading: false });
    });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          this.isloading()
        ) : this.state.result.length === 0 ? (
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            align="center"
          >
            <Grid item xs={12}>
              <Paper elevation={3} direction="column">
                <Box
                  p={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: "50vh" }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    justify="center"
                  >
                    please add your company location.
                  </Typography>

                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => this.setState({ addDialogOpen: true })}
                  >
                    Add company Location
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="flex-end"
            >
              <Box p={2}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.setState({ addDialogOpen: true })}
                >
                  Add New Location
                </Button>
              </Box>
            </Grid>

            <TableContainer component={Paper} elevation={16} p={3}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow style={{ backgroundColor: "black" }}>
                    {[
                      "Location Name",
                      "Address",
                      "State",
                      "Lga",
                      "Actions",
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
                      <TableCell align="center">{row.locationName}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">
                        {row.state_name_field}
                      </TableCell>
                      <TableCell align="center">{row.lga_name_field}</TableCell>
                      {/* <TableCell component="th" align="center">
                    {new Date(row.created_on).toDateString()}
                  </TableCell> */}
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() => {
                            this.setState({
                              updateDialogOpen: true,
                              updatestate: this.state.result[index].state,
                              updatelga: this.state.result[index].lga,

                              updatebuildingno: this.state.result[index]
                                .locationName,
                              updatestreet: this.state.result[index].address,
                              updateid: this.state.result[index].id,

                              // add the updatedstate elements here after passing the token and adding data
                            });
                            this.lganames(
                              this.state.result[index].state,
                              "update"
                            );
                            // this.citynames(
                            //   this.state.result[index].lga,
                            //   "update"
                            // )
                          }}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
        {this.AddLocation()}
        {this.updatelocation()}
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCNFjFmnGwCekQz-GMUXupRUAEjSkqNmi8",
})(Employeelocation);
