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
import Rating from '@material-ui/lab/Rating';
import Chart from "react-apexcharts";
import axios from "axios";
const styles = theme => ({

})
let token1 = "";
let token = "";
let id = "";

class index extends Component {
  async componentDidMount() {
    this.setState({ loading: true });
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");
    await axios
      .get("http://3.22.17.212:8000/api/v1/employees/" + id + "/ratings", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({ result: res.data });
        console.table("rating", this.state.result);
        console.log(this.state.result.profileRating / 10);
      });
    this.setState({ loading: false });
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
      // series: ,
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
            //  distributed: true,
            barHeight: "50%",
            columnWidth: "50%", 
            // colors:[]
            // dataLabels:false
          },
        },
        dataLabels: {
          enabled: false,
          // textAnchor: "start",
        },
        grid: {
          show: false,
        },
        xaxis: {
          categories: ["Profile", "ID", "Address", "Phone", "Other Jobs"],
          // colors:["#FFFFFF"]
          labels: {
            style: {
              colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
            },
          },
        },
        fill: {
            colors: [function({ value, seriesIndex, w }) {
              if(value <= 20) {
                  return '#ff1744'
              } else if (value > 20 && value <= 40) {
                  return '#ff5722'
              } else if (value > 40 && value <= 60) {
                return '#ffa733'
            } else if (value > 60 && value <= 80) {
                return '#00b0ff'
            } else{
                return '#00e676'
            }
            }]
          }
        // fill: {
        //   colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        // },
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
          ) : this.state.result.length === 0 ? null : (
            <Chart
              options={this.state.options}
              series={[
                {
                  name: "out of 100",
                  data: [
                    // this.state.result.profileRating,
                    // this.state.result.idRating,
                    // this.state.result.addressRating,
                    // this.state.result.phoneRating,
                    // this.state.result.otherJobRating,
                    50,
                    30,
                    90,
                    10,
                    70,
                    
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
      </div>
    );
  }
}

export default withStyles(styles)(index);
