import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Button, Grid } from "@material-ui/core";

import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import MessageIcon from '@material-ui/icons/Message';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CodeIcon from '@material-ui/icons/Code';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import axios from "axios";
import Dashboard from './EmployerPageComponents/Dashboard'
import Inbox from './EmployerPageComponents/Messages/Inbox'
import Outbox from './EmployerPageComponents/Messages/Outbox'
import AccessCodes from './EmployerPageComponents/MyCodes/AccessCodes'
import EmployementCodes from './EmployerPageComponents/MyCodes/EmployementCodes'

const drawerWidth = 240;
let token="";
let token1="";
let id="";
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
    padding: 0,
  },
  nested: {
    paddingLeft: 72,
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
 
class EmployerLandingPage extends React.PureComponent {
  state = {
    open1: false,
    open2: false,
  };
  async componentDidMount() {
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");

  }
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
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => {
                      this.logout();
                    }}
                  >
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
              <Link to="/employerDashboard" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <DashboardIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Dashboard"}
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>

              <Divider />

              <ListItem
                button
                onClick={() => this.setState({ open2: !this.state.open2 })}
              >
                <ListItemIcon>
                  <MessageIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Messages"
                  className={classes.textColor}
                />
                {this.state.open2 ? (
                  <ExpandLess style={{ color: "white" }} />
                ) : (
                  <ExpandMore style={{ color: "white" }} />
                )}
              </ListItem>

              <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/employerInbox" className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        primary="Inbox"
                        className={classes.textColor}
                      />
                    </ListItem>
                  </Link>

                  <Link to="/employerOutbox" className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        primary="Outbox"
                        className={classes.textColor}
                      />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>

              <Divider />

              <ListItem
                button
                onClick={() => this.setState({ open1: !this.state.open1 })}
              >
                <ListItemIcon>
                  <CodeIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="My Codes"
                  className={classes.textColor}
                />
                {this.state.open1 ? (
                  <ExpandLess style={{ color: "white" }} />
                ) : (
                  <ExpandMore style={{ color: "white" }} />
                )}
              </ListItem>

              <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/employerAccessCodes" className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        primary="Access Codes"
                        className={classes.textColor}
                      />
                    </ListItem>
                  </Link>

                  <Link to="/employerEmployementCodes" className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        primary="Employement Codes"
                        className={classes.textColor}
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
              <Route exact path="/employerDashboard">
                <Container >
                  <Dashboard />
                </Container>
              </Route>

              <Route exact path="/employerInbox">
                <Container>
                  <Inbox />
                </Container>
              </Route>

              <Route exact path="/employerOutbox">
                <Container>
                  <Outbox />
                </Container>
              </Route>

              <Route exact path="/employerAccessCodes">
                <Container>
                  <AccessCodes />
                </Container>
              </Route>

              <Route exact path="/employerEmployementCodes">
                <Container>
                  <EmployementCodes />
                </Container>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
};

export default withStyles(styles)(EmployerLandingPage);
