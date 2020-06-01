import React from 'react';
import { makeStyles } from "@material-ui/core/styles"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Typography, } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';

import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Addresses from '../DashBoardComponents/Addresses'
import Identities from '../DashBoardComponents/Identities'
import Phones from '../DashBoardComponents/Phones'
import MyJobProfile from '../DashBoardComponents/MyJobProfile'
import Messages from '../DashBoardComponents/Messages'
import MyProfile from '../DashBoardComponents/MyProfile'

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit',  background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)'},
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  nested: {
    marginLeft: 32
  }
}))

function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Drawer
          style={{ width: '220px', }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
          >
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" >
              </ListSubheader>
            }
            className={classes.root}
          >
            <ListItem button onClick={handleClick} selected>
              <ListItemIcon>
                <BusinessCenterIcon style={{color: "white"}} />
              </ListItemIcon>
              <ListItemText primary="My Info" style={{color: "white", fontWeight: 'bold', fontFamily: 'Montserrat'}} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>

              <List component="div" disablePadding>
              <Link to="/profiles" className={classes.link}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <FormatListBulletedIcon  style={{color: "white"}} />
                    </ListItemIcon>
                    <ListItemText primary="Profiles"  style={{color: "white"}} />
                  </ListItem>
                </Link>
              </List>

              <List component="div" disablePadding>
              <Link to="/addresses" className={classes.link}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <FormatListBulletedIcon  style={{color: "white"}} />
                    </ListItemIcon>
                    <ListItemText primary="Addresses"  style={{color: "white"}} />
                  </ListItem>
                </Link>
              </List>

              <List component="div" disablePadding>
              <Link to="/identities" className={classes.link}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <OndemandVideoIcon style={{color: "white"}} />
                    </ListItemIcon>
                    <ListItemText primary="Identities"  style={{color: "white"}} />
                  </ListItem>
                </Link>
              </List>

              <List component="div" disablePadding>
                <Link to="/phones" className={classes.link}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListAltIcon style={{color: "white"}} />
                    </ListItemIcon>
                    <ListItemText primary="Phones"  style={{color: "white"}} />
                  </ListItem>
                </Link>
              </List>

            </Collapse>

          </List>

          <List>
          <Link to="/myjobprofile" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <ShoppingCartIcon style={{color: "white"}} />
                    </ListItemIcon>
                    <ListItemText primary="My Job Profile"  style={{color: "white"}} />
                  </ListItem>
                </Link>

            <Link to="/messages" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon style={{color: "white"}} />
                </ListItemIcon>
                <ListItemText primary={"Messages"}  style={{color: "white"}} />
              </ListItem>
            </Link>

          </List>

        </Drawer>
        <Switch>

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

          <Route path="/dashboard/about">
            <Container>
              <Typography variant="h3" gutterBottom>
                About
              </Typography>
              <Typography variant="body1" gutterBottom>Blah Blah Blah</Typography>
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;