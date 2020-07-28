import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ManageJobCategories from '../ManageJobCategories'
import ManageJobLeavingReasons from '../ManageJobLeavingReasons'
import ManageOffboardTypes from '../ManageOffboardTypes'
import RejectReasons from '../RejectReasons'
import ManageIndustries from '../ManageIndustries'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '100%'
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" variant='fullWidth'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Manage Job Categories" {...a11yProps(0)} />
          <Tab label="Manage Job Leaving Reasons" {...a11yProps(1)} />
          <Tab label="Manage Offboard Types" {...a11yProps(2)} />
          <Tab label="Manage Reject Reasons" {...a11yProps(3)} />
          <Tab label="Manage Industries" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ManageJobCategories />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <ManageJobLeavingReasons/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <ManageOffboardTypes/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <RejectReasons/>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
        <ManageIndustries/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
