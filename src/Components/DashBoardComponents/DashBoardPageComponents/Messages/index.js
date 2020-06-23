import React, { Component } from 'react'
import {
    Grid,
    Typography,
    Paper,
    ButtonGroup,
    Button,
    CircularProgress
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");
    await axios
      .get("http://3.22.17.212:8000/api/v1/messages/outbox", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // result = res.data;
        this.setState({ result: res.data });
        console.table("messages data", this.state.result);
        // console.log(this.state.result[0].message);
      });
    this.setState({ loading: false });
  }
  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginTop: 10 }}>
        <Grid container justify="center">
          <ButtonGroup
          style={{marginTop: 20}}
            disableElevation
            size="medium"
            variant="contained"
            color="secondary"
          >
            <Button
              disabled={this.state.inboxButtonDisable}
              style={{ minWidth: 75 }}
              onClick={() =>
                this.setState({
                  outboxButtonDisable: false,
                  inboxButtonDisable: true,
                })
              }
            >
              Inbox
            </Button>
            <Button
              style={{ minWidth: 75 }}
              disabled={this.state.outboxButtonDisable}
              onClick={() =>
                this.setState({
                  outboxButtonDisable: true,
                  inboxButtonDisable: false,
                })
              }
            >
              Outbox
            </Button>
          </ButtonGroup>
        </Grid>
        {this.state.inboxButtonDisable
          ? this.messageInbox()
          : this.messageOutbox()}
      </div>
    );
  }

  

  messageInbox() {
    return (
      <div>
        {this.state.result.length === 0 ? (
          <Grid container justify="center" alignItems="center" style={{marginTop:20}}>
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
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

  outboxMessageDescription() {
    return (
      <div>
        <Grid container justify="space-between">
          <Typography>Initiated by Outbox</Typography>
          <Typography variant="caption">04/07/2020</Typography>
        </Grid>
        <Typography variant="body2" display="block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </div>
    );
  }

  messageOutbox() {
    return (
      <div>
        <Paper variant="outlined" style={{ marginTop: 20 }}>
          <Grid container style={{ padding: 10 }} alignItems="center">
            <Grid item xs={1}>
              <MessageIcon />
            </Grid>
            <Grid item xs={11}>
              <>{this.outboxMessageDescription()}</>
            </Grid>
          </Grid>
        </Paper>

        <Paper variant="outlined" style={{ marginTop: 10 }}>
          <Grid container style={{ padding: 10 }} alignItems="center">
            <Grid item xs={1}>
              <MessageIcon />
            </Grid>
            <Grid item xs={11}>
              <>{this.outboxMessageDescription()}</>
            </Grid>
          </Grid>
        </Paper>

        <Paper variant="outlined" style={{ marginTop: 10 }}>
          <Grid container style={{ padding: 10 }} alignItems="center">
            <Grid item xs={1}>
              <MessageIcon />
            </Grid>
            <Grid item xs={11}>
              <>{this.outboxMessageDescription()}</>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(index);
