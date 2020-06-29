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
let token="";
let token1="";
let id="";

class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             result:[]
        }
    }
    
  async componentDidMount() {
    this.setState({ loading: true });
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");
    await axios
      .get("http://3.22.17.212:8000/api/v1/codes/access/pending-codes", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // result = res.data;
        this.setState({ result: res.data });
        console.table(" acess codes", this.state.result);
        console.log(this.state.result[0]);
      });
    this.setState({ loading: false });
  }
  state = {
    accessCodesButtonDisable: true,
    employementCodesButtonDisable: false,
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        {this.state.loading? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : this.state.result.length===0?<Grid container
        direction="row"
        justify="center"
        alignItems="center">
          <Typography>No Codes added</Typography>
        </Grid>:(
          <div>
            <Grid container justify="center">
              <ButtonGroup
                disableElevation
                size="small"
                variant="contained"
                color="secondary"
              >
                <Button
                  disabled={this.state.accessCodesButtonDisable}
                  style={{ minWidth: 150 }}
                  onClick={() =>
                    this.setState({
                      employementCodesButtonDisable: false,
                      accessCodesButtonDisable: true,
                    })
                  }
                >
                  Employement Codes
                </Button>
                <Button
                  style={{ minWidth: 150 }}
                  disabled={this.state.employementCodesButtonDisable}
                  onClick={() =>
                    this.setState({
                      employementCodesButtonDisable: true,
                      accessCodesButtonDisable: false,
                    })
                  }
                >
                  Access Codes
                </Button>
              </ButtonGroup>
            </Grid>
            
            <Grid
              container
              direction="row"
              style={{ marginTop: 10, marginLeft: 3 }}
            >
              <Grid item xs={4}>
                <Typography variant="h6" display="block">
                  Created on
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" display="block">
                  Code
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" display="block">
                  Action
                </Typography>
              </Grid>
            </Grid>
            {this.state.accessCodesButtonDisable
              ? this.employementCodes()
              : this.accessCodes()}
          </div>
        )}
      </>
    );
  }

  accessCodes() {
    return (
      <div>
        {this.state.result.length===1?( <Paper elevation={1} style={{ marginTop: 10 }}>
          <Grid
            container
            style={{ padding: 10 }}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                {this.state.result[0].createdOn}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                {this.state.result[0].codeString}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="default"
                variant="contained"
                href="#"
                style={{ minWidth: 100 }}
              >
                Action
              </Button>
            </Grid>
          </Grid>
          </Paper>
          ):(<>
        <Paper elevation={1} style={{ marginTop: 10 }}>
          <Grid
            container
            style={{ padding: 10 }}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                {this.state.result[0].createdOn}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                {this.state.result[0].codeString}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="default"
                variant="contained"
                href="#"
                style={{ minWidth: 100 }}
              >
                Action
              </Button>
            </Grid>
          </Grid>
          </Paper>
           <Paper elevation={1} style={{ marginTop: 10 }}>
          <Grid
            container
            style={{ padding: 10 }}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                {this.state.result[1].createdOn}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                {this.state.result[1].codeString}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="default"
                variant="contained"
                href="#"
                style={{ minWidth: 100 }}
              >
                Action
              </Button>
            </Grid>
          </Grid>
        </Paper></>)}
      </div>
    );
  }

  employementCodes() {
    return (
      <div>
        <Paper elevation={1} style={{ marginTop: 10 }}>
          <Grid
            container
            style={{ padding: 10 }}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                05/08/2020
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                EDja-JMZs-iHoR
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="default"
                variant="contained"
                href="#"
                style={{ minWidth: 100 }}
              >
                Action
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={1} style={{ marginTop: 10 }}>
          <Grid
            container
            style={{ padding: 10 }}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                05/08/2020
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                EDja-JMZs-iHoR
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="default"
                variant="contained"
                href="#"
                style={{ minWidth: 100 }}
              >
                Action
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={1} style={{ marginTop: 10 }}>
          <Grid
            container
            style={{ padding: 10 }}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                05/08/2020
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" display="block">
                EDja-JMZs-iHoR
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="default"
                variant="contained"
                href="#"
                style={{ minWidth: 100 }}
              >
                Action
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(index);
