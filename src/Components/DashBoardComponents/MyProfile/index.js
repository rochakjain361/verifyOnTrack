import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Label } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputAdornment from '@material-ui/core/InputAdornment';

let token1 = "";
let token = "";
let id = "";
let result = [];
let history = []

class MyProfile extends Component {
  state = {
    updateDialogOpen: false,
    addDialogOpen: false,
    selectedIndex: -1,
    isloading: false,
    updatedval: "",
    updatedfirstname: "",
    firstname: "",
    middlename: "",
    lastname: "",
    Dob: "",
    historyDialogeOpen: false,
    initialfile: "",
    historyloading: true,
    updatedMiddlename: "",
    updatedlastname: "",
    updatedReasonforupdating: "",
    updatedName: "",
    updatedDob: "",
    buttondisabled: "disabled",
    id: "",
    file: null,
    gender: "",
    result: [],
  };
  async getprofiledata() {
    await axios
      .get("http://3.22.17.212:8000/api/v1/employees/" + id + "/profiles", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        result = res.data;
        this.setState({ result: result })
        console.log("Profile Data", result);
      });
  }
  async componentDidMount() {
    this.setState({ isloading: true })
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");
    await this.getprofiledata();
    this.setState({ isloading: false });


  }

  _handleChangeEvent(event) {
    this.setState({ updatedval: event.target.value });
    console.log(this.state.updatedval);
    return this.state.updatedval;
  }

  reasonforupdatevalidcheck = (event) => {
    if (event.target.value.length > 0) {
      //  console.log(event.target.value);
      this.setState({ buttondisabled: "" });
    }
    else if (event.target.value.length > 250) {
      this.setState({ buttondisabled: "disabled" });

    }
    else {
      this.setState({ buttondisabled: "disabled" });
    }



  };

  // async updatedetails(){
  //   console.log("///////////////////////////////////////////////");
  //  let data = {
  //     employee: this.state.id,
  //     update_reason: this.state.updatedReasonforupdating,
  //     sex: this.state.updatedsex,
  //     dob: this.state.updatedDob,
  //   };

  async updatedetails() {
    this.setState({
      updateDialogOpen: false,
    });
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("employee", id);
    bodyFormData.append("update_reason", this.state.updatedReasonforupdating);
    bodyFormData.append("picture", this.state.file);
    bodyFormData.append("dob", this.state.updatedDob);
    bodyFormData.append("firstname", this.state.updatedfirstname);
    bodyFormData.append("middlename", this.state.updatedMiddlename);
    bodyFormData.append("surname", this.state.updatedlastname);

    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/update-profile",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });
    await this.getprofiledata();
  }
  async postprofile() {
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    let bodyFormData = new FormData();
    bodyFormData.append("employee", id);
    bodyFormData.append("sex", this.state.gender);
    bodyFormData.append("picture", this.state.initialfile);
    bodyFormData.append("dob", this.state.Dob);
    bodyFormData.append("firstname", this.state.firstname);
    bodyFormData.append("middlename", this.state.middlename);
    bodyFormData.append("surname", this.state.lastname);
    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/employees/post-profile",
        bodyFormData,
        headers
      )
      .then((response) => {
        console.log(response);
      });
    await this.getprofiledata();
  }
  isloading() {
    return (
      <Grid container justify='flex-end' alignItems='center'
        // container
        // spacing={0}
        direction="column"
      // alignItems="center"
      // justify="center"
      // // display="flex"
      // style={{ minHeight: "10vh" }}
      >
        <Grid item xs={6} >
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  tabledata() {
    return (
      <>
        {
          this.state.result.length === 0

            ? (
              <div>

                <Grid container spacing={3} direction="column"justify='center' align="center">
                  <Grid item xs={12}>

                    <Typography variant="h3" gutterBottom align="center">My Profile</Typography>
                  </Grid>

                  <Grid item xs={12}  >
                     
                    <Paper elevation={3} direction="column" >
                      <Box p={3}   display="flex" flexDirection="column"  justifyContent='center' alignItems="center" style={{height: '50vh',}} >
                     
                          <Typography variant="h4" gutterBottom align='center' justify="center">
                            Add  profiles to improve ratings.
                      </Typography>

                          <Button color="primary" variant='contained' onClick={() => this.setState({ addDialogOpen: true })}>
                            Add New Job Profile
                        </Button>
                        
                      </Box>
                    </Paper>
                    
                  </Grid>


                </Grid>

                {<Dialog
                  open={this.state.addDialogOpen}
                  onClose={() => this.setState({ addDialogOpen: true })}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title" justify="center">
                    Add Profile
              </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Enter the details of your profile to be updated
                </DialogContentText>

                    <Grid container justify='flex-start' direction='row' alignItems='center' spacing={3}>
                      <Grid item fullWidth xs={12}>
                        <TextField
                          id="firstName"
                          label="First Name"
                          // defaultValue={result[this.state.selectedIndex].firstname}
                          onChange={(event) => {
                            this.setState({ firstname: event.target.value });
                            console.log(this.state.firstname);
                          }}
                          type="text"
                          fullWidth
                        />
                      </Grid>

                      <Grid item fullWidth xs={12}>
                        <TextField
                          id="middleName"
                          label="Middle Name"
                          // defaultValue={result[this.state.selectedIndex].middlename}
                          onChange={(event) => {
                            this.setState({ middlename: event.target.value });
                            console.log(this.state.middlename);
                          }}
                          type="text"
                          fullWidth
                        />
                      </Grid>

                      <Grid item fullWidth xs={12}>
                        <TextField
                          id="surname"
                          label="Surname"
                          // defaultValue={result[this.state.selectedIndex].surname}
                          onChange={(event) => {
                            this.setState({ lastname: event.target.value });
                            console.log(this.state.lastname);
                          }}
                          type="text"
                          fullWidth
                        />
                      </Grid>

                      <Grid item fullWidth xs={12}>
                        <TextField
                          id="dob"
                          // label="Date of birth"
                          // defaultValue={result[this.state.selectedIndex].dob}
                          onChange={(event) => {
                            this.setState({ Dob: event.target.value });
                            console.log(this.state.Dob);
                          }}
                          type="date"
                          fullWidth
                        />
                      </Grid>

                    

                      <Grid item fullWidth xs={12}>
                        <TextField
                          id="chooseFile"
                          label="Choose File"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                               <CloudUploadIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(event) => {
                            this.setState({ initialfile: event.target.files[0] });
                            console.log(this.state.initialfile);
                          }}
                          type="file"
                          fullWidth
                        />
                      </Grid>

                      <Grid item fullWidth xs={12}>

                        <FormControl fullWidth>
                          <InputLabel id="gender">Gender</InputLabel>
                          <Select
                            label="gender"
                            id="gender"
                            // value={age}
                            onChange={(event) => {
                              this.setState({ gender: event.target.value });
                              console.log(this.state.gender);
                            }}
                          >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                          </Select>
                        </FormControl>

                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        this.setState(
                          {
                            addDialogOpen: false,
                          },
                          this.postprofile
                        );
                      }}
                    >
                      Submit Profile
                </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() =>
                        this.setState({
                          addDialogOpen: false,
                        })
                      }
                    >
                      Cancel
                </Button>
                  </DialogActions>
                </Dialog>}
              </div>
            ) : (
              <div>
                <Paper elevation={2} style={{ marginTop: 20 }}>



                  <Grid container
                    direction="row"
                    justify="flex-start"
                    style={{ padding: 20 }} spacing={3}
                  >
                    <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center" xs={3}>
                      <Avatar
                        src={this.state.result[0].picture}
                        style={{ height: "12rem", width: "12rem" }}
                      >
                        {/* <img src="/images/sampleuserphoto.jpg" width="185" height="185" alt="" /> */}
                      </Avatar>
                    </Grid>
                    <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center"


                      xs={6}>

                      <Typography variant='h2'
                      // style={{ fontFamily: "Montserrat", textTransform: 'capitalize' }}
                      >
                        {this.state.result[0].firstname} {this.state.result[0].middlename} {this.state.result[0].surname}
                      </Typography>

                      <Typography variant='h5'
                      // style={{ fontFamily: "Montserrat" }}
                      >
                        {this.state.result[0].dob}
                      </Typography>

                      <Typography variant='h5'
                      // style={{ fontFamily: "Montserrat" }}
                      >
                        {this.state.result[0].employee_email_field}
                      </Typography>
                      {/* <Typography variant='h5'
                      
                      >
                        {this.state.result[0].ontrac_id}
                      </Typography> */}
                    </Grid>
                  </Grid>

                </Paper>
                <div style={{ marginTop: 50 }}>
                  {this.getTableOfEmployees()}
                </div>




              
               
              </div>
            )}
      </>
    );
  }
  async fetchhistory() {
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/employees/" +
        id +
        "/profiles-by/" +
        id +
        "/history",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        history = res.data;
        console.log("history", history);
        this.setState({ historyloading: false });
      });
  }


  getTableOfEmployees() {
    return (
      <>
        <TableContainer component={Paper} elevation={16} p={3}>
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "black" }}>
                {[
                  "Picture",
                  "Full name",
                  "Sex",
                  "Date of birth",
                  "Source",
                  "Verifier",
                  "Created On",
                  "Update",
                  "History",
                ].map((text, index) => (
                  <TableCell
                    style={{ fontWeight: "bolder", }}
                    align="center"
                  >
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.result.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="center">
                    <Avatar src={row.picture}>
                      {/* <img
                        src="/images/sampleuserphoto.jpg"
                        width="40"
                        height="40"
                        alt=""
                      /> */}
                    </Avatar>
                  </TableCell>
                  <TableCell align="center"> {row.firstname} {row.middlename} {row.surname}</TableCell>
                  <TableCell align="center">{row.sex}</TableCell>
                  <TableCell align="center">{row.dob}</TableCell>
                  <TableCell align="center">{row.source_name_field}</TableCell>
                  <TableCell align="center">{row.owner_name_field}</TableCell>
                  <TableCell component="th" align="center">
                    {new Date(row.created_on).toDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() =>
                        this.setState({
                          updateDialogOpen: true,
                          selectedIndex: index,
                          updatedlastname: result[index].surname,
                          updatedfirstname: result[index].firstname,
                          updatedMiddlename: result[index].middlename,
                          updatedDob: result[index].dob,

                          // add the updatedstate elements here after passing the token and adding data
                        })
                      }
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        this.setState(
                          { historyDialogeOpen: true },
                          this.fetchhistory
                        )
                      }
                    >
                      History
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {this.state.selectedIndex === -1 ? (
            <div />
          ) : (
              <Dialog
                open={this.state.updateDialogOpen}
                onClose={() => this.setState({ updateDialogOpen: false })}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title" align="center">Update Profile</DialogTitle>
                <DialogContent>
                  <DialogContentText align="center">
                    Enter the details of your profile to be updated
                </DialogContentText>

                  <Grid
                    container
                    justify="flex-start"
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item fullWidth xs={12}>
                      <TextField
                        id="firstName"
                        label="First Name"
                        defaultValue={this.state.updatedfirstname}
                        onChange={(event) =>
                          this.setState({ updatedfirstname: event.target.value })
                        }
                        type="text"
                        fullWidth
                      />
                    </Grid>

                    <Grid item fullWidth xs={12}>
                      <TextField
                        id="middleName"
                        label="Middle Name"
                        defaultValue={this.state.updatedMiddlename}
                        onChange={(event) =>
                          this.setState({ updatedMiddlename: event.target.value })
                        }
                        type="text"
                        fullWidth
                      />
                    </Grid>

                    <Grid item fullWidth xs={12}>
                      <TextField
                        id="surname"
                        label="Surname"
                        defaultValue={this.state.updatedlastname}
                        onChange={(event) => {
                          this.setState({ updatedlastname: event.target.value });
                        }}
                        type="text"
                        fullWidth
                      />
                    </Grid>

                    <Grid item fullWidth xs={12}>
                      <TextField
                        id="dob"
                        label="Date of birth"
                        defaultValue={this.state.updatedDob}
                        onChange={(event) => {
                          this.setState({ updatedDob: event.target.value });
                          console.log(event.target.value);
                        }}
                        type="date"
                        fullWidth
                      />
                    </Grid>
   
                   

                    <Grid item fullWidth xs={12}>
                      <TextField
                        id="chooseFile"
                        label="Choose File"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                             <CloudUploadIcon />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(event) => {
                          this.setState({ file: event.target.files[0] });
                          console.log(event.target.files[0]);
                        }}
                        type="file"
                        fullWidth
                      />
                    </Grid>

                    <Grid item fullWidth xs={12}>
                      <TextField
                        id="reasonForUpdating"
                        label="Reason for updating:"
                        helperText="update reason can be less than 250 characters"
                        onChange={(event) =>
                          this.setState(
                            {
                              updatedReasonforupdating: event.target.value,
                            },
                            this.reasonforupdatevalidcheck(event)
                          )
                        }
                        type="text"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions style={{ padding: 10 }}>
                  <Button
                    disabled={this.state.buttondisabled}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      this.updatedetails();
                    }}
                  >
                    Update
                </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                      this.setState({
                        updateDialogOpen: false,
                        selectedIndex: -1,
                      })
                    }
                  >
                    Cancel
                </Button>
                </DialogActions>
              </Dialog>
            )}
        </TableContainer>

        <Dialog
          fullWidth={"md"}
          maxWidth={"md"}
          open={this.state.historyDialogeOpen}
          onClose={() => this.setState({ historyDialogeOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">Profile History</DialogTitle>
          {/* <DialogContent> */}
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
                      style={{ fontWeight: "bolder", }}
                      align="left"
                    >
                      {text}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {this.state.historyloading ? (
                this.isloading()
              ) : (
                  <TableBody>
                    {history.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align="left">
                          <Avatar src={row.picture}>Picture</Avatar>
                        </TableCell>
                        <TableCell align="left">{row.firstname}</TableCell>
                        <TableCell align="left">{row.middlename}</TableCell>
                        <TableCell align="left">{row.surname}</TableCell>
                        <TableCell align="left">
                          {new Date(row.dob).toDateString()}
                        </TableCell>

                        {/* <TableCell align="center">{row.source_name_field}</TableCell> */}
                        <TableCell align="left">{row.sex}</TableCell>{" "}
                        <TableCell component="th" align="left">
                          {new Date(row.created_on).toDateString()}
                        </TableCell>
                        <TableCell align="left">{row.update_reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
            </Table>
          </TableContainer>
          {/* </DialogContent> */}
          <DialogActions style={{ padding: 15 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                this.setState({ historyDialogeOpen: false, selectedIndex: -1 })
              }
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  render() {
    return <>{this.state.isloading ? this.isloading() : this.tabledata()}</>;
  }
}



export default MyProfile;
