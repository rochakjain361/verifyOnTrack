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
  Snackbar,
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
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
import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import SearchBar from "material-ui-search-bar";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ValidationMessage from "../../ValidationMessage";
import GradientButton from "../../GradientButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
let token = "";
let categoriesdata = {};
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
      updateDialogOpen: false,
      result: [],
      value: "",
      companyName: "",
      firstname: "",
      firstnamevalid: false,
      middlename: "",
      surname: "",
      username: "",
      usernameValid: false,
      email: "",
      emailValid: false,
      password: "",
      passwordValid: false,
      passwordConfirm: "",
      passwordConfirmValid: false,
      errorMsg: {},
      formValid: "disabled",
      submitDisabled: "disabled",
      Dob: "",
      gender: "",
      dobValue: false,
      genderValue: false,
      companyvalid: false,
      capthavalid: false,
      captha: "",
      signup: false,
      signupemail: false,
      signupusername: false,
      categoriesdata: [],
    };
    this.addemployer = this.addemployer.bind(this);
  }

  validatefirstname = (firstname1) => {
    console.log(firstname1.length);
    firstname1 = firstname1.charAt(0).toUpperCase() + firstname1.slice(1);

    console.log("firstname", firstname1);
    this.setState({ firstname: firstname1 });
    let firstnameValid = true;
    if (firstname1.length === 0) {
      firstnameValid = false;
    }
    console.log("/////////////", firstnameValid);
    this.setState({ firstnamevalid: firstnameValid }, this.validateForm);
  };
  Capitalizemiddlename = (middlename1) => {
    middlename1 = middlename1.charAt(0).toUpperCase() + middlename1.slice(1);

    console.log("middlename", middlename1);
    this.setState({ middlename: middlename1 });
  };
  capitalizelastname = (lastname1) => {
    lastname1 = lastname1.charAt(0).toUpperCase() + lastname1.slice(1);

    console.log("lastname1", lastname1);
    this.setState({ surname: lastname1 });
  };
  companyvalue = (event) => {
    if (event.target.value.length > 0) {
      this.setState(
        { companyvalid: true },
        this.validateForm,
        console.log("////////////", this.state.companyvalid)
      );
    } else {
      this.setState({ companyvalid: false }, this.validateForm);
    }
  };
  validateUsername = (event) => {
    // const { username } = this.state;
    console.log("username", event);
    let usernameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (event.length < 5) {
      usernameValid = false;
      errorMsg.username = "Must be at least 5 characters long";
    }

    this.setState({ usernameValid, errorMsg }, this.validateForm);
  };

  updateEmail = (email) => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
      errorMsg.email = "Invalid email format";
    }

    this.setState({ emailValid, errorMsg }, this.validateForm);
  };

  updatePassword = (password) => {
    this.setState({ password }, this.validatePassword);
  };

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // must be 6 chars
    // must contain a number
    // must contain a special character

    if (password.length < 6) {
      passwordValid = false;
      errorMsg.password = "Password must be at least 6 characters long";
    } else if (!/\d/.test(password)) {
      passwordValid = false;
      errorMsg.password = "Password must contain a digit";
    } else if (!/[!@#$%^&*]/.test(password)) {
      passwordValid = false;
      errorMsg.password = "Password must contain special character: !@#$%^&*";
    }

    this.setState({ passwordValid, errorMsg }, this.validateForm);
  };

  updatePasswordConfirm = (passwordConfirm) => {
    this.setState({ passwordConfirm }, this.validatePasswordConfirm);
  };
  genderValidation = (data) => {
    if (data.target.value.length > 0) {
      this.setState({ genderValue: true }, this.validateForm);
    }
  };
  dobeval = (data) => {
    if (data.target.value.length > 0) {
      this.setState({ dobValue: true }, this.validateForm);
    }
  };

  validatePasswordConfirm = () => {
    const { passwordConfirm, password } = this.state;
    let passwordConfirmValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (password !== passwordConfirm) {
      passwordConfirmValid = false;
      errorMsg.passwordConfirm = "Passwords do not match";
    }

    this.setState({ passwordConfirmValid, errorMsg }, this.validateForm);
  };
  handleChange = (value) => {
    console.log("Captcha value:", value);
    this.setState({ captha: value, capthavalid: true }, this.validateForm);

    if (value === null) this.setState({ expired: "true" });
  };
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
  async updaterow(newData) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", token);

      var formdata = new FormData();
      formdata.append("phone", newData.phone);
      formdata.append("email", newData.email);
      formdata.append("fax", newData.fax);
      formdata.append("logo", newData.logo);
      formdata.append("category", newData.category);
      formdata.append("regNum", newData.regNum);
      formdata.append("regDate", newData.regDate);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

    fetch(
        "http://3.22.17.212:9000/updateComapnyDetailsAdmin?ontracid=" +
          newData.ontrac_id_field,
        requestOptions
      )
        .then((response) => this.getemployerlist())
        .then((result) => console.log("result", result))
        .catch((error) => console.log("error", error));
  }
  async fetchkpidata(companyName) {
    await axios
      .get("http://3.22.17.212:9000/getEmployerKpi?company=" + companyName, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({
          kpidata: res.data,
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
  async searchcompany(companyName) {
    await axios
      .get("http://3.22.17.212:9000/getEmployerList?filter=" + companyName, {
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
  async componentDidMount() {
    token = localStorage.getItem("Token");
    await this.categories();
    await this.getemployerlist();
  }
  categories = async () => {
    await axios
      .get("http://3.22.17.212:9000/api/v1/resManager/employer/categories/", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        response.data.map((index) => {
          console.log("index", index);
          // let newdata={"question":index.id,"answerRating":index.question}
          categoriesdata[index.id] = index.category;
          this.setState({ categoriesdata: categoriesdata });
          this.setState((state) => ({
            person: {
              ...state.stateObj,
              attr1: "value1",
              attr2: "value2",
            },
          }));
        });
      });
  };

  nextpageclick = (event, newPage) => {
    console.log("typeof", typeof newPage);
    if (newPage > this.state.page) {
      console.log("nextpage");
      this.nextpage();
    } else {
      console.log("prevpage");
      this.previouspage();
    }
    this.setState({
      page: newPage,
    });
  };
  Employeractive = async (ontracid) => {
    await axios
      .post(
        "http://3.22.17.212:9000/changeAccountStatus?ontracId=" +
          ontracid +
          "&status=ACTIVATE",
        "",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        this.getemployerlist();
      });
  };
  Employerdeactive = async (ontracid) => {
    await axios
      .post(
        "http://3.22.17.212:9000/changeAccountStatus?ontracId=" +
          ontracid +
          "&status=DEACTIVATE",
        "",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        this.getemployerlist();
      });
  };
  render() {
    return (
      <div>
        <>
          <Box py={1}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    this.setState({ addemployerdialog: true });
                  }}
                >
                  Add employer
                </Button>
              </Grid>
              <Grid item xs={5}>
                <SearchBar
                  value={this.state.value}
                  onChange={(newValue) => this.setState({ value: newValue })}
                  onRequestSearch={() => this.searchcompany(this.state.value)}
                  cancelOnEscape={true}
                  onCancelSearch={() => this.getemployerlist()}
                  placeholder={"enter your companyname and press enter"}
                />
              </Grid>
            </Grid>
          </Box>
          {this.state.employerlist === "" ? null : (
            <MaterialTable
              icons={tableIcons}
              title="Employer List"
              columns={[
                {
                  title: "CompanyName",
                  field: "companyName",
                  cellStyle: { padding: "3px" },
                },

                {
                  field: "logo",
                  title: "Avatar",
                  cellStyle: { padding: "3px" },

                  editComponent: (props) => (
                    <>
                      <TextField
                        type="file"
                        value={props.logo}
                        onChange={(e) => {
                          var data = { ...props.rowData };
                          data.logo = e.target.files[0];

                          props.onRowDataChange(data);
                        }}
                      ></TextField>
                    </>
                  ),

                  render: (rowData) => <Avatar src={rowData.logo} />,
                },

                {
                  title: "Phone",
                  field: "phone",
                  cellStyle: { padding: "3px" },
                  // type: "numeric",
                },
                {
                  title: "Fax",
                  field: "fax",
                  cellStyle: { padding: "3px" },
                  // type: "numeric",
                },
                {
                  title: "RegDate",
                  field: "regDate",
                  cellStyle: { padding: "3px" },
                  editComponent: (props) => (
                    <>
                      <TextField
                        type="date"
                        value={props.regDate}
                        onChange={(e) => {
                          var data = { ...props.rowData };
                          data.regDate = e.target.value;

                          props.onRowDataChange(data);
                        }}
                      ></TextField>
                    </>
                  ),
                },
                {
                  title: "Category",
                  field: "category",
                  cellStyle: { padding: "3px" },

                  lookup: this.state.categoriesdata,
                },
                {
                  title: "RegNum",
                  field: "regNum",
                  cellStyle: { padding: "3px" },
                },
                {
                  title: "Email",
                  field: "email",
                  cellStyle: { padding: "3px" },
                },
                {
                  title: "View",
                  editable: "never",
                  cellStyle: { padding: "3px" },
                  size: "small",
                  render: (rowData) => (
                    <Button
                      color="primary"
                      onClick={() => {
                        this.fetchkpidata(rowData.companyName);
                        this.setState({
                          updateDialogOpen: true,
                        });
                      }}
                    >
                      <VisibilityOutlinedIcon color="white" />
                    </Button>
                  ),
                },
                {
                  title: "Activate",
                  editable: "never",
                  size: "small",
                  cellStyle: { padding: "3px" },
                  field: "approvedFlag",
                  render: (rowData) =>
                    rowData.approvedFlag === "Account Deactivated" ? (
                      <Button
                        // variant="outlined"
                        color="secondary"
                        onClick={() => {
                          this.Employeractive(rowData.ontrac_id_field);
                        }}
                      >
                        <AddCircleOutlineIcon />
                      </Button>
                    ) : rowData.approvedFlag === "Approved" ||
                      rowData.approvedFlag === "Account Reactivated" ? (
                      <>
                        <Button
                          // variant="outlined"
                          color="secondary"
                          onClick={() => {
                            this.Employerdeactive(rowData.ontrac_id_field);
                          }}
                        >
                          <NotInterestedOutlinedIcon />
                        </Button>
                      </>
                    ) : null,
                },
              ]}
              data={this.state.employerlist}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...this.state.employerlist];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      //  setData([...dataUpdate]);

                      this.updaterow(newData);
                      this.setState({
                        employerlist: dataUpdate,
                      });
                      resolve();
                    }, 1000);
                  }),
              }}
              options={{
                sorting: true,
                paging: false,
                search: false,
                cellStyle: { padding: "0.3em" },
                headerStyle: { padding: "0.3em" },
                // grouping: true,
              }}
            />
          )}
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
                            style={{
                              fontWeight: "bold",
                              color: "white",
                            }}
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
                            style={{
                              fontWeight: "bold",
                              color: "white",
                            }}
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
                            style={{
                              fontWeight: "bold",
                              color: "white",
                            }}
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
                            style={{
                              fontWeight: "bold",
                              color: "white",
                            }}
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
          {
            <Dialog
              open={this.state.addemployerdialog}
              fullWidth={"sm"}
              maxWidth={"sm"}
              onClose={() =>
                this.setState({
                  addemployerdialog: false,
                })
              }
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" align="center">
                Add new Employer
              </DialogTitle>
              <DialogContent>
                <Grid
                  container
                  component="main"
                  // className={classes.root}
                  direction="row"
                  justify="center"
                >
                  <Grid
                    container
                    xs={false}
                    sm={12}
                    md={12}
                    square
                    direction="row"
                    justify="center"
                  >
                    <Grid
                      item
                      // style={{ marginTop: 40, marginBottom: 40 }}
                      sm={12}
                      md={12}
                      lg={12}
                    >
                      <Card
                        style={{
                          padding: 50,
                          marginLeft: 40,
                          marginRight: 40,
                        }}
                        raised="true"
                      >
                        <form noValidate>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{ marginRight: 10 }}
                                // margin="dense"
                                id="companyName"
                                label="Company Name"
                                value={this.state.companyName}
                                onChange={(event) => {
                                  this.setState({
                                    companyName: event.target.value,
                                  });
                                  this.companyvalue(event);
                                }}
                                type="text"
                                autoComplete="companyName"
                                autoFocus
                                fullWidth
                                size="medium"
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{ marginRight: 10 }}
                                // margin="dense"
                                id="firstname"
                                label="First Name"
                                value={this.state.firstname}
                                onChange={(event) => {
                                  this.validatefirstname(event.target.value);
                                }}
                                type="text"
                                autoComplete="firstname"
                                autoFocus
                                fullWidth
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{ marginRight: 10 }}
                                margin="dense"
                                id="middlename"
                                label="Middle Name"
                                value={this.state.middlename}
                                onChange={(event) =>
                                  this.Capitalizemiddlename(event.target.value)
                                }
                                type="text"
                                autoComplete="middlename"
                                autoFocus
                                fullWidth
                                size="medium"
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{ marginRight: 10 }}
                                margin="dense"
                                id="surname"
                                label="Surname"
                                value={this.state.surname}
                                onChange={(event) =>
                                  this.capitalizelastname(event.target.value)
                                }
                                type="text"
                                autoComplete="surname"
                                autoFocus
                                fullWidth
                                size="medium"
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <ValidationMessage
                                valid={this.state.usernameValid}
                                message={this.state.errorMsg.username}
                              />
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{ marginRight: 10 }}
                                margin="dense"
                                id="username"
                                label="Username"
                                value={this.state.username}
                                onChange={(event) =>
                                  this.setState(
                                    {
                                      username: event.target.value,
                                    },
                                    this.validateUsername(event.target.value)
                                  )
                                }
                                type="text"
                                autoComplete="username"
                                autoFocus
                                fullWidth
                                size="medium"
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <ValidationMessage
                                valid={this.state.emailValid}
                                message={this.state.errorMsg.email}
                              />
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{ marginRight: 10 }}
                                margin="dense"
                                id="email"
                                label="Email Address"
                                value={this.state.email}
                                onChange={(event) =>
                                  this.setState(
                                    {
                                      email: event.target.value,
                                    },
                                    this.validateEmail
                                  )
                                }
                                name="email"
                                autoComplete="email"
                                autoFocus
                                fullWidth
                                size="small"
                              />
                            </Grid>

                            <>
                              <Grid item fullWidth xs={12}>
                                <FormControl
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                >
                                  <InputLabel htmlFor="gender">
                                    Gender
                                  </InputLabel>
                                  <Select
                                    label="gender"
                                    margin="dense"
                                    // value={age}
                                    onChange={(event) => {
                                      this.setState(
                                        {
                                          gender: event.target.value,
                                        },
                                        this.genderValidation(event)
                                      );
                                    }}
                                  >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>

                              <Grid item fullWidth xs={12}>
                                <TextField
                                  id="dob"
                                  size="small"
                                  variant="outlined"
                                  label="Date of birth"
                                  format={false}
                                  margin="dense"
                                  InputLabelProps={{
                                    shrink: true,
                                    required: true,
                                  }}
                                  // defaultValue={result[this.state.selectedIndex].dob}
                                  onChange={(event) => {
                                    this.setState(
                                      {
                                        Dob: event.target.value,
                                      },
                                      this.dobeval(event)
                                    );
                                  }}
                                  type="date"
                                  fullWidth
                                />
                              </Grid>
                            </>

                            <Grid item xs={12}>
                              <ValidationMessage
                                valid={this.state.passwordValid}
                                message={this.state.errorMsg.password}
                              />
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{ marginRight: 10 }}
                                margin="dense"
                                name="password"
                                label="Password"
                                value={this.state.password}
                                onChange={(event) =>
                                  this.setState(
                                    {
                                      password: event.target.value,
                                    },
                                    this.validatePassword
                                  )
                                }
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                fullWidth
                                size="small"
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <ValidationMessage
                                valid={this.state.passwordConfirmValid}
                                message={this.state.errorMsg.passwordConfirm}
                              />
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{ marginRight: 10 }}
                                margin="dense"
                                name="confirmPassword"
                                label="Confirm Password"
                                value={this.state.passwordConfirm}
                                onChange={(event) =>
                                  this.setState(
                                    {
                                      passwordConfirm: event.target.value,
                                    },
                                    this.validatePasswordConfirm
                                  )
                                }
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                fullWidth
                                size="small"
                              />
                            </Grid>
                          </Grid>
                          <Snackbar
                            open={this.state.signup}
                            autoHideDuration={3000}
                            onClick={() => this.setState({ signup: false })}
                          >
                            <Alert
                              onClose={() => {
                                this.setState({
                                  signup: !this.state.signup,
                                });
                              }}
                              severity="error"
                            >
                              This username and email already exists
                            </Alert>
                          </Snackbar>
                          <Snackbar
                            open={this.state.signupusername}
                            autoHideDuration={3000}
                            onClick={() =>
                              this.setState({
                                signupusername: false,
                              })
                            }
                          >
                            <Alert
                              onClose={() => {
                                this.setState({
                                  signupusername: !this.state.signupusername,
                                });
                              }}
                              severity="error"
                            >
                              This username already exists
                            </Alert>
                          </Snackbar>
                          <Snackbar
                            open={this.state.signupemail}
                            autoHideDuration={3000}
                            onClick={() =>
                              this.setState({
                                signupemail: false,
                              })
                            }
                          >
                            <Alert
                              onClose={() => {
                                this.setState({
                                  signupemail: !this.state.signupemail,
                                });
                              }}
                              severity="error"
                            >
                              This email already exists
                            </Alert>
                          </Snackbar>

                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <GradientButton
                                onClick={this.addemployer}
                                title={"Sign Up"}
                                // disabled={this.state.submitDisabled}
                                center
                                style={{
                                  marginTop: 16,
                                  marginBottom: 16,
                                  fontFamily: "Montserrat",
                                  fontWeight: "bold",
                                }}
                                fullWidth
                              />
                            </Grid>
                          </Grid>
                        </form>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          }
        </>
      </div>
    );
  }
  async addemployer() {
    let apiEndpoint =
      "http://3.22.17.212:9000/api/v1/accounts/auth/employer/register";

    let requestBody = {
      designation: "Employer",
      companyName: this.state.companyName,
      firstname: this.state.firstname,
      middlename: this.state.middlename,
      surname: this.state.surname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    let response = await fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });
    this.setState({ addemployerdialog: false });
  }
}
