import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer } from '@material-ui/core/';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress } from "@material-ui/core";

const rows = [
    {
        "city": "testCity1",
    },
    {
        "city": "testCity2",
    },
    {
        "city": "testCity3",
    },
    {
        "city": "testCity4",
    }
];

const styles = theme => ({

})
let states=[];
let Lga=[];
let Cities=[];
// let addlga=[];
const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
class index extends Component {
  state = {
    states: "",
    deleteDialogBox: false,
    selectedstate: "",
    loading: false,
    addlga: [],
    selectedLga:"",
    filterstate:"",
    filterlga:[],
    filterlgavalue:"",
    filtercity:[],
  };
  async filterforlga(state){
      this.setState({filterstate:state});
       await axios
         .get(
           "http://3.22.17.212:8000/api/v1/resManager/address/lgas/?stateId=" +
             state,
           {
             headers: {
               Authorization: token,
             },
           }
         )
         .then((res) => {
           //  addlga = res.data;
           this.setState({ filterlga: res.data });
           console.log("addlga", this.state.addlga);
         });
      
  }
  async filtercity(lga){
 
      this.setState({ filterlgavalue: lga })
        await axios.get(
          "http://3.22.17.212:8000/api/v1/resManager/address/cities/?lgaId=" +
            lga,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          //  addlga = res.data;
          this.setState({ filtercity: res.data });
          console.log("addlga", this.state.filtercity);
        });
     
        

  }
  async getLga() {
    this.setState({ loading: true });
    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/address/states/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        states = res.data;
        console.log("states", states);
      });
    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/address/lgas/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        Lga = res.data;

        this.setState({ selectedLga: Lga,});
        console.log("lga", Lga);
      });
    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/address/cities/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        Cities = res.data;
 this.setState({ filtercity: Cities });
        console.log("cities", Cities);
      });

    this.setState({ loading: false });
  }
  async componentDidMount() {
    this.getLga();
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
  async filterLga(state) {
    this.setState({ selectedstate: state });
    console.log("state", state);
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/resManager/address/lgas/?stateId=" +
          state,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        //  addlga = res.data;
        this.setState({ addlga: res.data });
        console.log("addlga", this.state.addlga);
      });
  }
  async addcity(){
      console.log("/////////////",this.state.selectedLga);
      console.log(this.state.addcity);
       let headers = {
         headers: {
           Authorization: token,
           "Content-Type": "multipart/form-data",
         },
       };
       let bodyFormData = new FormData();
       bodyFormData.append("lga", this.state.selectedLga);
       bodyFormData.append("cityName", this.state.addcity);

       await axios
         .post(
           "http://3.22.17.212:8000/api/v1/resManager/address/cities/",
           bodyFormData,
           headers
         )
         .then((response) => {
           console.log(response);
           this.getLga();
         });
  }
  render() {
   
    

    return (
      <div style={{ marginTop: 20 }}>
        {this.state.loading ? (
          this.isloading()
        ) : (
          <>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Typography variant="h4">Cities</Typography>
              </Grid>
            </Grid>

            <Grid
              container
              justify="flex-start"
              direction="row"
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
                      this.filterLga(event.target.value);
                    }}
                    label="states"
                    fullWidth
                  >
                    {states.map((state) => (
                      <MenuItem value={state.id}>{state.stateName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth variant="outlined" size="medium">
                  <InputLabel id="states">Lga</InputLabel>
                  <Select
                    labelId="Lga"
                    id="Lga"
                    value={this.state.selectedLga}
                    onChange={(event) => {
                      this.setState({ selectedLga: event.target.value });
                    }}
                    label="Lga"
                    fullWidth
                  >
                    {this.state.addlga.map((lga) => (
                      <MenuItem value={lga.id}>{lga.lgaName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  size="small"
                  label="Add City"
                  variant="outlined"
                  fullWidth
                  onChange={(event) => {
                    this.setState({ addcity: event.target.value });
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Fab
                  size="small"
                  color="secondary"
                  onClick={() => {
                    this.addcity();
                  }}
                >
                  <AddIcon />
                </Fab>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined" size="medium">
                  <InputLabel id="states">State</InputLabel>
                  <Select
                    labelId="states"
                    id="states"
                    value={this.state.filterstate}
                    onChange={(event) => {
                      this.filterforlga(event.target.value);
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
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined" size="medium">
                  <InputLabel id="states">Lga</InputLabel>
                  <Select
                    labelId="Lga"
                    id="Lga"
                    value={this.state.filterlgavalue}
                    onChange={(event) => {
                      this.filtercity(event.target.value);
                    }}
                    label="Lga"
                    fullWidth
                  >
                    <MenuItem selected value="none">
                      None
                    </MenuItem>
                    {this.state.filterlga.map((lga) => (
                      <MenuItem value={lga.id}>{lga.lgaName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <TableContainer
                component={Paper}
                style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
                elevation={5}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "black" }}>
                      <TableCell align="center">City</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.filtercity.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.cityName}</TableCell>
                        <TableCell align="center">
                          <IconButton color="default" aria-label="delete">
                            <DeleteIcon fontSize="medium" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* </Paper> */}
          </>
        )}
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
              <Button style={{ width: 85 }} color="primary" variant="contained">
                Agree
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() =>
                  this.setState({ deleteDialogBox: false, selectedIndex: -1 })
                }
              >
                Disagree
              </Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    );
  }
}


export default withStyles(styles)(index);

