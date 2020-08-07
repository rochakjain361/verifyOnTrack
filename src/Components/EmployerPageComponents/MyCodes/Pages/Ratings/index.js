import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Paper,
  Typography,
  CircularProgress
} from '@material-ui/core';
import Chart from "react-apexcharts";

let token1 = "";
let token = "";
let id = "";
const api = "http://3.22.17.212:9000"

const styles = theme => ({

})

class index extends React.Component {

  state = {
    result: [],
    choiceFromEmployers: [],
    ratingsFromEmployers: []
  }

  // constructor(props) {
  //     super(props);
  //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
  //   } 
  async fetchratings() {
    const userId = this.props.userId;
      const code = this.props.code;
    let response = await fetch(api + "/api/v1/employees/" + userId + "/ratings?code=" + code,
      {
        headers: {
          'Authorization': token
        }
      });
    response = await response.json();
    console.log('ratingsSuccess:', response)
    this.setState({ result: response });    
    this.setState({ choiceFromEmployers: [this.state.result['choiceFromEmployers']],
                    ratingsFromEmployers: [this.state.result['ratingsFromEmployers']] });    
    console.log('choiceFromEmployers:', this.state.choiceFromEmployers)
    console.log('ratingsFromEmployers:', this.state.ratingsFromEmployers)
  }

  componentDidMount() {
    token = localStorage.getItem("Token");
        id = localStorage.getItem("id");

    this.fetchratings()
  }

  constructor(props) {
    super(props);

    this.state = {
      overallProfileValue: 0,
      profileValue: 0,
      idValue: 0,
      addressValue: 0,
      phoneValue: 0,
      votValue: 0,
      otherJobsValue: 0,
      result: [],
      options: {
        chart: {
            width: '100%',
            height: '100%',  
          toolbar: {
            show: false,
          },
          
          type: "bar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            startingShape: "rounded",
            endingShape: "rounded",
            distributed: true,
            barHeight: "35%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        xaxis: {
          categories: ["Profile", "ID", "Address", "Phone", "Other Jobs"],
          labels: {
            style: {
              colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
            },
          },
        },
      },
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginTop: 10 }}>
        <Grid container style={{ marginTop: 15 }}>
          {this.state.loading ? (
            <>
              <Grid container justify="center">
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </>
          ) : this.state.result.profileRating === 0&&this.state.result.idRating === 0 &&this.state.result.addressRating===0&& this.state.result.phoneRating===0&& this.state.result.otherJobRating===0 ? <Grid container
          direction="row"
          justify="center"
          alignItems="center">
            <Typography> No Rating</Typography>
          </Grid> : (
            <Chart
              options={this.state.options}
              series={[
                {
                  name: "out of 10★",
                  data: [
                    this.state.result['profileRating'] / 10 ,
                    this.state.result['idRating'] / 10,
                    this.state.result['addressRating'] / 10,
                    this.state.result['phoneRating'] / 10,
                    this.state.result['otherJobRating'] / 10,
                  ],
                  labels: {
                    style: {
                      colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
                    },
                  },
                },
              ]}
              type="bar"
              width={"500px"}
              height={"300px"}
            />
          )}
        </Grid>
        
          
          <Typography>Employer Rating:</Typography>

          {/* <Grid container>
          
            {this.state.choiceFromEmployers.map((choice)=> (
                <Grid item>
                    <Typography>
                      {choice}
                    </Typography>
                </Grid>
            ))}
          
        </Grid> */}
      </div>
    );
  }
}

export default withStyles(styles)(index);
