import React, { Component } from 'react'
import {
    Grid,
    Typography,
    Paper,
    ButtonGroup,
    Button,
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import MessageIcon from '@material-ui/icons/Message'

const styles = theme => ({

})

class index extends Component {

    state = {
        accessCodesButtonDisable: true,
        employementCodesButtonDisable: false,
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 10 }}>
                <Grid container justify='center'>
                    <ButtonGroup disableElevation size='small' variant="contained" color="secondary">
                        <Button
                            disabled={this.state.accessCodesButtonDisable}
                            style={{ minWidth: 150 }}
                            onClick={() => this.setState({ employementCodesButtonDisable: false, accessCodesButtonDisable: true })}
                            >AccessCodes</Button>
                        <Button
                            style={{ minWidth: 150 }}
                            disabled={this.state.employementCodesButtonDisable}
                            onClick={() => this.setState({ employementCodesButtonDisable: true, accessCodesButtonDisable: false })}
                            >EmployementCodes</Button>
                    </ButtonGroup>
                </Grid>
                <Grid container direction ='row' style={{marginTop: 10, marginLeft:3}}>
                    <Grid item xs={4}><Typography variant='h6' display="block">Created on</Typography></Grid>
                    <Grid item xs={4}><Typography variant='h6' display="block">Code</Typography></Grid>
                    <Grid item xs={4}><Typography variant='h6' display="block">Action</Typography></Grid>
                </Grid>
                {this.state.accessCodesButtonDisable ? (this.accessCodes()):(this.employementCodes())}

            </div>
        );
    }

    accessCodes() {
        return (
            <div>
               <Paper elevation={1} style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} direction='row' alignItems='center'>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">05/08/2020</Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">EDja-JMZs-iHoR</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button color='default' variant='contained' href='#' style={{minWidth:100}}>Action</Button>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={1} style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} direction='row' alignItems='center'>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">05/08/2020</Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">EDja-JMZs-iHoR</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button color='default' variant='contained' href='#' style={{minWidth:100}}>Action</Button>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={1} style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} direction='row' alignItems='center'>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">05/08/2020</Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">EDja-JMZs-iHoR</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button color='default' variant='contained' href='#' style={{minWidth:100}}>Action</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }

    employementCodes() {
        return (
            <div>
               <Paper elevation={1} style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} direction='row' alignItems='center'>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">05/08/2020</Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">EDja-JMZs-iHoR</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button color='default' variant='contained' href='#' style={{minWidth:100}}>Action</Button>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={1} style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} direction='row' alignItems='center'>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">05/08/2020</Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">EDja-JMZs-iHoR</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button color='default' variant='contained' href='#' style={{minWidth:100}}>Action</Button>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={1} style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} direction='row' alignItems='center'>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">05/08/2020</Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography variant="body2" display="block">EDja-JMZs-iHoR</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button color='default' variant='contained' href='#' style={{minWidth:100}}>Action</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }

}

export default withStyles(styles)(index);
