import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import RouterLink from '../../RouterLink';
import GradientButton from '../../GradientButton';
import { Button } from "@material-ui/core";
import Card from '@material-ui/core/Card';
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
const id=17;
let result=[];
let state=[]
let lga=[];
let city=[];

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
        currentstate:"",
      },
      isloading: true,
    };

    let token =
      "Token 13de58f05701dc7375aab5e15e478a0deb3b0431ad2076a944dae470e922afc3";

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
      .get("http://3.22.17.212:8000/api/v1/employees/17/all-addresses", {
        headers: {
          Authorization:
            "Token 13de58f05701dc7375aab5e15e478a0deb3b0431ad2076a944dae470e922afc3 ",
        },
      })
      .then((res) => {
        result = res.data;
        console.table(result);
      });
      // await axios
      //   .get(
      //     "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/address/states",
      //     {
      //       headers: {
      //         Authorization:
      //           "Token 13de58f05701dc7375aab5e15e478a0deb3b0431ad2076a944dae470e922afc3 ",
      //       },
      //     }
      //   )
      //   .then((res) => {
      //      state = res.data;
      //     console.table("statename",state[result[0].state].stateName);
      //   });
      //   await axios
      //     .get(
      //       "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/address/lgas",
      //       {
      //         headers: {
      //           Authorization:
      //             "Token 13de58f05701dc7375aab5e15e478a0deb3b0431ad2076a944dae470e922afc3 ",
      //         },
      //       }
      //     )
      //     .then((res) => {
      //        lga = res.data;
      //       console.table(lga[0].lgaName);
      //     });
      //      await axios
      //        .get(
      //          "https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/address/cities",
      //          {
      //            headers: {
      //              Authorization:
      //                "Token 13de58f05701dc7375aab5e15e478a0deb3b0431ad2076a944dae470e922afc3 ",
      //            },
      //          }
      //        )
      //        .then((res) => {
      //           city = res.data;
      //          console.log(city[0].cityName);
      //        });
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
    var index=0;
    return (
      <>
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
                  <TableRow key={row.id}  >
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
        </Grid>
        <Box pt={3} pl={10}>
          <Map
            google={this.props.google}
            zoom={14}
            onClick={this.onMarkerClick}
            style={{ height: "75%", width: "60%" }}
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
