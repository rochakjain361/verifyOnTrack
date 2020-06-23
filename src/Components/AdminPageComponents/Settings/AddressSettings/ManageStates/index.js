import React, { Component } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  Button,
  TableContainer,
} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from "@material-ui/icons/Phone";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

let result = [];

const styles = (theme) => ({});

let token1 = "";
let token = "";
let id = "";

//   const { classes } = this.props;
export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      enteredtext: "",
      selectedstate: "",
      stateName: "",
    };
  }
  isloading() {
    return (
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
    );
  }
  async getstates() {
    this.setState({ loading: true });
    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/address/states/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        result = res.data;
        console.log(result);
      });
    this.setState({ loading: false });
  }
  async componentDidMount() {
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");

    this.getstates();
  }
  async addState() {
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("stateName", this.state.stateName);

    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/resManager/address/states/",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
        this.getstates();
      });
  }
  async deleteState(id) {
    // console.log("......",id)
    await axios.delete(
      "http://3.22.17.212:8000/api/v1/resManager/address/states/" + id + "/",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    this.getstates();
  }
  displaytable() {
    return (
      <>
        <Grid container justify="space-between" alignItems="center" spacing={4}>
          <Grid item>
            <Typography variant="h4">States</Typography>
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              options={result}
              getOptionLabel={(option) => option.stateName}
              size="small"
              id="states"
              Username
              value={this.state.selectedstate}
              onChange={(event, value) => {
                this.setState({ selectedstate: value });
                console.log("selectedstate", value);
              }}
              inputValue={this.state.enteredtext}
              onInputChange={(event, newInputValue) => {
                this.setState({ enteredtext: newInputValue });
                // console.log(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="States"
                  margin="normal"
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          container
          justify="flex-start"
          alignItems="center"
          style={{ marginTop: 20 }}
          spacing={2}
        >
          <Grid item xs={3}>
            <TextField
              label="Enter new state"
              variant="outlined"
              size="medium"
              fullWidth
              onChange={(event) => {
                this.setState({ stateName: event.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <Fab
              size="small"
              color="secondary"
              onClick={() => {
                this.addState();
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>

          <TableContainer
            component={Paper}
            style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
            elevation={5}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell align="left">State</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.stateName}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          this.deleteState(row.id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </>
    );
  }
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
        {this.state.loading ? this.isloading() : this.displaytable()}

        {/* </Paper> */}
      </div>
    );
  }
}

export default withStyles(styles)(index);
