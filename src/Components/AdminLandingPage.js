import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemtext from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Button, Grid } from "@material-ui/core";

import PhoneIcon from '@material-ui/icons/Phone';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CodeIcon from '@material-ui/icons/Code';
import PinDropIcon from '@material-ui/icons/PinDrop';
import SettingsIcon from '@material-ui/icons/Settings';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import WorkIcon from '@material-ui/icons/Work';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import axios from "axios";
import ManageStates from './AdminPageComponents/Settings/AddressSettings/ManageStates'
import ManageLGAs from './AdminPageComponents/Settings/AddressSettings/ManageLGAs'
import ManageCities from './AdminPageComponents/Settings/AddressSettings/ManageCities'
import ManageAddressTypes from './AdminPageComponents/Settings/AddressSettings/ManageAddressTypes'
import ManageAddressReasons from './AdminPageComponents/Settings/AddressSettings/ManageAddressReasons'
import ManagePhoneTypes from '././AdminPageComponents/Settings/Phone Settings/ManagePhoneTypes'
import ManagePhoneReasons from '././AdminPageComponents/Settings/Phone Settings/ManagePhoneReasons'
import ManageIdSources from './AdminPageComponents/Settings/ManageIdSources'
import ManageJobCategories from './AdminPageComponents/Settings/ManageJobSettings/ManageJobCategories'
import ManageJobLeavingReasons from './AdminPageComponents/Settings/ManageJobSettings/ManageJobLeavingReasons'
import AddAdminUser from './AdminPageComponents/Administration/AddAdminUser'
import AdminAccessCodes from './AdminPageComponents/ManageCodes/AdminAccessCodes'
import AdminEvaluationCodes from './AdminPageComponents/ManageCodes/AdminEvaluationCodes'

const drawerWidth = 255;
let token1 = "";
let token = "" ;
let id = "";
const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: 10,
    },
    nested: {
        paddingLeft: 25,
    },
    nested2: {
        paddingLeft: 75,
    },
    collapseNested: {
        paddingLeft: 55,
    },
    link: {
        textDecoration: 'none',
        // color: theme.palette.text.primary
    },
    drawerPaper: {
        width: 'inherit',
        background: '#424242'
    },
    textColor: {
        color: 'white',
        fontFamily: "Montserrat"
    }
});

class AdminLandingPage extends React.PureComponent {
  state = {
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
  };
  async logout() {
    console.log(token);
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(
        "http://3.22.17.212:8000/api/v1/accounts/auth/logout",
        {},

        headers
      )
      .then((response) => {
        localStorage.clear();
        console.log(response);
      });

    console.log("////////////////////////////////////////");
    this.props.history.push({
      pathname: "/signin",
    });
  }
  async componentDidMount(){
    token1 = localStorage.getItem("Token");
token = "Token " + token1;
id = localStorage.getItem("id");
  }

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="h6" noWrap>
                    Verify OnTrack
                  </Typography>
                </Grid>

                <Grid item>
                  <Button color="inherit" variant="outlined" onClick={()=>{this.logout()}}>
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <ListItem
                button
                onClick={() => this.setState({ open5: !this.state.open5 })}
              >
                <ListItemIcon>
                  <SettingsIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemtext
                  className={classes.textColor}
                  primary="Settings"
                />
                {this.state.open5 ? (
                  <ExpandLess className={classes.textColor} />
                ) : (
                  <ExpandMore className={classes.textColor} />
                )}
              </ListItem>

              <Collapse in={this.state.open5} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    onClick={() => this.setState({ open6: !this.state.open6 })}
                    className={classes.nested}
                  >
                    <ListItemIcon>
                      <PinDropIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemtext
                      className={classes.textColor}
                      primary="Address Settings"
                    />
                    {this.state.open6 ? (
                      <ExpandLess className={classes.textColor} />
                    ) : (
                      <ExpandMore className={classes.textColor} />
                    )}
                  </ListItem>

                  <Collapse
                    in={this.state.open6}
                    timeout="auto"
                    unmountOnExit
                    className={classes.collapseNested}
                  >
                    <List component="div" disablePadding>
                      <Link to="/manageStates" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemtext
                            className={classes.textColor}
                            primary="Manage States"
                          />
                        </ListItem>
                      </Link>

                      <Link to="/manageLGAs" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemtext
                            className={classes.textColor}
                            primary="Manage LGAs"
                          />
                        </ListItem>
                      </Link>

                      <Link to="/manageCities" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemtext
                            className={classes.textColor}
                            primary="Cities"
                          />
                        </ListItem>
                      </Link>

                      <Link to="/manageAddressTypes" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemtext
                            className={classes.textColor}
                            primary="Manage Address Types"
                          />
                        </ListItem>
                      </Link>

                      <Link to="/manageAddressReasons" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemtext
                            className={classes.textColor}
                            primary="Manage Address Reasons"
                          />
                        </ListItem>
                      </Link>
                    </List>
                  </Collapse>

                  <Divider />

                  <ListItem
                    button
                    onClick={() => this.setState({ open2: !this.state.open2 })}
                    className={classes.nested}
                  >
                    <ListItemIcon>
                      <PhoneIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemtext
                      className={classes.textColor}
                      primary="Phone Settings"
                    />
                    {this.state.open2 ? (
                      <ExpandLess className={classes.textColor} />
                    ) : (
                      <ExpandMore className={classes.textColor} />
                    )}
                  </ListItem>

                  <Collapse
                    in={this.state.open2}
                    timeout="auto"
                    unmountOnExit
                    className={classes.collapseNested}
                  >
                    <List component="div" disablePadding>
                      <Link to="/managePhoneTypes" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemtext
                            className={classes.textColor}
                            primary="Manage Phone Types"
                          />
                        </ListItem>
                      </Link>

                      <Link to="/managePhoneReasons" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemtext
                            className={classes.textColor}
                            primary="Manage Phones Reasons"
                          />
                        </ListItem>
                      </Link>
                    </List>
                  </Collapse>

                  <Divider />

                  <Link
                    to="/manageIdSources"
                    className={classes.link}
                    style={{ paddingLeft: 25 }}
                  >
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <PermIdentityIcon style={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemtext
                          className={classes.textColor}
                          primary="Manage ID sources"
                        />
                      </ListItem>
                    </List>
                  </Link>
                  <Divider />

                  <ListItem
                    button
                    onClick={() => this.setState({ open7: !this.state.open7 })}
                    className={classes.nested}
                  >
                    <ListItemIcon>
                      <WorkIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemtext
                      className={classes.textColor}
                      primary="Manage Job Settings"
                    />
                    {this.state.open7 ? (
                      <ExpandLess className={classes.textColor} />
                    ) : (
                      <ExpandMore className={classes.textColor} />
                    )}
                  </ListItem>

                  <Collapse
                    in={this.state.open7}
                    timeout="auto"
                    unmountOnExit
                    className={classes.collapseNested}
                  >
                    <List component="div" disablePadding>
                      <Link to="/manageJobCategories" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemtext
                            className={classes.textColor}
                            primary="Manage Categories"
                          />
                        </ListItem>
                      </Link>

                      <Link
                        to="/manageJobLeavingReasons"
                        className={classes.link}
                      >
                        <ListItem button className={classes.nested}>
                          <ListItemtext
                            className={classes.textColor}
                            primary="Manage Job Reasons"
                          />
                        </ListItem>
                      </Link>
                    </List>
                  </Collapse>
                </List>
              </Collapse>

              <Divider />

              <ListItem
                button
                onClick={() => this.setState({ open3: !this.state.open3 })}
              >
                <ListItemIcon>
                  <SupervisorAccountIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemtext
                  className={classes.textColor}
                  primary="Administration"
                />
                {this.state.open2 ? (
                  <ExpandLess className={classes.textColor} />
                ) : (
                  <ExpandMore className={classes.textColor} />
                )}
              </ListItem>

              <Collapse in={this.state.open3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/addAdmin" className={classes.link}>
                    <ListItem button className={classes.nested2}>
                      <ListItemtext
                        className={classes.textColor}
                        primary="Add Admin User"
                      />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>

              <Divider />

              <ListItem
                button
                onClick={() => this.setState({ open4: !this.state.open4 })}
              >
                <ListItemIcon>
                  <CodeIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemtext
                  className={classes.textColor}
                  primary="Manage Codes"
                />
                {this.state.open4 ? (
                  <ExpandLess className={classes.textColor} />
                ) : (
                  <ExpandMore className={classes.textColor} />
                )}
              </ListItem>

              <Collapse in={this.state.open4} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/adminAccessCodes" className={classes.link}>
                    <ListItem button className={classes.nested2}>
                      <ListItemtext
                        className={classes.textColor}
                        primary="Access Codes"
                      />
                    </ListItem>
                  </Link>

                  <Link to="/adminEvaluationCodes" className={classes.link}>
                    <ListItem button className={classes.nested2}>
                      <ListItemtext
                        className={classes.textColor}
                        primary="Evaluation Codes"
                      />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>

              <Divider />
            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <Switch>
              <Route exact path="/manageStates">
                <Container>
                  <ManageStates />
                </Container>
              </Route>

              <Route exact path="/manageLGAs">
                <Container>
                  <ManageLGAs />
                </Container>
              </Route>

              <Route exact path="/manageCities">
                <Container>
                  <ManageCities />
                </Container>
              </Route>

              <Route exact path="/manageAddressTypes">
                <Container>
                  <ManageAddressTypes />
                </Container>
              </Route>

              <Route exact path="/manageAddressReasons">
                <Container>
                  <ManageAddressReasons />
                </Container>
              </Route>

              <Route exact path="/managePhoneTypes">
                <Container>
                  <ManagePhoneTypes />
                </Container>
              </Route>

              <Route exact path="/managePhoneReasons">
                <Container>
                  <ManagePhoneReasons />
                </Container>
              </Route>

              <Route exact path="/manageIdSources">
                <Container>
                  <ManageIdSources />
                </Container>
              </Route>

              <Route exact path="/manageJobCategories">
                <Container>
                  <ManageJobCategories />
                </Container>
              </Route>

              <Route exact path="/manageJobLeavingReasons">
                <Container>
                  <ManageJobLeavingReasons />
                </Container>
              </Route>

              <Route exact path="/addAdmin">
                <Container>
                  <AddAdminUser />
                </Container>
              </Route>

              <Route exact path="/adminAccessCodes">
                <Container>
                  <AdminAccessCodes />
                </Container>
              </Route>

              <Route exact path="/AdminEvaluationCodes">
                <Container>
                  <AdminEvaluationCodes />
                </Container>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
};

export default withStyles(styles)(AdminLandingPage);