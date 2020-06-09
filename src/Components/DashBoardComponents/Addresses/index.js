import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import RouterLink from '../../RouterLink';
import GradientButton from '../../GradientButton';
import Card from '@material-ui/core/Card';
import Box from "@material-ui/core/Box";
import axios from "axios";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
class Addresses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        latitude: null,
        longtitude: null,
      },
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      location: { latitude: e.latLng.lat(), longtitude: e.latLng.lng() },
    });

    console.log(
      "/////////////////",
      this.state.location.latitude,
      this.state.location.longtitude
    );
  }
  async componentDidMount() {
   await axios
      .get("http://3.22.17.212:8000/api/v1/employees/3/all-addresses", {
        headers: {
          Authorization:
            "80ff0370fcb0f8ef9388930131948409abf168811390bc79e36cc1c3b13e561a",
        },
      })
      .then((res) => {
        const result = res.data;  
        this.setState({ result });
      });
  }

  render() {
    return (
      <>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12}>
            <h1>My Address</h1>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Card style={{ padding: 20 }} raised={true}>
              <form>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      style={{ marginRight: 10 }}
                      margin="dense"
                      id="address"
                      label="Please Enter your Address"
                      type="text"
                      autoComplete="username"
                      autoFocus
                      fullWidth
                      size="medium"
                      multiline
                      rows={4}
                    />
                  </Grid>

                  <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={6}>
                      <GradientButton
                        onClick={this.onSignInButtonPress}
                        title={"Submit Address"}
                        center
                        style={{
                          marginTop: 16,
                          marginBottom: 16,
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <GradientButton
                        onClick={this.onSignInButtonPress}
                        title={"Geolocation"}
                        center
                        style={{
                          marginTop: 16,
                          marginBottom: 16,
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
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
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCNFjFmnGwCekQz-GMUXupRUAEjSkqNmi8",
})(Addresses);
