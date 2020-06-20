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
        inboxButtonDisable: true,
        outboxButtonDisable: false,
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 10 }}>
                <Grid container justify='center'>
                    <ButtonGroup disableElevation size='small' variant="contained" color="secondary">
                        <Button
                            disabled={this.state.inboxButtonDisable}
                            style={{ minWidth: 75 }}
                            onClick={() => this.setState({ outboxButtonDisable: false, inboxButtonDisable: true })}
                            >Inbox</Button>
                        <Button
                            style={{ minWidth: 75 }}
                            disabled={this.state.outboxButtonDisable}
                            onClick={() => this.setState({ outboxButtonDisable: true, inboxButtonDisable: false })}
                            >Outbox</Button>
                    </ButtonGroup>
                </Grid>
                {this.state.inboxButtonDisable ? (this.messageInbox()):(this.messageOutbox())}

            </div>
        );
    }

    inboxMessageDescription() {
        return (
            <div>
                <Grid container justify='space-between'>
                    <Typography>Initiated by Inbox</Typography>
                    <Typography variant='caption'>04/07/2020</Typography>
                </Grid>
                <Typography variant="body2" display="block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.</Typography>
            </div>
        );
    }

    messageInbox() {
        return (
            <div>
                <Paper variant='outlined' style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} alignItems='center'>
                        <Grid item xs={1}>
                            <MessageIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <>{this.inboxMessageDescription()}</>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper variant='outlined' style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} alignItems='center'>
                        <Grid item xs={1}>
                            <MessageIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <>{this.inboxMessageDescription()}</>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper variant='outlined' style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} alignItems='center'>
                        <Grid item xs={1}>
                            <MessageIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <>{this.inboxMessageDescription()}</>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

    outboxMessageDescription() {
        return (
            <div>
                <Grid container justify='space-between'>
                    <Typography>Initiated by Outbox</Typography>
                    <Typography variant='caption'>04/07/2020</Typography>
                </Grid>
                <Typography variant="body2" display="block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.</Typography>
            </div>
        );
    }

    messageOutbox() {
        return (
            <div>
                <Paper variant='outlined' style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} alignItems='center'>
                        <Grid item xs={1}>
                            <MessageIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <>{this.outboxMessageDescription()}</>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper variant='outlined' style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} alignItems='center'>
                        <Grid item xs={1}>
                            <MessageIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <>{this.outboxMessageDescription()}</>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper variant='outlined' style={{ marginTop: 10 }}>
                    <Grid container style={{ padding: 10 }} alignItems='center'>
                        <Grid item xs={1}>
                            <MessageIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <>{this.outboxMessageDescription()}</>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(index);
