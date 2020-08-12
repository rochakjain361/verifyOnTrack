import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Typography,
  Button,
  Paper,
  Avatar,
  Grid,
  TextField,
  Card,
  Box,
  
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TablePagination from "@material-ui/core/TablePagination";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import PinDropIcon from "@material-ui/icons/PinDrop";
let token = "";

export default class employerlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employerlist: [],
      page: 0,
      rowsPerPage: 10,
      count: 0,
      nextpagelink: "",
      previouspagelink: "",
      kpidata: "",
      updateDialogOpen:false,
      result:[]
    };
  }
  async getemployerlist() {
    await axios
      .get("http://3.22.17.212:9000/getEmployerList?page=1&filter=all", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({
          employerlist: res.data.results,
          count: res.data.count,
          nextpagelink: res.data.next,
          previouspagelink: res.data.previous,
        });
      });
  }
  async fetchkpidata(companyName) {
    await axios
      .get("http://3.22.17.212:9000/getEmployerKpi?company="+companyName, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({
         kpidata:res.data
        });
      });
  }
  async nextpage() {
    await axios
      .get(this.state.nextpagelink, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({
          employerlist: res.data.results,
          count: res.data.count,
          nextpagelink: res.data.next,
          previouspagelink: res.data.previous,
        });
      });
  }
  async previouspage() {
    await axios
      .get(this.state.previouspagelink, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({
          employerlist: res.data.results,
          count: res.data.count,
          nextpagelink: res.data.next,
          previouspagelink: res.data.previous,
        });
       
      });
  }
  async searchcompany() {
    await axios
      .get("http://3.22.17.212:9000/getEmployerList?filter=", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({
          result: res.data.results,
        });
      });
  }
  async componentDidMount() {
    token = localStorage.getItem("Token");
    this.getemployerlist();
    this.searchcompany();
  }
  nextpageclick = (event, newPage) => {
      console.log("typeof",typeof(newPage))
    if (newPage > this.state.page) {
        console.log("nextpage")
          this.nextpage();
    } else {
        console.log("prevpage")
      this.previouspage();
    }
    this.setState({
      page: newPage,
    });
  };
  render() {
    return (
      <div>
        <>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <Typography variant="h4">Employer list</Typography>
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={this.state.result}
                getOptionLabel={(option) => option.companyName}
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
                    label="Enter companyname"
                    margin="normal"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper} elevation={16} p={3}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  {[
                    "CompanyName",
                    "Logo",
                    "Phone",
                    "Email",
                    "RegNum",
                    "Category",
                    "Actions",
                  ].map((text, index) => (
                    <TableCell style={{ fontWeight: "bolder" }} align="center">
                      {text}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.employerlist.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.companyName}</TableCell>
                    <TableCell align="center">
                      <Avatar src={row.logo}></Avatar>
                    </TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.regNum}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          this.fetchkpidata(
                            this.state.employerlist[index].companyName
                          );
                          this.setState({ updateDialogOpen: true });
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={this.state.count}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.nextpageclick}
          />
          {
            <Dialog
              open={this.state.updateDialogOpen}
              fullWidth={"sm"}
              maxWidth={"sm"}
              onClose={() =>
                this.setState({
                  updateDialogOpen: false,
                })
              }
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" align="center">
                Company data
              </DialogTitle>
              <DialogContent>
                <DialogContentText align="center">
                  {/* Enter the details of your profile to be updated */}
                </DialogContentText>
              </DialogContent>
              <Box p={1}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  spacing={3}
                >
                  <Grid item xs={6}>
                    <Card
                      elevation={6}
                      style={{
                        minHeight: 175,
                        padding: 10,
                        background: "#651fff",
                      }}
                    >
                      <Grid
                        item
                        xs
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs>
                          <Typography
                            variant="h5"
                            component="h5"
                            style={{ color: "white" }}
                          >
                            Locations
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <PinDropIcon style={{ color: "white" }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h2"
                            component="h2"
                            style={{ fontWeight: "bold", color: "white" }}
                          >
                            {this.state.kpidata.locationCnt}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card
                      elevation={6}
                      style={{
                        minHeight: 175,
                        padding: 10,
                        background: "#00b0ff",
                      }}
                    >
                      <Grid
                        item
                        xs
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs>
                          <Typography
                            variant="h5"
                            component="h5"
                            style={{ color: "white" }}
                          >
                            Employees
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <SupervisorAccountIcon style={{ color: "white" }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h2"
                            component="h2"
                            style={{ fontWeight: "bold", color: "white" }}
                          >
                            {this.state.kpidata.employeeCnt}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
              <Box p={1}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  spacing={3}
                >
                  <Grid item xs={6}>
                    <Card
                      elevation={6}
                      style={{
                        minHeight: 175,
                        padding: 10,
                        background: "#1de9b6",
                      }}
                    >
                      <Grid
                        item
                        xs
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                        style={{ marginBottom: 10 }}
                      >
                        <Grid item xs>
                          <Typography
                            variant="h5"
                            component="h5"
                            style={{ color: "white" }}
                          >
                            Access
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <VpnKeyIcon style={{ color: "white" }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h2"
                            component="h2"
                            style={{ fontWeight: "bold", color: "white" }}
                          >
                            {this.state.kpidata.pendingAccessCodeCnt}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card
                      elevation={6}
                      style={{
                        minHeight: 175,
                        padding: 10,
                        background: "#ff9800",
                      }}
                    >
                      <Grid
                        item
                        xs
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs>
                          <Typography
                            variant="h6"
                            component="h6"
                            style={{ color: "white" }}
                          >
                            Employement
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <WorkOutlineIcon style={{ color: "white" }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h2"
                            component="h2"
                            style={{ fontWeight: "bold", color: "white" }}
                          >
                            {this.state.kpidata.pendingemploymentCodeCnt}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Dialog>
          }
        </>
      </div>
    );
    }
}
