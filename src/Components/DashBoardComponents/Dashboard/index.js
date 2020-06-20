import React, { Component } from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
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

import WorksAt from '../DashBoardPageComponents/WorksAt'
import CustomAppBar from '../DashBoardPageComponents/CustomAppbar';
import Messages from '../DashBoardPageComponents/Messages'
import Ratings from '../DashBoardPageComponents/Ratings'
import Codes from '../DashBoardPageComponents/Codes'

const styles = theme => ({
    profileCardHeight: {
        minHeight: 300,
        // minWidth: window.innerWidth/3
    },
    tabs: {
        flexGrow: 1,
        // flexBasis: 'auto'
    },
    expansionWidth: {
        width: '100%',
    },
    marginTop: {
        marginTop: 20
    }
})

class index extends Component {

    state = {
        activeTopicIndex: 0,
        selectedTabIndex: 0,
    }

    render() {

        const { classes } = this.props;

        return (
            <div style={{ padding: 20 }}>
                <Grid container direction='row' spacing={2} justify='flex-start'>
                    <Grid item xs={4}>
                        <Card className={classes.profileCardHeight} elevation={4}>
                            <CardContent>
                                <Typography variant='button' display="block">Profile</Typography>
                            </CardContent>
                        </Card>

                        <Card elevation={4} className={classes.marginTop} style={{ minHeight: 400 }}>
                            <CardContent>
                                <Typography variant="button" display="block">Works at</Typography>
                                <WorksAt />
                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={8}>
                        <Card className={classes.profileCardHeight} elevation={4}>
                            <CardContent>

                                <CustomAppBar 
                                    onChange={(event, value) => this.setState({ selectedTabIndex: value, activeTopicIndex: 0 })}>
                                </CustomAppBar>

                                {
                                    this.state.selectedTabIndex === 0 ? <Messages/> : <div/>                   
                                }
                                {
                                    this.state.selectedTabIndex === 1 ? <Codes/> : <div/>                   
                                }
                                {
                                    this.state.selectedTabIndex === 2 ? <Ratings/> : <div/>                   
                                }

                            </CardContent>
                        </Card>

                        <Card className={classes.profileCardHeight} elevation={4} className={classes.marginTop}>
                            <CardContent>
                                <Paper className={classes.tabs}>
                                    <Tabs
                                        // value={value}
                                        // onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        centered
                                    >
                                        <Tab label="Messages" />
                                        <Tab label="Codes" />
                                        <Tab label="Ratings" />
                                    </Tabs>
                                </Paper>
                                <Typography >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                </Typography>
                            </CardContent>
                        </Card>

                    </Grid>

                </Grid>
            </div>
        );
    }

}

export default withStyles(styles)(index);
