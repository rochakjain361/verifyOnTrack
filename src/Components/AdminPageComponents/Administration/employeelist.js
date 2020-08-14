import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Button, Paper, Avatar,Grid,Box,Dialog,DialogTitle,DialogContent,Card,DialogContentText } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
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
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import PinDropIcon from "@material-ui/icons/PinDrop";
let token = "";
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
export default class employeelist extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     employerlist: [],
                     page: 0,
                     rowsPerPage: 100,
                     count: 0,
                     nextpagelink: "",
                     previouspagelink: "",
                     searchcompany: "",
                     kpidata: "",
                   };
                 }

                 async getemployerlist() {
                   await axios
                     .get(
                       "http://3.22.17.212:9000/getEmployeeList?page=1&filter=all",
                       {
                         headers: {
                           Authorization: token,
                         },
                       }
                     )
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
                     .get(
                       "http://3.22.17.212:9000/getEmployeeDetails?id=" +
                         companyName,
                       {
                         headers: {
                           Authorization: token,
                         },
                       }
                     )
                     .then((res) => {
                       this.setState({
                         kpidata: res.data,
                       });
                     });
                 }
                 async searchcompany(companyName) {
                   await axios
                     .get(
                       "http://3.22.17.212:9000/getEmployeeList?filter=" +
                         companyName,
                       {
                         headers: {
                           Authorization: token,
                         },
                       }
                     )
                     .then((res) => {
                       this.setState({
                         employerlist: res.data.results,
                         count: res.data.count,
                         nextpagelink: res.data.next,
                         previouspagelink: res.data.previous,
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
                 async componentDidMount() {
                   token = localStorage.getItem("Token");
                   this.getemployerlist();
                 }
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
                         "&status=ACTIVATE","",
                       {
                         headers: {
                           Authorization: token,
                         },
                       }
                     )
                     .then((res) => {this.getemployerlist()});
                 };
                 Employerdeactive = async (ontracid) => {
                   await axios
                     .post(
                       "http://3.22.17.212:9000/changeAccountStatus?ontracId=" +
                         ontracid +
                         "&status=DEACTIVATE","",
                       {
                         headers: {
                           Authorization: token,
                         },
                       }
                     )
                     .then((res) => {this.getemployerlist();});
                 };
                 render() {
                   return (
                     <div>
                       <>
                         <Box p={2}>
                           <Grid
                             container
                             justify="space-between"
                             alignItems="center"
                             spacing={4}
                           >
                             <Grid item>
                               <Typography variant="h5">
                                 Employee List
                               </Typography>
                             </Grid>
                             <Grid item xs={5}>
                               <SearchBar
                                 value={this.state.value}
                                 onChange={(newValue) =>
                                   this.setState({ value: newValue })
                                 }
                                 onRequestSearch={() =>
                                   this.searchcompany(this.state.value)
                                 }
                                 cancelOnEscape={true}
                                 onCancelSearch={() => this.getemployerlist()}
                                 placeholder={"enter your name and press enter"}
                               />
                             </Grid>
                           </Grid>
                         </Box>
                         {this.state.employerlist === "" ? null : (
                           <MaterialTable
                             icons={tableIcons}
                             title=""
                             columns={[
                               {
                                 title: "Name",
                                 render: (rowData) => (
                                   <p>
                                     {rowData.firstname}
                                     {rowData.surname}
                                   </p>
                                 ),
                               },

                               {
                                 field: "picture",
                                 title: "picture",
                                 render: (rowData) => (
                                   <Avatar src={rowData.picture} />
                                 ),
                               },

                               { title: "sex", field: "sex" },
                               { title: "dob", field: "dob" },
                               { title: "status", field: "status" },
                               {
                                 title: "Action",
                                 render: (rowData) => (
                                   <Button
                                     variant="outlined"
                                     color="secondary"
                                     onClick={() => {
                                       this.fetchkpidata(
                                         rowData.ontrac_id_field
                                       );
                                       this.setState({
                                         updateDialogOpen: true,
                                       });
                                     }}
                                   >
                                     View Details
                                   </Button>
                                 ),
                               },
                               {
                                 title: "Activate",
                                 field: "approvedFlag",
                                 render: (rowData) =>
                                   rowData.approvedFlag ===
                                   "Account Deactivated" ? (
                                     <Button
                                       variant="outlined"
                                       color="secondary"
                                       onClick={() => {
                                         this.Employeractive(
                                           rowData.ontrac_id_field
                                         );
                                       }}
                                     >
                                       Active
                                     </Button>
                                   ) : rowData.approvedFlag === "Approved" ||
                                     rowData.approvedFlag ===
                                       "Account Reactivated" ? (
                                     <>
                                       <Button
                                         variant="outlined"
                                         color="secondary"
                                         onClick={() => {
                                           this.Employerdeactive(
                                             rowData.ontrac_id_field
                                           );
                                         }}
                                       >
                                         Deactivate
                                       </Button>
                                     </>
                                   ) : null,
                               },
                             ]}
                             data={this.state.employerlist}
                             options={{
                               sorting: true,
                               paging: false,
                               search: false,
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
                       </>
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
                             Employee Details
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
                                         variant="h6"
                                         component="h6"
                                         style={{ color: "white" }}
                                       >
                                         Employer Name
                                       </Typography>
                                     </Grid>
                                     <Grid item xs>
                                       <PinDropIcon
                                         style={{ color: "white" }}
                                       />
                                     </Grid>
                                     <Grid item xs={6}>
                                       <Typography
                                         variant="h6"
                                         component="h2"
                                         style={{
                                           fontWeight: "bold",
                                           color: "white",
                                         }}
                                       >
                                         {this.state.kpidata.CurrentEmployer}
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
                                         {this.state.kpidata.PendingAccessCodes}
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
                                       <WorkOutlineIcon
                                         style={{ color: "white" }}
                                       />
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
                                         {
                                           this.state.kpidata
                                             .PendingEmploymentCodes
                                         }
                                       </Typography>
                                     </Grid>
                                   </Grid>
                                 </Card>
                               </Grid>
                             </Grid>
                           </Box>
                         </Dialog>
                       }
                     </div>
                   );
                 }
               }
