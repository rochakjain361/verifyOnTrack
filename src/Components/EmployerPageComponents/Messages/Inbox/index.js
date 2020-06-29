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

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const rows = [
    {
        "lastUpdated": "09/12/2020",
        "initialDate": "09/12/2020",
        "discussWith": "testdiscuss",
        "message": "testMessage",
        "numberOfItems": "testItem",

    },
    {
        "lastUpdated": "09/12/2020",
        "initialDate": "09/12/2020",
        "discussWith": "testdiscuss",
        "message": "testMessage",
        "numberOfItems": "testItem",

    }
];

const styles = theme => ({

})

class index extends Component {

    state = {
        viewDetailsButton: false,
        addNewMessageDialog: false
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 

    render() {

        const { classes } = this.props;

        const style={
            color:"RED",
            background:"#3872c7",
            font:"20px",
          }

        const defaultProps = {
            options: top100Films,
            getOptionLabel: (option) => option.title,

            tableRow: {
                "&:hover": {
                  backgroundColor: "blue !important"
                }
              },

            tableHead: {
                // color: red !important
             }
        };

        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item xs={8}>
                        <Typography variant='h4'>
                            Inbox
                                </Typography>
                    </Grid>

                </Grid>

                <Grid container justify='flex-start' alignItems='center' spacing={2}>

                    <TableContainer component={Paper} style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }} elevation={5}>
                        <Table stickyHeader>
                            <TableHead style={style}>
                                <TableRow style={style}>
                                    <TableCell align="left">Last Updated</TableCell>
                                    <TableCell align="left">Initial Date</TableCell>
                                    <TableCell align="left">Discuss With</TableCell>
                                    <TableCell align="left">Message</TableCell>
                                    <TableCell align="left">Number of items</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.id} hover className={classes.tableRow}>
                                        <TableCell align="left">{row.lastUpdated}</TableCell>
                                        <TableCell align="left">{row.initialDate}</TableCell>
                                        <TableCell align="left">{row.discussWith}</TableCell>
                                        <TableCell align="left">{row.message}</TableCell>
                                        <TableCell align="left">{row.numberOfItems}</TableCell>
                                        <TableCell align="left"><Button size='small' color="primary" variant="outlined"
                                            onClick={() => this.setState({ viewDetailsButton: true })}
                                        >View Details</Button></TableCell>
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
                        <Dialog open={this.state.viewDetailsButton} onClose={() => this.setState({ viewDetailsButton: false })} >
                            <DialogTitle id="codegenerator">{"Message Details"}</DialogTitle>
                            <DialogContent>
                                <Grid container justify='flex-start' direction='row' alignItems='center' spacing={2}>
                                    
                                    <Grid item xs={12}>
                                    <Card style={{ minWidth: 400, marginTop: 10 }} elevation={4} variant="outlined" >
                                    <CardContent>
                                            <Typography style={{fontSize:14}} color="textSecondary" gutterBottom>22/09/2020</Typography>
                                            <Typography variant="h5" component="h2">Initiated by</Typography>
                                            
                                            <Typography style={{marginBottom: 12}} color="textSecondary">Message Category: category2</Typography>
                                            <Typography variant="body2" component="p">Lorem ipsum espsensido el comiliato</Typography>
                                        </CardContent>
                                    </Card>

                                    <Card style={{ minWidth: 275, marginTop: 10 }} elevation={4} variant="outlined">
                                        <CardContent>
                                            <Typography style={{fontSize:14}} color="textSecondary" gutterBottom>22/09/2020</Typography>
                                            <Typography variant="h5" component="h2">Initiated by</Typography>
                                            
                                            <Typography style={{marginBottom: 12}} color="textSecondary">Message Category: category2</Typography>
                                            <Typography variant="body2" component="p">Lorem ipsum espsensido el comiliato</Typography>
                                        </CardContent>
                                    </Card>

                                    <Card style={{ minWidth: 275, marginTop: 10 }} elevation={4} variant="outlined">
                                    <CardContent>
                                            <Typography style={{fontSize:14}} color="textSecondary" gutterBottom>22/09/2020</Typography>
                                            <Typography variant="h5" component="h2">Initiated by</Typography>
                                            <Typography style={{marginBottom: 12}} color="textSecondary">Message Category: category2</Typography>
                                            <Typography variant="body2" component="p">Lorem ipsum espsensido el comiliato</Typography>
                                        </CardContent>
                                    </Card>
                                    </Grid>

                                </Grid>

                            </DialogContent>
                            <DialogActions style={{ padding: 15 }}>
                            <Button color="primary" variant="contained" onClick={() => this.setState({ addNewMessageDialog: true, selectedIndex: -1 })}>
                                    Add new message
                            </Button>
                                <Button color="secondary" variant="contained" onClick={() => this.setState({ viewDetailsButton: false, selectedIndex: -1 })}>
                                    Back to Inbox
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }

                {
                    <div>
                    <Dialog open={this.state.addNewMessageDialog} onClose={() => this.setState({ addNewMessageDialog: false })} >
                      <DialogTitle id="form-dialog-title">Add new message</DialogTitle>
                      <DialogContent style={{ minWidth: 500 }}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="newMessage"
                          label="Type message"
                          type="text"
                          fullWidth
                          multiline
                          variant='outlined'
                          rows={4}
                        />
                      </DialogContent>
                      <DialogActions>
                      <Button variant='contained' color="primary" onClick={() => this.setState({ addNewMessageDialog: false, selectedIndex: -1 })}>
                          Submit
                        </Button>
                        <Button variant='contained' color="secondary" onClick={() => this.setState({ addNewMessageDialog: false, selectedIndex: -1 })}>
                          Cancel
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
