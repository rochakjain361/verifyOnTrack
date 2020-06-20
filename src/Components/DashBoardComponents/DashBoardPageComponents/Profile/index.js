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

import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({

})

class index extends Component {

    state = {
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ marginTop: 10 }}>
                <Grid container direction='column' justify='flex-start'>
                    <Grid item xs={3}>
                        <Avatar
                            // src={this.state.result[0].picture}
                            style={{ height: "8rem", width: "8rem" }}
                        >
                            <img src="/images/sampleuserphoto.jpg" width="120" height="120" alt="" />
                        </Avatar>
                    </Grid>

                    <Grid item xs={9}>
                        <Typography variant="h6" display="block" style={{marginTop:10}}>King T'challa</Typography>
                        <Typography variant='body2' >08/11/1985</Typography>
                        <Typography variant='body2' >blackpanther@wakanda.com</Typography>  
                    </Grid>
                </Grid>
            </div >
        );
    }

}

export default withStyles(styles)(index);
