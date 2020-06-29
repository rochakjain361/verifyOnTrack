import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core/';

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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
        generateNewEmployementCodeDialog: false
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 

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
                            Access Codes
                                </Typography>
                    </Grid>
                    

                    <Grid item xs={4}>
                        <Button color='secondary' variant='contained' onClick={() => this.setState({ generateNewEmployementCodeDialog: true })} fullWidth>  Create New code </Button>
                    </Grid>

                    <Grid container direction='row' spacing={2}>
                    <Grid item >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // checked={state.checkedB}
                                    // onChange={handleChange}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Show open codes"
                        />
                    </Grid>

                    <Grid item >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // checked={state.checkedB}
                                    // onChange={handleChange}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Show unassigned codes"
                        />
                    </Grid>
                    </Grid>

                </Grid>

                <Grid container justify='flex-start' alignItems='center' spacing={2}>

                    <TableContainer component={Paper} style={{ maxWidth: '94%' , marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'black' }}>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Code</TableCell>
                                    <TableCell align="left">Employee</TableCell>
                                    <TableCell align="left">Code Status</TableCell>
                                    <TableCell align="left">Last Updated</TableCell>
                                    <TableCell align="left">Details</TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                    <TableCell align="left">Update</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.createdOn}</TableCell>
                                        <TableCell align="left">{row.codeString}</TableCell>
                                        <TableCell align="left">{row.employeeCompanyField}</TableCell>
                                        <TableCell align="left">{row.codeStatus}</TableCell>
                                        <TableCell align="left">{row.statusChangeDate}</TableCell>
                                        <TableCell align="left"><Button size='small' color="primary" variant="outlined">View Code Details</Button></TableCell>
                                        <TableCell align="left"><Button size='small' color="primary" variant="outlined">View Employee Details</Button></TableCell>
                                        <TableCell align="left"><FormControl style={{ minWidth: 85 }} variant="outlined" size='small' fullWidth>
                                            <InputLabel id="">Status</InputLabel>
                                            <Select
                                                labelId="statusOptionsEmployeeField"
                                                id="statusOptionsEmployeeField"
                                                fullWidth
                                            // value={age}
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Resend Request</MenuItem>
                                                <MenuItem value={20}>Cancel Request</MenuItem>

                                            </Select>
                                        </FormControl></TableCell>
                                        <TableCell align="right"><Button size='small' color="secondary" variant="outlined">Update</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
                {/* </Paper> */}
                
                {/* GENERATE NEW CODE DIALOG DATA */}
                {
                    <div>
                        <Dialog open={this.state.generateNewEmployementCodeDialog} onClose={() => this.setState({ generateNewEmployementCodeDialog: false })} >
                            <DialogTitle id="codegenerator">{"Code Generator"}</DialogTitle>
                            <DialogContent>
                                <Grid container justify='flex-start' direction='row' alignItems='center' spacing={2}>

                                    <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Search employee by:</FormLabel>
                                            <RadioGroup
                                                name="searchCategory"
                                            // value={value}
                                            // onChange={handleChange}
                                            >
                                                <Grid container direction='row' style={{ marginTop: 10 }}>
                                                    <FormControlLabel value="searchByEmail" control={<Radio />} label="Email" />
                                                    <FormControlLabel value="searchByUsername" control={<Radio />} label="Username" />
                                                </Grid>
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* Display these conditionally */}

                                    <Grid item xs={12}>
                                        <Autocomplete
                                            size='small'
                                            {...defaultProps}
                                            id="usernam"
                                            Email
                                            renderInput={(params) => <TextField {...params} label="Email" margin="normal" />}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Autocomplete
                                            size='small'
                                            {...defaultProps}
                                            id="username"
                                            Username
                                            renderInput={(params) => <TextField {...params} label="Username" margin="normal" />}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Autocomplete
                                            size='small'
                                            {...defaultProps}
                                            id="comapny"
                                            Company
                                            renderInput={(params) => <TextField {...params} label="Company" margin="normal" />}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Provide access to:</FormLabel>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            // checked={employeeProfile}
                                                            // onChange={handleChange}
                                                            name="ratings" />}
                                                    label="Ratings"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            // checked={jobProfile}
                                                            // onChange={handleChange}
                                                            name="address" />}
                                                    label="Address"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            // checked={jobProfile}
                                                            // onChange={handleChange}
                                                            name="profile" />}
                                                    label="Profile"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            // checked={jobProfile}
                                                            // onChange={handleChange}
                                                            name="identites" />}
                                                    label="Identities"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            // checked={jobProfile}
                                                            // onChange={handleChange}
                                                            name="phones" />}
                                                    label="Phones"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            // checked={jobProfile}
                                                            // onChange={handleChange}
                                                            name="jobHistory" />}
                                                    label="Job History"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>

                                </Grid>

                            </DialogContent>
                            <DialogActions style={{ padding: 15 }}>
                                <Button color="secondary" variant="contained" onClick={() => this.setState({ generateNewEmployementCodeDialog: false, selectedIndex: -1 })}>
                                    Generate One-time Code
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }

            </div>
        )
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
