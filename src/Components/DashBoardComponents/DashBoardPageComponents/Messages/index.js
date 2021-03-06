import React, { Component } from 'react'
import {
    Grid,
    Typography,
    Paper,

    
    CircularProgress
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

import axios from "axios";
import MessageIcon from '@material-ui/icons/Message'

const styles = theme => ({

})
let token1 = "";
let token = "";
let id = "";
class index extends Component {
  state = {
    result: [],
    inboxButtonDisable: true,
    outboxButtonDisable: false,
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    
    token = localStorage.getItem("Token");
    id = localStorage.getItem("id");
    await axios
      .get("http://3.22.17.212:9000/api/v1/messages/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // result = res.data;
        this.setState({ result: res.data });
        console.table("messages data", this.state.result);
        
      });
    this.setState({ loading: false });
  }
  render() {
   

    return (
      <div style={{ marginTop: 10 }}>
       
        {this.state.inboxButtonDisable
          ? this.messageInbox()
          : this.messageOutbox()}
      </div>
    );
  }

  messageInbox() {
    return (
      <div>
        {this.state.loading ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) :this.state.result.length===0?<Grid container
        direction="row"
        justify="center"
        alignItems="center">
          <Typography>No Messages</Typography>
        </Grid>: this.state.result.length===1?( <>
            <Paper variant="outlined" style={{ marginTop: 10 }}>
              <Grid container style={{ padding: 10 }} alignItems="center">
                <Grid item xs={1}>
                  <MessageIcon />
                </Grid>
                <Grid item xs={11}>
                  <Grid container justify="space-between">
                    <Typography>
                      {this.state.result[0].initiated_by_field}
                    </Typography>
                    <Typography variant="caption">
                      {new Date(
                        this.state.result[0].initialDate_field
                      ).toDateString()}
                    </Typography>
                  </Grid>
                  <Typography variant="body2" display="block">
                    {this.state.result[0].message}
                  </Typography>
                </Grid>
              </Grid>
            </Paper></>):(
          <>
            <Paper variant="outlined" style={{ marginTop: 20 }}>
              <Grid container style={{ padding: 10 }} alignItems="center">
                <Grid item xs={1}>
                  <MessageIcon />
                </Grid>
                <Grid item xs={11}>
                  <Grid container justify="space-between">
                    <Typography>
                      {this.state.result[0].initiated_by_field}
                    </Typography>
                    <Typography variant="caption">
                      {new Date(
                        this.state.result[0].initialDate_field
                      ).toDateString()}
                    </Typography>
                  </Grid>
                  <Typography variant="body2" display="block">
                    {this.state.result[0].message}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper variant="outlined" style={{ marginTop: 10 }}>
              <Grid container style={{ padding: 10 }} alignItems="center">
                <Grid item xs={1}>
                  <MessageIcon />
                </Grid>
                <Grid item xs={11}>
                  <Grid container justify="space-between">
                    <Typography>
                      {this.state.result[1].initiated_by_field}
                    </Typography>
                    <Typography variant="caption">
                      {new Date(
                        this.state.result[1].initialDate_field
                      ).toDateString()}
                    </Typography>
                  </Grid>
                  <Typography variant="body2" display="block">
                    {this.state.result[1].message}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </div>
    );
  }

  

 
}

export default withStyles(styles)(index);
