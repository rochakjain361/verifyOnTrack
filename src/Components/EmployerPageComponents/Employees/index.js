import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    CircularProgress,
    Grid,
    Typography,
    ListItemAvatar,
    Avatar,
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
    Checkbox
} from '@material-ui/core/';

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
let id= "";
const api = "http://3.22.17.212:8000"

const styles = theme => ({

})

class index extends Component {

    state = {
        isLoading: true,
        allEmployees: [],
        currentEmployees: [],
        allOfboardTypes: [],
        allLeavingReasons: [],
        allsurveyQuestions: [],
        allsurveyRatings: [],
        allJobCategories: [],
        choiceSurvey: [],
        ratingSurvey: [],

        viewTerminationDetails: [],
        viewUpdationDetails: [],

        selectedOffboardType: '',
        selectedLeavingReason: '',
        lastDate: '',
        terminationDescription: '',
        surveyRadio: '',

        selectedJobType: '',
        selectedLeaving: '',

        jobId: '',
        jobCategory: '',
        jobTitle: '',
        jobDescription: '',

        employeeId: '',
        comment: '',
        commentbyEmployee: [],

        ofBoardId: '',
        updateId: '',

        terminateDialogOpen: false,
        updateDialogOpen: false,
        commentDialogOpen: false,
        terminateConfirmationOpen: false,
        secondaryTerminateConfirmationOpen: false,

        currentEmployeesCheck: false,
        // tableLogic: 'allEmployees'

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

    async fetchCurrentEmployees() {

        let response = await fetch(api + "/api/v1/employers/employees?current=true",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('currentEmployees:', response)
        this.setState({ currentEmployees: response });
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

    async fetchCommentbyEmployee(empId) {

        console.log('Good1!!')
        let response = await fetch(api + "/api/v1/employers/" + empId + "/comments/mycomments",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('commentbyEmployee:', response)
        this.setState({ commentbyEmployee: response });
    }

    async componentDidMount() {

        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

        this.fetchAllEmployees();
        this.fetchCurrentEmployees();
        this.fetchOffboardtypes();
        this.fetchLeavingReasons();
        this.fetchSurveyQuestions();
        this.fetchSurveyRatings();
        this.fetchJobCategories();

        this.setState({ isLoading: false })

    }

    render() {

        // const { classes } = this.props;

        return (
            this.state.isLoading ? this.isloading() : (
                <>
                    <div style={{ marginTop: 20 }}>
                        <Grid container justify='space-between' alignItems='center' spacing={4}>

                            <Grid item xs={8}>
                                <Typography variant='h4'>
                                    My Employees
                    </Typography>
                            </Grid>

                            <Grid item >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.currentEmployeesCheck}
                                            onChange={(event) => this.setState({ currentEmployeesCheck: !this.state.currentEmployeesCheck }, console.log('check1:', this.state.currentEmployeesCheck))}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Current Employees"
                                />
                            </Grid>

                        </Grid>

                        {!this.state.currentEmployeesCheck ?
                            (
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
                                                            <Typography variant='subtitle1'>{emp.employee.firstname} {emp.employee.middlename} {emp.employee.surname}</Typography>
                                                            <Typography variant='subtitle2' color="textSecondary">
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

                                                            <ListItem>
                                                                <Grid container>
                                                                    <Grid item xs={3}>
                                                                        <Typography variant='subtitle1' color="textSecondary">
                                                                            Status
                                         </Typography>
                                                                    </Grid>

                                                                    <Grid item xs={9}>
                                                                        <Typography variant='subtitle1'>
                                                                            {emp.status}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </ListItem>
                                                            <Divider />

                                                            <Grid container spacing={2} justify='flex-end' style={{ marginTop: 20 }}>
                                                                <Grid item>
                                                                    {emp.showTerminate ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='secondary'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ jobId: emp.jobDetails.id, terminateDialogOpen: true })}
                                                                        >
                                                                            Terminate
                                                                        </Button>
                                                                    ) : <div />}

                                                                    {emp.showConfirmTermination ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='secondary'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ ofBoardId: emp.offboard.id, viewTerminationDetails: emp.offboard, viewterminateDialogOpen: true })}
                                                                        >
                                                                            Termination Details
                                                                        </Button>
                                                                    ) : <div />}

                                                                </Grid>

                                                                <Grid item>
                                                                    {emp.showUpdate ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='primary'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ updateDialogOpen: true, jobId: emp.jobDetails.id })}
                                                                        >
                                                                            Update
                                                                        </Button>
                                                                    ) : <div />}

                                                                    {emp.showConfirmRejectUpdates ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='primary'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ viewUpdationDetails: emp.empUpdate[0], viewupdateDialogOpen: true, updateId: emp.empUpdate[0].id }, ()=> console.log('ViewUpdateDetails:', this.state.viewUpdationDetails))}
                                                                        >
                                                                            Update Details
                                                                        </Button>
                                                                    ) : <div />}

                                                                </Grid>

                                                                <Grid item>

                                                                    {emp.showComment ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='default'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ commentDialogOpen: true, employeeId: emp.employee.id }, () => this.fetchCommentbyEmployee(emp.employee.id))}

                                                                        >
                                                                            Comment
                                                                        </Button>
                                                                    ) : <div />}

                                                                </Grid>

                                                            </Grid>

                                                        </List>
                                                    </Grid>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        </Grid>
                                    ))}
                                </Grid>
                            )
                            :
                            (
                                <Grid container justify='flex-start' alignItems='center' spacing={2} style={{ marginTop: 20 }}>
                                    {this.state.currentEmployees.map((emp) => (
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
                                                            <Typography variant='subtitle1'>{emp.employee.firstname} {emp.employee.middlename} {emp.employee.surname}</Typography>
                                                            <Typography variant='subtitle2' color="textSecondary">
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
                                                                    {emp.showTerminate ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='secondary'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ jobId: emp.jobDetails.id, terminateDialogOpen: true })}
                                                                        >
                                                                            Terminate
                                                                        </Button>
                                                                    ) : <div />}

                                                                    {emp.showConfirmTermination ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='secondary'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ employeeId: emp.employee.id, viewTerminationDetails: emp.offboard, viewterminateDialogOpen: true })}
                                                                        >
                                                                            Termination Details
                                                                        </Button>
                                                                    ) : <div />}

                                                                </Grid>

                                                                <Grid item>
                                                                    {emp.showUpdate ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='primary'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ updateDialogOpen: true, jobId: emp.jobDetails.id })}
                                                                        >
                                                                            Update
                                                                        </Button>
                                                                    ) : <div />}

                                                                    {emp.showConfirmRejectUpdates ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='primary'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ viewUpdationDetails: emp.empUpdate, viewupdateDialogOpen: true, jobId: emp.jobDetails.id })}
                                                                        >
                                                                            Update Details
                                                                        </Button>
                                                                    ) : <div />}

                                                                </Grid>

                                                                <Grid item>

                                                                    {emp.showComment ? (
                                                                        <Button
                                                                            variant='outlined'
                                                                            color='default'
                                                                            style={{ minWidth: 100 }}
                                                                            onClick={() => this.setState({ commentDialogOpen: true, employeeId: emp.employee.id }, () => this.fetchCommentbyEmployee(emp.employee.id))}

                                                                        >
                                                                            Comment
                                                                        </Button>
                                                                    ) : <div />}

                                                                </Grid>

                                                            </Grid>

                                                        </List>
                                                    </Grid>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}

                        {this.terminateDialog()}
                        {this.updateDialog()}
                        {this.commentDialog()}
                        {this.terminateConfirmationDialog()}
                        {this.secondaryTerminateConfirmationDialog()}
                        {this.viewTerminationDetailsDialog()}
                        {this.viewUpdationDetailsDialog()}
                    </div>
                </>
            )
        );
    }

    terminateDialog() {
        return (
            <>
                <Dialog open={this.state.terminateDialogOpen} onClose={() => this.setState({ terminateDialogOpen: false, surveyRadio: '' })} >
                    <DialogTitle id="codeDetails">
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                Employee Termination
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => this.setState({ terminateDialogOpen: false, surveyRadio: '' })}>
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
                                    onChange={(event) => this.setState({ lastDate: event.target.value })}
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
                                    value={this.state.terminationDescription}
                                    onChange={(event) => this.setState({ terminationDescription: event.target.value })}
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
                                            <RadioGroup
                                                name={question.id.toString()}
                                                value={this.state.choiceSurvey[question.id]}
                                                onChange={(event) => this.setState({
                                                    choiceSurvey: { ...this.state.choiceSurvey, [event.currentTarget.name.toString()]: event.target.value.toString() }
                                                },
                                                    () => console.log('survey:', this.state.choiceSurvey))
                                                }
                                                aria-label="position"
                                                defaultValue="top"
                                            >
                                                <Grid container direction="column" style={{ marginTop: 10 }}>
                                                    <FormControlLabel
                                                        value="Yes"
                                                        control={<Radio />}
                                                        label="Yes"
                                                    />
                                                    <FormControlLabel
                                                        value="No"
                                                        control={<Radio />}
                                                        label="No"

                                                    />
                                                    <FormControlLabel
                                                        value="Maybe"
                                                        control={<Radio />}
                                                        label="Maybe"

                                                    />
                                                    <FormControlLabel
                                                        value="NotApplicable"
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
                                                name={question.id}
                                                value={this.state.ratingSurvey[question.id]}
                                                onChange={(event, newValue) => {
                                                    console.log("event", event);
                                                    console.log("newvalue", newValue);
                                                    // console.log("question.id",{question.id)
                                                    console.log("typeof", typeof question.id);
                                                    this.setState({ ratingSurvey: { ...this.state.ratingSurvey, [event.currentTarget.name]: newValue } }, 
                                                        () => console.log('surveyRating:', this.state.ratingSurvey, typeof (event.currentTarget.name.toString())));
                                                }}
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
                            onClick={() => this.setState({ terminateDialogOpen: false, surveyRadio: '' })}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                {this.terminateConfirmationDialog()}
                {this.secondaryTerminateConfirmationDialog()}
            </>
        );
    }

    terminateConfirmationDialog() {
        return (
            <Dialog open={this.state.terminateConfirmationOpen} onClose={() => this.setState({ terminateConfirmationOpen: false })} >
                <DialogTitle id="alert-dialog-title">{"Are you sure do you want to terminate this employee?"}</DialogTitle>

                <DialogActions style={{ padding: 15 }}>
                    <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                        onClick={() => this.postTerminate()}
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

    viewTerminationDetailsDialog() {
        return (
            <>
                <Dialog open={this.state.viewterminateDialogOpen} onClose={() => this.setState({ viewterminateDialogOpen: false, surveyRadio: '' })} >
                    <DialogTitle id="codeDetails">
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                Employee Termination
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => this.setState({ viewterminateDialogOpen: false, surveyRadio: '' })}>
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
                                <TextField
                                    id="offboardingType"
                                    label="Offboarding Type"
                                    defaultValue={this.state.viewTerminationDetails['offboardType_name_field']}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="leavingReason"
                                    label="Leaving Reason"
                                    defaultValue={this.state.viewTerminationDetails['leavingReason_name_field']}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="lastDate"
                                    label="Last Date"
                                    defaultValue={this.state.viewTerminationDetails['endDate']}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                />
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: 5 }}>
                                <TextField
                                    id="terminationDescription"
                                    label="Termination Description"
                                    defaultValue={this.state.viewTerminationDetails['description']}
                                    type="text"
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                    multiline
                                    rows={3}
                                    InputProps={{
                                        readOnly: true,
                                    }}
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
                                                name={question.id.toString()}
                                                value={this.state.choiceSurvey[question.id]}
                                                onChange={(event) => this.setState({
                                                    choiceSurvey: { ...this.state.choiceSurvey, [event.currentTarget.name.toString()]: event.target.value.toString() }
                                                },
                                                    () => console.log('survey:', this.state.choiceSurvey))
                                                }
                                                aria-label="position"
                                                defaultValue="top"
                                            >
                                                <Grid container direction="column" style={{ marginTop: 10 }}>
                                                    <FormControlLabel
                                                        value="Yes"
                                                        control={<Radio />}
                                                        label="Yes"
                                                    />
                                                    <FormControlLabel
                                                        value="No"
                                                        control={<Radio />}
                                                        label="No"

                                                    />
                                                    <FormControlLabel
                                                        value="Maybe"
                                                        control={<Radio />}
                                                        label="Maybe"

                                                    />
                                                    <FormControlLabel
                                                        value="NotApplicable"
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
                                                name={question.id}
                                                value={this.state.ratingSurvey[question.id]}
                                                onChange={(event, newValue) => {
                                                    console.log("event", event);
                                                    console.log("newvalue", newValue);
                                                    // console.log("question.id",{question.id)
                                                    console.log("typeof", typeof question.id);
                                                    this.setState({ ratingSurvey: { ...this.state.ratingSurvey, [event.currentTarget.name]: newValue } }, () => console.log('surveyRating:', this.state.ratingSurvey, typeof (event.currentTarget.name.toString())));
                                                }}
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
                            onClick={() => this.setState({ secondaryTerminateConfirmationOpen: true })}
                        >
                            Terminate
                        </Button>

                        <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                            onClick={() => this.setState({ viewterminateDialogOpen: false, surveyRadio: '' })}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                {this.terminateConfirmationDialog()}
                {this.secondaryTerminateConfirmationDialog()}
            </>
        );
    }

    viewUpdationDetailsDialog() {
        return (
            <>
                <Dialog open={this.state.viewupdateDialogOpen} onClose={() => this.setState({ viewupdateDialogOpen: false, surveyRadio: '' })} >
                    <DialogTitle id="codeDetails">
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                Updation Details
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => this.setState({ viewupdateDialogOpen: false, surveyRadio: '' })}>
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
                                <TextField
                                    id="jobCategory"
                                    label="Job Category"
                                    defaultValue={this.state.viewUpdationDetails['jobCategory_name_field']}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="jobTitle"
                                    label="Job Title"
                                    defaultValue={this.state.viewUpdationDetails['jobTitle']}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="jobDescription"
                                    label="Job Description"
                                    defaultValue={this.state.viewUpdationDetails['jobDescription']}
                                    type="text"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                    multiline
                                    rows={3}
                                />
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions style={{ padding: 15 }}>
                        <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                            onClick={() => this.confirmUpdation()}
                        >
                            Approve
                        </Button>

                        <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                            onClick={() => this.rejectUpdation()}
                        >
                            Reject
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }

    secondaryTerminateConfirmationDialog() {
        return (
            <Dialog open={this.state.secondaryTerminateConfirmationOpen} onClose={() => this.setState({ secondaryTerminateConfirmationOpen: false })} >
                <DialogTitle id="alert-dialog-title">{"Are you sure do you want to terminate this employee?"}</DialogTitle>

                <DialogActions style={{ padding: 15 }}>
                    <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                        onClick={() => this.confirmTermination()}
                    >
                        Yes
                        </Button>

                    <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                        onClick={() => this.setState({ secondaryTerminateConfirmationOpen: false })}
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
                                    onChange={(event) => this.setState({ jobCategory: event.target.value },
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
                                value={this.state.jobTitle}
                                onChange={(event) => this.setState({ jobTitle: event.target.value })}
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
                                value={this.state.jobDescription}
                                onChange={(event) => this.setState({ jobDescription: event.target.value })}
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
                        onClick={() => this.postUpdate()}
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
                    <Grid container justify='space-between' alignItems='center' spacing={3}>
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
                            value={this.state.comment}
                            onChange={(event) => this.setState({ comment: event.target.value })}
                            type="text"
                            fullWidth
                            size='small'
                            variant='outlined'
                            multiline
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: 20 }}>
                        <FormLabel component="legend">Comments:</FormLabel>
                    </Grid>

                    {this.state.commentbyEmployee.map((comment) => (
                        // <Paper variant='outlined' style={{padding: 10, marginTop: 20}}>
                        <div style={{ padding: 10 }}>

                            <Grid container justify='space-between' alignItems='flex-start' spacing={2}>

                                <Grid item>
                                    <Typography variant='subtitle1'>
                                        {comment.employee_name_field}
                                    </Typography>
                                    <Typography variant='caption' color="textSecondary">
                                        {comment.company_name_field}
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant='caption'>
                                        {new Date(comment.created_on).toDateString()}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} style={{ marginBottom: 10 }}>
                                    <Typography variant='body2'>
                                        {comment.comment}
                                    </Typography>
                                </Grid>
                                <Divider />
                            </Grid>
                            <Divider />
                            {/* </Paper> */}
                        </div>
                    ))}

                </DialogContent>
                <DialogActions style={{ padding: 15 }}>
                    <Button color="primary" variant="contained" style={{ minWidth: 100 }}
                        onClick={() => this.postComment()}
                    >
                        Send
                        </Button>

                    <Button color="secondary" variant="contained" style={{ minWidth: 100 }}
                        onClick={() => this.setState({ commentDialogOpen: false })}
                    >
                        Cancel
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }

    async postUpdate() {

        let bodyData = {
            "jobProfile": this.state.jobId,
            "jobCategory": this.state.jobCategory,
            "jobTitle": this.state.jobTitle,
            "jobDescription": this.state.jobDescription,
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/employers/newEmpUpdate',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }
            );
            response = await response.json();
            console.log('jobUpdateSuccess:', response);

            this.fetchAllEmployees();

            this.setState({
                updateDialogOpen: false,
                jobProfile: '',
                jobCategory: '',
                jobTitle: '',
                jobDescription: '',
            })

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async postComment() {

        let bodyData = {
            "employee": this.state.employeeId,
            "comment": this.state.comment
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/employees/post-comments',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }
            );
            response = await response.json();
            console.log('commentSuccess:', response);

            this.fetchAllEmployees();

            this.setState({
                commentDialogOpen: false,
                employee: '',
                comment: ''
            })

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async postTerminate() {

        let bodyData = {
            "offboard": {
                "jobProfile": this.state.jobId,
                "offboardType": this.state.selectedOffboardType,
                "leavingReason": this.state.selectedLeavingReason,
                "description": this.state.terminationDescription,
                "endDate": this.state.lastDate
            },
            "ratingSurvey": this.state.ratingSurvey,
            "choiceSurvey": this.state.choiceSurvey

        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/employers/newoffboard',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }
            );
            response = await response.json();
            console.log('terminationSuccess:', response);

            this.fetchAllEmployees();
            this.fetchCurrentEmployees();

            this.setState({
                terminateConfirmationOpen: false,
                terminateDialogOpen: false,
            })

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async confirmTermination() {

        let bodyData = {
            "ratingSurvey": this.state.ratingSurvey,
            "choiceSurvey": this.state.choiceSurvey
        }
        console.log('bodyData:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/employers/confirmTermination/' + this.state.ofBoardId,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }
            );
            response = await response.json();
            console.log('confirmTerminaton:', response);

            this.fetchAllEmployees();
            this.fetchCurrentEmployees();
            this.setState({
                ratingSurvey: "",
                choiceSurvey: "",
                secondaryTerminateConfirmationOpen: false,
                viewterminateDialogOpen: false
            })

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async confirmUpdation() {

        console.log('UpdateId:', this.state.updateId)

        try {
            let response = await fetch(api + '/api/v1/employers/confirmEmpUpdate/' + this.state.updateId,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify("")
                }
            );
            response = await response.json();
            console.log('confirmUpdationApprove:', response);

            this.setState({ viewupdateDialogOpen: false })
            this.fetchAllEmployees();
            this.fetchCurrentEmployees();


        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }

    async rejectUpdation() {

        try {
            let response = await fetch(api + '/api/v1/employers/rejectEmpUpdate/' + this.state.updateId,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify("")
                }
            );
            response = await response.json();
            console.log('confirmUpdationReject:', response);

            this.setState({ viewupdateDialogOpen: false })
            this.fetchAllEmployees();
            this.fetchCurrentEmployees();


        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }
}

export default withStyles(styles)(index);
