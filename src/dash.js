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
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import { Container, Button, Grid, Box } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import axios from "axios";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import MessageIcon from "@material-ui/icons/Message";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CodeIcon from "@material-ui/icons/Code";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Dashboard from "./Components/DashBoardComponents/Dashboard";
import Addresstitle from "./Components/DashBoardComponents/Addresses/title";
import Identitiestitle from "./Components/DashBoardComponents/Identities/title";
import PhoneTitle from "./Components/DashBoardComponents/Phones/title";
import MyJobProfile from "./Components/DashBoardComponents/MyJobProfile";
import Index from "./Components/DashBoardComponents/Messages/Inbox";
import Indexemployment from "./Components/DashBoardComponents/MyCodes/EmployementCodes/index";
// import Outbox from "./Components/DashBoardComponents/Messages/Outbox";
import Profiletitle from "./Components/DashBoardComponents/MyProfile/title";
import AccessCodes from "./Components/DashBoardComponents/MyCodes/AccessCodes";
// import EmployementCodes from "./Components/DashBoardComponents/MyCodes/EmployementCodes";s
import HomeIcon from "@material-ui/icons/Home";
import PaymentIcon from "@material-ui/icons/Payment";
import PhoneIcon from "@material-ui/icons/Phone";
import { useState, useEffect } from "react";
import { Title } from "@material-ui/icons";
import Academicstitle from "./Components/DashBoardComponents/Academics/title";
import SchoolIcon from "@material-ui/icons/School";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MyInfoTabs from "./Components/DashBoardComponents/MyInfoTabs";
import Popper from "@material-ui/core/Popper";
import Popover from "@material-ui/core/Popover";
import Avatar from "@material-ui/core/Avatar";
import Createwallet from "../src/Components/DashBoardComponents/Wallet/Createwallet";
import Addmoney from "../src/Components/DashBoardComponents/Wallet/Addmoney";

import EmployeePayments from "../src/Components/DashBoardComponents/MenuWallet/EmployeePayments"
import EmployeeCards from "../src/Components/DashBoardComponents/MenuWallet/EmployeeCards"

const drawerWidth = 240;
let token = "";
let id = "";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
  root: {
    display: "flex",
    flexGrow: 1,
  },
  // grow: {
  //   flexGrow: 1,
  // },

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
  const [balance, setBalance] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClose = () => {
     setAnchorEl(null);
   };
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };

  const open9 = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
  };
  const getBalance = async () => {
    const Token = await localStorage.getItem("Token");
    console.log("Token", Token);
    const Id = localStorage.getItem("id");
    await axios
      .get("http://3.22.17.212:9000/wallet/getBalance", {
        headers: {
          Authorization: Token,
        },
      })
      .then((response) => {
        setBalance(response);
        console.log("messages", response);
      });
  };
  useEffect(() => {
    getBalance(); 
  }, []);
  const logout = async () => {
    props.history.push("/signin");
    
    let headers = {
      headers: {
        Authorization: Token,
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(
        "http://3.22.17.212:9000/api/v1/accounts/auth/logout",
        {},

        headers
      )
      .then((response) => {
        localStorage.clear();
        console.log(response);
      });

   
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

            {/* <Button
              style={{ backgroundColor: "transparent" }}
              color="inherit"
              size="medium"
              onClick={handleClick}
            >
              <AccountBalanceWalletIcon color="white" />
            </Button>

            <Popover
              id={id}
              open={open9}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Link to="/Addmoney" className={classes.link}>
                
              <Button>Add money to your wallet</Button>
              </Link>
            </Popover> */}
            <div>
              <Box p={2}>
                {balance.status === 200 ? (
                  <>
                    {/* <Typography>Wallet Balance</Typography>
                    <Typography align="center" justify="center">
                      {balance.data[0].balance}
                    </Typography> */}
                  </>
                ) : (
                  <>
                  <Link to="/Createwallet" className={classes.link}>
                    <ListItemText
                      primary="Create wallet"
                      className={classes.textColor}
                    />
                  </Link>
                  </>
                )}
              </Box>
            </div>

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

          <Link to="/dashboard" className={classes.link}>
            <ListItem button onClick={() => setOpen(!open)}>
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

          <Link
            to="/myInfo"
            className={classes.link}
            onClick={() => handleDrawerClose()}
          >
            <ListItem button>
              <ListItemIcon>
                <InfoIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"My Info"} className={classes.textColor} />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/myjobprofile" className={classes.link}>
            <ListItem button onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <WorkIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="My Job Profile"
                className={classes.textColor}
              />
            </ListItem>
          </Link>

          <Divider />

          <ListItem
            button
            onClick={(() => setOpen2(!open2), () => setOpen(!open))}
          >
            <ListItemIcon>
              <CodeIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="My Codes" className={classes.textColor} />
            {open2 ? (
              <ExpandLess style={{ color: "white" }} />
            ) : (
              <ExpandMore style={{ color: "white" }} />
            )}
          </ListItem>

          <Collapse in={(open2, open)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/employeeAccessCodes" className={classes.link}>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => handleDrawerClose()}
                >
                  <ListItemText
                    primary="Access Codes"
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>

              <Link to="/employeeEmployementCodes" className={classes.link}>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => handleDrawerClose()}
                >
                  <ListItemText
                    primary="Employement Codes"
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <Divider />

          <Link to="/employeeInbox" className={classes.link}>
            <ListItem button onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <MessageIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Messages" className={classes.textColor} />
            </ListItem>
          </Link>
          <Divider />

          <ListItem
            button
            onClick={(() => setOpen3(!open3), () => setOpen(!open))}
          >
            <ListItemIcon>
              <AccountBalanceWalletIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Wallet" className={classes.textColor} />
            {open2 ? (
              <ExpandLess style={{ color: "white" }} />
            ) : (
              <ExpandMore style={{ color: "white" }} />
            )}
          </ListItem>

          <Collapse in={(open2, open)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/employeePayments" className={classes.link}>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => handleDrawerClose()}
                >
                  <ListItemText
                    primary="Payments"
                    className={classes.textColor}
                  />
                </ListItem>
              </Link>

              <Link to="/employeeCards" className={classes.link}>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => handleDrawerClose()}
                >
                  <ListItemText
                    primary="Cards"
                    className={classes.textColor}
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
            <Route exact path="/dashboard">
              <Container style={{ backgroundColor: "#eeeeee" }}>
                <Dashboard />
              </Container>
            </Route>

            <Route exact path="/myInfo">
              <Container style={{ backgroundColor: "#eeeeee" }}>
                <MyInfoTabs />
              </Container>
            </Route>

            <Route exact path="/myjobprofile">
              <Container>
                <MyJobProfile />
              </Container>
            </Route>

            <Route exact path="/employeeInbox">
              <Container>
                <Index />
              </Container>
            </Route>

            {/* <Route exact path="/employeeOutbox">
                <Container>
                  <Outbox />
                </Container>
              </Route> */}

            <Route exact path="/employeeAccessCodes">
              <Container>
                <AccessCodes />
              </Container>
            </Route>
            <Route exact path="/Createwallet">
              <Container>
                <Createwallet />
              </Container>
            </Route>

            <Route exact path="/Addmoney">
              <Container>
                <Addmoney />
              </Container>
            </Route>

            <Route exact path="/employeeEmployementCodes">
              <Container>
                <Indexemployment />
              </Container>
            </Route>

            <Route exact path="/employeePayments">
              <Container>
                <EmployeePayments />
              </Container>
            </Route>

            <Route exact path="/employeeCards">
              <Container>
                <EmployeeCards />
              </Container>
            </Route>

          </Switch>
        </main>
      </div>
    </Router>
  );
}
