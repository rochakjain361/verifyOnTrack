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
let state = [
  {
    id: 1,
    stateName: "Bruno State",
  },
  {
    id: 2,
    stateName: "Adwama State",
  },
];
let lga = [];
let city = [];
let history = [];
const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
class Addresses extends Component {
  constructor(props) {
    super(props);
    //uncomment the below 2 lines after finishing address
    // const data=props.data;
    // console.log("token data from address page",data.token);
    this.state = {
      location: {
        latitude: null,
        longtitude: null,
      },
      selectedaddressType: "",
      selectedaddressReason: "",
      defaultaddress: "",
      Streetname: "",
      housenumber: "",
      addDialogOpen: false,
      updateDialogOpen: false,
      stateName: [],
      selectedState: -1,
      selectedLga: -1,
      SelectedCity: -1,
      addressimage: "",
      isloading: true,
      lgaStates: [],
      cityStates: [],
      addressReasons: [],
      addressTypes: [],
      startedLivingHere: "",
      addresshint1: "",
      addresshint2: "",
      addresshint3: "",
      historyloading: true,
      historyDialougeOpen: false,
      selectedIndex: -1,
      updatedaddressreason: "",
      updateddefaultaddresses: "",
      updatedstate: "",
      updatedlga: "",
      updatedcity: "",
      updatedstreet: "",
      updatehousenumber: "",
      updatedaddresshint1: "",
      updatedimage: "",
      updatestartedlivinghere: "",
      updatedaddressestype:"",
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
      .get("http://3.22.17.212:8000/api/v1/employees/" + id + "/addresses", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        result = res.data;
        console.table("addresses", result);
      });

      // await axios
      // .get(
      //   "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/address/states",
      //   {
      //     headers: {
      //       Authorization: token,
      //     },
      //   }
      //   )
      //   .then((res) => {
      //     // state=res.data;
      //     this.setState({ stateName: res.data });
      //     // console.table("statename", state);
      //   });
     await fetch(
       "http://3.22.17.212:8000/api/v1/resManager/address/states/",
       {
          headers: {
            Authorization: token,
          },
        }
     )
       .then((res) => res.json())
       .then((result) => {
         console.log(result);
       });
  
        await axios
        .get(
          "http://3.22.17.212:8000/api/v1/resManager/address/types/",
          {
            headers: {
              Authorization: token,
            },
          }
          )
          .then((res) => {
            this.setState({ addressTypes: res.data });
            // console.table("addresstypes", this.state.addressTypes);
          });
          await axios
          .get(
            "http://3.22.17.212:8000/api/v1/resManager/address/reasons/",
            {
              headers: {
                Authorization: token,
              },
            }
            )
            .then((res) => {
              this.setState({ addressReasons: res.data });
              // console.table("addressReasons", this.state.addressReasons);
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
  async getHistory(index) {
    this.setState({
      historyDialougeOpen: true,
    });
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/employees/" +
          id +
          "/addresses/" +
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
  async updatedetails(addressid){
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("employee", id);
    bodyFormData.append("address_reason", this.state.updatedaddressreason);
    bodyFormData.append("default_address", this.state.updateddefaultaddresses);
    bodyFormData.append("state", this.state.updatedstate);
    bodyFormData.append("lga", this.state.updatedlga);
    bodyFormData.append("city", this.state.updatedcity);
    bodyFormData.append("street_name", this.state.updatedstreet);
    bodyFormData.append("house_number", this.state.updatehousenumber);
    bodyFormData.append("address_hint1", this.state.updatedaddresshint1);
    //  bodyFormData.append("address_hint2", this.state.addresshint2);
    //  bodyFormData.append("address_hint3", this.state.addresshint3);
    bodyFormData.append(
      "google_coordinate1",
      "3.444"
      // this.state.location.latitude
    );
    bodyFormData.append(
      "google_coordinate2",
      "3.444"
      // this.state.location.longtitude
    );
    bodyFormData.append("address_image", this.state.updatedimage);
    bodyFormData.append("since", this.state.updatestartedlivinghere);
    bodyFormData.append("address_type", this.state.updatedaddressestype);
    bodyFormData.append("update_reason", this.state.updatedreason);
    
    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/update-address/"+addressid,
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });

  }
  getaddress() {
    return (
      <>
        {result.length === 0 ? (
          this.addaddress()
        ) : (
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

            <TableContainer component={Paper} elevation={16} p={0}>
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
                      padding="none"
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
                      Update
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
                        {row.state_name_field}/{row.lga_name_field}/
                        {row.city_name_field}
                      </TableCell>
                      <TableCell align="center" size="small" padding="none">
                        {row.street_name},{row.house_number},{row.address_hint1}
                        ,{row.address_hint2} {row.address_hint3}
                      </TableCell>
                      <TableCell align="center" size="small">
                        <a
                          href={`http://www.google.com/maps/place/${row.google_coordinate1}+,+${row.google_coordinate2}`}
                          target=""
                        >
                          Location
                        </a>
                      </TableCell>
                      {/* <TableCell align="center" size="small" padding="none">
                        {}
                      </TableCell> */}
                      <TableCell align="center" size="small" padding="none">
                        {row.owner_name_field}
                      </TableCell>
                      <TableCell align="center" size="small" padding="none">
                        <Button
                          size="small"
                          color="primary"
                          variant="outlined"
                          onClick={() =>
                            this.setState(
                              {
                                updateDialogOpen: true,
                                selectedIndex: index,
                                // add the updatedstate elements here after passing the token and adding data
                              },
                              console.log(this.state.selectedIndex)
                            )
                          }
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            this.getHistory(row.id);
                          }}
                        >
                          History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {this.state.selectedIndex === -1 ? (
              <div />
            ) : (
              <Dialog
                fullWidth={"md"}
                maxWidth={"md"}
                open={this.state.updateDialogOpen}
                onClose={() => this.setState({ updateDialogOpen: false })}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Updating the address
                </DialogTitle>

                <DialogContent>
                  <Grid container direction="row">
                    <Box>
                      <p>
                        <label>Addresses reason</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) =>
                            this.setState({
                              updatedaddressreason: event.target.value,
                            })
                          }
                          defaultValue={
                            result[this.state.selectedIndex].address_reason
                          }
                        />
                      </p>

                      <p>
                        <label>Address type</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) =>
                            this.setState({
                              updatedaddressestype: event.target.value,
                            })
                          }
                          defaultValue={
                            result[this.state.selectedIndex].address_type
                          }
                        />
                      </p>
                      <p>
                        <label>Default address</label>

                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) => {
                            this.setState({
                              updateddefaultaddresses: event.target.value,
                            });
                            console.log(this.state.updatedsex);
                          }}
                          defaultValue={
                            result[this.state.selectedIndex].default_address
                          }
                        />
                      </p>

                      <p>
                        <label>House number</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) => {
                            this.setState({
                              updatehousenumber: event.target.value,
                            });
                            console.log(event.target.value);
                          }}
                          defaultValue={
                            result[this.state.selectedIndex].house_number
                          }
                        />
                      </p>
                      <p>
                        <label>Address image</label>
                        <input
                          class="w3-input"
                          type="file"
                          onChange={(event) => {
                            this.setState({
                              updatedimage: event.target.files[0],
                            });
                            console.log(event.target.files[0]);
                          }}
                        />
                      </p>
                      <p>
                        <label>Street</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) =>
                            this.setState({
                              updatedstreet: event.target.value,
                            })
                          }
                          defaultValue={result[this.state.selectedIndex].state}
                        />
                      </p>
                      <p>
                        <label>State</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) =>
                            this.setState({
                              updatedstate: event.target.value,
                            })
                          }
                          defaultValue={result[this.state.selectedIndex].state}
                        />
                      </p>
                      <p>
                        <label>LGA</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) => {
                            this.setState({ updatedlga: event.target.value });
                            console.log(event.target.value);
                          }}
                          defaultValue={result[this.state.selectedIndex].lga}
                        />
                      </p>
                      <p>
                        <label>City</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) => {
                            this.setState({ updatedcity: event.target.value });
                            console.log(event.target.value);
                          }}
                          defaultValue={result[this.state.selectedIndex].city}
                        />
                      </p>
                      <p>
                        <label>Address Hint1</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) => {
                            this.setState({
                              updatedaddresshint1: event.target.value,
                            });
                            console.log(event.target.value);
                          }}
                          defaultValue={
                            result[this.state.selectedIndex].address_hint1
                          }
                        />
                      </p>
                      <p>
                        <label>Address hint2</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) => {
                            this.setState({
                              updatedaddresshint2: event.target.value,
                            });
                            console.log(event.target.value);
                          }}
                          defaultValue={
                            result[this.state.selectedIndex].address_hint2
                          }
                        />
                      </p>
                      <p>
                        <label>Address hint3</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) => {
                            this.setState({
                              updatedaddresshint3: event.target.value,
                            });
                            console.log(event.target.value);
                          }}
                          defaultValue={
                            result[this.state.selectedIndex].address_hint3
                          }
                        />
                      </p>

                      <p>
                        <label>Started living here</label>
                        <input
                          class="w3-input"
                          type="date"
                          onChange={(event) => {
                            this.setState({
                              updatestartedlivinghere: event.target.value,
                            });
                            console.log(event.target.value);
                          }}
                          defaultValue={result[this.state.selectedIndex].since}
                        />
                      </p>
                      <p>
                        <label>Update reason</label>
                        <input
                          class="w3-input"
                          type="text"
                          onChange={(event) => {
                            this.setState({
                              updatedreason: event.target.value,
                            });
                            console.log(event.target.value);
                          }}
                          defaultValue={
                            result[this.state.selectedIndex].update_reason
                          }
                        />
                      </p>
                    </Box>

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
                        <InfoWindow
                          onClose={this.onInfoWindowClose}
                        ></InfoWindow>
                      </Map>
                    </Box>
                  </Grid>
                </DialogContent>

                <DialogActions>
                  <Button
                    disabled={this.state.buttondisabled}
                    color="primary"
                    onClick={() => {
                      this.updatedetails(result[this.state.selectedIndex].id)
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
          </Grid>
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
                    State/Lga/City
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    Street name
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    House number
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    Address hint1
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    Googlecoordinates
                  </TableCell>

                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    Address reason
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    Address Type
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    Records updated date
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
                      <TableCell align="center">
                        {row.state_name_field}
                        {row.lga_name_field}
                        {row.city_name_field}
                      </TableCell>
                      <TableCell align="center">{row.street_name}</TableCell>
                      <TableCell align="center">{row.house_number}</TableCell>
                      <TableCell align="center">{row.address_hint1}</TableCell>
                      {/* <TableCell align="center">
                        <Avatar src={row.address_hint1}>Picture</Avatar>
                      </TableCell> */}
                      <TableCell align="center">
                        {row.google_coordinate1}
                        {row.google_coordinate2}
                      </TableCell>
                      <TableCell align="center">{row.address_reason}</TableCell>{" "}
                      <TableCell align="center">{row.address_type}</TableCell>{" "}
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
  async lganames(stateid) {
    this.setState({ selectedState: stateid });
    await axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/address/lgas?stateId=" +
          stateid,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        this.setState({ lgaStates: res.data });
        console.table("lga", this.state.lgaStates);
      });
  }
  async citynames(lgaid) {
    this.setState({ selectedLga: lgaid });
    console.log("selectedlga", this.state.selectedLga, lgaid);
    await axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/address/cities?lgaId=" +
          lgaid,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        this.setState({ cityStates: res.data });
        console.table("cites", this.state.cityStates);
      });
  }
  async postAddress() {
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("employee", id);
    bodyFormData.append("address_reason", this.state.selectedaddressReason);
    bodyFormData.append("default_address", this.state.defaultaddress);
    bodyFormData.append("state", this.state.selectedState);
    bodyFormData.append("lga", this.state.selectedLga);
    bodyFormData.append("city", this.state.selectedCity);
    bodyFormData.append("street_name", this.state.Streetname);
    bodyFormData.append("house_number", this.state.housenumber);
    bodyFormData.append("address_hint1", this.state.addresshint1);
    //  bodyFormData.append("address_hint2", this.state.addresshint2);
    //  bodyFormData.append("address_hint3", this.state.addresshint3);
    bodyFormData.append(
      "google_coordinate1",
      "3.444"
      // this.state.location.latitude
    );
    bodyFormData.append(
      "google_coordinate2",
      "3.444"
      // this.state.location.longtitude
    );
    bodyFormData.append("address_image", this.state.addressimage);
    bodyFormData.append("since", this.state.startedLivingHere);
    bodyFormData.append("address_type", this.state.selectedaddressType);

    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/post-address",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });
  }
  addaddressform() {
    return (
      <>
        <Grid container justify="flex-start" direction="row">
          <Grid class="w3-container">
            <InputLabel htmlFor="grouped-select">Address Types</InputLabel>
            <Select
              onChange={(event) => {
                this.setState({ selectedaddressType: event.target.value });
              }}
            >
              {this.state.addressTypes.map((address) => (
                <MenuItem id={address.id} value={address.id}>
                  {address.addressType}
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Address Reason</InputLabel>
            <Select
              onChange={(event) => {
                this.setState({ selectedaddressReason: event.target.value });
              }}
            >
              {this.state.addressReasons.map((address) => (
                <MenuItem id={address.id} value={address.id}>
                  {address.addressReason}
                </MenuItem>
              ))}
            </Select>
            <p>
              <label>Default address</label>

              <Select
                onChange={(event) => {
                  this.setState(
                    { defaultaddress: event.target.value },

                    console.log("defaultadress", this.state.defaultaddress)
                  );
                }}
              >
                <MenuItem id={1} value="Yes">
                  Yes
                </MenuItem>
                <MenuItem id={2} value="No">
                  No
                </MenuItem>
              </Select>
            </p>

            <p>
              <label>House number</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ housenumber: event.target.value });
                  console.log(event.target.value);
                }}
                //  defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label>Address image</label>
              <input
                class="w3-input"
                type="file"
                onChange={(event) => {
                  this.setState({ addressimage: event.target.files[0] });
                  console.log(event.target.files[0]);
                }}
              />
            </p>

            <InputLabel htmlFor="grouped-select">States</InputLabel>
            <Select
              onChange={(event) => {
                this.setState({ selectedState: event.target.value });
                // console.log(
                //   "selectedstate",
                //   this.state.selectedState,
                //   event.target.value
                // );
                this.lganames(event.target.value);
              }}
            >
              {this.state.stateName.map((states) => (
                <MenuItem id={states.id} value={states.id}>
                  {states.stateName}
                </MenuItem>
              ))}
            </Select>

            <InputLabel htmlFor="grouped-select">LGA</InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              onChange={(e) => {
                this.setState({ selectedLga: e.target.value });
                this.citynames(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {this.state.lgaStates.map((lgas) => (
                <MenuItem value={lgas.id}>{lgas.lgaName} </MenuItem>
              ))}
            </Select>

            <InputLabel htmlFor="grouped-select">City</InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              onChange={(event) => {
                this.setState({
                  selectedCity: event.target.value,
                });
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {this.state.cityStates.map((city) => (
                <MenuItem value={city.id}>{city.cityName}</MenuItem>
              ))}
            </Select>

            <p>
              <label>Address Hint1</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ addresshint1: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label> Address Hint2</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ addresshint2: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            <p>
              <label>Address Hint3</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) => {
                  this.setState({ addresshint3: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>

            <p>
              <label>Started living here</label>
              <input
                class="w3-input"
                type="date"
                onChange={(event) => {
                  this.setState({ startedLivingHere: event.target.value });
                  console.log(event.target.value);
                }}
                // defaultValue={result[this.state.selectedIndex].dob}
              />
            </p>
            {/* <p>
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
            </p> */}
            <p>
              <label>Street</label>
              <input
                class="w3-input"
                type="text"
                onChange={(event) =>
                  this.setState(
                    {
                      Streetname: event.target.value,
                    }
                    // this.reasonforupdatevalidcheck(event)
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
                  variant="outlined"
                  onClick={() => {
                    this.setState({
                      addDialogOpen: false,
                    });
                    this.postAddress();
                  }}
                >
                  Submit Profile
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
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
  addaddress() {
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
