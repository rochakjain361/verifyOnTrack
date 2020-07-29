import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Collapse from "@material-ui/core/Collapse";
import { Container, Button, Grid } from "@material-ui/core";

import axios from "axios";

import WorkIcon from "@material-ui/icons/Work";

import CodeIcon from "@material-ui/icons/Code";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PhoneIcon from "@material-ui/icons/Phone";
import { useState, useEffect } from "react";
import { Title } from "@material-ui/icons";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PinDropIcon from "@material-ui/icons/PinDrop";
import SettingsIcon from "@material-ui/icons/Settings";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import StarsIcon from '@material-ui/icons/Stars';

import ManageIdSources from "./Components/AdminPageComponents/Settings/ManageIdSources";

import AddAdminUser from "./Components/AdminPageComponents/Administration/AddAdminUser";

import AddressTabs from './Components/AdminPageComponents/Settings/AddressSettings/AddressTabs'
import PhoneTabs from './Components/AdminPageComponents/Settings/Phone Settings/PhoneTabs'
import JobTabs from './Components/AdminPageComponents/Settings/ManageJobSettings/JobTabs'
import RatingsTabs from './Components/AdminPageComponents/Settings/RatingAndSurveySettings/RatingsTabs'
import CodeTabs from './Components/AdminPageComponents/ManageCodes/CodeTabs'

const drawerWidth = 330;
let token1 = "";
let token = "";
let id = "";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    width: "inherit",
    background: "#424242",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "#424242",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    background: "#424242",
  },
  textColor: {
    color: "white",
  },
  drawerPaper: {
    width: "inherit",
    background: "#424242",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: 72,

  },
  nested2: {
    paddingLeft: 75,

  },
  collapseNested: {
    paddingLeft: 55,
  },
  link: {
    textDecoration: "none",
    // color: theme.palette.text.primary
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MiniDrawer(props) {
  // const { classes } = this.props;

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [Token, setToken] = React.useState("");
  const [Token1, setToken1] = React.useState("");
  const [id, setid] = React.useState("");
  // const [anchorEl, setAnchorEl] = React.useState(false);
  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    setid(localStorage.getItem("id"));
  });

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  const [open9, setOpen9] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
    setOpen7(false);
    setOpen8(false);
  };

  const logout = async () => {
    console.log(token);
    let headers = {
      headers: {
        Authorization: Token,
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
    props.history.push("/signin");
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Verify OnTrac
            </Typography>
            <Button
              onClick={logout}
              color="inherit"
              variant="outlined"
              size="medium"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: "white" }} />
              ) : (
                  <ArrowBackIcon style={{ color: "white" }} />
                )}
            </IconButton>
          </div>

          <ListItem
            button
            onClick={(() => setOpen1(!open1), () => setOpen(!open))}
          >
            <ListItemIcon>
              <SettingsIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" className={classes.textColor} />
            {open1 ? (
              <ExpandLess style={{ color: "white" }} />
            ) : (
                <ExpandMore style={{ color: "white" }} />
              )}
          </ListItem>

          <Collapse in={(open1, open)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/addressSettings" className={classes.link} onClick={() => handleDrawerClose()}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PinDropIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Address Settings"}
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>
              {/* <Divider /> */}

              <Link to="/phoneSettings" className={classes.link} onClick={() => handleDrawerClose()}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PhoneIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Phone Settings"}
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>
              {/* <Divider /> */}

              <Link to="/manageIdSources" className={classes.link} onClick={() => handleDrawerClose()}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PermIdentityIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"ID Source Settings"}
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>
              {/* <Divider /> */}

              <Link to="/jobSettings" className={classes.link} onClick={() => handleDrawerClose()}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <WorkIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Job Settings"}
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>
              {/* <Divider /> */}

              <Link to="/ratingsSettings" className={classes.link} onClick={() => handleDrawerClose()}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarsIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Rating & Survey Settings"}
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>
              {/* <Divider /> */}

            </List>
          </Collapse>

          <Divider />

          <ListItem
            button
            onClick={(() => setOpen2(open2), () => setOpen(!open))}
          >
            <ListItemIcon>
              <SupervisorAccountIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary="Administration"
              className={classes.textColor}
            />
            {open2 ? (
              <ExpandLess style={{ color: "white" }} />
            ) : (
                <ExpandMore style={{ color: "white" }} />
              )}
          </ListItem>

          <Collapse in={(open2, open)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/addAdmin" className={classes.link}>
                <ListItem
                  button
                  className={classes.nested2}
                  onClick={() => handleDrawerClose()}
                >
                  <ListItemText
                    className={classes.textColor}
                    primary="Add Admin User"
                  />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <Divider />

          <Link to="/adminCodes" className={classes.link} onClick={() => handleDrawerClose()}>
                <ListItem button>
                  <ListItemIcon>
                    <CodeIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"My Codes"}
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>
              {/* <Divider /> */}

          <Divider />
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Switch>

            <Route exact path="/addressSettings">
              <Container>
                <AddressTabs />
              </Container>
            </Route>

            <Route exact path="/phoneSettings">
              <Container>
                <PhoneTabs />
              </Container>
            </Route>

            <Route exact path="/manageIdSources">
              <Container>
                <ManageIdSources />
              </Container>
            </Route>

            <Route exact path="/jobSettings">
              <Container>
                <JobTabs />
              </Container>
            </Route>

            <Route exact path="/ratingsSettings">
              <Container>
                <RatingsTabs />
              </Container>
            </Route>

            <Route exact path="/addAdmin">
              <Container>
                <AddAdminUser />
              </Container>
            </Route>
            
            <Route exact path="/adminCodes">
              <Container>
                <CodeTabs />
              </Container>
            </Route>

          </Switch>
        </main>
      </div>
    </Router>
  );
}
