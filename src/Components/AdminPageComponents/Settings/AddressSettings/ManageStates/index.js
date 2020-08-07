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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//   const { classes } = this.props;
export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      enteredtext: "",
      selectedstate: "",
      stateName: "",
      deleteDialogBox: "",
      deleteid: "",
      result: [],
      addsnackbar: false,
      deletesnackbar: false,
      addresponse: "",
      deleteresponse: "",
      newstatedisabled:"disabled"

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

    await axios
      .get("http://3.22.17.212:9000/api/v1/resManager/address/states/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        result = res.data;

        this.setState({ result: result })
        console.log(result);
      });

  }
  async componentDidMount() {
    this.setState({ loading: true });
  
    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");

    await this.getstates();
    this.setState({ loading: false });
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
        "http://3.22.17.212:9000/api/v1/resManager/address/states/",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log("response", response);
        this.setState({ addresponse: response.status })

        this.setState({ addsnackbar: true })
        this.getstates();

        this.setState({ stateName: "" })
      })
      .catch((error) => {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          // console.log(error.response.data);
          this.setState({ addsnackbar: true })
          console.log(error.response.status);
          this.setState({ addresponse: error.response.status })
          // console.log(error.response.headers);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message);
        }
      })
  }




  addsnackbar() {


    return (
      this.state.addresponse === 201 ?
        (<div>

          <Snackbar open={this.state.addsnackbar} autoHideDuration={300} onClick={() =>  this.setState({ addsnackbar: false }) }>
            <Alert onClose={() => { this.setState({ addsnackbar: !this.state.addasnackbar }) }} severity="success">
              State added sucessfully
      </Alert>
          </Snackbar>
        </div>) : (<Snackbar open={this.state.addsnackbar} autoHideDuration={300} onClick={() => { this.setState({ addsnackbar: !this.state.addsnackbar }) }}>
          <Alert onClose={() => { this.setState({ addsnackbar: !this.state.addsnackbar }) }} severity="error">
            Something went wrong please try again
      </Alert>
        </Snackbar>))

  }
  deletesnackbar() {


    return (
      this.state.deleteresponse === 204 ?
        (<div>

          <Snackbar open={this.state.deletesnackbar} autoHideDuration={300} onClick={() =>  this.setState({ deletesnackbar: !this.state.deletesnackbar }) }>
            <Alert onClose={() => { this.setState({ deletesnackbar: !this.state.deletesnackbar }) }} severity="success">
              State deleted sucessfully
      </Alert>
          </Snackbar>
        </div>) : (<Snackbar open={this.state.deletesnackbar} autoHideDuration={300} onClick={() => { this.setState({ deletesnackbar: !this.state.deletesnackbar }) }}>
          <Alert onClose={() => { this.setState({ deletesnackbar: !this.state.deletesnackbar }) }} severity="error">
            Something went wrong please try again
      </Alert>
        </Snackbar>))

  }
  async deleteState(id) {

    // console.log("......",id)
     axios.delete(
      "http://3.22.17.212:9000/api/v1/resManager/address/states/" + id + "/",
      {
        headers: {
          Authorization: token,
        },
      }
    ) .then((response) => {
      console.log("response", response);
      this.setState({ deleteresponse: response.status })

      this.setState({ deletesnackbar: true })
      this.getstates();

      this.setState({ stateName: "" })
    })
    .catch((error) => {
      if (error.response) {

        this.setState({ deletesnackbar: true })
          console.log(error.response.status);
          this.setState({ deleteresponse: error.response.status })
      }
      })
    this.setState({ deleteDialogBox: false })
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
             
               value={this.state.stateName}
              onChange={(event) => {
                this.setState({ stateName: event.target.value,newstatedisabled:"" },console.log(this.state.stateName.length))
              }}
            />
          </Grid>
          <Grid item>
            <Fab
              size="small"
              color="secondary"
              disabled={this.state.stateName.length<1}
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
                  <TableCell align="left">State Id</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.result.map((row, index) => (
                  <TableRow key={row.id}>

                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="center">{row.stateName}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          this.setState({ deleteDialogBox: true, deleteid: row.id })

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
          <Dialog
            open={this.state.deleteDialogBox}
            onClose={() => this.setState({ deleteDialogBox: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this state
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: 15 }}>
              <Button
                style={{ width: 85 }}
                color="primary"
                variant="contained"
                onClick={() => {
                  this.deleteState(this.state.deleteid);
                }}
              >
                Delete
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.setState({ deleteDialogBox: false, selectedIndex: -1 })
                }
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {this.addsnackbar()}
        {this.deletesnackbar()}
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
