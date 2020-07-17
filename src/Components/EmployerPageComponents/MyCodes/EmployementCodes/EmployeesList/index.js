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
    Button,
    IconButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    Select,
    MenuItem,

} from '@material-ui/core/';

import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';


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
        allOfboardTypes: [],
        allLeavingReasons: [],
        allsurveyQuestions: [],
        allsurveyRatings: [],
        allJobCategories: [],

        selectedOffboardType: '',
        selectedLeavingReason: '',
        surveyRadio: '',

        selectedJobType: '',
        selectedLeaving: '',
        lastDate: '',
        terminationDescription: '',

        terminateDialogOpen: false,
        updateDialogOpen: false,
        commentDialogOpen: false,
        terminateConfirmationOpen: false

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

    async fetchOffboardtypes() {

        let response = await fetch(api + "/api/v1/resManager/job/offboardTypes/",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('allOfboardTypes:', response)
        this.setState({ allOfboardTypes: response });
    }

    async fetchLeavingReasons() {

        let response = await fetch(api + "/api/v1/resManager/job/leaving-reasons/",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('allLeavingReasons:', response)
        this.setState({ allLeavingReasons: response });
    }

    async fetchJobCategories() {

        let response = await fetch(api + "/api/v1/resManager/job/categories/",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('allJobCategories:', response)
        this.setState({ allJobCategories: response });
    }

    async fetchSurveyQuestions() {

        let response = await fetch(api + "/api/v1/resManager/job/surveyq/employee/choice/",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('allsurveyQuestions:', response)
        this.setState({ allsurveyQuestions: response });
    }

    async fetchSurveyRatings() {

        let response = await fetch(api + "/api/v1/resManager/job/surveyq/employee/rating/",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('allsurveyRatings:', response)
        this.setState({ allsurveyRatings: response });
    }

    async componentDidMount() {

        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

        this.fetchAllEmployees();
        this.fetchOffboardtypes();
        this.fetchLeavingReasons();
        this.fetchSurveyQuestions();
        this.fetchSurveyRatings();
        this.fetchJobCategories();

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
                    {this.state.allEmployees.map((emp) => (
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
                                            <Divider />

                                            <Grid container spacing={2} justify='flex-end' style={{ marginTop: 20 }}>
                                                <Grid item>
                                                    <Button
                                                        variant='outlined'
                                                        color='secondary'
                                                        style={{ minWidth: 100 }}
                                                        onClick={() => this.setState({ terminateDialogOpen: true })}
                                                    >
                                                        Terminate
                                        </Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button
                                                        variant='outlined'
                                                        color='primary'
                                                        style={{ minWidth: 100 }}
                                                        onClick={() => this.setState({ updateDialogOpen: true })}
                                                    >
                                                        Update
                                        </Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button
                                                        variant='outlined'
                                                        color='default'
                                                        style={{ minWidth: 100 }}
                                                        onClick={() => this.setState({ commentDialogOpen: true })}
                                                    >
                                                        Comment
                                        </Button>
                                                </Grid>

                                            </Grid>

                                        </List>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    ))}
                </Grid>
                {this.terminateDialog()}
                {this.updateDialog()}
                {this.commentDialog()}
                {this.terminateConfirmationDialog()}
            </div>

        );
    }

    terminateDialog() {
        return (
            <>
            <Dialog open={this.state.terminateDialogOpen} onClose={() => this.setState({ terminateDialogOpen: false, viewDetails: '' })} >
                <DialogTitle id="codeDetails">
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>
                            Employee Termination
                            </Grid>
                        <Grid item>
                            <IconButton onClick={() => this.setState({ terminateDialogOpen: false })}>
                                <CancelIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>



                    {/* <Paper variant='outlined' style={{ padding: 20 }}> */}

                    <Grid
                        container
                        justify="center"
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    // style={{ padding: 20 }}
                    >

                        <Grid item xs={12}>

                            <FormControl variant="outlined" fullWidth size='small'>
                                <InputLabel id="demo-simple-select-outlined-label">Offboarding Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    // value={age}
                                    onChange={(event) => this.setState({ selectedOffboardType: event.target.value },
                                        (event) => console.log('jobId:', this.state.selectedOffboardType))}
                                    label="Job Type"
                                >
                                    {this.state.allOfboardTypes.map((row) => (
                                        <MenuItem value={row.id}>{row.offboardType}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>

                            <FormControl variant="outlined" fullWidth size='small'>
                                <InputLabel id="demo-simple-select-outlined-label">Leaving Reason</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    // value={age}
                                    onChange={(event) => this.setState({ selectedLeavingReason: event.target.value },
                                        (event) => console.log('jobId:', this.state.selectedLeavingReason))}
                                    label="Job Type"
                                >
                                    {this.state.allLeavingReasons.map((row) => (
                                        <MenuItem value={row.id}>{row.reason}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="lastDate"
                                variant="outlined"
                                value={this.state.lastDate}
                                onChange={(event) => { this.setState({ lastDate: event.target.value }) }}
                                type="date"
                                helperText="Last date"
                                fullWidth
                                size='small'
                            />
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: 5 }}>
                            <TextField
                                id="terminationDescription"
                                label="Termination Description"
                                // value={}
                                // onChange={}
                                type="text"
                                fullWidth
                                size='small'
                                variant='outlined'
                                multiline
                                rows={3}
                            />
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: 10 }}>
                            <FormControl component="fieldset">
                                {/* <FormLabel component="legend">Do you want to provide feedback for this employee?</FormLabel> */}
                                <Typography>Do you want to provide feedback for this employee?</Typography>
                                <RadioGroup
                                    name="survey"
                                    value={this.state.surveyRadio}
                                    onChange={(event) => {
                                        this.setState({ surveyRadio: event.target.value });
                                        // console.log('Radio:', this.state.employeeByRadio);
                                    }}
                                >
                                    <Grid container direction="row" style={{ marginTop: 10 }}>
                                        <FormControlLabel
                                            value="surveyYes"
                                            control={<Radio />}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value="surveyNo"
                                            control={<Radio />}
                                            label="No"

                                        />
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {this.state.surveyRadio === 'surveyYes' ? (
                            this.state.allsurveyQuestions.map((question) => (

                                <Grid item xs={12} style={{ marginTop: 10 }}>

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">{question.question}</FormLabel>
                                        {/* <Typography>Do you want to provide feedback for this employee?</Typography> */}
                                        <RadioGroup
                                            name="searchCategory"
                                            value={this.state.employeeByRadio}
                                            onChange={(event) => {
                                                this.setState({ employeeByRadio: event.target.value });
                                                // console.log('Radio:', this.state.employeeByRadio);
                                            }}
                                        >
                                            <Grid container direction="column" style={{ marginTop: 10 }}>
                                                <FormControlLabel
                                                    value="yes"
                                                    control={<Radio />}
                                                    label="Yes"
                                                />
                                                <FormControlLabel
                                                    value="no"
                                                    control={<Radio />}
                                                    label="No"

                                                />
                                                <FormControlLabel
                                                    value="maybe"
                                                    control={<Radio />}
                                                    label="Maybe"

                                                />
                                                <FormControlLabel
                                                    value="notApplicable"
                                                    control={<Radio />}
                                                    label="Not applicable"

                                                />
                                            </Grid>
                                        </RadioGroup>
                                    </FormControl>

                                </Grid>
                            ))
                        ) : <div />}

                    </Grid>

                    <Grid container spacing={2} style={{ marginTop: 10 }}>
                        {this.state.surveyRadio === 'surveyYes' ? (
                            this.state.allsurveyRatings.map((question) => (
                                <>

                                    <Grid item xs={6} >
                                        <Typography>{question.question}:</Typography>
                                    </Grid>

                                    <Grid item xs={6} >
                                        <Rating
                                            name="simple-controlled"
                                            // value={this.state.addJobDialogRating}
                                            // onChange={(event, newValue) => this.setState({ addJobDialogRating: newValue })}
                                            max={10}
                                        />
                                    </Grid>
                                </>
                            ))
                        ) : <div />}
                    </Grid>

                    {/* </Paper> */}
                </DialogContent>
                <DialogActions style={{ padding: 15 }}>
                    <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                    onClick={() => this.setState({ terminateConfirmationOpen: true })}
                    >
                        Terminate
                        </Button>

                    <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                    onClick={() => this.setState({ terminateDialogOpen: false })}
                    >
                        Cancel
                        </Button>
                </DialogActions>
            </Dialog>
            {this.terminateConfirmationDialog()}
            </>
        );
    }

    terminateConfirmationDialog() {
        return(
            <Dialog open={this.state.terminateConfirmationOpen} onClose={() => this.setState({ terminateConfirmationOpen: false })} >
                <DialogTitle id="alert-dialog-title">{"Are you sure do you want to terminate this employee?"}</DialogTitle>
        
                <DialogActions style={{ padding: 15 }}>
                    <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                    // onClick={}
                    >
                        Yes
                        </Button>

                    <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                    onClick={() => this.setState({ terminateConfirmationOpen: false })}
                    >
                        No
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }

    updateDialog() {
        return (
            <Dialog open={this.state.updateDialogOpen} onClose={() => this.setState({ updateDialogOpen: false, viewDetails: '' })} >
                <DialogTitle id="codeDetails">
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>
                            Job Updation
                            </Grid>
                        <Grid item>
                            <IconButton onClick={() => this.setState({ updateDialogOpen: false })}>
                                <CancelIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                <Grid
                        container
                        justify="center"
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    // style={{ padding: 20 }}
                    >

                    <Grid item xs={12}>

                        <FormControl variant="outlined" fullWidth size='small'>
                            <InputLabel id="demo-simple-select-outlined-label">Job Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                // value={age}
                                onChange={(event) => this.setState({ selectedJobCategory: event.target.value },
                                    (event) => console.log('jobId:', this.state.selectedJobCategory))}
                                label="Job Type"
                            >
                                {this.state.allJobCategories.map((row) => (
                                    <MenuItem value={row.id}>{row.positionCategory}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: 5 }}>
                            <TextField
                                id="jobTitle"
                                label="Job Title"
                                // value={}
                                // onChange={}
                                type="text"
                                fullWidth
                                size='small'
                                variant='outlined'
                            />
                        </Grid>

                    <Grid item xs={12} style={{ marginTop: 5 }}>
                            <TextField
                                id="jobDescription"
                                label="Job Description"
                                // value={}
                                // onChange={}
                                type="text"
                                fullWidth
                                size='small'
                                variant='outlined'
                                multiline
                                rows={4}
                            />
                        </Grid>
                        
                </Grid>

                </DialogContent>
                <DialogActions style={{ padding: 15 }}>
                    <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                    // onClick={}
                    >
                        Update
                        </Button>

                    <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                    onClick={() => this.setState({ updateDialogOpen: false })}
                    >
                        Cancel
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }

    commentDialog() {
        return (
            <Dialog open={this.state.commentDialogOpen} onClose={() => this.setState({ commentDialogOpen: false, viewDetails: '' })} >
                <DialogTitle id="codeDetails">
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>
                            Comment
                            </Grid>
                        <Grid item>
                            <IconButton onClick={() => this.setState({ commentDialogOpen: false })}>
                                <CancelIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>

                    <Grid item xs={12} style={{ minWidth: 500 }}>
                        <TextField
                            id="commentBox"
                            label="Write a comment"
                            // value={}
                            // onChange={}
                            type="text"
                            fullWidth
                            size='small'
                            variant='outlined'
                            multiline
                            rows={4}
                        />
                    </Grid>

                </DialogContent>
                <DialogActions style={{ padding: 15 }}>
                    <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                        onClick={() => this.setState({ commentDialogOpen: false })}
                    >
                        Send
                        </Button>

                    <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                    // onClick={}
                    >
                        Cancel
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(index);
