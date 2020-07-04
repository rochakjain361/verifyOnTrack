import React, { PureComponent } from "react";
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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
// let result = [];
let state = [

];
let lga = [];
let city = [];
let history = [];
let token1 = "";
let token = "";
let id = "";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Addresses extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: null,
        longtitude: null,
        updatedlatitude: null,
        updatedlongititude: null,
      },
      result: [],
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
      historyDialogeOpen: false,
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
      updatedaddressestype: "",
      updatedlgastates: [],
      updatedcityStates: [],
      buttondisabled: "disabled",
      updateresponse:"",
      addresponse:"",
      addsnackbar:false,
      updatesnackbar:false
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

    lat = lat.slice(0, 11)
    long = long.slice(0, 11)
    lat = parseFloat(lat);
    long = parseFloat(long);
    this.setState({
      location: {
        latitude: lat,
        longtitude: long
      }
    })
    console.log(lat,
      this.state.location.latitude,
      this.state.location.longtitude
    );

  }
  reasonforupdatevalidcheck = (event) => {
    if (event.target.value.length > 0) {
      //  console.log(event.target.value);
      this.setState({ buttondisabled: "" });
    } 
    else if (event.target.value.length > 250) {
      //  console.log(event.target.value);
      this.setState({ buttondisabled: "disabled" });
    } else {
      this.setState({ buttondisabled: "disabled" });
    }


  };
  async getaddressdata() {
    await axios
      .get("http://3.22.17.212:8000/api/v1/employees/" + id + "/addresses", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // result = res.data;
        this.setState({result:res.data});
        console.table("addresses",this.state.result);
      });
  }
  async componentDidMount() {
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");
    await this.getaddressdata();

    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/address/states/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({ stateName: res.data });
      });

    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/address/types/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({ addressTypes: res.data });
         console.table("addresstypes", this.state.addressTypes);
      });
    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/address/reasons/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({ addressReasons: res.data });
         console.table("addressReasons", this.state.addressReasons);
      });

    this.setState({ isloading: false });
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
        <Grid item xs={6} style={{ marginTop: 100 }}>
          <CircularProgress />
        </Grid>
      </Grid>
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
  async updatedetails(addressid) {
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
    bodyFormData.append("address_reason", this.state.updatedaddressreason);
    bodyFormData.append("default_address", this.state.updateddefaultaddresses);
    bodyFormData.append("state", this.state.updatedstate);
    bodyFormData.append("lga", this.state.updatedlga);
    bodyFormData.append("city", this.state.updatedcity);
    bodyFormData.append("street_name", this.state.updatedstreet);
    bodyFormData.append("house_number", this.state.updatehousenumber);
    bodyFormData.append("address_hint1", this.state.updatedaddresshint1);
     bodyFormData.append("address_hint2", this.state.updatedaddresshint2);
      bodyFormData.append("address_hint3", this.state.updatedaddresshint3);
    bodyFormData.append(
      "google_coordinate1",
     
      this.state.location.latitude
    );
    bodyFormData.append(
      "google_coordinate2",
     
      this.state.location.longtitude
    );
    // bodyFormData.append("address_image", this.state.updatedimage);
    bodyFormData.append("since", this.state.updatestartedlivinghere);
    bodyFormData.append("address_type", this.state.updatedaddressestype);
    bodyFormData.append("update_reason", this.state.updatedreason);

    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/update-address/" + addressid,
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
        this.setState({updateresponse:response.status, updatesnackbar: true })
      });
      await this.getaddressdata();
  }
  addsnackbar() {


    return (
      this.state.addresponse === 200 ?
        (<div>

          <Snackbar open={this.state.addsnackbar} autoHideDuration={3000} onClick={() =>  this.setState({ addsnackbar: false }) }>
            <Alert onClose={() => { this.setState({ addsnackbar: !this.state.addasnackbar }) }} severity="success">
              Address added sucessfully
      </Alert>
          </Snackbar>
        </div>) : (<Snackbar open={this.state.addsnackbar} autoHideDuration={3000} onClick={() => { this.setState({ addsnackbar: !this.state.addsnackbar }) }}>
          <Alert onClose={() => { this.setState({ addsnackbar: !this.state.addsnackbar }) }} severity="error">
            Something went wrong please try again
      </Alert>
        </Snackbar>))

  }
  updatesnackbar() {


    return (
      this.state.updateresponse === 200 ?
        (<div>
          {console.log("//////////////////////////////////////")}

          <Snackbar open={this.state.updatesnackbar} autoHideDuration={3000} onClick={() =>  this.setState({ updatesnackbar: false }) }>
            <Alert onClose={() => { this.setState({ updatesnackbar: !this.state.updatesnackbar }) }} severity="success">
              Address updated sucessfully
      </Alert>
          </Snackbar>
        </div>) : (<Snackbar open={this.state.updatesnackbar} autoHideDuration={3000} onClick={() => { this.setState({ updatesnackbar: !this.state.updatesnackbar }) }}>
          <Alert onClose={() => { this.setState({ updatesnackbar: !this.state.updatesnackbar }) }} severity="error">
            Something went wrong please try again
      </Alert>
        </Snackbar>))

  }
  getaddress() {
    return (
      <>
        {this.state.result.length === 0 ? (
          // true
          this.addaddress()
        ) : (
            <Grid container justify="space-between" alignItems="center">
              <Grid container justify="center" direction="column" alignItems="flex-end">
             
              <Box p={2}>

                

                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.setState({ addDialogOpen: true })}
                  >
                  Add New address
              </Button>
                  </Box>
              </Grid>
              <TableContainer component={Paper} elevation={16} p={0}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "black" }}>
                      {[
                      "Living since",
                      "Address",
                      "State/LGA/City",
                      "Google link",
                   
                        "Address source",
                        "Default Address",
                        "Verifier",
                        "Update",
                        "History",
                      ].map((text, index) => (
                        <TableCell
                        style={{ fontWeight: "bolder", }}
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
                        <TableCell align="center" size="small">
                          {row.since}
                        </TableCell>
                        <TableCell align="center" size="small" padding="none">
                        {row.house_number},{row.street_name},{row.address_hint1}
                        ,{row.address_hint2} {row.address_hint3}
                        </TableCell>
                        <TableCell align="center" size="small" padding="none">
                          {row.state_name_field}/{row.lga_name_field}/
                        {row.city_name_field}
                        </TableCell>
                        <TableCell align="center" size="small">
                          <a
                            href={`http://www.google.com/maps/place/${row.google_coordinate1}+,+${row.google_coordinate2}`}
                            target=""
                          >
                            Location
                        </a>
                        </TableCell>
                        
                        <TableCell align="center" size="small" padding="none">
                          {row.source_name_field}
                        </TableCell>
                        <TableCell align="center" size="small" padding="none">
                          {row.default_address}
                        </TableCell>

                        
                     
                      
                        <TableCell align="center" size="small" padding="none">
                          {row.owner_name_field}
                        </TableCell>
                        <TableCell align="center" size="small" padding="none">
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                              this.setState({
                                updateDialogOpen: true,
                                selectedIndex: index,
                                updatedaddressreason:
                                  this.state.result[index].address_reason,
                                updateddefaultaddresses:
                                  this.state.result[index].default_address,
                                updatedstate: this.state.result[index].state,
                                updatedlga: this.state.result[index].lga,
                                updatedcity: this.state.result[index].city,
                                updatedstreet: this.state.result[index].street_name,
                                updatehousenumber: this.state.result[index].house_number,
                                updatedaddresshint1: this.state.result[index].address_hint1,
                                updatedaddresshint2: this.state.result[index].address_hint2,
                                updatedaddresshint3: this.state.result[index].address_hint3,

                                updatedimage: this.state.result[index].address_image,
                                updatestartedlivinghere: this.state.result[index].since,
                                updatedaddressestype: this.state.result[index].address_type,
                                // updatedlatitude: this.state.result[index].google_coordinate1,
                                // updatedlongititude:
                                // this.state.result[index].google_coordinate2,
                                location: {
                                  latitude: this.state.result[index].google_coordinate1,
                                  longtitude: this.state.result[index].google_coordinate2,
                                },
                                // add the updatedstate elements here after passing the token and adding data
                              });
                              this.lganames(this.state.result[index].state, "update");
                              this.citynames(this.state.result[index].lga, "update");
                            }}
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
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="addNewAddress" align="center">
                      Update address
                </DialogTitle>
                    <DialogContent>
                      <Box display="flex" flexDirection="row" width={1}>
                        <Box p={2} width={1 / 2}>
                          <DialogContentText align="center">
                            Enter the details of your address
                      </DialogContentText>

                          <Grid
                            container
                            justify="flex-start"
                            direction="row"
                            alignItems="center"
                            spacing={3}
                          >
                            <Grid item fullWidth xs={12}>
                              <InputLabel id="addressType">
                                Address types
                          </InputLabel>
                              <Select
                                id="addressType"
                                label="Address type"
                                defaultValue={this.state.updatedaddressestype}
                                onChange={(event) =>
                                  this.setState({
                                    updatedaddressestype: event.target.value,
                                  })
                                }
                                fullWidth
                              >
                                {this.state.addressTypes.map((address) => (
                                  <MenuItem id={address.id} value={address.id}>
                                    {address.addressType}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <InputLabel id="addressReason">
                                Address Reason
                          </InputLabel>
                              <Select
                                id="addressReason"
                                label="Address reason"
                                defaultValue={this.state.updatedaddressreason}
                                onChange={(event) =>
                                  this.setState({
                                    updatedaddressreason: event.target.value,
                                  })
                                }
                                type="text"
                                fullWidth
                              >
                                {this.state.addressReasons.map((address) => (
                                  <MenuItem id={address.id} value={address.id}>
                                    {address.addressReason}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>

                            <Grid item fullWidth xs={12}>
                            <InputLabel id="addressType">
                                Default Address
                          </InputLabel>
                              <Select
                                id="defaultAddress"
                                label="Default address"
                                defaultValue={this.state.updateddefaultaddresses}
                                onChange={(event) => {
                                  this.setState({
                                    updateddefaultaddresses: event.target.value,
                                  });
                                }}
                                type="text"
                                fullWidth
                              >
                                <MenuItem id={1} value="Yes">
                                  Yes
                            </MenuItem>
                                <MenuItem id={2} value="No">
                                  No
                            </MenuItem>
                              </Select>
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <TextField
                                id="houseNumber"
                                label="House number"
                                onChange={(event) => {
                                  this.setState({
                                    updatehousenumber: event.target.value,
                                  });
                                  console.log(event.target.value);
                                }}
                                defaultValue={this.state.updatehousenumber}
                                type="text"
                                fullWidth
                              />
                            </Grid>

                            
                             
                            

                          

                            <Grid item fullWidth xs={12}>
                              <InputLabel id="state">State</InputLabel>
                              <Select
                                id="states"
                                label="States"
                                onChange={(event) => {
                                  this.setState({
                                    updatedstate: event.target.value,
                                  });
                                  this.lganames(event.target.value, "update");
                                }}
                                defaultValue={this.state.updatedstate}
                                fullWidth
                              >
                                {this.state.stateName.map((states) => (
                                  <MenuItem id={states.id} value={states.id}>
                                    {states.stateName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <InputLabel id="Lga">Lga</InputLabel>
                              <Select
                                id="lga"
                                label="LGA"
                                onChange={(event) => {
                                  this.setState({ updatedlga: event.target.value });
                                  this.citynames(event.target.value, "update");
                                }}
                                defaultValue={this.state.updatedlga}
                                fullWidth
                              >
                                {this.state.updatedlgastates.map((lgas) => (
                                  <MenuItem value={lgas.id}>
                                    {lgas.lgaName}{" "}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <InputLabel id="City"> City</InputLabel>
                              <Select
                                id="city"
                                label="City"
                                onChange={(event) => {
                                  this.setState({
                                    updatedcity: event.target.value,
                                  });
                                  console.log(event.target.value);
                                }}
                                defaultValue={this.state.updatedcity}
                                type="text"
                                fullWidth
                              >
                                {this.state.updatedcityStates.map((city) => (
                                  <MenuItem value={city.id}>
                                    {city.cityName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <TextField
                                id="addressHint1"
                                label="Address hint 1"
                                onChange={(event) => {
                                  this.setState({
                                    updatedaddresshint1: event.target.value,
                                  });
                                  console.log(event.target.value);
                                }}
                                defaultValue={this.state.updatedaddresshint1}
                                type="text"
                                fullWidth
                              />
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <TextField
                                id="addressHint2"
                                label="Address hint 2"
                                onChange={(event) => {
                                  this.setState({
                                    updatedaddresshint2: event.target.value,
                                  });
                                  console.log(event.target.value);
                                }}
                                defaultValue={this.state.updatedaddresshint2}
                                type="text"
                                fullWidth
                              />
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <TextField
                                id="addressHint3"
                                label="Address hint 3"
                                onChange={(event) => {
                                  this.setState({
                                    updatedaddresshint3: event.target.value,
                                  });
                                  console.log(event.target.value);
                                }}
                                defaultValue={this.state.updatedaddresshint3}
                                type="text"
                                fullWidth
                              />
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <TextField
                                id="startedLivingHereSince"
                                helperText="Started living here since"
                                onChange={(event) => {
                                  this.setState({
                                    updatestartedlivinghere: event.target.value,
                                  });
                                  console.log(event.target.value);
                                }}
                                defaultValue={this.state.updatestartedlivinghere}
                                type="date"
                                fullWidth
                              />
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <TextField
                                id="street"
                                label="Street"
                                onChange={(event) =>
                                  this.setState({
                                    updatedstreet: event.target.value,
                                  })
                                }
                                defaultValue={this.state.updatedstreet}
                                type="text"
                                fullWidth
                              />
                            </Grid>

                            <Grid item fullWidth xs={12}>
                              <TextField
                                id="updateReason"
                                label="Reason for updating"
                                helperText="update reason field can not exceed 250 characters"
                                onChange={(event) => {
                                  this.setState({
                                    updatedreason: event.target.value,
                                  },
                                  this.reasonforupdatevalidcheck(event));
                                  console.log(event.target.value);
                                }}
                                type="text"
                                fullWidth
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <Box p={1} width={1 / 2} >
                          <Map
                            google={this.props.google}
                            zoom={6}
                            onClick={this.onMarkerClick}
                            initialCenter={{
                              lat: this.state.location.latitude,
                              lng: this.state.location.longtitude
                            }}
                            style={{ height: "75%", width: "40%" }}
                            fullscreenControl={true}
                          >
                            <Marker
                              // initial={{
                              //   lat: this.state.updatedlatitude,
                              //   lng: this.state.updatedlongititude,
                              // }}

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
                      </Box>
                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={this.state.buttondisabled}
                        disabled={this.state.buttondisabled}
                        color="primary"
                        onClick={() => {
                          this.updatedetails(this.state.result[this.state.selectedIndex].id);
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
                            updatedreason:""
                          })
                        }
                      >
                        Cancel
                  </Button>
                    </DialogActions>
                  </Dialog>
                  
                )}
                 {this.updatesnackbar()}
                 {this.addsnackbar()}
              <Dialog
                fullWidth={"md"}
                maxWidth={"md"}
                open={this.state.addDialogOpen}
                onClose={() => this.setState({ addDialogOpen: false })}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="addNewAddress" justify="center" align="center">
                  Add new address
              </DialogTitle>
                <DialogContent>
                  <Box display="flex" flexDirection="row" width={1}>
                    <Box p={2} width={1 / 2} height={1}>
                      <DialogContentText align="center">
                        Enter the details of your address
                    </DialogContentText>
                      <Grid
                        container
                        justify="flex-start"
                        direction="row"
                        alignItems="center"
                        spacing={3}
                      >
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="addressType">
                              Address types
                          </InputLabel>
                            <Select
                              labelId="addressType"
                              id="addresType"
                              onChange={(event) => {
                                this.setState({
                                  selectedaddressType: event.target.value,
                                });
                              }}
                            >
                              {this.state.addressTypes.map((address) => (
                                <MenuItem id={address.id} value={address.id}>
                                  {address.addressType}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="addressReason">
                              Address Reason
                          </InputLabel>
                            <Select
                              labelId="addressReason"
                              id="addresReason"
                              onChange={(event) => {
                                this.setState({
                                  selectedaddressReason: event.target.value,
                                });
                              }}
                            >
                              {this.state.addressReasons.map((address) => (
                                <MenuItem id={address.id} value={address.id}>
                                  {address.addressReason}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="defaultAddress">
                              Default address
                          </InputLabel>
                            <Select
                              labelId="defaultAddress"
                              id="defaultAddress"
                              onChange={(event) => {
                                this.setState(
                                  { defaultaddress: event.target.value },

                                  console.log(
                                    "defaultadress",
                                    this.state.defaultaddress
                                  )
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
                          </FormControl>
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="houseNumber"
                            label="House number"
                            onChange={(event) => {
                              this.setState({ housenumber: event.target.value });
                              console.log(event.target.value);
                            }}
                            type="text"
                            fullWidth
                          />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="street"
                            label="Street"
                            onChange={(event) =>
                              this.setState(
                                {
                                  Streetname: event.target.value,
                                }
                                // this.reasonforupdatevalidcheck(event)
                              )
                            }
                            type="text"
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="states">States</InputLabel>
                            <Select
                              labelId="states"
                              id="states"
                              onChange={(event) => {
                                this.setState({
                                  selectedState: event.target.value,
                                });
                                // console.log(
                                //   "selectedstate",
                                //   this.state.selectedState,
                                //   event.target.value
                                // );
                                this.lganames(event.target.value, "add");
                              }}
                            >
                              {this.state.stateName.map((states) => (
                                <MenuItem id={states.id} value={states.id}>
                                  {states.stateName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="lga">LGA</InputLabel>
                            <Select
                              labelId="lga"
                              id="lga"
                              onChange={(e) => {
                                this.setState({ selectedLga: e.target.value });
                                this.citynames(e.target.value, "add");
                              }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>

                              {this.state.lgaStates.map((lgas) => (
                                <MenuItem value={lgas.id}>
                                  {lgas.lgaName}{" "}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="city">City</InputLabel>
                            <Select
                              labelId="city"
                              id="city"
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
                                <MenuItem value={city.id}>
                                  {city.cityName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="addressHint1"
                            label="Address hint 1"
                            onChange={(event) => {
                              this.setState({ addresshint1: event.target.value });
                              console.log(event.target.value);
                            }}
                            type="text"
                            fullWidth
                          />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="addressHint2"
                            label="Address hint 2"
                            onChange={(event) => {
                              this.setState({ addresshint2: event.target.value });
                              console.log(event.target.value);
                            }}
                            type="text"
                            fullWidth
                          />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="addressHint3"
                            label="Address hint 3"
                            onChange={(event) => {
                              this.setState({ addresshint3: event.target.value });
                              console.log(event.target.value);
                            }}
                            type="text"
                            fullWidth
                          />
                        </Grid>

                        <Grid item fullWidth xs={12}>
                          <TextField
                            id="startedLivingHereSince"
                            helperText="Started living here since"
                            onChange={(event) => {
                              this.setState({
                                startedLivingHere: event.target.value,
                              });
                              console.log(event.target.value);
                            }}
                            type="date"
                            fullWidth
                          />
                        </Grid>

                       
                        {/* <Grid container justify="flex-start" direction="row">
                        <Grid class="w3-container">
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
                        </Grid>
                      </Grid> */}
                      </Grid>
                    </Box>
                    <Box p={2} width={1 / 2} style={{ minHeight: "10vh" }}>
                      <Map
                        google={this.props.google}
                        zoom={6}
                        initialCenter={{
                          lat:9.0765, 
                          lng:7.3986,
                        }}
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
                  </Box>
                </DialogContent>
                <Box p={1}>
                  <DialogActions>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        this.setState({
                          addDialogOpen: false,
                        });
                        this.postAddress();
                      }}
                    >
                      Submit Address
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
                </Box>
              </Dialog>
            </Grid>
          )}

        <Dialog
          fullWidth={"md"}
          maxWidth={"md"}
          open={this.state.historyDialogeOpen}
          onClose={() => this.setState({ historyDialogeOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">Address History</DialogTitle>
          {/* <DialogContent> */}
          <TableContainer p={3}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  {[
                    "State/Lga/City",
                    "House Number,Street Name,Address Hint 1",
                    "Google Link",
                    "Address Reason",
                    "Address Type",
                    "Records Updated Date",
                    "Update Reason",
                  ].map((text, index) => (
                    <TableCell
                      align="center"
                      style={{ fontWeight: "bolder", }}
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
                        <TableCell align="center">
                          {row.state_name_field},
                          {row.lga_name_field},
                          {row.city_name_field}
                        </TableCell>
                        <TableCell align="center">{row.house_number},{row.street_name},{row.address_hint1}</TableCell>
                       
                        {/* <TableCell align="center">
                        <Avatar src={row.address_hint1}>Picture</Avatar>
                      </TableCell> */}
                        <TableCell align="center">
                        <a
                            href={`http://www.google.com/maps/place/${row.google_coordinate1}+,+${row.google_coordinate2}`}
                            target=""
                          >
                            Location
                        </a>
                        </TableCell>
                        <TableCell align="center">{row.address_reason}</TableCell>{" "}
                        <TableCell align="center">{row.address_type}</TableCell>{" "}
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
  async lganames(stateid, val) {
    this.setState({ selectedState: stateid });
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
          : this.setState({ lgaStates: res.data });
        console.table("lga", this.state.lgaStates);
      });
  }
  async citynames(lgaid, val) {
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
        val === "update"
          ? this.setState({ updatedcityStates: res.data })
          : this.setState({ cityStates: res.data });
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
      bodyFormData.append("address_hint2", this.state.addresshint2);
      bodyFormData.append("address_hint3", this.state.addresshint3);
    bodyFormData.append(
      "google_coordinate1",
      // "17.406"
      this.state.location.latitude
    );
    bodyFormData.append(
      "google_coordinate2",
      // "78.440"

      this.state.location.longtitude
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
        this.setState({addresponse:response.status,addsnackbar: true})
       
      });
      await this.getaddressdata();
  }
  addAddressForm() {
    return (
      <Dialog
        fullWidth={"md"}
        maxWidth={"md"}
        open={this.state.addDialogOpen}
        onClose={() => this.setState({ addDialogOpen: false })}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="addNewAddress" justify="center">
          Add new address
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="row" width={1}>
            <Box width={1 / 2}>
              <DialogContentText>
                Enter the details of your address
              </DialogContentText>
              <Grid
                container
                justify="flex-start"
                direction="row"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="addressType">Address types</InputLabel>
                    <Select
                      labelId="addressType"
                      id="addresType"
                      onChange={(event) => {
                        this.setState({
                          selectedaddressType: event.target.value,
                        });
                      }}
                    >
                      {this.state.addressTypes.map((address) => (
                        <MenuItem id={address.id} value={address.id}>
                          {address.addressType}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="addressReason">Address Reason</InputLabel>
                    <Select
                      labelId="addressReason"
                      id="addresReason"
                      onChange={(event) => {
                        this.setState({
                          selectedaddressReason: event.target.value,
                        });
                      }}
                    >
                      {this.state.addressReasons.map((address) => (
                        <MenuItem id={address.id} value={address.id}>
                          {address.addressReason}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="defaultAddress">Default address</InputLabel>
                    <Select
                      labelId="defaultAddress"
                      id="defaultAddress"
                      onChange={(event) => {
                        this.setState(
                          { defaultaddress: event.target.value },

                          console.log(
                            "defaultadress",
                            this.state.defaultaddress
                          )
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
                  </FormControl>
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="houseNumber"
                    label="House number"
                    onChange={(event) => {
                      this.setState({ housenumber: event.target.value });
                      console.log(event.target.value);
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item fullWidth xs={12}>
                  <TextField
                    id="street"
                    label="Street"
                    onChange={(event) =>
                      this.setState(
                        {
                          Streetname: event.target.value,
                        }
                        // this.reasonforupdatevalidcheck(event)
                      )
                    }
                    type="text"
                    fullWidth
                  />
                </Grid>

                {/* <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                  >
                    Choose file
                  </Button>
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="addressImage"
                    label="Choose Image"
                    onChange={(event) => {
                      this.setState({
                        addressimage: event.target.files[0],
                      });
                      console.log(event.target.files[0]);
                    }}
                    type="file"
                    fullWidth
                  />
                </Grid> */}

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="states">States</InputLabel>
                    <Select
                      labelId="states"
                      id="states"
                      onChange={(event) => {
                        this.setState({
                          selectedState: event.target.value,
                        });
                        // console.log(
                        //   "selectedstate",
                        //   this.state.selectedState,
                        //   event.target.value
                        // );
                        this.lganames(event.target.value, "add");
                      }}
                    >
                      {this.state.stateName.map((states) => (
                        <MenuItem id={states.id} value={states.id}>
                          {states.stateName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="lga">LGA</InputLabel>
                    <Select
                      labelId="lga"
                      id="lga"
                      onChange={(e) => {
                        this.setState({ selectedLga: e.target.value });
                        this.citynames(e.target.value, "add");
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {this.state.lgaStates.map((lgas) => (
                        <MenuItem value={lgas.id}>{lgas.lgaName} </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="city">City</InputLabel>
                    <Select
                      labelId="city"
                      id="city"
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
                  </FormControl>
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="addressHint1"
                    label="Address hint 1"
                    onChange={(event) => {
                      this.setState({ addresshint1: event.target.value });
                      console.log(event.target.value);
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="addressHint2"
                    label="Address hint 2"
                    onChange={(event) => {
                      this.setState({ addresshint2: event.target.value });
                      console.log(event.target.value);
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="addressHint3"
                    label="Address hint 3"
                    onChange={(event) => {
                      this.setState({ addresshint3: event.target.value });
                      console.log(event.target.value);
                    }}
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item fullWidth xs={12}>
                  <TextField
                    id="startedLivingHereSince"
                    helperText="Started living here since"
                    onChange={(event) => {
                      this.setState({
                        startedLivingHere: event.target.value,
                      });
                      console.log(event.target.value);
                    }}
                    type="date"
                    fullWidth
                  />
                </Grid>

             
                {/* <Grid container justify="flex-start" direction="row">
                  <Grid class="w3-container">
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
                  </Grid>
                </Grid> */}
              </Grid>
            </Box>
            <Box p={1} width={1 / 2}>
              <Map
               initialCenter={{
                lat:9.0765, 
                lng:7.3986,
              }}
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
          </Box>
        </DialogContent>
        <Box p={1}>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.setState({
                  addDialogOpen: false,
                });
                this.postAddress();
              }}
            >
              Submit Address
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
        </Box>
      </Dialog>
    );
  }
  addaddress() {
    return (
      <>
        <Grid container spacing={3} justify="space-between">
         
          <Grid item xs={12}>
            <Paper style={{ padding: 20 }} elevation={3}>
            <Box p={1}   display="flex" flexDirection="column"  justifyContent='center' alignItems="center" style={{height: '50vh',}} >
              <Typography variant="h4" gutterBottom align="center">
                Add address to improve ratings.
              </Typography>

              <Grid container justify="center" style={{ marginTop: 50 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.setState({ addDialogOpen: true })}
                >
                  Add New address
                </Button>
              </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {this.state.addDialogOpen ? this.addAddressForm() : null}
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
