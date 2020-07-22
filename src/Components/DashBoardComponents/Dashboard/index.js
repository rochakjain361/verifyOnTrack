import React, { Component, useEffect } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import WorksAt from "../DashBoardPageComponents/WorksAt";
import CustomAppBar from "../DashBoardPageComponents/CustomAppbar";
import Messages from "../DashBoardPageComponents/Messages";
import Ratings from "../DashBoardPageComponents/Ratings";
import Codes from "../DashBoardPageComponents/Codes";
import Profile from "../DashBoardPageComponents/Profile";
import RatingBars from "../DashBoardPageComponents/RatingBars";
import DashButtons from "../DashBoardPageComponents/DashButtons";
import AppBar from "@material-ui/core/AppBar";

const styles = (theme) => ({
 
});
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  profileCardHeight: {
    minHeight: 300,
    // minWidth: window.innerWidth/3
  },
  tabs: {
    flexGrow: 1,
    // flexBasis: 'auto'
  },
  expansionWidth: {
    width: "100%",
  },
  marginTop: {
    marginTop: 20,
  },
  demo2: {
    backgroundColor: "#fff",
  },
}));
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
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#000000",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);
export default function Index(props)  {
  const [messages,setmessages]=React.useState(null);
  useEffect(() => {
      //  console.log(" this.props.location.state.detail", props.location);
    
   
      // setmessages(<Messages/>)
      // setmessages(<div><p>fhkjsdkf</p></div>)
      
    
  }, [])
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  

 
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleChangeIndex = (index) => {
      setValue(index);
    };
    // const { classes } = this.props;
     const classes = useStyles();

    return (
      <Box py={2}>
        <Grid
          container
          direction="row"
          spacing={2}
          justify="flex-start"
          style={{ background: "#eeeeee" }}
        >
          <Grid item xs={4}>
            <Card className={classes.profileCardHeight} elevation={2}>
              <CardContent>
                <Typography variant="h5" display="block" align="center">
                  Profile
                </Typography>

                <Profile />
              </CardContent>
            </Card>

            <Card
              elevation={2}
              className={classes.marginTop}
              style={{ minHeight: 400 }}
            >
              <CardContent>
                <Typography variant="button" display="block" align="center">
                  Works at
                </Typography>
                <WorksAt />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={8}>
            

            <Card className={classes.profileCardHeight} elevation={2}>
              <AppBar position="static" color="default">
                <div className={classes.demo2}>
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <StyledTab label="Messages" {...a11yProps(0)} />
                  <StyledTab label="Codes" {...a11yProps(1)} />
                  <StyledTab label="Rating" {...a11yProps(2)} />
                </StyledTabs></div>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Messages/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Codes />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Ratings />
                </TabPanel>
              </SwipeableViews>
            </Card>
            <Grid>
              <Card
                className={classes.profileCardHeight}
                elevation={2}
                className={classes.marginTop}
              >
                <CardContent>
                  <Typography variant="h5" display="block">
                    Ratings
                  </Typography>
                  <RatingBars />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid>
           
          </Grid>
        </Grid>
      </Box>
    );
  
}



