import React, { Component } from "react";
import {  Typography, Box } from "@material-ui/core";
import Index from "./index";
export default class addresstitle extends Component {
  render() {
    return (
      <div>
        <Box p={1}>
          <Typography variant="h3" gutterBottom align="center">
            Adresses
          </Typography>
        </Box>
        <Index />
      </div>
    );
  }
}
