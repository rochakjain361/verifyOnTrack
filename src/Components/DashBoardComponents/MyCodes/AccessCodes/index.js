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
import axios from "axios";
let token1 = "";
let token = "";
let id = "";
// let result = [];
let codes = [];
let pendingcodes = [];

let usernames = [];
let emails = [];
let companys = [];

const styles = (theme) => ({});

class index extends Component {
  state = {
    opencodes: false,
    generateNewEmployementCodeDialog: false,
    loading: true,
    choiceemail: false,
    choiceusername: false,
    choicecompany: false,
    employerby: "",
    employersearch: false,
    isadmin: true,
    employerid: "",
    companyvalue: "",
    dummyvalue: "",
    dummyvalue1: "",
    usernamevalue: "",
    emailsvalue: "",
    rating: false,
    address: false,
    profile: false,
    identites: false,
    phone: false,
    jobHistory: false,
    viewDialog: false,
    codedetails:"",
    codes:[],
    pendingcodes:[],
  };

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
  searchemail(emailvalue) {
    emails.filter(function (e) {
      if (emailvalue === e.email) {
        console.log("123456789", e.id);
      }
    });
  }
  async searchusername(username) {
    await axios
      .get(
        `http://3.22.17.212:80008000/api/v1/accounts/employer?username=` +
          username,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        usernames = res.data;
        console.log("usernames", usernames);
      });
  }
  async searchcompany(companyName) {
    await axios
      .get(
        `http://3.22.17.212:8000/api/v1/employers/?company=` + companyName,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        companys = res.data;
        console.log("companys", companys);
      });
  }

  employersearchchoice() {
    return (
      <>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Search employer by:</FormLabel>
            <RadioGroup
              name="searchCategory"
              // value={value}
              onChange={(event) => {
                this.setState({ employerby: event.target.value });
              }}
            >
              <Grid container direction="row" style={{ marginTop: 10 }}>
                <FormControlLabel
                  value="searchByEmail"
                  control={<Radio />}
                  label="Email"
                  //   onChange={this.setState({
                  //     choicecompany: false,
                  //     choiceusername: false,
                  //     choiceemail: true,
                  //   })}
                />
                <FormControlLabel
                  value="searchByUsername"
                  control={<Radio />}
                  label="Username"
                  //   onChange={this.setState({
                  //     choicecompany: false,
                  //     choiceusername: true,
                  //     choiceemail: false,
                  //   })}
                />
                <FormControlLabel
                  value="searchByCompany"
                  control={<Radio />}
                  label="Company"
                  //   onChange={this.setState({
                  //     choicecompany: true,
                  //     choiceusername: false,
                  //     choiceemail: false,
                  //   })}
                />
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Button onClick={() => this.searchemail(this.state.dummyvalue)}>
          check
        </Button>

        {this.state.employerby === "searchByEmail" ? (
          <Grid item xs={12}>
            <Autocomplete
              options={emails}
              getOptionLabel={(option) => option.email}
              size="small"
              id="email"
              value={this.state.emailsvalue}
              onChange={(event, value) => {
                this.setState({ emailsvalue: value });
                console.log("emailsvalue", value);
                // this.setState({ employerid: value.id });
              }}
              inputValue={this.state.dummyvalue}
              onInputChange={(event, newInputValue) => {
                this.setState({ dummyvalue: newInputValue });
                // console.log(newInputValue);
              }}
              Email
              renderInput={(params) => (
                <TextField {...params} label="Email" margin="normal" />
              )}
            />
          </Grid>
        ) : this.state.employerby === "searchByUsername" ? (
          <Grid item xs={12}>
            <Autocomplete
              size="small"
              options={usernames}
              getOptionLabel={(option) => option.username}
              id="username"
              Username
              value={this.state.usernamevalue}
              onChange={(event, value) => {
                this.setState({ usernamevalue: value });
                console.log("usernamevalue", value);
                // this.setState({ employerid: value.id });
              }}
              inputValue={this.state.dummyvalue}
              onInputChange={(event, newInputValue) => {
                this.setState({ dummyvalue: newInputValue });
                // console.log(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Username" margin="normal" />
              )}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Autocomplete
              options={companys}
              getOptionLabel={(option) => option.companyName}
              size="small"
              id="comapny"
              Company
              value={this.state.companyvalue}
              onChange={(event, value) => {
                this.setState({ companyvalue: value });
                console.log("companyvalue", value);
                // this.setState({ employerid: value.id });
              }}
              inputValue={this.state.dummyvalue}
              onInputChange={(event, newInputValue) => {
                this.setState({ dummyvalue: newInputValue });
                // console.log(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Company" margin="normal" />
              )}
            />
          </Grid>
        )}
      </>
    );
  }
  async componentDidMount() {
     token1 = localStorage.getItem("Token");
 token = "Token " + token1;
 id = localStorage.getItem("id");
    await axios
      .get("http://3.22.17.212:8000/api/v1/codes/access/codes", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        codes = res.data;
        this.setState({codes:res.data})
        console.log("codes", codes);
      });
    await axios
      .get("http://3.22.17.212:8000/api/v1/codes/access/pending-codes", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        pendingcodes = res.data;
        this.setState({pendingcodes:res.data})
        console.log("pendingcodes", pendingcodes);
      });
    await axios
      .get(
        `http://3.22.17.212:8000/api/v1/accounts/employer?email=`,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        emails = res.data;
        console.log("emails", emails);
      });

    await axios
      .get(
        `http://3.22.17.212:8000/api/v1/accounts/employer?username=`,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        usernames = res.data;
        console.log("usernames", usernames);
      });

    await axios
      .get(
        `http://3.22.17.212:8000/api/v1/employers/`,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        companys = res.data;
        console.log("companys", companys);
      });
    this.setState({ loading: false });
  }
  async getcode(codeid) {
 
    this.setState({ viewDialog: true });
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/codes/access/code/" + codeid,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        this.setState({ codedetails: res.data });
        console.log("codedetails", this.state.codedetails.canAccessProfile);
      });
    
  }
  async postcode() {
    this.setState({
      generateNewEmployementCodeDialog: false,
      selectedIndex: -1,
    });
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };

    let bodyFormData = new FormData();
    this.state.employersearch
      ? this.state.employerby === "searchByEmail"
        ? bodyFormData.append("employer", this.state.emailsvalue.id)
        : this.state.employerby === "searchByUsername"
        ? bodyFormData.append("employer", this.state.usernamevalue.id)
        : bodyFormData.append("employer", this.state.companyvalue.id)
      : bodyFormData.append("forAdmin", this.state.isadmin);

    bodyFormData.append("employee", id);

    bodyFormData.append("canAccessProfile", this.state.profile);
    bodyFormData.append("canAccessAddresses", this.state.address);
    bodyFormData.append("canAccessJobHistory", this.state.jobHistory);
    bodyFormData.append("canAccessPhones", this.state.phone);
    bodyFormData.append("canAccessIdentities", this.state.identites);
    bodyFormData.append("canAccessRatings", this.state.rating);

    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/codes/access/new-code",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });
  }
  gettable() {
    return (
      <>
        <Grid container justify="space-between" alignItems="center" spacing={4}>
          <Grid item xs={8}>
            <Typography variant="h4">Access Codes</Typography>
          </Grid>

          <Grid item xs={4}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() =>
                this.setState({ generateNewEmployementCodeDialog: true })
              }
              fullWidth
            >
              Create New code
            </Button>
          </Grid>

          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.opencodes}
                  onChange={() => {
                    this.setState({
                      opencodes: !this.state.opencodes,
                    });
                    console.log(this.state.opencodes);
                  }}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Show open codes"
            />
          </Grid>
        </Grid>

        <Grid container justify="flex-start" alignItems="center" spacing={2}>
          <TableContainer
            component={Paper}
            style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
            elevation={5}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Code</TableCell>
                  <TableCell align="left">Employer</TableCell>
                  <TableCell align="left">Code Status</TableCell>
                  <TableCell align="left">Last Updated</TableCell>
                  <TableCell align="left">Details</TableCell>
                  <TableCell align="left">Actions</TableCell>
                  <TableCell align="left">Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.opencodes
                  ? this.state.codes.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align="left"> {new Date(row.createdOn).toDateString()}</TableCell>   
                        <TableCell align="left">{row.codeString}</TableCell>
                        <TableCell align="left">
                          {row.employer_company_field}
                        </TableCell>
                        <TableCell align="left">{row.codeStatus}</TableCell>
                        <TableCell align="left">
                        {new Date(row.statusChangeDate).toDateString()}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => this.getcode(row.id)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <FormControl
                            style={{ minWidth: 85 }}
                            variant="outlined"
                            size="small"
                            fullWidth
                          >
                            <InputLabel id="">Status</InputLabel>
                            <Select
                              labelId="statusOptionsEmployeeField"
                              id="statusOptionsEmployeeField"
                              fullWidth
                              // value={age}
                              // onChange={handleChange}
                            >
                              {row.status_options_employee_field.map((val) =>
                                val.map((i) => (
                                  <MenuItem value={i}>{i}</MenuItem>
                                ))
                              )}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            color="secondary"
                            variant="outlined"
                          >
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : pendingcodes.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align="left"> {new Date(row.createdOn).toDateString()}</TableCell>
                        <TableCell align="left">{row.codeString}</TableCell>
                        <TableCell align="left">
                          {row.employer_company_field}
                        </TableCell>
                        <TableCell align="left">{row.codeStatus}</TableCell>
                        <TableCell align="left">
                          {new Date(row.statusChangeDate).toDateString()}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => this.getcode(row.id)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <FormControl
                            style={{ minWidth: 85 }}
                            variant="outlined"
                            size="small"
                            fullWidth
                          >
                            <InputLabel id="">Status</InputLabel>
                            <Select
                              labelId="statusOptionsEmployeeField"
                              id="statusOptionsEmployeeField"
                              fullWidth
                              // value={age}
                              // onChange={handleChange}
                            >
                              {row.status_options_employee_field.map((val) =>
                                val.map((i) => (
                                  <MenuItem value={i}>{i}</MenuItem>
                                ))
                              )}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            color="secondary"
                            variant="outlined"
                          >
                            Update
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

        <div>
          <Dialog
            open={this.state.generateNewEmployementCodeDialog}
            onClose={() =>
              this.setState({ generateNewEmployementCodeDialog: false })
            }
          >
            <DialogTitle id="codegenerator">Code Generator</DialogTitle>
            <DialogContent>
              <Grid
                container
                justify="flex-start"
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => {
                        this.setState(
                          {
                            employersearch: !this.state.employersearch,
                            isadmin: !this.state.isadmin,
                          },
                          console.log(
                            this.state.employersearch,
                            this.state.isadmin
                          )
                        );
                      }}
                      name="employer"
                    />
                  }
                  label="Employer search"
                />
                {this.state.employersearch ? this.employersearchchoice() : null}

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Provide access to:</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={employeeProfile}
                            onChange={() =>
                              this.setState({ rating: !this.state.rating })
                            }
                            name="ratings"
                          />
                        }
                        label="Ratings"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={jobProfile}
                            onChange={() =>
                              this.setState({ address: !this.state.address })
                            }
                            name="address"
                          />
                        }
                        label="Address"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={jobProfile}
                            onChange={() =>
                              this.setState({ profile: !this.state.profile })
                            }
                            name="profile"
                          />
                        }
                        label="Profile"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={jobProfile}
                            onChange={() =>
                              this.setState({
                                identites: !this.state.identites,
                              })
                            }
                            name="identites"
                          />
                        }
                        label="Identities"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={jobProfile}
                            onChange={() =>
                              this.setState({ phone: !this.state.phone })
                            }
                            name="phones"
                          />
                        }
                        label="Phones"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={jobProfile}
                            onChange={() =>
                              this.setState({
                                jobHistory: !this.state.jobHistory,
                              })
                            }
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
                onClick={() => this.postcode()}
              >
                Generate One-time Code
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullWidth={"md"}
            maxWidth={"md"}
            open={this.state.viewDialog}
            onClose={() => this.setState({ viewDialog: false })}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="codegenerator">Code Details</DialogTitle>
            <DialogContent>
              <TableContainer component={Paper} elevation={6} p={0}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "black" }}>
                      {[
                        "Created Date",
                        "Code String",
                        "Employer company",
                        "last updated",
                        " current status",
                        "Profile access",
                        "Jobhistory access",
                        "Address access",
                        "Phones access",
                        "Ratings access",
                        "Identities access",
                      ].map((text, index) => (
                        <TableCell
                          style={{
                            fontWeight: "bolder",
                            fontFamily: "Montserrat",
                          }}
                          align="center"
                        >
                          {text}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      <TableRow key={this.state.codedetails.id}>
                        <TableCell align="center">
                          {this.state.codedetails.createdOn}
                        </TableCell>
                        <TableCell align="center">
                          
                          {this.state.codedetails.codeString}
                        </TableCell>
                        <TableCell align="center">
                          {this.state.codedetails.employer_company_field}
                        </TableCell>
                        <TableCell align="center">
                          {this.state.codedetails.statusChangeDate}
                        </TableCell>

                        <TableCell align="center">
                          {this.state.codedetails.codeStatus}
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={this.state.codedetails.canAccessProfile}
                            defaultValue={
                              this.state.codedetails.canAccessProfile
                            }
                            name="checkedB"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={this.state.codedetails.canAccessAddresses}
                            defaultValue={
                              this.state.codedetails.canAccessAddresses
                            }
                            name="checkedB"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell component="th" align="center">
                          <Checkbox
                            checked={this.state.codedetails.canAccessJobHistory}
                            defaultValue={
                              this.state.codedetails.canAccessJobHistory
                            }
                            name="checkedB"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={this.state.codedetails.canAccessPhones}
                            defaultValue={
                              this.state.codedetails.canAccessPhones
                            }
                            name="checkedB"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={this.state.codedetails.canAccessIdentities}
                            defaultValue={
                              this.state.codedetails.canAccessIdentities
                            }
                            name="checkedB"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={this.state.codedetails.canAccessRatings}
                            defaultValue={
                              this.state.codedetails.canAccessRatings
                            }
                            name="checkedB"
                            color="primary"
                          />
                        </TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
  render() {
    // const [inputValue, setInputValue] = React.useState("");
    return (
      <div style={{ marginTop: 20 }}>
        {this.state.loading ? this.isloading() : this.gettable()}
        {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
      </div>
    );
  }
}

export default withStyles(styles)(index);
