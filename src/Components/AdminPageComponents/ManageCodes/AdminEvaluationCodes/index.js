import React, { Component } from "react";
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
  CircularProgress,
  Avatar,
} from "@material-ui/core/";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { get, put } from "../../../../API";
let token = "";
class index extends Component {
  state = {
    generateNewEmployementCodeDialog: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      codes: [],
      pendingcodes: [],
      pendingcode: false,
      selectedtype: "",
      selectedid: "",
      selectedCloseBtn: "",
      selectedcode: "",
      selecteduserid: "",
      viewdetailsdata: "",
      viewdetailsdilog: false,
      historydata: [],
      historydetailsdilog: false,
    };
  }

  async getcodes() {
    await get(
      "http://3.22.17.212:8000/api/v1/codes/evaluation/codes",
      token,
      ""
    ).then((res) => this.setState({ codes: res.data }));
    await get(
      "http://3.22.17.212:8000/api/v1/codes/evaluation/pending-codes",
      token,
      ""
    ).then((res) => this.setState({ pendingcodes: res.data }));
  }
  async componentDidMount() {
    token = localStorage.getItem("Token");
    await this.getcodes();
  }
  async viewdetailsprofile(selecteduserid, selectedcode, type) {
    this.setState({ viewdetailsdilog: true });
    console.log(selecteduserid, selectedcode, type);
    await get(
      "http://3.22.17.212:8000/api/v1/employees/" +
        selecteduserid +
        "/" +
        type +
        "/" +
        selecteduserid +
        "?votcode=" +
        selectedcode,
      token,
      ""
    ).then((res) => {
      this.setState({
        viewdetailsdata: res.data,
      });
      console.log(this.state.viewdetailsdata[0].firstname);
    });
  }
  async viewdetails(selecteduserid, selectedcode, type, objId) {
    this.setState({ viewdetailsdilog: true });
    console.log(selecteduserid, selectedcode, type, objId);
    await get(
      "http://3.22.17.212:8000/api/v1/employees/" +
        selecteduserid +
        "/" +
        type +
        "/" +
        objId +
        "?votcode=" +
        selectedcode,
      token,
      ""
    ).then((res) => {
      this.setState({
        viewdetailsdata: res.data,
      });
    });
  }
  async gethistory(selecteduserid, selectedcode, type, objId) {
    this.setState({ historydetailsdilog: true });
    console.log(selecteduserid, selectedcode, type, objId);
    await get(
      "http://3.22.17.212:8000/api/v1/employees/" +
        selecteduserid +
        "/" +
        type +
        "/" +
        objId +
        "/history?votcode=" +
        selectedcode,
      token,
      ""
    ).then((res) => this.setState({ historydata: res.data }));
  }
  async gethistoryacademics(selecteduserid, selectedcode, type, objId) {
    this.setState({ historydetailsdilog: true });
    console.log(selecteduserid, selectedcode, type, objId);
    await get(
      "http://3.22.17.212:8000/api/v1/employees/" +
        selecteduserid +
        "/" +
        type +
        "?votcode=" +
        selectedcode,
      token,
      ""
    ).then((res) => this.setState({ historydata: res.data }));
  }
  async gethistoryprofile(selecteduserid, selectedcode, type, objId) {
    this.setState({ historydetailsdilog: true });
    console.log(selecteduserid, selectedcode, type, objId);
    await get(
      "http://3.22.17.212:8000/api/v1/employees/" +
        selecteduserid +
        "/" +
        type +
        "/" +
        selecteduserid +
        "/history?votcode=" +
        selectedcode,
      token,
      ""
    ).then((res) => this.setState({ historydata: res.data }));
  }
  async gethistoryidentites(selecteduserid, selectedcode, objId) {
    this.setState({ historydetailsdilog: true });
    console.log(objId);
    await get(
      "http://3.22.17.212:8000/api/v1/employees/" +
        selecteduserid +
        "/" +
        "identities-by/" +
        selecteduserid +
        "/" +
        "idSources/" +
        objId +
        "/history?votcode=" +
        selectedcode,
      token,
      ""
    ).then((res) => this.setState({ historydata: res.data }));
  }
  isloading() {
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
  }
  render() {
    return (
      <div style={{ marginTop: 20, marginRight: 20 }}>
        {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
        <Grid container justify="space-between" alignItems="center" spacing={4}>
          <Grid item xs={8}>
            <Typography variant="h4">Evaluation Codes</Typography>
          </Grid>

          <Grid container direction="row" spacing={2}>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.pendingcode}
                    onChange={() =>
                      this.setState({ pendingcode: !this.state.pendingcode })
                    }
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Show pending codes"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container justify="flex-start" alignItems="center" spacing={2}>
          <TableContainer
            component={Paper}
            style={{
              maxWidth: "94%",
              marginTop: 20,
              marginLeft: 10,
              marginRight: 10,
            }}
            elevation={5}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">CodeString</TableCell>
                  <TableCell align="center">Verification Type</TableCell>
                  <TableCell align="center">Code Status</TableCell>
                  <TableCell align="center">Last Updated</TableCell>
                  <TableCell align="center">Details</TableCell>
                  {/* <TableCell align="center">Actions</TableCell> */}
                  <TableCell align="center">History</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.pendingcode
                  ? this.state.pendingcodes.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.createdOn}</TableCell>
                        <TableCell align="center">{row.codeString}</TableCell>
                        <TableCell align="center">{row.verType}</TableCell>
                        <TableCell align="center">{row.codeStatus}</TableCell>
                        <TableCell align="center">
                          {row.statusChangeDate}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                              this.setState({
                                selectedtype: row.verType,
                                selectedid: row.objId,
                                selectedCloseBtn: row.showMarkCloseBtn,
                                selectedcode: row.codeString,
                                selecteduserid: row.vot_employee,
                              });
                              row.verType === "Profile"
                                ? this.viewdetailsprofile(
                                    row.vot_employee,
                                    row.codeString,
                                    "profiles-by"
                                  )
                                : row.verType === "Address"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "addresses",
                                    row.objId
                                  )
                                : row.verType === "Identity"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "identities",
                                    row.objId
                                  )
                                : row.verType === "Academic"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "academics",
                                    row.objId
                                  )
                                : row.verType === "Phone"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "phones",
                                    row.objId
                                  )
                                : row.verType === "Job"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "jobs",
                                    row.objId
                                  )
                                : this.setState({});
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                              this.setState({
                                selectedtype: row.verType,
                              });
                              row.verType === "Profile"
                                ? this.gethistory(
                                    row.vot_employee,
                                    row.codeString,
                                    "profiles-by",
                                    row.objId
                                  )
                                : row.verType === "Address"
                                ? this.gethistory(
                                    row.vot_employee,
                                    row.codeString,
                                    "addresses",
                                    row.objId
                                  )
                                : row.verType === "Academic"
                                ? this.gethistory(
                                    row.vot_employee,
                                    row.codeString,
                                    "academics",
                                    row.objId
                                  )
                                : row.verType === "Phone"
                                ? this.gethistory(
                                    row.vot_employee,
                                    row.codeString,
                                    "phones",
                                    row.objId
                                  )
                                : row.verType === "Job"
                                ? this.gethistory(
                                    row.vot_employee,
                                    row.codeString,
                                    "jobs",
                                    row.objId
                                  )
                                : this.setState({});
                            }}
                          >
                            History
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : this.state.codes.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.createdOn}</TableCell>
                        <TableCell align="center">{row.codeString}</TableCell>
                        <TableCell align="center">{row.verType}</TableCell>
                        <TableCell align="center">{row.codeStatus}</TableCell>
                        <TableCell align="center">
                          {row.statusChangeDate}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                              this.setState({
                                selectedtype: row.verType,
                                selectedid: row.objId,
                                selectedCloseBtn: row.showMarkCloseBtn,
                                selectedcode: row.codeString,
                                selecteduserid: row.vot_employee,
                              });
                              row.verType === "Profile"
                                ? this.viewdetailsprofile(
                                    row.vot_employee,
                                    row.codeString,
                                    "profiles-by"
                                  )
                                : row.verType === "Address"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "addresses",
                                    row.objId
                                  )
                                : row.verType === "Identity"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "identities",
                                    row.objId
                                  )
                                : row.verType === "Academic"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "academics",
                                    row.objId
                                  )
                                : row.verType === "Phone"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "phones",
                                    row.objId
                                  )
                                : row.verType === "Job"
                                ? this.viewdetails(
                                    row.vot_employee,
                                    row.codeString,
                                    "jobs",
                                    row.objId
                                  )
                                : this.setState({});
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                        {row.verType !== "Identity" ? (
                          <TableCell align="center">
                            <Button
                              size="small"
                              color="primary"
                              variant="outlined"
                              onClick={() => {
                                this.setState({
                                  selectedtype: row.verType,
                                });
                                row.verType === "Profile"
                                  ? this.gethistoryprofile(
                                      row.vot_employee,
                                      row.codeString,
                                      "profiles-by",
                                      row.objId
                                    )
                                  : row.verType === "Address"
                                  ? this.gethistory(
                                      row.vot_employee,
                                      row.codeString,
                                      "addresses",
                                      row.objId
                                    )
                                  : row.verType === "Academic"
                                  ? this.gethistoryacademics(
                                      row.vot_employee,
                                      row.codeString,
                                      "academics",
                                      row.objId
                                    )
                                  : row.verType === "Phone"
                                  ? this.gethistory(
                                      row.vot_employee,
                                      row.codeString,
                                      "phones",
                                      row.objId
                                    )
                                  : row.verType === "Job"
                                  ? this.gethistory(
                                      row.vot_employee,
                                      row.codeString,
                                      "jobs",
                                      row.objId
                                    )
                                  : this.setState({});
                              }}
                            >
                              History
                            </Button>
                          </TableCell>
                        ) : null}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {
          <div>
            <Dialog
              open={this.state.viewdetailsdilog}
              onClose={() => this.setState({ viewdetailsdilog: false })}
            >
              <DialogTitle id="codegenerator" align="center">
                View Details
              </DialogTitle>
              <DialogContent>
                {this.state.selectedtype === "Profile" ? (
                  this.state.viewdetailsdata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12} align="center">
                        <Avatar style={{ height: "8rem", width: "8rem" }}>
                          <img
                            src={this.state.viewdetailsdata[0].picture}
                            width="130"
                            height="130"
                            alt=""
                          />
                        </Avatar>
                      </Grid>

                      <Grid item xs={12}>
                        <Grid
                          container
                          justify="flex-start"
                          direction="column"
                          alignItems="center"
                          spacing={2}
                        >
                          <TextField
                            id="fullName"
                            label="FirstName"
                            defaultValue={
                              this.state.viewdetailsdata[0].firstname
                            }
                            type="text"
                            InputProps={{
                              readOnly: true,
                            }}
                            fullWidth
                            size="small"
                          />
                          <TextField
                            id="fullName"
                            label="MiddleName"
                            defaultValue={
                              this.state.viewdetailsdata[0].middlename
                            }
                            type="text"
                            InputProps={{
                              readOnly: true,
                            }}
                            fullWidth
                            size="small"
                          />
                          <TextField
                            id="fullName"
                            label="LastName"
                            defaultValue={this.state.viewdetailsdata[0].surname}
                            type="text"
                            InputProps={{
                              readOnly: true,
                            }}
                            fullWidth
                            size="small"
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Gender"
                          defaultValue={this.state.viewdetailsdata[0].sex}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Date of birth"
                          defaultValue={this.state.viewdetailsdata[0].dob}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Address" ? (
                  this.state.viewdetailsdata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12} align="center">
                        <h3>Address</h3>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="State Name"
                          defaultValue={
                            this.state.viewdetailsdata.state_name_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Lga Name"
                          defaultValue={
                            this.state.viewdetailsdata.lga_name_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="City Name"
                          defaultValue={
                            this.state.viewdetailsdata.city_name_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Address Hint1"
                          defaultValue={
                            this.state.viewdetailsdata.address_hint1
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Address Hint1"
                          defaultValue={
                            this.state.viewdetailsdata.address_hint1
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <h6>Google Coordinates</h6>
                        <a
                          href={`http://www.google.com/maps/place/${this.state.viewdetailsdata.google_coordinate1},${this.state.viewdetailsdata.google_coordinate2}`}
                          target="_blank"
                        >
                          Location
                        </a>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Adress Type"
                          defaultValue={
                            this.state.viewdetailsdata.address_type_name_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Created On"
                          defaultValue={this.state.viewdetailsdata.created_on}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="House Numer"
                          defaultValue={this.state.viewdetailsdata.house_number}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Street Name"
                          defaultValue={this.state.viewdetailsdata.street_name}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Update Reason"
                          defaultValue={
                            this.state.viewdetailsdata.update_reason
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Identity" ? (
                  this.state.viewdetailsdata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12} align="center">
                        <Grid container justify="space-between">
                          <h3>Identity</h3>
                          <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              this.gethistoryidentites(
                                this.state.selecteduserid,
                                this.state.selectedcode,
                                this.state.viewdetailsdata.idSource
                              )
                            }
                          >
                            History
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Created On"
                          defaultValue={this.state.viewdetailsdata.created_on}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Full Name"
                          defaultValue={this.state.viewdetailsdata.fullname}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Date of Birth"
                          defaultValue={this.state.viewdetailsdata.dob}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="IdNumber"
                          defaultValue={this.state.viewdetailsdata.idNumber}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="IdSource"
                          defaultValue={
                            this.state.viewdetailsdata.idSource_name_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Update Reason"
                          defaultValue={
                            this.state.viewdetailsdata.update_reason
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Gender"
                          defaultValue={this.state.viewdetailsdata.sex}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Academic" ? (
                  this.state.viewdetailsdata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12} align="center">
                        <h3>Academics</h3>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Academic Types"
                          defaultValue={
                            this.state.viewdetailsdata[0]
                              .academicType_name_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Degree"
                          defaultValue={this.state.viewdetailsdata[0].degree}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="School"
                          defaultValue={this.state.viewdetailsdata[0].school}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Start Date"
                          defaultValue={this.state.viewdetailsdata[0].startDate}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="End Date"
                          defaultValue={this.state.viewdetailsdata[0].endDate}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Created On"
                          defaultValue={
                            this.state.viewdetailsdata[0].created_on
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Phone" ? (
                  this.state.viewdetailsdata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12} align="center">
                        <h3>Phone</h3>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Created On"
                          defaultValue={this.state.viewdetailsdata.created_on}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Date Obtained"
                          defaultValue={this.state.viewdetailsdata.dateObtained}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Default Phone"
                          defaultValue={
                            this.state.viewdetailsdata.default_phone
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="ImeI Number"
                          defaultValue={this.state.viewdetailsdata.imeiNumber}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Phone Number"
                          defaultValue={this.state.viewdetailsdata.phoneNumber}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Phone Reason"
                          defaultValue={
                            this.state.viewdetailsdata.phone_reason_name_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Phone Type"
                          defaultValue={
                            this.state.viewdetailsdata.phone_type_name_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Update Reason"
                          defaultValue={
                            this.state.viewdetailsdata.update_reason
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Job" ? (
                  this.state.viewdetailsdata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12} align="center">
                        <h3>Job</h3>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Company Name"
                          defaultValue={
                            this.state.viewdetailsdata.company_name_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Created On"
                          defaultValue={this.state.viewdetailsdata.created_on}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="End Date"
                          defaultValue={this.state.viewdetailsdata.endDate}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Job Description"
                          defaultValue={
                            this.state.viewdetailsdata.jobDescription
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Job Title"
                          defaultValue={this.state.viewdetailsdata.jobTitle}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Job Category"
                          defaultValue={
                            this.state.viewdetailsdata.job_category_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Leaving Reason"
                          defaultValue={
                            this.state.viewdetailsdata.leaving_reason_field
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Start Date"
                          defaultValue={this.state.viewdetailsdata.startDate}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="fullName"
                          label="Update Reason"
                          defaultValue={
                            this.state.viewdetailsdata.update_reason
                          }
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )
                ) : null}
              </DialogContent>
              <DialogActions style={{ padding: 15 }}>
                <Button
                  disabled={this.state.selectedCloseBtn}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    this.setState({
                      viewdetailsdilog: false,
                      selectedIndex: -1,
                    });
                    this.markverifed();
                  }}
                >
                  Mark Verified
                </Button>
                <Button
                  disabled={this.state.selectedCloseBtn}
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    this.setState({
                      viewdetailsdilog: false,
                    });

                    this.markverifiedfailed();
                  }}
                >
                  Mark Verified Failed
                </Button>
                <Button
                  disabled={!this.state.selectedCloseBtn}
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    this.setState({
                      viewdetailsdilog: false,
                      selectedIndex: -1,
                    });
                    this.closecode();
                  }}
                >
                  close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
        {
          <div>
            <Dialog
              fullWidth={"md"}
              maxWidth={"md"}
              open={this.state.historydetailsdilog}
              onClose={() => this.setState({ historydetailsdilog: false })}
            >
              <DialogTitle id="codegenerator" align="center">
                History
              </DialogTitle>
              <DialogContent>
                {this.state.selectedtype === "Profile" ? (
                  this.state.historydata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <DialogTitle id="form-dialog-title" align="center">
                        Profile History
                      </DialogTitle>
                      <TableContainer p={3}>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow style={{ backgroundColor: "black" }}>
                              {[
                                "Picture",
                                "Fullname",
                                "Middlename",
                                "Surname",
                                "Date of birth",
                                "Sex",
                                "Records updated date",
                                "Updated reason",
                              ].map((text, index) => (
                                <TableCell
                                  style={{ fontWeight: "bolder" }}
                                  align="left"
                                >
                                  {text}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.historydata.map((row, index) => (
                              <TableRow key={row.id}>
                                <TableCell align="left">
                                  <Avatar src={row.picture}>Picture</Avatar>
                                </TableCell>
                                <TableCell align="left">
                                  {row.firstname}
                                </TableCell>
                                <TableCell align="left">
                                  {row.middlename}
                                </TableCell>
                                <TableCell align="left">
                                  {row.surname}
                                </TableCell>
                                <TableCell align="left">
                                  {new Date(row.dob).toDateString()}
                                </TableCell>
                                {/* <TableCell align="center">{row.source_name_field}</TableCell> */}
                                <TableCell align="left">{row.sex}</TableCell>{" "}
                                <TableCell component="th" align="left">
                                  {new Date(row.created_on).toDateString()}
                                </TableCell>
                                <TableCell align="left">
                                  {row.update_reason}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Address" ? (
                  this.state.historydata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <TableContainer p={3}>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow style={{ backgroundColor: "black" }}>
                              {[
                                "State/Lga/City",
                                "House Number,Street Name,Address Hint 1",
                                "Google Link",
                                "Address Reason",
                                "Address Type",
                                "Records Updated Date",
                                "Update Reason",
                              ].map((text, index) => (
                                <TableCell
                                  align="center"
                                  style={{ fontWeight: "bolder" }}
                                >
                                  {text}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.historydata.map((row, index) => (
                              <TableRow key={row.id}>
                                <TableCell align="center">
                                  {row.state_name_field},{row.lga_name_field},
                                  {row.city_name_field}
                                </TableCell>
                                <TableCell align="center">
                                  {row.house_number},{row.street_name},
                                  {row.address_hint1}
                                </TableCell>
                                {/* <TableCell align="center">
                        <Avatar src={row.address_hint1}>Picture</Avatar>
                      </TableCell> */}
                                <TableCell align="center">
                                  <a
                                    href={`http://www.google.com/maps/place/${row.google_coordinate1}+,+${row.google_coordinate2}`}
                                    target="_blank"
                                  >
                                    Location
                                  </a>
                                </TableCell>
                                <TableCell align="center">
                                  {row.address_reason_name_field}
                                </TableCell>{" "}
                                <TableCell align="center">
                                  {row.address_type_name_field}
                                </TableCell>{" "}
                                <TableCell component="th" align="center">
                                  {new Date(row.created_on).toDateString()}
                                </TableCell>
                                <TableCell align="center">
                                  {row.update_reason}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Identity" ? (
                  this.state.historydata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <TableContainer p={3}>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow style={{ backgroundColor: "black" }}>
                              {[
                                "Full Name",
                                "Date of birth",
                                "Sex",
                                "Id Source",
                                "Id Number",
                                "Records Updated Date",
                                "Update Reason",
                              ].map((text, index) => (
                                <TableCell
                                  style={{ fontWeight: "bolder" }}
                                  align="center"
                                >
                                  {text}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.historydata.map((row, index) => (
                              <TableRow key={row.id}>
                                <TableCell align="center">
                                  {row.fullname}
                                </TableCell>
                                <TableCell align="center">{row.dob}</TableCell>
                                <TableCell align="center">{row.sex}</TableCell>
                                <TableCell align="center">
                                  {row.idSource_name_field}
                                </TableCell>
                                <TableCell align="center">
                                  {row.idNumber}
                                </TableCell>{" "}
                                <TableCell component="th" align="center">
                                  {new Date(row.created_on).toDateString()}
                                </TableCell>
                                <TableCell align="center">
                                  {row.update_reason}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Academic" ? (
                  this.state.historydata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <TableContainer p={3}>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow style={{ backgroundColor: "black" }}>
                              {[
                                "Start Date",
                                "End Date",
                                "School",
                                "Degree",
                                "Update Reason",
                                "Created On",
                              ].map((text, index) => (
                                <TableCell
                                  style={{ fontWeight: "bolder" }}
                                  align="center"
                                >
                                  {text}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.historydata.map((row, index) => (
                              <TableRow key={row.id}>
                                <TableCell align="center">
                                  {row.startDate}
                                </TableCell>
                                <TableCell align="center">
                                  {row.endDate}
                                </TableCell>
                                <TableCell align="center">
                                  {row.school}
                                </TableCell>
                                <TableCell align="center">
                                  {row.degree}
                                </TableCell>
                                <TableCell align="center">
                                  {row.update_reason}
                                </TableCell>
                                <TableCell component="th" align="center">
                                  {new Date(row.created_on).toDateString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Phone" ? (
                  this.state.historydata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <TableContainer p={3}>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow style={{ backgroundColor: "black" }}>
                              <TableCell
                                style={{ fontWeight: "bolder" }}
                                align="center"
                              >
                                phonenumber
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bolder" }}
                                align="center"
                              >
                                phoneReason
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bolder" }}
                                align="center"
                              >
                                phoneType
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bolder" }}
                                align="center"
                              >
                                DefaultPhone
                              </TableCell>

                              <TableCell
                                style={{ fontWeight: "bolder" }}
                                align="center"
                              >
                                imeinumber
                              </TableCell>

                              <TableCell
                                style={{ fontWeight: "bolder" }}
                                align="center"
                              >
                                records updated date
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bolder" }}
                                align="center"
                              >
                                Update reason
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {this.state.historydata.map((row, index) => (
                              <TableRow key={row.id}>
                                <TableCell align="center">
                                  {row.phoneNumber}
                                </TableCell>
                                <TableCell align="center">
                                  {row.phone_reason_name_field}
                                </TableCell>
                                <TableCell align="center">
                                  {row.phone_type_name_field}
                                </TableCell>
                                <TableCell align="center">
                                  {row.default_phone}
                                </TableCell>
                                <TableCell align="center">
                                  {row.imeiNumber}
                                </TableCell>
                                <TableCell component="th" align="center">
                                  {row.created_on}
                                </TableCell>
                                <TableCell align="center">
                                  {row.update_reason}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )
                ) : this.state.selectedtype === "Job" ? (
                  this.state.historydata.length === 0 ? (
                    this.isloading()
                  ) : (
                    <Grid
                      container
                      justify="flex-start"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Created on</TableCell>
                            <TableCell align="left">Update Reason</TableCell>
                            <TableCell align="left">Job Description</TableCell>
                            <TableCell align="left">Job Category</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {this.state.historydata.map((row, index) => (
                            <TableRow key={row.id}>
                              <TableCell align="left">
                                {new Date(row.created_on).toDateString()}
                              </TableCell>
                              <TableCell align="left">
                                {row.update_reason}
                              </TableCell>
                              <TableCell align="left">
                                {row.jobDescription}
                              </TableCell>
                              <TableCell align="left">
                                {row.job_category_field}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  )
                ) : null}
              </DialogContent>
              <DialogActions style={{ padding: 15 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    this.setState({
                      historydetailsdilog: false,
                    });
                  }}
                >
                  close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
      </div>
    );
  }
  async markverifed() {
    await put(
      "http://3.22.17.212:8000/api/v1/codes/evaluation/codes/" +
        this.state.selectedid +
        "/verify?pass=true",
      token,
      ""
    );
  }
  async markverifiedfailed() {
    await put(
      "http://3.22.17.212:8000/api/v1/codes/evaluation/codes/" +
        this.state.selectedid +
        "/verify?pass=false",
      token,
      ""
    );
  }
  async closecode() {
    await put(
      "http://3.22.17.212:8000/api/v1/codes/evaluation/codes/" +
        this.state.selectedid +
        "/close",
      token,
      ""
    );
  }
}

export default index;
