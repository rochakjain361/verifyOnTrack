import React, { Component } from "react";
import {
  Grid,
  Box,
  CircularProgress,
  Table,
  TableContainer,
  DialogActions,
  Dialog,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Paper,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  GridList,
  GridListTile,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { get, update, post } from "../../../API";
import axios from "axios";
import csv from "../../../icons/csv.png";
import docx from "../../../icons/docx.png";
import pdf from "../../../icons/pdf.jpg";
import ppt from "../../../icons/ppt.png";
import xls from "../../../icons/xcel.png";
import file from "../../../icons/file.png";

let id = "";
let token="";
let pictures=[];

export class index extends Component {
         state = {
           result: [
             {
               startDate: "",
               endDate: "",
               school: "",
               degree: "",
               status: "",
               update_reason: "",
             },
           ],
           updatedresult: {
             id: "",
             employee: "",
             startDate: "",
             endDate: "",
             school: "",
             degree: "",
             status: "",
             academicType: "",
             update_reason: "",
             created_on: "",
           },
           loading: false,
           history: [
             {
               startDate: "",
               endDate: "",
               school: "",
               degree: "",
               status: "",
               update_reason: "",
             },
           ],
           newAcademics: {
             degree: "",
             startDate: "",
             endDate: "",
             school: "",
             academicType: "",
           },
           historyloading: false,
           historyDialogeOpen: false,
           addnewdialog: false,
           types: [],
           pictureloading: true,
           uploadpictures: "",
         };
         async componentDidMount() {
           this.setState({ loading: true });
           token = localStorage.getItem("Token");
           id = localStorage.getItem("id");
           await this.getAcademics();
           await get(
             "http://3.22.17.212:9000/api/v1/resManager/academic/types/",
             token,
             ""
           ).then((res) => this.setState({ types: res.data }));
           this.setState({ loading: false });
         }
         async getAcademics() {
           await get(
             "http://3.22.17.212:9000/api/v1/employees/" + id + "/academics",
             token,
             ""
           ).then((response) => {
             console.log("response from api page", response);
             this.setState({ result: response.data });
           });
         }
         loading() {
           return (
             <Grid
               container
               spacing={0}
               direction="row"
               alignItems="center"
               justify="center"
               display="flex"
               style={{ minHeight: "0vh" }}
             >
               <CircularProgress />
             </Grid>
           );
         }
         async getpictures(idsource) {
           this.setState({ viewDialogeOpen: true });
           this.setState({ pictureloading: true });
           await get(
             "http://3.22.17.212:9000/api/v1/employees/" +
               id +
               "/academics/" +
               idsource +
               "/pics",
             token,
             ""
           ).then((res) => {
             pictures = res.data;
             console.log("pictures", pictures);
             this.setState({ pictureloading: false });
           });
         }
         async postpictures(id) {
           this.setState({ uploadDialougeOpen: false });

           let bodyFormData = new FormData();
           bodyFormData.append("empEdu", id);
           bodyFormData.append("picture", this.state.uploadpictures);

           await post(
             "http://3.22.17.212:9000/api/v1/employees/post-academic-pic",
             token,
             bodyFormData
           ).then((response) => {
             console.log(response);
           });
         }
         async fetchhistory(index) {
           this.setState({ historyDialogeOpen: true, historyloading: true });
           await get(
             "http://3.22.17.212:9000/api/v1/employees/" +
               id +
               "/academics/" +
               index,
             token,
             ""
           ).then((response) => {
             this.setState({ history: response.data, historyloading: false });
           });
         }
         async updatedetails(id) {
           this.setState({
             updateDialogOpen: false,
           });

           await update(
             "http://3.22.17.212:9000/api/v1/employees/update-academics/" + id,
             token,
             this.state.updatedresult
           ).then((response) => {
             console.log("update response", response);
           });
           await this.getAcademics();
         }
         async addacademics() {
           this.setState({ addnewdialog: false });
           await post(
             "http://3.22.17.212:9000/api/v1/employees/post-academics",
             token,
             this.state.newAcademics
           ).then((response) => {
             console.log(response);
           });
           this.getAcademics();
         }
         async getamount() {
           await axios
             .get(
               "http://3.22.17.212:9000/api/v1/resManager/serviceAPI/?serviceName=AcademicVerification"
             )
             .then((res) =>
               this.setState({ amount: res.data[0].serviceCharge })
             );
         }
         async pay() {
           let transactionid = Math.floor(
             10000000000000000 + Math.random() * 9000000000000000
           );
           let headers1 = {
             headers: {
               Authorization: token,
               "Content-Type": "multipart/form-data",
             },
           };

           await axios
             .post(
               "http://3.22.17.212:9000/wallet/transaction?type=DEBIT&amount=" +
                 this.state.amount +
                 "&description=" +
                 transactionid,
               "",
               headers1
             )
             .then((response) => {
               if (response.status === 200) {
                 this.verification();
               }
             });
         }
         async verification() {
           let bodyFormData = {
             verType: "Academic",
             objId: this.state.currentid,
           };
           await post(
             "http://3.22.17.212:9000/api/v1/codes/evaluation/new-code",
             token,
             bodyFormData
           ).then((res) => {
          window.location.reload(false);
           });
         }
         gettable() {
           return (
             <div>
               {this.state.result.length === 0 ? (
                 <Grid container spacing={3} justify="space-between">
                   <Grid item xs={12}>
                     <Paper style={{ padding: 20 }} elevation={3}>
                       <Box
                         p={1}
                         display="flex"
                         flexDirection="column"
                         justifyContent="center"
                         alignItems="center"
                         style={{ height: "50vh" }}
                       >
                         <Typography variant="h4" gutterBottom align="center">
                           Add academics to improve ratings.
                         </Typography>

                         <Grid
                           container
                           justify="center"
                           style={{ marginTop: 50 }}
                         >
                           <Button
                             variant="contained"
                             color="primary"
                             onClick={() => {
                               this.setState({ addnewdialog: true });
                             }}
                           >
                             Add Academics
                           </Button>
                         </Grid>
                       </Box>
                     </Paper>
                   </Grid>
                 </Grid>
               ) : (
                 <Grid>
                   <Box p={2}>
                     <Grid
                       container
                       direction="column"
                       justify="center"
                       alignItems="flex-end"
                     >
                       <Button
                         variant="contained"
                         color="primary"
                         onClick={() => {
                           this.setState({ addnewdialog: true });
                         }}
                       >
                         Add Academics
                       </Button>
                     </Grid>
                   </Box>
                   <TableContainer component={Paper} elevation={16} p={3}>
                     <Table stickyHeader>
                       <TableHead>
                         <TableRow style={{ backgroundColor: "black" }}>
                           {[
                             "StartDate",
                             "EndDate",
                             "School",
                             "Degree",
                             "Academic Type",
                             "Status",
                             "Createdon",
                             "Pictures",
                             "Update",
                             "History",
                             "Verification",
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
                         {this.state.result.map((row, index) => (
                           <TableRow key={row.id}>
                             <TableCell align="center">
                               {" "}
                               {row.startDate}{" "}
                             </TableCell>
                             <TableCell align="center">{row.endDate}</TableCell>
                             <TableCell align="center">{row.school}</TableCell>
                             <TableCell align="center">{row.degree}</TableCell>
                             <TableCell align="center">
                               {row.academicType_name_field}
                             </TableCell>

                             <TableCell align="center">{row.status}</TableCell>
                             <TableCell component="th" align="center">
                               {new Date(row.created_on).toDateString()}
                             </TableCell>
                             <TableCell align="center">
                               <Grid
                                 container
                                 display="flex"
                                 direction="row"
                                 alignItems="center"
                                 justify="center"
                                 spacing={1}
                               >
                                 <Grid item>
                                   <Button
                                     size="small"
                                     color="primary"
                                     variant="outlined"
                                     onClick={() => this.getpictures(row.id)}
                                   >
                                     View
                                   </Button>
                                 </Grid>
                                 <Grid item>
                                   <Button
                                     size="small"
                                     color="secondary"
                                     variant="outlined"
                                     onClick={() =>
                                       this.setState(
                                         {
                                           uploadDialougeOpen: true,
                                           pictureid: row.id,
                                         },
                                         console.log(
                                           "picturedid",
                                           this.state.pictureid
                                         )
                                       )
                                     }
                                   >
                                     upload
                                   </Button>
                                 </Grid>
                               </Grid>
                             </TableCell>
                             <TableCell align="center">
                               <Button
                                 disabled={row.status === "Audit In Progress"}
                                 color="primary"
                                 variant="outlined"
                                 onClick={() =>
                                   this.setState({
                                     updateDialogOpen: true,
                                     selectedIndex: index,
                                     updatedresult: this.state.result[index],
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
                                 onClick={() => this.fetchhistory(row.id)}
                               >
                                 History
                               </Button>
                             </TableCell>
                             {row.showVerifyOnTrac_btn === true ? (
                               <TableCell align="center">
                                 <Button
                                   variant="outlined"
                                   color="default"
                                   onClick={() => {
                                     this.setState({
                                       currentid: row.id,
                                       walletdialog: true,
                                     });
                                     this.getamount();
                                   }}
                                 >
                                   Request for verification
                                 </Button>
                               </TableCell>
                             ) : null}
                           </TableRow>
                         ))}
                       </TableBody>
                     </Table>
                   </TableContainer>
                 </Grid>
               )}
               <Dialog
                 open={this.state.updateDialogOpen}
                 onClose={() =>
                   this.setState({
                     updateDialogOpen: false,
                     buttondisabled: "disabled",
                   })
                 }
                 aria-labelledby="form-dialog-title"
               >
                 <DialogTitle id="form-dialog-title" align="center">
                   Update Academics
                 </DialogTitle>
                 <DialogContent>
                   <DialogContentText align="center">
                     Enter the details of your academics to be updated
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
                         name="Start date"
                         label="Startdate"
                         defaultValue={this.state.updatedresult.startDate}
                         onChange={(event) => {
                           this.setState({
                             updatedresult: {
                               ...this.state.updatedresult,
                               startDate: event.target.value,
                             },
                           });
                           console.log(event.target.value);
                         }}
                         type="date"
                         fullWidth
                       />
                     </Grid>
                     <Grid item fullWidth xs={12}>
                       <TextField
                         id="dob"
                         label="Enddate"
                         defaultValue={this.state.updatedresult.endDate}
                         onChange={(event) => {
                           this.setState({
                             updatedresult: {
                               ...this.state.updatedresult,
                               endDate: event.target.value,
                             },
                           });
                           console.log(event.target.value);
                         }}
                         type="date"
                         fullWidth
                       />
                     </Grid>
                     <Grid item fullWidth xs={12}>
                       <TextField
                         id="middleName"
                         label="School"
                         defaultValue={this.state.updatedresult.school}
                         onChange={(event) =>
                           this.setState({
                             updatedresult: {
                               ...this.state.updatedresult,
                               school: event.target.value,
                             },
                           })
                         }
                         type="text"
                         fullWidth
                       />
                     </Grid>

                     <Grid item fullWidth xs={12}>
                       <TextField
                         id="surname"
                         label="Degree"
                         defaultValue={this.state.updatedresult.degree}
                         onChange={(event) => {
                           this.setState({
                             updatedresult: {
                               ...this.state.updatedresult,
                               degree: event.target.value,
                             },
                           });
                         }}
                         type="text"
                         fullWidth
                       />
                     </Grid>
                     <Grid item fullWidth xs={12}>
                       <InputLabel id="state">Academic type</InputLabel>
                       <Select
                         id="Academic type"
                         onChange={(event) => {
                           this.setState({
                             updatedresult: {
                               ...this.state.updatedresult,
                               academicType: event.target.value,
                             },
                           });
                         }}
                         defaultValue={this.state.updatedresult.academicType}
                         fullWidth
                       >
                         {this.state.types.map((type) => (
                           <MenuItem id={type.id} value={type.id}>
                             {type.academicType}
                           </MenuItem>
                         ))}
                       </Select>
                     </Grid>
                     <Grid item fullWidth xs={12}>
                       <TextField
                         id="reasonForUpdating"
                         label="Reason for updating:"
                         helperText="update reason can be less than 250 characters"
                         onChange={(event) =>
                           this.setState({
                             updatedresult: {
                               ...this.state.updatedresult,
                               update_reason: event.target.value,
                             },
                           })
                         }
                         type="text"
                         fullWidth
                       />
                     </Grid>
                   </Grid>
                 </DialogContent>
                 <DialogActions style={{ padding: 10 }}>
                   <Button
                     color="primary"
                     // disabled={this.state.updatedresult.update_reason.length === 0}
                     variant="contained"
                     onClick={() => {
                       this.updatedetails(this.state.updatedresult.id);
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
                         buttondisabled: "disabled",
                       })
                     }
                   >
                     Cancel
                   </Button>
                 </DialogActions>
               </Dialog>
               <Dialog
                 open={this.state.addnewdialog}
                 onClose={() =>
                   this.setState({
                     updateDialogOpen: false,
                     buttondisabled: "disabled",
                   })
                 }
                 aria-labelledby="form-dialog-title"
               >
                 <DialogTitle id="form-dialog-title" align="center">
                   Add new academics
                 </DialogTitle>
                 <DialogContent>
                   <DialogContentText align="center">
                     Enter the details of your academics to be added
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
                         name="Start date"
                         InputLabelProps={{ shrink: true, required: true }}
                         label="Startdate"
                         onChange={(event) => {
                           this.setState({
                             newAcademics: {
                               ...this.state.newAcademics,
                               startDate: event.target.value,
                             },
                           });
                           console.log(event.target.value);
                         }}
                         type="date"
                         fullWidth
                       />
                     </Grid>
                     <Grid item fullWidth xs={12}>
                       <TextField
                         name="End date"
                         label="Enddate"
                         InputLabelProps={{ shrink: true, required: true }}
                         onChange={(event) => {
                           this.setState({
                             newAcademics: {
                               ...this.state.newAcademics,
                               endDate: event.target.value,
                             },
                           });
                           console.log(event.target.value);
                         }}
                         type="date"
                         fullWidth
                       />
                     </Grid>
                     <Grid item fullWidth xs={12}>
                       <TextField
                         id="School"
                         label="School"
                         onChange={(event) =>
                           this.setState({
                             newAcademics: {
                               ...this.state.newAcademics,
                               school: event.target.value,
                             },
                           })
                         }
                         type="text"
                         fullWidth
                       />
                     </Grid>
                     <Grid item fullWidth xs={12}>
                       <InputLabel id="state">Academic type</InputLabel>
                       <Select
                         id="Academic type"
                         onChange={(event) => {
                           this.setState({
                             newAcademics: {
                               ...this.state.newAcademics,
                               academicType: event.target.value,
                             },
                           });
                         }}
                         fullWidth
                       >
                         {this.state.types.map((type) => (
                           <MenuItem id={type.id} value={type.id}>
                             {type.academicType}
                           </MenuItem>
                         ))}
                       </Select>
                     </Grid>

                     <Grid item fullWidth xs={12}>
                       <TextField
                         id="Degree"
                         label="Degree"
                         onChange={(event) => {
                           this.setState({
                             newAcademics: {
                               ...this.state.newAcademics,
                               degree: event.target.value,
                             },
                           });
                         }}
                         type="text"
                         fullWidth
                       />
                     </Grid>
                   </Grid>
                 </DialogContent>
                 <DialogActions style={{ padding: 10 }}>
                   <Button
                     color="primary"
                     variant="contained"
                     onClick={() => {
                       this.addacademics();
                     }}
                   >
                     Add
                   </Button>
                   <Button
                     color="secondary"
                     variant="contained"
                     onClick={() =>
                       this.setState({
                         addnewdialog: false,
                         selectedIndex: -1,
                         buttondisabled: "disabled",
                       })
                     }
                   >
                     Cancel
                   </Button>
                 </DialogActions>
               </Dialog>
               <Dialog
                 fullWidth={"md"}
                 maxWidth={"md"}
                 open={this.state.historyDialogeOpen}
                 onClose={() => this.setState({ historyDialogeOpen: false })}
                 aria-labelledby="responsive-dialog-title"
               >
                 <DialogTitle id="form-dialog-title" align="center">
                   Academics History
                 </DialogTitle>
                 {/* <DialogContent> */}
                 <TableContainer p={3}>
                   <Table stickyHeader>
                     <TableHead>
                       <TableRow style={{ backgroundColor: "black" }}>
                         {[
                           "StartDate",
                           "EndDate",
                           "School",
                           "Degree",

                           "Status",
                           "CreatedOn",
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

                     {this.state.historyloading ? (
                       this.loading()
                     ) : (
                       <TableBody>
                         {this.state.history.map((row, index) => (
                           <TableRow key={row.id}>
                             <TableCell align="center">
                               {" "}
                               {row.startDate}{" "}
                             </TableCell>
                             <TableCell align="center">{row.endDate}</TableCell>
                             <TableCell align="center">{row.school}</TableCell>
                             <TableCell align="center">{row.degree}</TableCell>
                             <TableCell align="center">{row.status}</TableCell>
                             <TableCell component="th" align="center">
                               {new Date(row.created_on).toDateString()}
                             </TableCell>
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
                       this.setState({
                         historyDialogeOpen: false,
                         selectedIndex: -1,
                       })
                     }
                   >
                     Close
                   </Button>
                 </DialogActions>
               </Dialog>
               <Dialog
                 //  fullWidth={"sm"}
                 //  maxWidth={"sm"}
                 open={this.state.viewDialogeOpen}
                 onClose={() => this.setState({ viewDialogeOpen: false })}
                 aria-labelledby="responsive-dialog-title"
               >
                 <DialogTitle id="form-dialog-title">
                   <Typography variant="subtitle1" gutterBottom align="center">
                     View pictures
                   </Typography>
                 </DialogTitle>
                 <DialogContent>
                   <Grid
                     container
                     direction="row"
                     justify="space-evenly"
                     alignItems="center"
                   >
                     <GridList
                       cellHeight={160}
                       style={{ height: 500, width: 500 }}
                       cols={3}
                     >
                       {this.state.pictureloading
                         ? this.loading()
                         : pictures.map((pic, index) => {
                           var ext = pic.picture.split('.').pop();  
                           if(ext.indexOf("png") != -1 || ext.indexOf("jpeg") != -1 || ext.indexOf("jpg") != -1 || ext.indexOf("gif") != -1 || ext.indexOf("svg") != -1 || ext.indexOf("bmp") != -1){
                            return(
                              <GridListTile key={pic.id} cols={1}>
                               <img src={pic.picture}/>
                             </GridListTile>) 
                           }
                           else if(ext.indexOf("docx") != -1 ){
                            return(
                              <GridListTile key={pic.id} cols={1}>
                               <img src={docx}/>
                             </GridListTile>)
                           }
                           else if(ext.indexOf("pdf") != -1 ){
                            return(
                              <GridListTile key={pic.id} cols={1}>
                               <img src={pdf}/>
                             </GridListTile>)
                           }
                           else if(ext.indexOf("ppt") != -1 ){
                            return(
                              <GridListTile key={pic.id} cols={1}>
                               <img src={ppt}/>
                             </GridListTile>)
                           }
                           else if(ext.indexOf("xslx") != -1 ){
                            return(
                              <GridListTile key={pic.id} cols={1}>
                               <img src={xls}/>
                             </GridListTile>)
                           }
                           else if(ext.indexOf("csv") != -1 ){
                            return(
                              <GridListTile key={pic.id} cols={1}>
                               <img src={csv}/>
                             </GridListTile>)
                           }
                           else{
                            return(
                              <GridListTile key={pic.id} cols={1}>
                               <img src={file}/>
                             </GridListTile>)
                           }
                         }
                             

                             // <Grid container>
                             //     <Grid item xs={12}>
                             // <image src={pic.picture}/>
                             //       {/* {pic.picture} */}
                             //     </Grid>
                             //   </Grid>
                           )}{" "}
                     </GridList>
                   </Grid>
                 </DialogContent>
                 <DialogActions style={{ padding: 15 }}>
                   <Button
                     variant="contained"
                     color="secondary"
                     onClick={() =>
                       this.setState({
                         viewDialogeOpen: false,
                         selectedIndex: -1,
                       })
                     }
                   >
                     Close
                   </Button>
                 </DialogActions>
               </Dialog>
               <Dialog
                 open={this.state.uploadDialougeOpen}
                 onClose={() => this.setState({ uploadDialougeOpen: false })}
                 aria-labelledby="form-dialog-title"
               >
                 <DialogTitle id="form-dialog-title">
                   choose your file
                 </DialogTitle>
                 <DialogContent>
                   <Grid container p={1}>
                     <TextField
                       type="file"
                       onChange={(event) => {
                         this.setState({
                           uploadpictures: event.target.files[0],
                         });
                       }}
                     ></TextField>
                   </Grid>
                   <Box p={1}>
                     <Grid
                       container
                       direction="column-reverse"
                       alignItems="flex-end"
                     >
                       <Button
                         color="primary"
                         variant="contained"
                         onClick={() => {
                           this.postpictures(this.state.pictureid);
                         }}
                       >
                         upload
                       </Button>
                     </Grid>
                   </Box>
                 </DialogContent>
               </Dialog>
               {
                 <Dialog
                   open={this.state.walletdialog}
                   onClose={() => this.setState({ walletdialog: false })}
                   aria-labelledby="form-dialog-title"
                 >
                   <DialogTitle
                     id="form-dialog-title"
                     align="center"
                     justify="center"
                   >
                     You need to pay {this.state.amount} for this service from
                     wallet
                   </DialogTitle>
                   <DialogContent></DialogContent>
                   <DialogActions>
                     <Button
                       color="primary"
                       variant="contained"
                       onClick={() =>
                         this.setState(
                           {
                             walletdialog: false,
                           },
                           this.pay
                         )
                       }
                     >
                       Pay
                     </Button>
                     <Button
                       color="secondary"
                       variant="contained"
                       onClick={() =>
                         this.setState({
                           walletdialog: false,
                         })
                       }
                     >
                       Cancel
                     </Button>
                   </DialogActions>
                 </Dialog>
               }
             </div>
           );
         }
         render() {
           return this.state.loading ? this.loading() : this.gettable();
         }
       }

export default index;
