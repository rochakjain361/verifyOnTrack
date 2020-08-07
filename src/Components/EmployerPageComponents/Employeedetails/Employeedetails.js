import React, { Component } from "react";
import { get, post, put, update } from "../../../API";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  Paper,
  Box,
  Typography,
  Button,
  TableContainer,
  FormControl,
  Avatar,
} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
let token = "";
let id = "";
export class Employeedetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      categories: [],
      loading: true,

      phone: "",
      email: "",
      fax: "",
      logo: null,
      category: "",
      regnumber:"",
      regDate:"",
     

      updateDialogOpen: false,
      addDialogOpen: false,
    };
  }
  postprofile() {
    let bodyFormData = new FormData();
    bodyFormData.append("phone", this.state.phone);
    bodyFormData.append("email", this.state.email);
    if (this.state.logo !== null) {
      bodyFormData.append("logo", this.state.logo);
    }
    bodyFormData.append("fax", this.state.fax);
    bodyFormData.append("category", this.state.category);
    bodyFormData.append("regNum",this.state.regnumber);
    bodyFormData.append("regDate", this.state.regDate);

    put(
      "http://3.22.17.212:9000/api/v1/employers/postdetails",
      token,
      bodyFormData
    ).then((res) => {
      this.getprofiledata();
    });
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
        <Grid item xs={6}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  addDialog() {
    return (
      <Dialog
        open={this.state.addDialogOpen}
        onClose={() => this.setState({ addDialogOpen: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" justify="center">
          Add company details
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
                      Enter the details of your profile to be added
                </DialogContentText> */}

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
                label="Phone"
                value={this.state.firstname}
                // defaultValue={result[this.state.selectedIndex].firstname}
                onChange={(event) => {
                  // this.capitalizefirstname(event.target.value)
                  this.setState({ phone: event.target.value });
                  // console.log(this.state.firstname);
                }}
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item fullWidth xs={12}>
              <TextField
                id="middleName"
                label="Email"
                value={this.state.middlename}
                // defaultValue={result[this.state.selectedIndex].middlename}
                onChange={(event) => {
                  // this.capitalizemiddlename(event.target.value)
                  this.setState({ email: event.target.value });
                  // console.log(this.state.middlename);
                }}
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item fullWidth xs={12}>
              <TextField
                id="Fax"
                label="Fax"
                // defaultValue={result[this.state.selectedIndex].surname}
                onChange={(event) => {
                  // this.capitalizelastname(event.target.value)
                  this.setState({ fax: event.target.value });
                  // console.log(this.state.lastname);
                }}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item fullWidth xs={12}>
              <TextField
                id="Registration Number"
                label="Registration Number"
                // defaultValue={result[this.state.selectedIndex].surname}
                onChange={(event) => {
                  // this.capitalizelastname(event.target.value)
                  this.setState({ regnumber: event.target.value });
                  // console.log(this.state.lastname);
                }}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item fullWidth xs={12}>
              <TextField
                id="registration date"
                size="small"
                // variant="outlined"
                label="Registration Date"
                format={false}
                margin="dense"
                InputLabelProps={{ shrink: true, required: true }}
                // defaultValue={result[this.state.selectedIndex].dob}
                onChange={(event) => {
                  this.setState(
                    { regDate: event.target.value },
                  
                  );
                }}
                type="date"
                fullWidth
              />
            </Grid>

            <Grid item fullWidth xs={12}>
              <TextField
                id="chooseFile"
                label="Logo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CloudUploadIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  this.setState({ logo: event.target.files[0] });
                }}
                type="file"
                fullWidth
              />
            </Grid>

            <Grid item fullWidth xs={12}>
              <FormControl fullWidth>
                <InputLabel id="gender">Cateogry</InputLabel>
                <Select
                  label="gender"
                  id="gender"
                  // value={age}
                  onChange={(event) => {
                    this.setState({ category: event.target.value });
                    console.log(this.state.gender);
                  }}
                >
                  {this.state.categories.map((cat) => (
                    <MenuItem value={cat.id}>{cat.category}</MenuItem>
                  ))}
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
            Submit
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
      </Dialog>
    );
  }
  updatedialog() {
    return (
      <Dialog
        open={this.state.updateDialogOpen}
        onClose={() => this.setState({ updateDialogOpen: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" alignItems="center">
          Update company details
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
                      Enter the details of your profile to be added
                </DialogContentText> */}

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
                label="Phone"
                value={this.state.firstname}
                defaultValue={this.state.result.phone}
                onChange={(event) => {
                  // this.capitalizefirstname(event.target.value)
                  this.setState({ phone: event.target.value });
                  // console.log(this.state.firstname);
                }}
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item fullWidth xs={12}>
              <TextField
                id="middleName"
                label="Email"
                value={this.state.middlename}
                defaultValue={this.state.result.email}
                onChange={(event) => {
                  // this.capitalizemiddlename(event.target.value)
                  this.setState({ email: event.target.value });
                  // console.log(this.state.middlename);
                }}
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item fullWidth xs={12}>
              <TextField
                id="surname"
                label="Fax"
                value={this.state.lastname}
                defaultValue={this.state.result.fax}
                onChange={(event) => {
                  // this.capitalizelastname(event.target.value)
                  this.setState({ fax: event.target.value });
                  // console.log(this.state.lastname);
                }}
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item fullWidth xs={12}>
              <TextField
                id="chooseFile"
                label="Logo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CloudUploadIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  this.setState({ logo: event.target.files[0] });
                }}
                type="file"
                fullWidth
              />
            </Grid>
            <Grid item fullWidth xs={12}>
              <TextField
                id="Registration Number"
                label="Registration Number"
                 defaultValue={this.state.regnumber}
                onChange={(event) => {
                  // this.capitalizelastname(event.target.value)
                  this.setState({ regnumber: event.target.value });
                  // console.log(this.state.lastname);
                }}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item fullWidth xs={12}>
              <TextField
                id="registration date"
                size="small"
                // variant="outlined"
                label="Registration Date"
                format={false}
                margin="dense"
                InputLabelProps={{ shrink: true, required: true }}
                 defaultValue={this.state.regDate}
                onChange={(event) => {
                  this.setState({ regDate: event.target.value });
                }}
                type="date"
                fullWidth
              />
            </Grid>
            <Grid item fullWidth xs={12}>
              <FormControl fullWidth>
                <InputLabel id="gender">Cateogry</InputLabel>
                <Select
                  // label="gender"
                  id="gender"
                  // value={age}
                  defaultValue={this.state.result.category}
                  onChange={(event) => {
                    this.setState({ category: event.target.value });
                    console.log(this.state.gender);
                  }}
                >
                  {this.state.categories.map((cat) => (
                    <MenuItem value={cat.id}>{cat.category}</MenuItem>
                  ))}
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
                  updateDialogOpen: false,
                },
                this.postprofile
              );
            }}
          >
            update
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() =>
              this.setState({
                updateDialogOpen: false,
              })
            }
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  async getprofiledata() {
    await get(
      "http://3.22.17.212:9000/api/v1/employers/" + id + "/getdetails",
      token,
      ""
    ).then((res) => {
      console.log(res);
      // result = res.data;
      this.setState({ result: res.data });
      console.log("Profile Data", this.state.result.length);
    });
  }
  async componentWillMount() {
    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");
    await this.getprofiledata();
    await get(
      "http://3.22.17.212:9000/api/v1/resManager/employer/categories/",
      token,
      ""
    ).then((res) => this.setState({ categories: res.data, loading: false }));
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          this.isloading()
        ) : this.state.result.length === 0 ? (
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            align="center"
          >
            <Grid item xs={12}>
              <Paper elevation={3} direction="column">
                <Box
                  p={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: "50vh" }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    justify="center"
                  >
                    Please add your company details.
                  </Typography>

                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => this.setState({ addDialogOpen: true })}
                  >
                    Add company details
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <div>
            <Paper elevation={2} style={{ marginTop: 20 }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                style={{ padding: 20 }}
                spacing={3}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  xs={3}
                >
                  <Avatar
                    src={this.state.result.logo}
                    style={{ height: "12rem", width: "12rem" }}
                  >
                    {/* <img src="/images/sampleuserphoto.jpg" width="185" height="185" alt="" /> */}
                  </Avatar>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  xs={6}
                >
                  <Typography
                    variant="h3"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.result.companyName}
                  </Typography>

                  <Typography
                    variant="h5"
                    // style={{ fontFamily: "Montserrat" }}
                  >
                    {this.state.result.category_name_field}
                  </Typography>

                  <Typography
                    variant="h5"
                    // style={{ fontFamily: "Montserrat" }}
                  >
                    {this.state.result.email}
                  </Typography>
                  <Typography variant="h5">{this.state.result.fax}</Typography>
                  <Typography variant="h5">
                    {this.state.result.phone}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <TableContainer component={Paper} elevation={16} p={3}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow style={{ backgroundColor: "black" }}>
                    {[
                      "Picture",
                      "CompanyName",
                      "CompanyType",
                      "Email",
                      "Fax",
                      "Phone",
                      "Registration Number",
                      "Registration Date",
                      "Actions",
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
                  <TableRow>
                    <TableCell align="center">
                      <Grid container justify="center">
                        <Avatar src={this.state.result.logo}></Avatar>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      {this.state.result.companyName}
                    </TableCell>
                    <TableCell align="center">
                      {this.state.result.category_name_field}
                    </TableCell>
                    <TableCell align="center">
                      {this.state.result.email}
                    </TableCell>
                    <TableCell align="center">
                      {this.state.result.fax}
                    </TableCell>
                    <TableCell align="center">
                      {this.state.result.phone}
                    </TableCell>
                    <TableCell align="center">
                      {this.state.result.regNum}
                    </TableCell>
                    

                    <TableCell  align="center">
                    {new Date(this.state.result.regDate).toDateString()}
                  </TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                          this.setState({
                            updateDialogOpen: true,
                            phone: this.state.result.phone,
                            email: this.state.result.email,
                            fax: this.state.result.fax,
                            category: this.state.result.category,
                            regnumber: this.state.result.regnumber,
                            regDate: this.state.result.regDate,

                            // add the updatedstate elements here after passing the token and adding data
                          })
                        }
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {this.updatedialog()}
        {this.addDialog()}
      </div>
    );
  }
}

export default Employeedetails;
