import React, { Component } from "react";
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
} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
import axios from "axios";

let result = [];

const styles = (theme) => ({});

let token1 = "";
let token = "";
let id = "";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//   const { classes } = this.props;
export class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            enteredtext: "",
            selectedPosition: "",
            positionCategory: "",
            selectedIndex: "",

            addSnackbar: false,
            deletedSnackbar: false,
            errorSnackbar: false,
            deleteDialogBox: false,
        };
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
    async getPositions() {
        this.setState({ loading: true });
        await axios
            .get("https://cors-anywhere.herokuapp.com/http://3.22.17.212:8000/api/v1/resManager/job/categories", {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                result = res.data;
                console.log(result);
            });
        this.setState({ loading: false });
    }
    async componentDidMount() {
        token1 = localStorage.getItem("Token");
        token = "Token " + token1;
        id = localStorage.getItem("id");

        this.getPositions();
    }
    async addPosition() {
        console.log('boom', this.state.positionCategory)
        let headers = {
            headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data",
            },
        };
        let bodyFormData = new FormData();
        bodyFormData.append("positionCategory", this.state.positionCategory);

        await axios
            .post(
                "http://3.22.17.212:8000/api/v1/resManager/job/categories/",
                bodyFormData,
                headers
            )
            .then((response) => {
                console.log(response);
                this.getPositions();    
            });
            await this.setState({ deletedSnackbar: true })
    }
    async deletePosition(id) {
        // console.log("......",id)
        await axios.delete(
            "http://3.22.17.212:8000/api/v1/resManager/job/categories/" + id + "/",
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        this.getPositions();
    }
    displaytable() {
        return (
            <>
                <Grid container justify="space-between" alignItems="center" spacing={4}>
                    <Grid item>
                        <Typography variant="h4">Job Categories</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Autocomplete
                            options={result}
                            getOptionLabel={(option) => option.positionCategory}
                            size="small"
                            id="positions"
                            Username
                            value={this.state.selectedPosition}
                            onChange={(event, value) => {
                                this.setState({ selectedPosition: value });
                                console.log("selectedPosition", value);
                            }}
                            inputValue={this.state.enteredtext}
                            onInputChange={(event, newInputValue) => {
                                this.setState({ enteredtext: newInputValue });
                                // console.log(this.state.positionCategory);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Job Categories"
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
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
                            label="Enter new category"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            onChange={(event) => {
                                this.setState({ positionCategory: event.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                            size="small"
                            color="secondary"
                            onClick={() => {
                                this.addPosition();
                            }}
                        >
                            <AddIcon />
                        </Fab>
                    </Grid>

                    <TableContainer
                        component={Paper}
                        style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
                        elevation={5}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: "black" }}>
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.positionCategory}</TableCell>
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
        );
    }

    handleDeleteClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ deletedSnackbar: false });
      };

    addSnackbar() {
        return (
            <div>
                <Snackbar open={this.state.deletedSnackbar} autoHideDuration={3000} onClose={this.handleDeleteClose}>
                    <Alert severity="success" onClose={this.handleDeleteClose}>
                    Successfully added!
        </Alert>
                </Snackbar>
            </div>
        );
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
                this.deletePosition(this.state.deleteid);
                this.setState({deleteDialogBox: false})
              }}
          >
            Delete
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={()=> this.setState({deleteDialogBox: false})}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        );
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                {this.state.loading ? this.isloading() : this.displaytable()}

                {/* </Paper> */}
                {this.addSnackbar()}
            </div>
        );
    }
}

export default withStyles(styles)(index);