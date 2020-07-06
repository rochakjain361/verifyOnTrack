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
    Radio,
    CircularProgress
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

let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:8000"

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
        approvalRowId: '',

        userID: '',
        viewId: '',
        assignAdminId: '',
        approvalCode: '',
        currentid: "",
        enteredUsername: '',
        selectedRequest: [],
        isLoading: true,

        adminList: [],
    }

    constructor(props) {
        super(props);
        this.allCodesTable = this.allCodesTable.bind(this);
    }

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
    
        token1 = localStorage.getItem("Token");
        token = "Token " + token1;
        id = localStorage.getItem("id");

        await this.fetchAllCodes();
        await this.fetchAssignedToMe();
        await this.fetchBothRequests();
        await this.fetchPendingApprovalRequests();
        await this.fetchAdminList()

        this.setState({isLoading: false})
    }

    render() {

        const { classes } = this.props;

        return (
            this.state.isLoading ? this.isloading() : this.displayTable() 
        )
    }

    displayTable() {
        return(
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
                                label="All approval requests"
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
        );
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
                            {row.user_field.name == "User deleted"? ("NA") : 
                            row.codeStatus== "Closed" ? ("Closed") : (
                                row.showAssignTo_field ?
                                    (
                                        <Button
                                            variant='outlined'
                                            color='secondary'
                                            onClick={() => {
                                                this.setState({currentid: row.id}, 
                                                ()=>{console.log('currentId:',this.state.currentid)}) 
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
                                    ))}
                        </TableCell>
                        {/* {row.viewApprove_field !== "False" ? (this.setState({viewLogic: true})) : null} */}
                        < TableCell align="left" >
                        {row.user_field.name == "User deleted" ? ('NA'): (
                                    row.codeStatus== "Closed" ? ("Closed") : (
                                        <Button variant='outlined' color='primary'
                                        onClick={() => {
                                            this.setState({ userID: row.user, approvalCode: row.codeString, viewId: row.id }, ()=> console.log('userId:', this.state.userID))
                                            this.viewAndApprove(row.id, row.codeString)
                                        }}
                                    // disabled={this.state.viewLogic}
                                    >
                                        View &amp; approve
                                </Button>
                                    )
                                    )}
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
                            {row.user_field.name == "User deleted"? ("NA") : 
                            row.codeStatus== "Closed" ? ("Closed") : (
                                row.showAssignTo_field ?
                                    (
                                        <Button
                                            variant='outlined'
                                            color='secondary'
                                            onClick={() => {
                                                this.setState({currentid: row.id}, 
                                                ()=>{console.log('currentId:',this.state.currentid)}) 
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
                                    ))}
                        </TableCell>
                        {/* {row.viewApprove_field !== "False" ? (this.setState({viewLogic: true})) : null} */}
                        < TableCell align="left" >
                        {row.user_field.name == "User deleted" ? ('NA'): (
                                    row.codeStatus== "Closed" ? ("Closed") : (
                                        <Button variant='outlined' color='primary'
                                        onClick={() => {
                                            this.setState({ userID: row.user, approvalCode: row.codeString, viewId: row.id }, ()=> console.log('userId:', this.state.userID))
                                            this.viewAndApprove(row.id, row.codeString)
                                        }}
                                    // disabled={this.state.viewLogic}
                                    >
                                        View &amp; approve
                                </Button>
                                    )
                                    )}
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
                            {row.user_field.name == "User deleted"? ("NA") : 
                            row.codeStatus== "Closed" ? ("Closed") : (
                                row.showAssignTo_field ?
                                    (
                                        <Button
                                            variant='outlined'
                                            color='secondary'
                                            onClick={() => {
                                                this.setState({currentid: row.id}, 
                                                ()=>{console.log('currentId:',this.state.currentid)}) 
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
                                    ))}
                        </TableCell>
                        {/* {row.viewApprove_field !== "False" ? (this.setState({viewLogic: true})) : null} */}
                        < TableCell align="left" >
                        {row.user_field.name == "User deleted" ? ('NA'): (
                                    row.codeStatus== "Closed" ? ("Closed") : (
                                        <Button variant='outlined' color='primary'
                                        onClick={() => {
                                            this.setState({ userID: row.user, approvalCode: row.codeString, viewId: row.id }, ()=> console.log('userId:', this.state.userID))
                                            this.viewAndApprove(row.id, row.codeString)
                                        }}
                                    // disabled={this.state.viewLogic}
                                    >
                                        View &amp; approve
                                </Button>
                                    )
                                    )}
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
                            {row.user_field.name == "User deleted"? ("NA") : 
                            row.codeStatus== "Closed" ? ("Closed") : (
                                row.showAssignTo_field ?
                                    (
                                        <Button
                                            variant='outlined'
                                            color='secondary'
                                            onClick={() => {
                                                this.setState({currentid: row.id}, 
                                                ()=>{console.log('currentId:',this.state.currentid)}) 
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
                                    ))}
                        </TableCell>
                        {/* {row.viewApprove_field !== "False" ? (this.setState({viewLogic: true})) : null} */}
                        < TableCell align="left" >
                        {row.user_field.name == "User deleted" ? ('NA'): (
                                    row.codeStatus== "Closed" ? ("Closed") : (
                                        <Button variant='outlined' color='primary'
                                        onClick={() => {
                                            this.setState({ userID: row.user, approvalCode: row.codeString, viewId: row.id }, ()=> console.log('userId:', this.state.userID))
                                            this.viewAndApprove(row.id, row.codeString)
                                        }}
                                    // disabled={this.state.viewLogic}
                                    >
                                        View &amp; approve
                                </Button>
                                    )
                                    )}
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
                    (this.allCodesTable()) : (this.pendingApprovalTable())
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

    async assignAdmin() {

        let bodyData = {
            'assigned_to': this.state.assignAdminId
        }

        console.log('Body data:', bodyData)
        console.log('Id', this.state.approvalRowId)

        try {
            let response = await fetch(api + '/api/v1/codes/approval/' + this.state.currentid + '/assignto',
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

export default withStyles(styles)(index);
