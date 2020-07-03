import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
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
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import MessageIcon from "@material-ui/icons/Message";
import CodeIcon from "@material-ui/icons/Code";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffect } from 'react';
import DashboardIcon from "@material-ui/icons/Dashboard";
import Dashboard from './Components/EmployerPageComponents/Dashboard'
import Inbox from './Components/EmployerPageComponents/Messages/Inbox'
import Outbox from './Components/EmployerPageComponents/Messages/Outbox'
import AccessCodes from './Components/EmployerPageComponents/MyCodes/AccessCodes'
import EmployementCodes from './Components/EmployerPageComponents/MyCodes/EmployementCodes'

const drawerWidth = 240;
let token1 = "";
let token = "";
let id = "";

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
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        width: "inherit",
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
    const [auth, setAuth] = React.useState(true);
    const [Token, setToken] = React.useState("");
    const [Token1, setToken1] = React.useState("");
    const [id, setid] = React.useState("");
    // const [anchorEl, setAnchorEl] = React.useState(false);
    useEffect(() => {
        setToken1(localStorage.getItem("Token"));
        setToken("Token " + Token1);
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
        props.history.push('/signin')
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
                        <Button onClick={logout} color="inherit" variant='outlined' size='medium'>Logout</Button>
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
                            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: "white" }} /> : <ArrowBackIcon style={{ color: "white" }} />}
                        </IconButton>
                    </div>
                    <Link to="/dashboard" className={classes.link}>
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
                        onClick={() => setOpen3(!open3)}
                    >
                        <ListItemIcon>
                            <CodeIcon style={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="My Codes"
                            className={classes.textColor}
                        />
                        {open3 ? (
                            <ExpandLess style={{ color: "white" }} />
                        ) : (
                                <ExpandMore style={{ color: "white" }} />
                            )}
                    </ListItem>

                    <Collapse in={open3} timeout="auto" unmountOnExit>
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

                    <ListItem
                        button
                        onClick={() => setOpen2(!open2)}
                    >
                        <ListItemIcon>
                            <MessageIcon style={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Messages"
                            className={classes.textColor}
                        />
                        {open2 ? (
                            <ExpandLess style={{ color: "white" }} />
                        ) : (
                                <ExpandMore style={{ color: "white" }} />
                            )}
                    </ListItem>

                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to="/employeeInbox" className={classes.link}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText
                                        primary="Inbox"
                                        className={classes.textColor}
                                    />
                                </ListItem>
                            </Link>

                            <Link to="/employeeOutbox" className={classes.link}>
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
