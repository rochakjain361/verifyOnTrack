import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    Typography,
    Card,
    ButtonGroup,
    Button,
    CircularProgress
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';


let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:9000"

const styles = theme => ({
})

class index extends React.Component {

    state = {
        dateFilter: "",
        industryCategory: "",
        jobCategory: "",

        dateFilterString: "today",
        isLoading: true,
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 

    isloading() {
        return (
            <>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    display="flex"
                    style={{ minHeight: "0vh" }}
                >
                    <CircularProgress />
                </Grid>
            </>
        );
    }

    async fetchDateFilter() {
        const userId = this.props.userId;
      const code = this.props.code;
        let response = await fetch(api + "/getKPI?filter=" + this.state.dateFilterString,
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('dateFilter:', response)

        this.setState({ dateFilter: response });

        this.setState({ industryCategory: this.state.dateFilter.IndustryCat })
        this.setState({ jobCategory: this.state.dateFilter.JobCat })
        this.setState({isLoading: false})

    }

    async componentDidMount() {
        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

        await this.fetchDateFilter()
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Card variant='outlined' style={{ minHeight: 50, padding: 20 }}>
                            <Grid item xs container direction="row" justify="flex-end" alignItems="center" spacing={2}>

                                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                    <Button
                                    // onClick={()=>this.fetchDateFilter("today")}
                                        onClick={()=> this.setState({dateFilterString: "today", isLoading: true},()=> this.fetchDateFilter())}
                                    >
                                        Today
                                    </Button>

                                    <Button
                                    onClick={()=> this.setState({dateFilterString: "week", isLoading: true}, ()=> this.fetchDateFilter())}
                                    >
                                        This Week
                                    </Button>

                                    <Button
                                    onClick={()=> this.setState({dateFilterString: "month", isLoading: true},()=> this.fetchDateFilter())}
                                    >
                                        This Month
                                    </Button>

                                    <Button
                                    onClick={()=> this.setState({dateFilterString: "year", isLoading: true},()=> this.fetchDateFilter())}
                                    >
                                        This Financial Year
                                    </Button>

                                </ButtonGroup>

                            </Grid>
                        </Card>
                    </Grid>

                   <>
                   {this.state.isLoading ? this.isloading() : 
                   <>
                     <Grid item xs={3}>

                     <Card elevation={6} style={{ minHeight: 175, padding: 20, background: '#651fff' }}>
                         <Grid item xs container direction="row"
                             justify="center"
                             alignItems="center" spacing={2}>
                             <Grid item xs>
                                 <Typography variant="h5" component="h5" style={{ color: "white" }}>Employers</Typography>
                             </Grid>
                             <Grid item xs>
                                 <SupervisedUserCircleIcon style={{ color: "white" }} />
                             </Grid>
                             <Grid item xs={6}>
                                 <Typography variant="h2" component="h2" style={{ fontWeight: "bold", color: "white" }}>{this.state.dateFilter.employerCnt}</Typography>

                             </Grid>
                         </Grid>
                     </Card>

                 </Grid>

                 <Grid item xs={3}>
                     <Card elevation={6} style={{ minHeight: 175, padding: 20, background: '#00b0ff' }}>
                         <Grid item xs container direction="row"
                             justify="center"
                             alignItems="center" spacing={2}>
                             <Grid item xs>
                                 <Typography variant="h5" component="h5" style={{ color: "white" }}>Employees</Typography>
                             </Grid>
                             <Grid item xs>
                                 <SupervisorAccountIcon style={{ color: "white" }} />
                             </Grid>
                             <Grid item xs={6}>
                                 <Typography variant="h2" component="h2" style={{ fontWeight: "bold", color: "white" }}>{this.state.dateFilter.employeeCnt}</Typography>

                             </Grid>
                         </Grid>
                     </Card>
                 </Grid>

                 <Grid item xs={3}>
                     <Card elevation={6} style={{ minHeight: 175, padding: 20, background: '#1de9b6' }}>
                         <Grid item xs container direction="row"
                             justify="center"
                             alignItems="center" spacing={2}
                             style={{ marginBottom: 10 }}
                         >
                             <Grid item xs>
                                 <Typography variant="h5" component="h5" style={{ color: "white" }}>Approval</Typography>
                             </Grid>
                             <Grid item xs>
                                 <ThumbUpIcon style={{ color: "white" }} />
                             </Grid>
                             <Grid item xs={6}>
                                 <Typography variant="h2" component="h2" style={{ fontWeight: "bold", color: "white" }}>{this.state.dateFilter.accessCodeCnt}</Typography>

                             </Grid>
                         </Grid>
                     </Card>
                 </Grid>

                 <Grid item xs={3}>
                     <Card elevation={6} style={{ minHeight: 175, padding: 20, background: '#ff9800' }}>
                         <Grid item xs container direction="row"
                             justify="center"
                             alignItems="center"
                             spacing={2}>
                             <Grid item xs>
                                 <Typography variant="h6" component="h6" style={{ color: "white" }}>Employement</Typography>
                             </Grid>
                             <Grid item xs>
                                 <WorkOutlineIcon style={{ color: "white" }} />
                             </Grid>
                             <Grid item xs={6}>
                                 <Typography variant="h2" component="h2" style={{ fontWeight: "bold", color: "white" }}>{this.state.dateFilter.employmentCodeCnt}</Typography>

                             </Grid>
                         </Grid>
                     </Card>
                 </Grid>

                 <Grid item xs={6}>
                     <Card elevation={6} style={{ minHeight: 400 }}>
                         <TableContainer component={Paper}>
                             <Table  aria-label="simple table">
                                 <TableHead>
                                     <TableRow>
                                         <TableCell><Typography variant="body1" style={{fontWeight: "bold"}}>Top 10 Industries</Typography></TableCell>
                                         <TableCell align="right"></TableCell>
                                         
                                     </TableRow>
                                 </TableHead>
                                 <TableBody>
                                     
                                 {this.state.industryCategory=== ""? null : this.state.industryCategory.map((item)=> (
                                         <TableRow>
                                                 <TableCell>{item.category}</TableCell>
                                                 <TableCell align="right">{item.category__count}</TableCell>
                                         </TableRow>
                                         )) }
                                   
                                 </TableBody>
                             </Table>
                         </TableContainer>
                     </Card>
                 </Grid>

                 <Grid item xs={6}>
                 <Card elevation={6} style={{ minHeight: 400 }}>
                         <TableContainer component={Paper}>
                             <Table  aria-label="simple table">
                                 <TableHead>
                                     <TableRow>
                                         <TableCell><Typography variant="body1" style={{fontWeight: "bold"}}>Top 10 Job Categories</Typography></TableCell>
                                         <TableCell align="right"></TableCell>
                                         
                                     </TableRow>
                                 </TableHead>
                                 <TableBody>
                                         {this.state.jobCategory=== ""? null : this.state.jobCategory.map((item)=> (
                                         <TableRow>
                                                 <TableCell>{item.jobCategory}</TableCell>
                                                 <TableCell align="right">{item.jobCategory__count}</TableCell>
                                         </TableRow>
                                         )) }
                                   
                                 </TableBody>
                             </Table>
                         </TableContainer>
                     </Card>
                 </Grid>
                 </>
                   }
                   </>

                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(index);
