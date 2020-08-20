import React, { Component } from "react";
import { Typography, Box } from "@material-ui/core";
import Index from "./index";
import { SnackbarProvider } from "notistack";

export class title extends Component {
  render() {
    return (
      <div>
        <SnackbarProvider maxSnack={3}>
          <Box p={1}>
            <Typography variant="h3" gutterBottom align="center">
              Academics
            </Typography>
          </Box>
          <Index />
        </SnackbarProvider>
      </div>
    );
  }
}

export default title;
