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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get } from "../../../../API";
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
    ).then((res) => {});
  }
  async viewdetails(selecteduserid, selectedcode, type, objId) {
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
    ).then((res) => {});
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
                        <TableCell align="center">
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                          >
                            History
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* </Paper> */}

        {/* GENERATE NEW CODE DIALOG DATA */}
        {
          <div>
            <Dialog
              open={this.state.generateNewEmployementCodeDialog}
              onClose={() =>
                this.setState({ generateNewEmployementCodeDialog: false })
              }
            >
              <DialogTitle id="codegenerator">{"Code Generator"}</DialogTitle>
              <DialogContent>
                <Grid
                  container
                  justify="flex-start"
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Search employee by:
                      </FormLabel>
                      <RadioGroup
                        name="searchCategory"
                        // value={value}
                        // onChange={handleChange}
                      >
                        <Grid
                          container
                          direction="row"
                          style={{ marginTop: 10 }}
                        >
                          <FormControlLabel
                            value="searchByEmail"
                            control={<Radio />}
                            label="Email"
                          />
                          <FormControlLabel
                            value="searchByUsername"
                            control={<Radio />}
                            label="Username"
                          />
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {/* Display these conditionally */}

                  <Grid item xs={12}>
                    <Autocomplete
                      size="small"
                      id="usernam"
                      Email
                      renderInput={(params) => (
                        <TextField {...params} label="Email" margin="normal" />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      size="small"
                      id="username"
                      Username
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Username"
                          margin="normal"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      size="small"
                      id="comapny"
                      Company
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Company"
                          margin="normal"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Provide access to:
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={employeeProfile}
                              // onChange={handleChange}
                              name="ratings"
                            />
                          }
                          label="Ratings"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={jobProfile}
                              // onChange={handleChange}
                              name="address"
                            />
                          }
                          label="Address"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={jobProfile}
                              // onChange={handleChange}
                              name="profile"
                            />
                          }
                          label="Profile"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={jobProfile}
                              // onChange={handleChange}
                              name="identites"
                            />
                          }
                          label="Identities"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={jobProfile}
                              // onChange={handleChange}
                              name="phones"
                            />
                          }
                          label="Phones"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={jobProfile}
                              // onChange={handleChange}
                              name="jobHistory"
                            />
                          }
                          label="Job History"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions style={{ padding: 15 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    this.setState({
                      generateNewEmployementCodeDialog: false,
                      selectedIndex: -1,
                    })
                  }
                >
                  Generate One-time Code
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
      </div>
    );
  }
}

export default index;
