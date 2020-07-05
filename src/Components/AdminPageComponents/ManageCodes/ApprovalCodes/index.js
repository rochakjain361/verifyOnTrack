import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    Paper,
    Grid,
    Typography,
    Button,
    TableContainer,
    FormControlLabel,
    Checkbox,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    FormLabel,
    RadioGroup,
    Radio
} from '@material-ui/core/';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ViewPagesComponent from '../ViewPagesComponent'

import Profile from '../Pages/Profile'
import Address from '../Pages/Address'
import Identity from '../Pages/Identity'
import Phone from '../Pages/Phone'
import Job from '../Pages/Job'

const token1 = localStorage.getItem("Token");
const token = "Token " + token1;
const id = localStorage.getItem("id");
const api = "http://3.22.17.212:8000"

const rows = [
    {
        "createdOn": "09/12/2020",
        "codeString": "testCodeString1",
        "employeeCompanyField": "testEmployeeCompanyField1",
        "codeStatus": "testCodeStatu1s",
        "statusChangeDate": "09/12/2020",
    },
    {
        "createdOn": "09/12/2020",
        "codeString": "testCodeString1",
        "employeeCompanyField": "testEmployeeCompanyField1",
        "codeStatus": "testCodeStatus2",
        "statusChangeDate": "09/12/2020",
    }
];

const styles = theme => ({

})

class index extends Component {

    state = {
        generateNewEmployementCodeDialog: false,
        actions: '',

        assignedToMeCheck: false,
        pendingApprovalRequestCheck: false,
        assignDialog: false,
        viewDialog: false,
        viewLogic: true,
        adminByRadio: "searchByEmail",
        adminIndex: '',

        allCodes: [],
        assignedToMe: [],
        pendingApprovalRequests: [],
        bothRequests: [],

        userID: '',
        viewId: '',
        assignAdminId: '',
        approvalCode: '',
        currentid: "",
        enteredUsername: '',
        selectedRequest: [],

        adminList: [],
    }

    constructor(props) {
        super(props);
        this.allCodesTable = this.allCodesTable.bind(this);
    }

    async fetchAdminList() {
        let response = await fetch(api + "/api/v1/accounts/admins",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('adminListSuccess:', response)
        this.setState({ adminList: response });
    }

    async fetchAllCodes() {
        let response = await fetch(api + "/api/v1/codes/approval/codes",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('viewCodesSuccess:', response)
        this.setState({ allCodes: response });
        this.setState({ selectedRequest: response });
    }

    async fetchAssignedToMe() {
        let response = await fetch(api + "/api/v1/codes/approval/codes?mine=true",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('assignedToMeSuccess:', response)
        this.setState({ assignedToMe: response });
    }

    async fetchPendingApprovalRequests() {
        let response = await fetch(api + "/api/v1/codes/approval/codes?pending=true",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('PendingApprovalSuccess:', response)
        this.setState({ pendingApprovalRequests: response });
    }

    async fetchBothRequests() {
        let response = await fetch(api + "/api/v1/codes/approval/codes?mine=true&pending=true",
            {
                headers: {
                    'Authorization': token
                }
            });
        response = await response.json();
        console.log('BothCodesSuccess:', response)
        this.setState({ bothRequests: response });
    }

    async componentDidMount() {

        await this.fetchAllCodes();
        await this.fetchAssignedToMe();
        await this.fetchBothRequests();
        await this.fetchPendingApprovalRequests();
        await this.fetchAdminList()
    }

    render() {

        const { classes } = this.props;

        const defaultProps = {
            options: top100Films,
            getOptionLabel: (option) => option.title,
        };

        return (
            <div style={{ marginTop: 20, marginRight: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item xs={8}>
                        <Typography variant='h4'>
                            Approval Codes
                                </Typography>
                    </Grid>


                    {/* <Grid item xs={4}>
                        <Button color='secondary' variant='contained'
                            onClick={() => this.setState({ viewDialog: true })}
                            fullWidth>  Create New code </Button>
                    </Grid> */}

                    <Grid container direction='row' spacing={2}>
                        <Grid item >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.assignedToMeCheck}
                                        onChange={event => {
                                            this.setState({ assignedToMeCheck: !this.state.assignedToMeCheck })
                                            console.log('check1:', this.state.assignedToMeCheck)
                                        }}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Assigned to me"
                            />
                        </Grid>

                        <Grid item >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.pendingApprovalRequestCheck}
                                        onChange={event => {
                                            this.setState({ pendingApprovalRequestCheck: !this.state.pendingApprovalRequestCheck })
                                            console.log('check2:', this.state.pendingApprovalRequestCheck)
                                        }}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Pending approval requests"
                            />
                        </Grid>
                        {/* <div>{this.allTablesLogic()}</div> */}
                    </Grid>

                </Grid>

                <Grid container justify='flex-start' alignItems='center' spacing={2}>

                    <TableContainer component={Paper} style={{ maxWidth: '94%', marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'black' }}>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Code</TableCell>
                                    <TableCell align="left">Assigned To</TableCell>
                                    <TableCell align="left">User</TableCell>
                                    <TableCell align="left">Is Employer</TableCell>
                                    <TableCell align="left">Code Status</TableCell>
                                    <TableCell align="left">Last Updated</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                    <TableCell align="left">View</TableCell>
                                </TableRow>
                            </TableHead>
                            {this.tableDisplayLogic()}
                            {/* {this.allTablesLogic()} */}
                        </Table>
                    </TableContainer>

                </Grid>
                {this.assignAdminDialog(id)}
                {this.viewDialogBox()}

            </div>
        )
    }

    // allTablesLogic() {

    //     if (this.state.assignedToMeCheck && this.state.pendingApprovalRequestCheck) {
    //         this.setState({ selectedRequest: this.state.bothRequests })
    //     }
    //     else if (this.state.pendingApprovalRequestCheck) {
    //         this.setState({ selectedRequest: this.state.pendingApprovalRequestCheck })
    //     }
    //     else if (this.state.assignedToMeCheck) {
    //         this.setState({ selectedRequest: this.state.assignedToMe })
    //     }
    //     else {
    //         this.setState({ selectedRequest: this.state.allCodes })
    //     }
    // }

    // actionsLogic() {
    //     if (this.state.selectedRequest[index].showAssignTo_field = true) {
    //         return (
    //             <div>
    //                 <MenuItem value={"assignAdmin"}>Assign Admin</MenuItem>
    //                 <MenuItem value={"view"}>View and approve</MenuItem>
    //             </div>
    //         );
    //     }

    //     else (this.state.selectedRequest[index].showAssignTo_field = false)
    //     {
    //         return (
    //             <div>
    //                 <MenuItem value={"reassignAdmin"}>Reassign Admin</MenuItem>
    //                 <MenuItem value={"view"}>View and approve</MenuItem>
    //             </div>
    //         );
    //     }
    // }

    allCodesTable() {
        console.log("allCodes", this.state.allCodes)
        return (
            <TableBody>
                {this.state.allCodes.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align="left">{row.createdOn}</TableCell>
                        <TableCell align="left">{row.codeString}</TableCell>
                        {row.assigned_to_name_field ? <TableCell align="left">{row.assigned_to_name_field.name}</TableCell> : <div />}
                        {/* <TableCell align="left">{row.assigned_to_name_field.name}</TableCell> */}
                        <TableCell align="left">{row.user_field.name}</TableCell>
                        <TableCell align="left">{row.is_employer_field ? ('Yes') : ('No')}</TableCell>
                        <TableCell align="left">{row.codeStatus}</TableCell>
                        <TableCell align="left">{new Date(row.statusChangeDate).toDateString()}</TableCell>
                        <TableCell align="left">
                            {
                                row.showAssignTo_field ?
                                    (
                                        <Button
                                            variant='outlined'
                                            color='secondary'
                                            onClick={() => {
                                                console.log("row.id///////////", row.id)
                                                this.assignadminTableButton(row.id)
                                            }}
                                        >
                                            Assign Admin
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button
                                            variant='outlined'
                                            color='secondary'
                                            onClick={() => {
                                                this.setState({ assignDialog: true })
                                                this.setState({ adminIndex: row.id })
                                            }}
                                        >
                                            Reassign Admin
                                        </Button>
                                    )}
                        </TableCell>
                        {/* {row.viewApprove_field !== "False" ? (this.setState({viewLogic: true})) : null} */}
                        < TableCell align="left" >
                            <Button variant='outlined' color='primary'
                                onClick={() => {
                                    this.setState({ userID: row.user, approvalCode: row.codeString, viewId: row.id})
                                    this.viewAndApprove(row.id, row.codeString)
                                }}
                            // disabled={this.state.viewLogic}
                            >
                                View &amp; approve
                        </Button>
                        </TableCell>
                    </TableRow >
                ))
                }
            </TableBody >

        );
    }

    assignedToMeTable() {
        return (

            <TableBody>
                {this.state.assignedToMe.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align="left">{row.createdOn}</TableCell>
                        <TableCell align="left">{row.codeString}</TableCell>
                        <TableCell align="left">{row.assigned_to_name_field.name}</TableCell>
                        <TableCell align="left">{row.user_field.name}</TableCell>
                        <TableCell align="left">{row.is_employer_field ? ('Yes') : ('No')}</TableCell>
                        <TableCell align="left">{row.codeStatus}</TableCell>
                        <TableCell align="left">{new Date(row.statusChangeDate).toDateString()}</TableCell>
                        <TableCell align="left">
                            {
                                row.showAssignTo_field ?
                                    (
                                        <Button variant='outlined' color='secondary' onClick={() => this.assignadminTableButton(row.id)} >
                                            Assign Admin
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button variant='outlined' color='secondary' onClick={() => this.setState({ assignDialog: true })} >
                                            Reassign Admin
                                        </Button>
                                    )}
                        </TableCell>
                        {/* {row.viewApprove_field !== "False" ? (this.setState({viewLogic: true})) : null} */}
                        <TableCell align="left">
                            <Button variant='outlined' color='primary'
                            // disabled={this.state.viewLogic}
                            >
                                View &amp; approve
                        </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        );
    }

    pendingApprovalTable() {
        return (

            <TableBody>
                {this.state.pendingApprovalRequests.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align="left">{row.createdOn}</TableCell>
                        <TableCell align="left">{row.codeString}</TableCell>
                        <TableCell align="left">{row.assigned_to_name_field.name}</TableCell>
                        <TableCell align="left">{row.user_field.name}</TableCell>
                        <TableCell align="left">{row.is_employer_field ? ('Yes') : ('No')}</TableCell>
                        <TableCell align="left">{row.codeStatus}</TableCell>
                        <TableCell align="left">{new Date(row.statusChangeDate).toDateString()}</TableCell>
                        <TableCell align="left">
                            {
                                row.showAssignTo_field ?
                                    (
                                        <Button variant='outlined' color='secondary' onClick={() => this.setState({ assignDialog: true })} >
                                            Assign Admin
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button variant='outlined' color='secondary' onClick={() => this.setState({ assignDialog: true })} >
                                            Reassign Admin
                                        </Button>
                                    )}
                        </TableCell>
                        {/* {row.viewApprove_field !== "False" ? (this.setState({viewLogic: true})) : null} */}
                        <TableCell align="left">
                            <Button variant='outlined' color='primary'
                            // onClick={()=>}
                            //  disabled={this.state.viewLogic}
                            >
                                View &amp; approve
                        </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        );
    }
    assignadminTableButton(id) {

        this.setState({ assignDialog: true, currentid: id });

    }

    viewAndApprove(id, code) {
        console.log('viewID:', id)
        console.log('viewCode:', code)
        this.setState({ viewDialog: true });
    }

    bothRequestsTable() {
        return (

            <TableBody>
                {this.state.bothRequests.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align="left">{row.createdOn}</TableCell>
                        <TableCell align="left">{row.codeString}</TableCell>
                        <TableCell align="left">{row.assigned_to_name_field.name}</TableCell>
                        <TableCell align="left">{row.user_field.name}</TableCell>
                        <TableCell align="left">{row.is_employer_field ? ('Yes') : ('No')}</TableCell>
                        <TableCell align="left">{row.codeStatus}</TableCell>
                        <TableCell align="left">{new Date(row.statusChangeDate).toDateString()}</TableCell>
                        <TableCell align="left">
                            {
                                row.showAssignTo_field ?
                                    (
                                        <Button variant='outlined' color='secondary' onClick={() => { this.assignadminTableButton(row.id) }}>
                                            Assign Admin
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button variant='outlined' color='secondary' onClick={() => this.setState({ assignDialog: true })} >
                                            Reassign Admin
                                        </Button>
                                    )}
                        </TableCell>
                        {/* {row.viewApprove_field !== "False" ? (this.setState({viewLogic: true})) : null} */}
                        <TableCell align="left">
                            <Button variant='outlined' color='primary'
                            // disabled={this.state.viewLogic}
                            >
                                View &amp; approve
                        </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        );
    }

    tableDisplayLogic() {
        return (
            this.state.assignedToMeCheck ?
                (this.state.assignedToMeCheck && this.state.pendingApprovalRequestCheck ?
                    (this.bothRequestsTable()) : (this.assignedToMeTable()))
                :
                (this.state.assignedToMeCheck || this.state.pendingApprovalRequestCheck) ?
                    (this.pendingApprovalTable()) : (this.allCodesTable())
        );
    }

    assignAdminDialog(id) {
        const options = this.state.adminList.map((option) => {
            const firstLetter = option.username[0].toUpperCase();
            return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                ...option,
            };
        });

        return (
            <Dialog
                open={this.state.assignDialog}
                onClose={() => this.setState({ assignDialog: false })}
                aria-labelledby="form-dialog-title"
            // style={{ minWidth: 600 }}
            >
                <DialogTitle id="form-dialog-title" align='center'>
                    Assign Admin
            </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText align='center'>
                        Search Admin by username:
              </DialogContentText> */}

                    <Grid
                        container
                        justify="flex-start"
                        direction="row"
                        alignItems="center"
                        spacing={3}
                    // style={{ padding: 20 }}
                    >

                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Search admin by:</FormLabel>
                                <RadioGroup
                                    name="searchCategory"
                                    value={this.state.adminByRadio}
                                    onChange={(event) => {
                                        this.setState({ adminByRadio: event.target.value });
                                        // console.log('Radio:', this.state.adminByRadio);
                                    }}
                                >
                                    <Grid container direction="row" style={{ marginTop: 10 }}>
                                        <FormControlLabel
                                            value="searchByEmail"
                                            control={<Radio />}
                                            label="Username"
                                        />
                                        <FormControlLabel
                                            value="searchByUsername"
                                            control={<Radio />}
                                            label="Email"

                                        />
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>


                        {this.state.adminByRadio !== 'searchByUsername' ? (
                            <Grid item xs={12}>
                                {/* <Autocomplete
                                    id="grouped-demo"
                                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    groupBy={(option) => option.firstLetter}
                                    getOptionLabel={(option) => option.username}
                                    // onChange={this.setState({})}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Username" variant="outlined" />}
                                /> */}
                                <Autocomplete
                                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    getOptionLabel={(option) => option.username}
                                    groupBy={(option) => option.firstLetter}
                                    id="adminUsername"
                                    Username
                                    fullWidth
                                    value={this.state.selectedstate}
                                    onChange={(event, value) => {
                                        this.setState({ selectedstate: value });
                                        this.setState({ assignAdminId: value['id'] })
                                        console.log("selectedstate", value);
                                        console.log("assignAdminID", this.state.assignAdminId);
                                    }}
                                    inputValue={this.state.enteredUsername}
                                    onInputChange={(event, newInputValue) => {
                                        this.setState({ enteredUsername: newInputValue });
                                        // console.log(newInputValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Username"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>) : (
                                <Grid item xs={12}>
                                    {/* <Autocomplete
                                        id="grouped-demo"
                                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                        groupBy={(option) => option.firstLetter}
                                        getOptionLabel={(option) => option.email}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Email" variant="outlined" />}
                                    /> */}
                                    <Autocomplete
                                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                        getOptionLabel={(option) => option.email}
                                        groupBy={(option) => option.firstLetter}
                                        id="adminEmail"
                                        Username
                                        fullWidth
                                        value={this.state.selectedstate}
                                        onChange={(event, value) => {
                                            this.setState({ selectedstate: value });
                                            this.setState({ assignAdminId: value['id'] })
                                            console.log("selectedstate", value);
                                            console.log("assignAdminID", this.state.assignAdminId);
                                        }}
                                        inputValue={this.state.enteredUsername}
                                        onInputChange={(event, newInputValue) => {
                                            this.setState({ enteredUsername: newInputValue });
                                            // console.log(newInputValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Email"
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>)}

                    </Grid>
                </DialogContent>

                <DialogActions style={{ padding: 15 }}>
                    <Button
                        disabled={this.state.buttondisabled}
                        color="primary"
                        variant="contained"
                        disabled={this.state.buttondisabled}
                        onClick={() =>
                            this.assignAdmin(id)
                        }
                    >
                        Assign
              </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() =>
                            this.setState({
                                assignDialog: false,
                                selectedIndex: -1,
                            })
                        }
                    >
                        Cancel
              </Button>
                </DialogActions>
            </Dialog>
        );
    }

    viewDialogBox() {
        return (
            <Dialog
                open={this.state.viewDialog}
                onClose={() => this.setState({ viewDialog: false })}
                aria-labelledby="form-dialog-title"
            // style={{ minWidth: 600 }}
            >
                <DialogTitle id="form-dialog-title" align='center'>
                    View and approve
            </DialogTitle>
                <DialogContent>

                    <ViewPagesComponent user={this.state.userID} approval={this.state.approvalCode} viewId={this.state.viewId} />

                </DialogContent>

                <DialogActions style={{ padding: 15 }}>
                </DialogActions>
            </Dialog>
        );
    }

    async assignAdmin(id) {

        let bodyData = {
            'assigned_to': this.state.assignAdminId
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch(api + '/api/v1/codes/approval/' + id + '/assignto',
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
            console.log('assignAdminSuccess:', response);

            await this.fetchAllCodes();
            await this.fetchAssignedToMe();
            await this.fetchBothRequests();
            await this.fetchPendingApprovalRequests();
            this.setState({ selectedstate: '' })

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default withStyles(styles)(index);
