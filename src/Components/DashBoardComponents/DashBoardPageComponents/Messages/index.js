import React, { Component } from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Switch,
    ButtonGroup,
    Button,
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
        inboxButtonDisable: false,
        outboxButtonDisable: true,
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 10 }}>
                <Grid container justify='center'>
                    <ButtonGroup disableElevation size='small' variant="contained" color="secondary">
                        <Button 
                        disabled={this.state.inboxButtonDisable}
                        style={{minWidth:75}}
                        onClick={()=>this.setState({inboxButtonDisable: !this.state.outButtonDisable})}>Inbox</Button>
                        <Button 
                        style={{minWidth:75}} 
                        disabled={this.state.inboxButtonDisable}
                        onClick={()=>this.setState({outboxButtonDisable: this.state.inboxButtonDisable})}>Outbox</Button>
                    </ButtonGroup>
                </Grid>

                <Paper variant='outlined' style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} alignItems='center'>
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
                <Paper variant='outlined' style={{ marginTop: 5 }} >
                    <Grid container style={{ padding: 10 }} alignItems='center'>
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
                <Paper variant='outlined' style={{ marginTop: 5 }} >
                    <Grid container style={{ padding: 10 }} alignItems='center'>
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
