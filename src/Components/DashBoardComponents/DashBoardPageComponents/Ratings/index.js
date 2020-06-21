import React, { Component } from 'react'
import {
    Grid,
    Typography,
    CircularProgress
} from '@material-ui/core/';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';

let token1 = "";
let token = "";
let id = "";
const styles = theme => ({

})

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      loading: true,
      overallProfileValue: 0,
      profileValue: 0,
      idValue: 0,
      addressValue: 0,
      phoneValue: 0,
      votValue: 0,
      otherJobsValue: 0,
    };
  }
  isloading() {
    return (
      <>
        <Grid container justify="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </>
    );
  }
  async componentDidMount() {
    this.setState({ loading: true });
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");
    await axios
      .get("http://3.22.17.212:8000/api/v1/employees/"+id+"/ratings", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
       
        this.setState({ result: res.data });
        console.table("rating", this.state.result);
       console.log(this.state.result.profileRating/10)
      });
    this.setState({ loading: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginTop: 10 }}>
          {this.state.loading?this.isloading():(
              <>
        <Typography style={{ marginTop: 10 }} variant="h6">
          Ratings
        </Typography>
        <Grid container style={{ marginTop: 15 }}>
          <Grid item xs={3}>
            <Typography>Profile:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Rating
              name="simple-controlled"
              value={this.state.result.profileRating / 10}
              precision={0.1}
              //   onChange={(event, newValue) =>
              //     this.setState({ profileValue: newValue })
              //   }
              max={10}
            />
          </Grid>

          <Grid item xs={3}>
            <Typography>ID:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Rating
              name="simple-controlled"
              value={this.state.result.idRating / 10}
              precision={0.1}
              //   onChange={(event, newValue) =>
              //     this.setState({ idValue: newValue })
              //   }
              max={10}
            />
          </Grid>

          <Grid item xs={3}>
            <Typography>Address:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Rating
              name="simple-controlled"
              value={this.state.result.addressRating / 10}
              precision={0.1}
              //   onChange={(event, newValue) =>
              //     this.setState({ addressValue: newValue })
              //   }
              max={10}
            />
          </Grid>

          <Grid item xs={3}>
            <Typography>Phone:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Rating
              name="simple-controlled"
              value={this.state.result.phoneRating / 10}
              precision={0.1}
              //   onChange={(event, newValue) =>
              //     this.setState({ phoneValue: newValue })
              //   }
              max={10}
            />
          </Grid>

          <Grid item xs={3}>
            <Typography>Other Jobs:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Rating
              name="simple-controlled"
              value={this.state.result.otherJobRating / 10}
              precision={0.1}
              //   onChange={(event, newValue) =>
              //     this.setState({ otherJobsValue: newValue })
              //   }
              max={10}
            />
          </Grid>
        </Grid>
       </>   )}
      </div>
    );
  }
}

export default withStyles(styles)(index);
