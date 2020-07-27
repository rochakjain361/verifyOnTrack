import React, { Component } from 'react'
import {
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import DashButtons from '../DashButtons'


let token1 = "";
let token = "";
let id = "";
class index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: [],
      loading: false,

    }
  }

  async componentDidMount() {
    this.setState({ loading: true });

    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");
    await axios
      .get("http://3.22.17.212:8000/api/v1/employees/" + id + "/profiles-by/" + id, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // result = res.data;
        this.setState({ result: res.data });
        console.table("profile data", this.state.result);
        //  console.log(this.state.result[0].firstname );
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
        ) : this.state.result.length === 0 ? <Grid container
          direction="row"
          justify="center"
          alignItems="center">
          <Typography>Add your profile data</Typography>
        </Grid> : (
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
                      src={profile.picture}
                      style={{
                        height: "10rem",
                        width: "10rem",
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
                  <DashButtons />
                </Grid>
              )))
        }
      </div>
    );
  }
}

export default withStyles()(index);
