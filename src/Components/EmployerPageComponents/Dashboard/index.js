import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    Typography,
    Card,
    ButtonGroup,
    Button,
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
import PinDropIcon from '@material-ui/icons/PinDrop';


let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:9000"

const styles = theme => ({
})

class index extends React.Component {

    state = {
        DashboardCounts: "",
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 

    async fetchDashboardCounts() {
        const userId = this.props.userId;
      const code = this.props.code;
        let response = await fetch(api + "/getEmployerKpi",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('DashboardCounts:', response)
        this.setState({ DashboardCounts: response });
    }
    async componentDidMount() {
        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

        this.fetchDashboardCounts()
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
                    {/* <Grid item xs={12}>
                        <Card variant='outlined' style={{ minHeight: 50, padding: 20 }}>
                            <Grid item xs container direction="row" justify="flex-end" alignItems="center" spacing={2}>

                                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                    <Button>Today</Button>
                                    <Button>This Week</Button>
                                    <Button>This Month</Button>
                                    <Button>This Financial Year</Button>
                                </ButtonGroup>

                            </Grid>
                        </Card>
                    </Grid> */}

                    <Grid item xs={3}>

                        <Card elevation={6} style={{ minHeight: 175, padding: 20, background: '#651fff' }}>
                            <Grid item xs container direction="column"
                                justify="center"
                                alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography variant="h5" component="h5" style={{ color: "white" }}>Locations</Typography>
                                </Grid>
                                <Grid item xs>
                                    <PinDropIcon style={{ color: "white" }} />
                                </Grid>
                                <Grid item >
                                    <Typography variant="h2" component="h2" style={{ fontWeight: "bold", color: "white" }}>{this.state.DashboardCounts.locationCnt}</Typography>

                                </Grid>
                            </Grid>
                        </Card>

                    </Grid>

                    <Grid item xs={3}>
                        <Card elevation={6} style={{ minHeight: 175, padding: 20, background: '#00b0ff' }}>
                            <Grid item xs container direction="column"
                                justify="center"
                                alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography variant="h5" component="h5" style={{ color: "white" }}>Employees</Typography>
                                </Grid>
                                <Grid item xs>
                                    <SupervisorAccountIcon style={{ color: "white" }} />
                                </Grid>
                                <Grid item >
                                    <Typography variant="h2" component="h2" style={{ fontWeight: "bold", color: "white" }}>{this.state.DashboardCounts.employeeCnt}</Typography>

                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={3}>
                        <Card elevation={6} style={{ minHeight: 175, padding: 20, background: '#1de9b6' }}>
                            <Grid item xs container direction="column"
                                justify="center"
                                alignItems="center" spacing={2}
                                // style={{ marginBottom: 10 }}
                            >
                                <Grid item xs>
                                    <Typography variant="h5" component="h5" style={{ color: "white" }}>Access</Typography>
                                </Grid>
                                <Grid item xs>
                                    <VpnKeyIcon style={{ color: "white" }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h2" component="h2" style={{ fontWeight: "bold", color: "white" }}>{this.state.DashboardCounts.pendingAccessCodeCnt}</Typography>

                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={3}>
                        <Card elevation={6} style={{ minHeight: 175, padding: 20, background: '#ff9800' }}>
                            <Grid item xs container direction="column"
                                justify="center"
                                alignItems="center"
                                spacing={2}>
                                <Grid item xs>
                                    <Typography variant="h5" component="h5" style={{ color: "white" }}>Employement</Typography>
                                </Grid>
                                <Grid item xs>
                                    <WorkOutlineIcon style={{ color: "white" }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h2" component="h2" style={{ fontWeight: "bold", color: "white" }}>{this.state.DashboardCounts.pendingemploymentCodeCnt}</Typography>

                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    {/* <Grid item xs={6}>
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
                                        
                                            <TableRow>
                                                <TableCell>Amazon</TableCell>
                                            <TableCell align="right">755</TableCell>
                                            </TableRow>
                                      
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
                                        
                                            <TableRow>
                                                <TableCell>Software</TableCell>
                                            <TableCell align="right">755</TableCell>
                                            </TableRow>
                                      
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Grid> */}

                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(index);
