import React, { Component } from 'react';
import {
  Grid,
  Typography,
  Paper,
  ButtonGroup,
  Button,
  CircularProgress,
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import MessageIcon from '@material-ui/icons/Message';

const styles = (theme) => ({});
let token = '';
let token1 = '';
let id = '';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      empresult: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    token = localStorage.getItem('Token');
    id = localStorage.getItem('id');
    await axios
      .get('http://3.22.17.212:8000/api/v1/codes/access/pending-codes', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // result = res.data;
        this.setState({ result: res.data });
        console.table(' acess codes', this.state.result);
        console.log(this.state.result[0]);
      });

    await axios
      .get('http://3.22.17.212:8000/api/v1/employers/oboffers', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // result = res.data;
        this.setState({ empresult: res.data });
        console.table(' acess codes', this.state.empresult);
        console.log(this.state.empresult[0]);
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
        {this.state.loading ? (
          <Grid container justify='center' alignItems='center'>
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : this.state.result.length === 0 ? (
          <Grid container direction='row' justify='center' alignItems='center'>
            <Typography>No Codes added</Typography>
          </Grid>
        ) : (
          <div>
            <Grid container justify='center'>
              <ButtonGroup
                disableElevation
                size='small'
                variant='contained'
                color='secondary'
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
        <Grid
          container
          direction='row'
          style={{ marginTop: 10, marginLeft: 6 }}
        >
          <Grid item xs={7}>
            <Typography variant='h6' display='block'>
              Created On
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant='h6' display='block'>
              Employer ontrac id
            </Typography>
          </Grid>
        </Grid>
        {this.state.result.length === 1 ? (
          <Paper elevation={1} style={{ marginTop: 10 }}>
            <Grid
              container
              style={{ padding: 10 }}
              direction='row'
              alignItems='center'
            >
              <Grid item xs={7}>
                <Typography variant='body2' display='block'>
                  {this.state.result[0].createdOn}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='body2' display='block'>
                  {this.state.result[0].codeString}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <>
            <Paper elevation={3} style={{ marginTop: 10 }}>
              <Grid
                container
                style={{ padding: 10 }}
                direction='row'
                alignItems='center'
              >
                <Grid item xs={7}>
                  <Typography variant='body2' display='block'>
                    {this.state.result[0].createdOn}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='body2' display='block'>
                    {this.state.result[0].codeString}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={1} style={{ marginTop: 10 }}>
              <Grid
                container
                style={{ padding: 10 }}
                direction='row'
                alignItems='center'
              >
                <Grid item xs={7}>
                  <Typography variant='body2' display='block'>
                    {this.state.result[1].createdOn}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='body2' display='block'>
                    {this.state.result[1].codeString}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </div>
    );
  }

  employementCodes() {
    return (
      <div>
        <Grid
          container
          direction='row'
          style={{ marginTop: 10, marginLeft: 3 }}
        >
          <Grid item xs={4}>
            <Typography variant='h6' display='block'>
              Created On
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h6' display='block'>
              Employer ontrac id
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h6' display='block'>
              Job Title
            </Typography>
          </Grid>
        </Grid>
        <Paper elevation={1} style={{ marginTop: 10 }}>
          <Grid
            container
            style={{ padding: 10 }}
            direction='row'
            alignItems='center'
          >
            <Grid item xs={4}>
              <Typography variant='body2' display='block'>
                {this.state.empresult[0].created_on}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' display='block'>
                {this.state.empresult[0].employer_ontracid}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' display='block'>
                {this.state.empresult[0].jobTitle}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={1} style={{ marginTop: 10 }}>
          <Grid
            container
            style={{ padding: 10 }}
            direction='row'
            alignItems='center'
          >
            <Grid item xs={4}>
              <Typography variant='body2' display='block'>
                {this.state.empresult[1].created_on}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' display='block'>
                {this.state.empresult[1].employer_ontracid}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' display='block'>
                {this.state.empresult[1].jobTitle}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={1} style={{ marginTop: 10 }}>
          <Grid
            container
            style={{ padding: 10 }}
            direction='row'
            alignItems='center'
          >
            <Grid item xs={4}>
              <Typography variant='body2' display='block'>
                {this.state.empresult[2].created_on}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' display='block'>
                {this.state.empresult[2].employer_ontracid}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' display='block'>
                {this.state.empresult[2].jobTitle}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(index);
