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
import { CircularProgress } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
const rows = [
    {
        "state": "testState1",
        "LGA": "testLGA1"
    },
    {
        "state": "testState2",
        "LGA": "testLGA2"
    },
    {
        "state": "testState3",
        "LGA": "testLGA3"
    },
    {
        "state": "testState4",
        "LGA": "testLGA4"
    }
];

const styles = theme => ({

})
const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
let result=[];
class index extends Component {
  state = {
    states: "",
    deleteDialogBox: false,
    loading: true,
  };

  async componentDidMount() {
    await axios
      .get("http://3.22.17.212:8000/api/v1/resManager/address/lgas/", {
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
  displayTable() {
    return (
      <>
        <Grid container justify="space-between" alignItems="center" spacing={4}>
          <Grid item>
            <Typography variant="h4">LGAs</Typography>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="states">State</InputLabel>
              <Select
                labelId="states"
                id="states"
                value={this.state.states}
                onChange={(event) =>
                  this.setState({ states: event.target.value })
                }
                label="states"
                fullWidth
              >
                <MenuItem value="Employer">State1</MenuItem>
                <MenuItem value="Employee">State2</MenuItem>
              </Select>
            </FormControl>
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
              label="Add LGA"
              variant="outlined"
              size="medium"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Fab size="small" color="secondary">
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
                  <TableCell align="left">LGA</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((row, index) => (
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
      </>
    );
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
        {this.state.loading ? this.isloading : this.displayTable()}
      </div>
    );
  }
}

export default withStyles(styles)(index);

