import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    CircularProgress,
    Grid,
    Typography,
    ListItemAvatar,
    Avatar,
    ListItemText,
    List,
    ListItem,
    Divider,
    Button
} from '@material-ui/core/';

import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:8000"

const rows = [
    {
        "createdOn": "09/12/2020",
        "codeString": "testCodeString1",
        "employerCompanyField": "testEmployerCompanyField1",
        "codeStatus": "testCodeStatu1s",
        "statusChangeDate": "09/12/2020",
    },
    {
        "createdOn": "09/12/2020",
        "codeString": "testCodeString1",
        "employerCompanyField": "testEmployerCompanyField1",
        "codeStatus": "testCodeStatus2",
        "statusChangeDate": "09/12/2020",
    }
];

const styles = theme => ({

})

class index extends Component {

    state = {
        isLoading: true,
        allEmployees: [],
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

    async fetchAllEmployees() {

        let response = await fetch(api + "/api/v1/employers/employees",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('allEmployees:', response)
        this.setState({ allEmployees: response });
    }

    async componentDidMount() {

        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

        this.fetchAllEmployees();

    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20 }}>
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item xs={8}>
                        <Typography variant='h4'>
                            My Employees
                    </Typography>
                    </Grid>

                    {/* <Grid item>
                        {this.state.allEmployees.results.map((emp) => (
                            <Typography>{emp.status}</Typography>
                        ))}
                    </Grid> */}

                </Grid>

                <Grid container justify='flex-start' alignItems='center' spacing={2} style={{ marginTop: 20 }}>
                    {this.state.allEmployees.map((emp)=>(
                    <Grid item xs={12}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container spacing={3} alignItems='center'>
                                    <Grid item xs={1}>
                                        <ListItemAvatar>
                                            <Avatar
                                                // src={this.state.result[0].picture}
                                                style={{ height: "6rem", width: "6rem" }}
                                            >
                                                <img src={emp.employee.picture_url} width="93" height="93" alt="" />
                                            </Avatar>
                                        </ListItemAvatar>
                                    </Grid>

                                    <Grid item xs={7} style={{ marginLeft: 15 }}>
                                        {/* <ListItemText primary="Vacation" secondary="July 20, 2014" /> */}
                                        <Typography variant='h5'>{emp.employee.firstname} {emp.employee.middlename} {emp.employee.surname}</Typography>
                                        <Typography variant='h6' color="textSecondary">
                                            {emp.jobDetails.jobTitle}
                                         </Typography>
                                        <Typography variant='subtitle1' color="textSecondary">
                                            {emp.employee.email}
                                         </Typography>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Typography variant='subtitle1' color="textSecondary">
                                        {emp.jobDetails.ontrac_id}
                                         </Typography>
                                    </Grid>
                                </Grid>

                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item xs={12}>
                                    <List component="nav" aria-label="mailbox folders">
                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <Typography variant='subtitle1' color="textSecondary">
                                                        Date of birth
                                         </Typography>
                                                </Grid>

                                                <Grid item xs={9}>
                                                    <Typography variant='subtitle1'>
                                                        1987-06-11
                                            </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <Divider />

                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <Typography variant='subtitle1' color="textSecondary">
                                                        Job position
                                         </Typography>
                                                </Grid>

                                                <Grid item xs={9}>
                                                    <Typography variant='subtitle1'>
                                                    {emp.jobDetails.job_category_field}
                                            </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <Divider />

                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <Typography variant='subtitle1' color="textSecondary">
                                                        Start date
                                         </Typography>
                                                </Grid>

                                                <Grid item xs={9}>
                                                    <Typography variant='subtitle1'>
                                                    {emp.jobDetails.startDate}
                                            </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <Divider />

                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <Typography variant='subtitle1' color="textSecondary">
                                                        End date
                                         </Typography>
                                                </Grid>

                                                <Grid item xs={9}>
                                                    <Typography variant='subtitle1'>
                                                    {emp.jobDetails.endDate === null ? ('NA') : (emp.jobDetails.endDate)}
                                            </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <Divider />

                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <Typography variant='subtitle1' color="textSecondary">
                                                        Job description
                                         </Typography>
                                                </Grid>

                                                <Grid item xs={9}>
                                                    <Typography variant='subtitle1'>
                                                    {emp.jobDetails.jobDescription}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                 ))}
                </Grid>
            </div>

        );
    }
}

export default withStyles(styles)(index);
