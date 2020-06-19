import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer } from '@material-ui/core/';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"
const cors = "https://cors-anywhere.herokuapp.com/"

const styles = theme => ({

})

class index extends Component {

    state = {
        allJobCategories: [],
        selectedJobCategories: [],

        jobCategoriesArr: [],
        newJobCategories: "",
    }

    async getJobCategories() {
        let response = await fetch(cors + api + "/api/v1/resManager/job/categories",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log("getJobCategoriesSuccess:", response)
        this.setState({ allJobCategories: response });
        this.setState({ jobCategoriesArr: this.state.allJobCategories.map(jobCategory => jobCategory.positionCategory) })
        console.log("allJobCategories:", this.state.jobCategoriesArr)
        console.log("allJobCategoriesArrList:", this.state.jobCategoriesArr)
    }

    async componentDidMount() {
        this.getJobCategories();
    }

    render() {

        const allJobCategoriesList = {
            options: this.state.allJobCategories,
            getOptionLabel: (jobCategory) => jobCategory.positionCategory,
        };

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item>
                        <Typography variant='h4'>
                            Job Categories
                            </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="manageJobCategories" style={{ marginLeft: 10 }}>Search Job Categories</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="manageJobCategories"
                                id="manageJobCategories"
                                value={this.state.selectedJobCategories}
                                onChange={event => this.setState({ selectedJobCategories: event.target.value })}
                            >
                                {
                                    this.state.jobCategoriesArr.map(jobCategory => <MenuItem key={jobCategory} value={jobCategory}>{jobCategory}</MenuItem>)

                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* <Grid item xs={6}>
                        <Autocomplete
                            size='small'
                            {...allJobCategoriesList}
                            id="addressTypes"
                            Username
                            onChange={event => this.setState({ selectedJobCategories: event.target.value })}
                            value={this.state.selectedJobCategories}
                            renderInput={(params) => <TextField {...params} label="Search jobCategory types" margin="normal" variant='outlined' size='small' />}
                        />
                    </Grid> */}

                </Grid>

                <Grid container justify='flex-start' alignItems='center' style={{ marginTop: 20 }} spacing={2}>

                    <Grid item xs={3}>

                        <TextField
                            label="Enter Job Category to add"
                            variant='outlined'
                            size='medium'
                            fullWidth
                            onChange={(event) => {
                                this.setState({ newJobCategories: event.target.value });
                            }}
                            value={this.state.newJobCategories}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                            onClick={() => {
                                this.addJobCategory();
                                // console.log(this.state.newJobCategories)
                            }}
                            size="small"
                            color="secondary">
                            <AddIcon />
                        </Fab>
                    </Grid>

                    <TableContainer component={Paper} style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'black' }}>
                                    <TableCell align="left">Job Category</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.allJobCategories.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.positionCategory}</TableCell>
                                        <TableCell align="right"><Button variant='outlined' size='small' onClick={() => { this.deleteJobCategories(index) }} color='secondary'>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
                {/* </Paper> */}
            </div>
        )
    }

    async addJobCategory() {
        let bodyData = {
            'positionCategory': this.state.newJobCategories,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch( cors + api + '/api/v1/resManager/job/categories',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'positionCategory': this.state.newJobCategories,
                    })
                }
            );
            console.log('Position:', this.state.newJobCategories)
            response = await response.json();
            console.log('AddJobCategoriesSuccess:', response);
            await this.getJobCategories();
            this.setState({ newJobCategories: "" })
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async deleteJobCategories(index) {
        try {
            let response = await fetch(api + "/api/v1/resManager/job/categories/" + index + "/",
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': token,
                        // 'Content-Type': 'application/json'
                    }
                }
            );
            response = await response.json();
            console.log('delJobCategoriesSuccess:', response);
            await this.getJobCategories();
        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }
}

export default withStyles(styles)(index);

