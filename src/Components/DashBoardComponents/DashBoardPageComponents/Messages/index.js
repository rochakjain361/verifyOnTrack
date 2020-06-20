import React, { Component } from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Switch,
    FormGroup,
    Tabs,
    Tab,
    AppBar,
    TabPanel,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import MessageIcon from '@material-ui/icons/Message'

const styles = theme => ({

})

class index extends Component {

    state = {
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20 }}>
                <Switch style={{flex: -1}}></Switch>
                <Paper variant='outlined' style={{ marginTop: 5 }}>
                    <Grid container style={{padding: 10}} alignItems='center'>
                        <Grid item xs={1}>
                        <MessageIcon /> 
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant='body1' display='block'>
                            Initiated by
                            </Typography>
                        <Typography variant="body2" display="block">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper variant='outlined'style={{ marginTop: 5 }} >
                    <Grid container style={{padding: 10}} alignItems='center'>
                        <Grid item xs={1}>
                        <MessageIcon /> 
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant='body1' display='block'>
                            Initiated by
                            </Typography>
                        <Typography variant="body2" display="block">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper variant='outlined'style={{ marginTop: 5 }} >
                    <Grid container style={{padding: 10}} alignItems='center'>
                        <Grid item xs={1}>
                        <MessageIcon /> 
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant='body1' display='block'>
                            Initiated by
                            </Typography>
                        <Typography variant="body2" display="block">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }

}

export default withStyles(styles)(index);
