import React, { Component } from 'react'
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  Button,
  TableContainer,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from "@material-ui/icons/Phone";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {get,post,del}from '../../../../../../API'
let token=""
let id=""
export default class ratingquestions extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             loading:true,
             result:[],
             newid:""
        }
    }
    async addid() {
        
        let bodyFormData = new FormData();
        bodyFormData.append("question", this.state.newid);
    
        await 
          post(
            "http://3.22.17.212:8000/api/v1/resManager/job/surveyq/employee/rating/",token,
            bodyFormData,
            
          )
          .then((response) => {
            // this.setState( ...this.state.result,  {id: response.data.id, idSource:response.data.idSource} );
            console.log(response);
            console.log("result", this.state.result);
          });
        this.getid();
      }
      async deleteid(id) {
        await del(
          "http://3.22.17.212:8000/api/v1/resManager/job/surveyq/employee/rating/" + id + "/",
          token,""
        );
        this.getid();
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
      async getid() {

        await get("http://3.22.17.212:8000/api/v1/resManager/job/surveyq/employee/rating/",token,"")
      .then((res) => {
        this.setState({ result: res.data });
        console.log(this.state.result);

      });
    
      }
      async componentDidMount() {
     
        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");
           this.setState({ loading: true });
           await this.getid();
           this.setState({ loading: false });
       
         }
    render() {
        return (
            <div style={{ marginTop: 20 }}>
            {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
            {this.state.loading ?
              this.isloading()
              : (
                <>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid item>
                      <Typography variant="h4">Rating Questions</Typography>
                    </Grid>
    
                    {/* <Grid item xs={4}>
                      <Autocomplete
                        options={this.state.result}
                        getOptionLabel={(option) => option.idSource}
                        size="small"
                        id="id"
                        value={this.state.selectedid}
                        onChange={(event, value) => {
                          this.setState({ selectedid: value });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="id"
                            margin="normal"s
                            variant="outlined"
                            size="small"
                          />
                        )}
                      />
                    </Grid> */}
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
                        label="Enter new Question"
                        variant="outlined"
                        size="medium"
                        fullWidth
                        onChange={(event) => {
                          this.setState({ newid: event.target.value });
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Fab
                        size="small"
                        color="secondary"
                        onClick={() => {
                          this.addid();
                        }}
                      >
                        <AddIcon />
                      </Fab>
                    </Grid>
    
                    <TableContainer
                      component={Paper}
                      style={{
                        marginTop: 20,
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      elevation={5}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow style={{ backgroundColor: "black" }}>
                            <TableCell align="left">Question</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.result.map((row, index) => (
                            <TableRow key={row.id}>
                              <TableCell align="left">
                                {row.question}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  color="primary"
                                  variant="outlined"
                                  onClick={() => {
                                    this.setState({
                                      deleteDialogBox: true,
                                      selectedIndex: index,
                                      deleteid: row.id,
                                    });
                                  }}
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
                  {this.deleteDialog()}
                </>
              )}
          </div>
        )
    }
    deleteDialog(selectedIndex) {
        return(
        <div>
        <Dialog
        open={this.state.deleteDialogBox}
        onClose={() => this.setState({ deleteDialogBox: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Current entry will be deleted, do you want to
            continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: 15 }}>
          <Button
            style={{ width: 85 }}
            color="primary"
            variant="contained"
            onClick={() => {
                this.deleteid(this.state.deleteid);
                this.setState({deleteDialogBox: false})
              }}
          >
            Delete
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
                this.setState({deleteDialogBox: false})
              }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        );
    }
}
