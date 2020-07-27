import {
    AppBar,
    Tabs,
    Tab,
    
    withStyles,
    
} from '@material-ui/core';

import React from 'react';

const styles = theme => ({
    appBar: {
        position: 'relative',
        zIndex: theme.zIndex.drawer + 1
    },
    root: {
        flexGrow: 1,
    },
});

class CustomAppBar extends React.PureComponent {
    render() {
        const { classes, selectedTabIndex, onChange } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" elevation={8} className={classes.appBar}>
                    
                    <Tabs onChange={onChange} variant="fullWidth" centered value={selectedTabIndex}>
                        <Tab label="Messages" />
                        <Tab label="Codes" />
                        <Tab label="Ratings" />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
};

export default withStyles(styles)(CustomAppBar);