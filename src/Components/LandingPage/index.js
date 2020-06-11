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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Button, Grid } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InfoIcon from '@material-ui/icons/Info';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';

import Dashboard from '../DashBoardComponents/Dashboard'
import Addresses from '../DashBoardComponents/Addresses'
import Identities from '../DashBoardComponents/Identities'
import Phones from '../DashBoardComponents/Phones'
import MyJobProfile from '../DashBoardComponents/MyJobProfile'
import Messages from '../DashBoardComponents/Messages'
import MyProfile from '../DashBoardComponents/MyProfile'

const drawerWidth = 240;

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

class NewLandingPage extends React.PureComponent {

  state = {
    open1: false,
    open2: false,
    open3: false,
    open4: false,
  }

  render() {
    const { classes } = this.props;

    return (
      <Router>

        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>

              <Grid container justify='space-between' >

                <Grid item >
                  <Typography variant="h6" noWrap>
                    Verify OnTrack
                    </Typography>
                </Grid>

                <Grid item >
                  <Button color="inherit" variant='outlined'>Logout</Button>
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

              <Link to="/dashboard" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <InfoIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} className={classes.textColor} />
                </ListItem>
              </Link>

              <Divider />

              <ListItem button onClick={() => this.setState({ open1: !this.state.open1 })}>
                <ListItemIcon>
                  <InboxIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="My Info" className={classes.textColor} />
                {this.state.open1 ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
              </ListItem>

              <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/profiles" className={classes.link} >
                    <ListItem button className={classes.nested}>
                      <ListItemText primary="Profiles" className={classes.textColor} />
                    </ListItem>
                  </Link>

                  <Link to="/addresses" className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemText primary="Addresses" className={classes.textColor} />
                    </ListItem>
                  </Link>

                  <Link to="/identities" className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemText primary="Identities" className={classes.textColor} />
                    </ListItem>
                  </Link>

                  <Link to="/phones" className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemText primary="Phones" className={classes.textColor} />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>

              <Divider />

              <Link to="/myjobprofile" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <ShoppingCartIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="My Job Profile" className={classes.textColor} />
                </ListItem>
              </Link>

              <Divider />

              <Link to="/messages" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <InfoIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Messages"} className={classes.textColor} />
                </ListItem>
              </Link>

              <Divider />

            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <Switch>

              <Route exact path="/dashboard">
                <Container>
                  <Dashboard />
                </Container>
              </Route>

              <Route exact path="/profiles">
                <Container>
                  <MyProfile />
                </Container>
              </Route>

              <Route exact path="/addresses">
                <Container>
                  <Addresses />
                </Container>
              </Route>

              <Route exact path="/identities">
                <Container>
                  <Identities />
                </Container>
              </Route>

              <Route exact path="/Phones">
                <Container>
                  <Phones />
                </Container>
              </Route>

              <Route exact path="/myjobprofile">
                <Container>
                  <MyJobProfile />
                </Container>
              </Route>

              <Route exact path="/messages">
                <Container>
                  <Messages />
                </Container>
              </Route>
            </Switch>
          </main>
        </div>

      </Router>
    );
  }
};

export default withStyles(styles)(NewLandingPage);
