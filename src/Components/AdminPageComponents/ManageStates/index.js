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

const rows = [
    {
        "state": "testState1",
    },
    {
        "state": "testState2"
    },
    {
        "state": "testState3",
    },
    {
        "state": "testState4"
    }
];

const styles = theme => ({

})

export class index extends Component {
    render() {

        const { classes } = this.props;

        return (
            <div atyle={{marginTop: 20}}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                    <Grid container justify='space-between' alignItems='center' spacing={4}>

                        <Grid item>
                            <Typography variant='h4'>
                                States
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <div >
                                <TextField
                                    placeholder="Search…"
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container justify='flex-start' alignItems='center' style={{ marginTop: 20 }} spacing={2}>

                        <Grid item xs={3}>

                            <TextField
                                label="Enter new state to add"
                                variant='outlined'
                                size='medium'
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                        <Fab size="small" color="secondary">
                            <AddIcon />
                        </Fab>
                        </Grid>

                        <TableContainer component={Paper} style={{marginTop: 20, marginLeft: 10, marginRight: 10}} elevation={5}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: 'black' }}>
                                        <TableCell align="left">State</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="left">{row.state}</TableCell>
                                            <TableCell align="right"><Button color="primary" variant="outlined">Delete</Button></TableCell>
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
}

export default withStyles(styles)(index);

