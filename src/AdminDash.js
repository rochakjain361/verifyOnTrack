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
import ManageStates from "./Components/AdminPageComponents/Settings/AddressSettings/ManageStates";
import ManageLGAs from "./Components/AdminPageComponents/Settings/AddressSettings/ManageLGAs";
import ManageCities from "./Components/AdminPageComponents/Settings/AddressSettings/ManageCities";
import ManageAddressTypes from "./Components/AdminPageComponents/Settings/AddressSettings/ManageAddressTypes";
import ManageAddressReasons from "./Components/AdminPageComponents/Settings/AddressSettings/ManageAddressReasons";
import ManagePhoneTypes from "./Components/AdminPageComponents/Settings/Phone Settings/ManagePhoneTypes";
import ManagePhoneReasons from "./Components/AdminPageComponents/Settings/Phone Settings/ManagePhoneReasons";
import ManageIdSources from "./Components/AdminPageComponents/Settings/ManageIdSources";
import ManageJobCategories from "./Components/AdminPageComponents/Settings/ManageJobSettings/ManageJobCategories";
import ManageJobLeavingReasons from "./Components/AdminPageComponents/Settings/ManageJobSettings/ManageJobLeavingReasons";
import AddAdminUser from "./Components/AdminPageComponents/Administration/AddAdminUser";
import AdminAccessCodes from "./Components/AdminPageComponents/ManageCodes/AdminAccessCodes";
import AdminEvaluationCodes from "./Components/AdminPageComponents/ManageCodes/AdminEvaluationCodes";
import ApprovalCodes from "./Components/AdminPageComponents/ManageCodes/ApprovalCodes";
import Employeeratingquestions from '../src/Components/AdminPageComponents/Settings/ManageJobSettings/employeesurveyquestions/ratingquestions'
import Employeechoicequestions from '../src/Components/AdminPageComponents/Settings/ManageJobSettings/employeesurveyquestions/choicequestions'
import Employerchoicequestions from '../src/Components/AdminPageComponents/Settings/ManageJobSettings/employersurveyquestions/choicequestions'
import Employerratingquestions from '../src/Components/AdminPageComponents/Settings/ManageJobSettings/employersurveyquestions/ratingquestions'

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
              <ListItem
                button
                onClick={() => setOpen4(!open4)}
                className={classes.nested}
              >
                <ListItemIcon>
                  <PinDropIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  className={classes.textColor}
                  primary="Address Settings"
                />
                {open4 ? (
                  <ExpandLess className={classes.textColor} />
                ) : (
                  <ExpandMore className={classes.textColor} />
                )}
              </ListItem>

              <Collapse
                in={open4}
                timeout="auto"
                unmountOnExit
                className={classes.collapseNested}
              >
                <List component="div" disablePadding>
                  <Link to="/manageStates" className={classes.link}>
                    <ListItem
                      onClick={() => handleDrawerClose()}
                      button
                      className={classes.nested}
                    >
                      <ListItemText
                        className={classes.textColor}
                        primary="Manage States"
                      />
                    </ListItem>
                  </Link>

                  <Link to="/manageLGAs" className={classes.link}>
                    <ListItem
                      onClick={() => handleDrawerClose()}
                      button
                      className={classes.nested}
                    >
                      <ListItemText
                        className={classes.textColor}
                        primary="Manage LGAs"
                      />
                    </ListItem>
                  </Link>

                  <Link to="/manageCities" className={classes.link}>
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => handleDrawerClose()}
                    >
                      <ListItemText
                        className={classes.textColor}
                        primary="Cities"
                      />
                    </ListItem>
                  </Link>

                  <Link to="/manageAddressTypes" className={classes.link}>
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => handleDrawerClose()}
                    >
                      <ListItemText
                        className={classes.textColor}
                        primary="Manage Address Types"
                      />
                    </ListItem>
                  </Link>

                  <Link
                    to="/manageAddressReasons"
                    className={classes.link}
                    onClick={() => handleDrawerClose()}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemText
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
                onClick={() => setOpen5(!open5)}
                className={classes.nested}
              >
                <ListItemIcon>
                  <PhoneIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  className={classes.textColor}
                  primary="Phone Settings"
                />
                {open5 ? (
                  <ExpandLess className={classes.textColor} />
                ) : (
                  <ExpandMore className={classes.textColor} />
                )}
              </ListItem>

              <Collapse
                in={open5}
                timeout="auto"
                unmountOnExit
                className={classes.collapseNested}
              >
                <List component="div" disablePadding>
                  <Link
                    to="/managePhoneTypes"
                    className={classes.link}
                    onClick={() => handleDrawerClose()}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        className={classes.textColor}
                        primary="Manage Phone Types"
                      />
                    </ListItem>
                  </Link>

                  <Link
                    to="/managePhoneReasons"
                    className={classes.link}
                    onClick={() => handleDrawerClose()}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        className={classes.textColor}
                        primary="Manage Phones Reasons"
                      />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>

              <Divider />
              <List component="div" disablePadding>
                <Link
                  to="/manageIdSources"
                  className={classes.link}
                  style={{ paddingLeft: 25 }}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <PermIdentityIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.textColor}
                      primary="Manage ID sources"
                    />
                  </ListItem>
                </Link>
              </List>

              <Divider />

              <ListItem
                button
                onClick={() => setOpen6(!open6)}
                className={classes.nested}
              >
                <ListItemIcon>
                  <WorkIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  className={classes.textColor}
                  primary="Manage Job Settings"
                />
                {open6 ? (
                  <ExpandLess className={classes.textColor} />
                ) : (
                  <ExpandMore className={classes.textColor} />
                )}
              </ListItem>

              <Collapse
                in={open6}
                timeout="auto"
                unmountOnExit
                className={classes.collapseNested}
              >
                <List component="div" disablePadding>
                  <Link
                    to="/manageJobCategories"
                    className={classes.link}
                    onClick={() => handleDrawerClose()}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        className={classes.textColor}
                        primary="Manage Categories"
                      />
                    </ListItem>
                  </Link>

                  <Link to="/manageJobLeavingReasons" className={classes.link}>
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => handleDrawerClose()}
                    >
                      <ListItemText
                        className={classes.textColor}
                        primary="Manage Job Reasons"
                      />
                    </ListItem>
                  </Link>
                  <Link to="/employeeratingquestions" className={classes.link}>
                    {/* <ListItem button className={classes.nested}> */}
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => handleDrawerClose()}
                    >
                      <ListItemText
                        className={classes.textColor}
                        primary="Employee RatingQuestions"
                      />
                    </ListItem>
                  </Link>
                  <Link to="/employeechoicequestions" className={classes.link}>
                    {/* <ListItem button className={classes.nested}> */}
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => handleDrawerClose()}
                    >
                      <ListItemText
                        className={classes.textColor}
                        primary="Employee ChoiceQuestions"
                      />
                    </ListItem>
                  </Link>
                  <Link to="/employerratingquestions" className={classes.link}>
                 
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => handleDrawerClose()}
                    >
                      <ListItemText
                        className={classes.textColor}
                        primary="Employer RatingQuestions"
                      />
                    </ListItem>
                  </Link>
                  <Link to="/employerchoicequestions" className={classes.link}>
                   
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => handleDrawerClose()}
                    >
                      <ListItemText
                        className={classes.textColor}
                        primary="Employer ChoiceQuestions"
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

          <ListItem
            button
            onClick={(() => setOpen3(!open3), () => setOpen(!open))}
          >
            <ListItemIcon>
              <CodeIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="My Codes" className={classes.textColor} />
            {open3 ? (
              <ExpandLess style={{ color: "white" }} />
            ) : (
              <ExpandMore style={{ color: "white" }} />
            )}
          </ListItem>

          <Collapse in={(open3, open)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to="/adminAccessCodes"
                className={classes.link}
                onClick={() => handleDrawerClose()}
              >
                <ListItem button className={classes.nested2}>
                  <ListItemText
                    className={classes.textColor}
                    primary="Access Codes"
                  />
                </ListItem>
              </Link>

              <Link
                to="/adminEvaluationCodes"
                className={classes.link}
                onClick={() => handleDrawerClose()}
              >
                <ListItem button className={classes.nested2}>
                  <ListItemText
                    className={classes.textColor}
                    primary="Evaluation Codes"
                  />
                </ListItem>
              </Link>

              <Link
                to="/approvalCodes"
                className={classes.link}
                onClick={() => handleDrawerClose()}
              >
                <ListItem button className={classes.nested2}>
                  <ListItemText
                    className={classes.textColor}
                    primary="Approval Codes"
                  />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <Divider />
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
            <Route exact path="/employeeratingquestions">
              <Container>
                <Employeeratingquestions/>
              </Container>
            </Route>
            <Route exact path="/employeechoicequestions">
              <Container>
                <Employeechoicequestions/>
              </Container>
            </Route>
            <Route exact path="/employerratingquestions">
              <Container>
                <Employerratingquestions/>
              </Container>
            </Route>
            <Route exact path="/employerchoicequestions">
              <Container>
                <Employerchoicequestions/>
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

            <Route exact path="/approvalCodes">
              <Container>
                <ApprovalCodes />
              </Container>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
