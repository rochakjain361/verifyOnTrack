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
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Container, Button, Grid} from "@material-ui/core";

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';

import ManageStates from './AdminPageComponents/ManageStates'

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
});

class AdminLandingPage extends React.PureComponent {

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
                        <Button color="inherit" variant='outlined'>Login</Button>
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

                            <ListItem button onClick={() => this.setState({ open1: !this.state.open1 })}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Address Settings" />
                                {this.state.open1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <Link to="/manageSates" className={classes.link} >
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary="Manage States" />
                                        </ListItem>
                                    </Link>

                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Manage LGAs" />
                                    </ListItem>

                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Cities" />
                                    </ListItem>

                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Manage Address Types" />
                                    </ListItem>

                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Manage Address Reasons" />
                                    </ListItem>
                                </List>
                            </Collapse>

                            <Divider />

                            <ListItem button onClick={() => this.setState({ open2: !this.state.open2 })}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Phone Settings" />
                                {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Manage Phone Types" />
                                    </ListItem>

                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Manage Phones Reasons" />
                                    </ListItem>

                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Manage ID sources" />
                                    </ListItem>
                                </List>
                            </Collapse>

                            <Divider />

                            <ListItem button onClick={() => this.setState({ open3: !this.state.open3 })}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon >
                                <ListItemText primary="Administration" />
                                {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            <Collapse in={this.state.open3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Add Admin User" />
                                    </ListItem>
                                </List>
                            </Collapse>

                            <Divider />

                            <ListItem button onClick={() => this.setState({ open4: !this.state.open4 })}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manage Codes" />
                                {this.state.open4 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            <Collapse in={this.state.open4} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="All Codes" />
                                    </ListItem>

                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Pending Codes" />
                                    </ListItem>
                                </List>
                            </Collapse>

                            <Divider />

                        </div>
                    </Drawer>
                    <main className={classes.content}>
                        <Toolbar />
                        <Switch>
                            <Route exact path="/manageSates">
                                <Container>
                                    < ManageStates/>
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