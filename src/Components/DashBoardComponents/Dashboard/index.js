import React, { Component } from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Tabs,
    Tab,
    Box
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import WorksAt from '../DashBoardPageComponents/WorksAt'
import CustomAppBar from '../DashBoardPageComponents/CustomAppbar';
import Messages from '../DashBoardPageComponents/Messages'
import Ratings from '../DashBoardPageComponents/Ratings'
import Codes from '../DashBoardPageComponents/Codes'
import Profile from '../DashBoardPageComponents/Profile'
import RatingBars from '../DashBoardPageComponents/RatingBars'
import DashButtons from '../DashBoardPageComponents/DashButtons'

const styles = theme => ({
    profileCardHeight: {
        minHeight: 250,
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
          <Box py={2}>
            <Grid
              container
              direction="row"
              spacing={2}
              justify="flex-start"
              style={{ background: "#eeeeee" }}
            >
              <Grid item xs={4}>
                <Card className={classes.profileCardHeight} elevation={2}>
                  <CardContent>
                    <Typography variant="h5" display="block" align="flex-start">
                      Profile
                    </Typography>
                    <Profile />
                  </CardContent>
                </Card>

                {/* <Card className={classes.marginTop} elevation={2}> */}
                  {/* <CardContent> */}
                    {/* <DashButtons/> */}
                  {/* </CardContent> */}
                {/* </Card> */}
                    
                <Card
                  elevation={2}
                  className={classes.marginTop}
                  style={{ minHeight: 300, maxHeight: 400, overflow: 'auto' }}
                >
                  <CardContent>
                    <Typography variant="h5" display="block"  align="flex-start">
                      Works at
                    </Typography>
                    <WorksAt />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={8}>


                <Card className={classes.profileCardHeight} elevation={2} style={{minHeight: 348}}>
                  <CardContent>
                    <CustomAppBar
                      onChange={(event, value) =>
                        this.setState({
                          selectedTabIndex: value,
                          activeTopicIndex: 0,
                        })
                      }
                    ></CustomAppBar>

                    {this.state.selectedTabIndex === 0 ? <Messages /> : <div />}
                    {this.state.selectedTabIndex === 1 ? <Codes /> : <div />}
                    {this.state.selectedTabIndex === 2 ? <Ratings /> : <div />}
                  </CardContent>
                </Card>

                <Card
                  className={classes.profileCardHeight}
                  elevation={2}
                  className={classes.marginTop}
                  style={{minHeight: 342}}
                >
                  <CardContent>
                    <Typography variant='h5' display="block">
                      Ratings
                    </Typography>
                    <RatingBars/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
    }

}

export default withStyles(styles)(index);
