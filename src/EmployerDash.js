import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



import { Container, Button, Box } from "@material-ui/core";
import axios from "axios";
import MessageIcon from "@material-ui/icons/Message";
import StarsIcon from "@material-ui/icons/Stars";
import CodeIcon from "@material-ui/icons/Code";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BusinessIcon from '@material-ui/icons/Business';
import { useEffect } from 'react';
import DashboardIcon from "@material-ui/icons/Dashboard";
import Dashboard from './Components/EmployerPageComponents/Dashboard'
import Index from './Components/EmployerPageComponents/Messages/Inbox/index'
// import Outbox from './Components/EmployerPageComponents/Messages/Outbox'
import EmployeePayments from './Components/DashBoardComponents/MenuWallet/EmployeePayments'

import EmploymentTabs from './Components/EmployerPageComponents/MyCodes/EmployementCodes/EmploymentTabs'
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Ratings from './Components/EmployerPageComponents/Ratings'
import Employees from './Components/EmployerPageComponents/Employees'
import GroupIcon from '@material-ui/icons/Group';
import CompanyInfo from './Components/EmployerPageComponents/CompanyInfo'
import Addmoney from './Components/DashBoardComponents/Wallet/Addmoney'
const drawerWidth = 240;
let token1 = "";
let token = "";
// let id = "";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    // menuButton: {
    //     marginRight: 36,
    // },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        background: "#424242",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: "#424242",
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
    // const [auth, setAuth] = React.useState(true);
    const [Token, setToken] = React.useState("");
    
    useEffect(() => {
        setToken(localStorage.getItem("Token"));
    });

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [open7, setOpen7] = React.useState(false);
    const [open8, setOpen8] = React.useState(false);
  const [balance, setBalance] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setOpen1(false)
        setOpen2(false)
        setOpen3(false)
        setOpen4(false)
        setOpen5(false)
        setOpen6(false)
        setOpen7(false)
        setOpen8(false)
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
        props.history.push('/signin')
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

    }

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
              <div>
                <Box p={2}>
                  {balance.status === 200 ? (
                    <>
                      <Typography>E-Wallet Balance</Typography>
                      <Typography align="center" justify="center">
                        {balance.data[0].balance}
                      </Typography>
                    </>
                  ) : (
                    <>
                      {/* <Link to="/Createwallet" className={classes.link}>
                    <ListItemText
                      primary="Create wallet"
                      className={classes.textColor}
                    />
                  </Link> */}
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

            <Link to="/companyInfo" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <BusinessIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Company Info"}
                  className={classes.textColor}
                />
              </ListItem>
            </Link>
            <Divider />

            <Link to="/employerEmployees" className={classes.link}>
              <ListItem button onClick={() => handleDrawerClose()}>
                <ListItemIcon>
                  <GroupIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Employees"}
                  className={classes.textColor}
                />
              </ListItem>
            </Link>

            <Divider />

            <Link to="/employerEmployment" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <CodeIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"Codes"} className={classes.textColor} />
              </ListItem>
            </Link>

            <Divider />

            <Link to="/employerInbox" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MessageIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Messages"}
                  className={classes.textColor}
                />
              </ListItem>
            </Link>

            <Divider />

            <Link to="/employerRatings" className={classes.link}>
              <ListItem button onClick={() => handleDrawerClose()}>
                <ListItemIcon>
                  <StarsIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Ratings"}
                  className={classes.textColor}
                />
              </ListItem>
            </Link>

            <Divider />

            <Link to="/employerPayments" className={classes.link}>
              <ListItem button onClick={() => handleDrawerClose()}>
                <ListItemIcon>
                  <AccountBalanceWalletIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Payments & cards"
                  className={classes.textColor}
                />
              </ListItem>
            </Link>
          </Drawer>

          <main className={classes.content}>
            <Toolbar />
            <Switch>
              <Route exact path="/employerDashboard">
                <Container>
                  <Dashboard />
                </Container>
              </Route>

              <Route exact path="/companyInfo">
                <Container>
                  <CompanyInfo />
                </Container>
              </Route>

              <Route exact path="/employerInbox">
                <Container>
                  <Index />
                </Container>
              </Route>

              {/* <Route exact path="/employerOutbox">
                <Container>
                  <Outbox />
                </Container>
              </Route> */}

              {/* <Route exact path="/employerAccessCodes">
                <Container>
                  <AccessCodes />
                </Container>
              </Route> */}
              <Route exact path="/Addmoney">
                <Container>
                  <Addmoney />
                </Container>
              </Route>
              <Route exact path="/employerEmployment">
                <Container>
                  <EmploymentTabs />
                </Container>
              </Route>

              <Route exact path="/employerRatings">
                <Container>
                  <Ratings />
                </Container>
              </Route>
              <Route exact path="/employerPayments">
                <Container>
                  <EmployeePayments />
                </Container>
              </Route>
              <Route exact path="/employerEmployees">
                <Container>
                  <Employees />
                </Container>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
}
