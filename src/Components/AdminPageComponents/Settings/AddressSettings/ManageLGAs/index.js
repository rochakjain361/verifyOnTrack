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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from "@material-ui/icons/Phone";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
let states = [];
let Lga = [];

let token1 = "";
let token = "";
let id = "";
let result = [];
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class index extends Component {
  state = {
    states: "",
    deleteDialogBox: false,
    loading: true,
    newLga: "",
    selectedstate: "",
    selectedLga: [],
    sloading: false,
    disabled: true,
    buttondiabled:true,
    deleteid: "",
    snackbar:"",
    snackbarresponse:"",
  };
  async getLga() {

    await axios
      .get("http://3.22.17.212:9000/api/v1/resManager/address/states/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        states = res.data;
        console.log("states", states);
      });
    await axios
      .get("http://3.22.17.212:9000/api/v1/resManager/address/lgas/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        Lga = res.data;
        this.setState({ selectedLga: Lga });
        console.log("lga", Lga);
      });

  }
  async componentDidMount() {
    this.setState({ loading: true });
  
    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");
    await this.getLga();
    this.setState({ loading: false });
  }
  async filterStates(state) {
    this.setState({ selectedstate: state });

    if (state !== "none") {
      await axios
        .get(
          "http://3.22.17.212:9000/api/v1/resManager/address/lgas/?stateId=" +
          state,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          this.setState({ selectedLga: res.data });
          console.log("lga", res.data);
          this.setState({ disabled: false });
        });
    }
    else {
      this.setState({ selectedLga: Lga });
      this.setState({ disabled: true })

    }

  }
  async deleteLga(id) {
    this.setState({ deleteDialogBox: false, selectedIndex: -1 });
    axios.delete(
      "http://3.22.17.212:9000/api/v1/resManager/address/lgas/" + id + "/",
      {
        headers: {
          Authorization: token,
        },
      }
    ).then((response)=>{
      this.setState({ selectedstate:  "none",snackbar:true,snackbarresponse:response });
    }).catch((error)=>{
      if (error.response) {
        this.setState({snackbar:true,snackbarresponse:error.response})
      }

    })
    this.getLga();
  }
  displayTable() {
    return (
      <>
        <Grid container justify="space-between" justify="center" align="center" spacing={4}>
          <Grid item>
            <Typography variant="h4" >Local Government Areas(LGA)</Typography>
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
            <FormControl fullWidth variant="outlined" size="medium">
              <InputLabel id="states">State</InputLabel>
              <Select
                labelId="states"
                id="states"
                value={this.state.selectedstate}
                onChange={(event) => {
                  this.filterStates(event.target.value);
                }}
                label="states"
                fullWidth
              >
                <MenuItem selected value="none">
                  None
                </MenuItem>
                {states.map((state) => (
                  <MenuItem value={state.id}>{state.stateName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Add LGA"
              disabled={this.state.disabled}
              variant="outlined"
              size="medium"
              fullWidth
              // helperText="Select state first"
              value={this.state.newLga}
              onChange={(event) => {
               
                this.setState({ newLga: event.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <Fab
              size="small"
              disabled={this.state.newLga.length<1}
              color="secondary"
              onClick={() => {
                this.addLga();
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
        
        <Grid>

          <Snackbar open={this.state.snackbar} autoHideDuration={6000} onClick={() => { this.setState({ snackbar: !this.state.snackbar }) }}>
          {this.state.snackbarresponse.status === 201 ?  <Alert onClose={() => { this.setState({ snackbar: !this.state.asnackbar }) }} severity="success">
              Lga added sucessfully
      </Alert>:this.state.snackbarresponse.status===204? <Alert onClose={() => { this.setState({ snackbar: !this.state.asnackbar }) }} severity="success">
              Lga deleted sucessfully
      </Alert>:<Alert onClose={() => { this.setState({ snackbar: !this.state.snackbar }) }} severity="error">
            Something went wrong please try again
      </Alert>}
          </Snackbar>
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
                  <TableCell align="left">LGA</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.selectedLga.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.state}</TableCell>
                    <TableCell align="left">{row.lgaName}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                          this.setState({
                            deleteDialogBox: true,
                            selectedIndex: index,
                            deleteid: row.id,
                          })
                        }
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
        {/* </Paper> */}

        {
          <Dialog
            open={this.state.deleteDialogBox}
            onClose={() => this.setState({ deleteDialogBox: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                All associated cities will also be deleted, do you want to
                continue?
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: 15 }}>
              <Button
                style={{ width: 85 }}
                color="primary"
                variant="contained"
                onClick={() => {
                  this.deleteLga(this.state.deleteid);
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
        }
      </>
    );
  }
  async addLga() {
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("state", this.state.selectedstate);
    bodyFormData.append("lgaName", this.state.newLga);

    await axios
      .post(
        "http://3.22.17.212:9000/api/v1/resManager/address/lgas/",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);

        this.setState({ selectedstate:  "none",snackbar:true,snackbarresponse:response });
        this.setState({ disabled: true,newLga:"" })
        this.getLga();
      })
      .catch((error) => {
        if (error.response) {
          this.setState({snackbar:true,snackbarresponse:error.response})
        }})
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
  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginTop: 20 }}>
        {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
        {this.state.loading ? this.isloading() : this.displayTable()}
      </div>
    );
  }
}

export default index;
