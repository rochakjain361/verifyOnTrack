import React, { Component } from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Switch,
    FormGroup,
    Tabs,
    Tab,
    AppBar,
    TabPanel,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    CircularProgress
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";


let token1 = "";
let token = "";
let id = "";
class index extends Component {
  constructor(props) {
      super(props)
  
      this.state = {
          result:[],
          loading:false,
           
      }
  }
  
  async componentDidMount() {
    this.setState({ loading: true });
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");
    await axios
      .get("http://3.22.17.212:8000/api/v1/employees/"+id+"/profiles-by/"+id, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // result = res.data;
        this.setState({ result: res.data });
        console.table("profile data", this.state.result);
         console.log(this.state.result[0].firstname );
      });
    this.setState({ loading: false });
  }

  render() {
    

    return (
      <div style={{ marginTop: 10 }}>
        {this.state.loading ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          this.state.result.map((profile, index) => (
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Avatar
                  src="/images/sampleuserphoto.jpg"
                  style={{
                    height: "8rem",
                    width: "8rem",
                  }}
                ></Avatar>
              </Grid>

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  display="block"
                  style={{ marginTop: 10 }}
                  //   align="center"
                >
                  {profile.firstname + " "}
                  {profile.middlename + " "}
                  {profile.surname}
                </Typography>
                <Typography variant="body2">
                  {new Date(profile.dob).toDateString()}
                </Typography>{" "}
                <Typography variant="body2">
                  {profile.employee_email_field}
                </Typography>
              </Grid>
            </Grid>
          ))
        )}
      </div>
    );
  }
}

export default withStyles()(index);
