import React, { Component, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  Button,
  TableContainer,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core/";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
} from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TabsEmployment from "../EmployementCodes/tabsEmployment";
import Onboarding from "../../../EmployerPageComponents/MyCodes/EmployementCodes/Onboarding";
import Axios from "axios";

const styles = (theme) => ({});

export default function Indexemployment() {
  const [Token] = React.useState(localStorage.getItem("Token"));
  const [id] = React.useState(localStorage.getItem("id"));
  const [Loading, setLoading] = React.useState(true);
  const [OnboardingResponse, setOnboardingResponse] = React.useState([]);

  // constructor(props) {
  //     super(props);
  //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
  //   }
  const Onboardingdata = async () => {
    await Axios.get("http://3.22.17.212:8000/api/v1/employers/oboffers", {
      headers: {
        Authorization: Token,
      },
    }).then((response) => {
      console.log("response for oboffers", OnboardingResponse);
      setOnboardingResponse(response.data);
      
    });
  };
  const isloading = () => {
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
  };

  useEffect(() => {
    Onboardingdata();
    setLoading(false);
  }, []);

  return Loading ? (
    isloading()
  ) : (
    <Grid container align="center" justify="center">
      <Grid item xs={12}>
        <Box p={2}>
          <Typography variant="h4" align="center" justify="center">
            Employment Codes
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TabsEmployment Onboarding={OnboardingResponse} refresh={Onboardingdata} />
      </Grid>
    </Grid>
  );
}
