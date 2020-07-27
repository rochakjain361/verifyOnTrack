import React, { Component } from 'react'
import {
    Grid,
    Typography,
    
    
    
    CircularProgress
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

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
   
    token = localStorage.getItem("Token");
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
            distributed: true,
            barHeight: "35%",
          },
        },
        dataLabels: {
          enabled: false,
          //  textAnchor: "start",
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
          // colors:["#FFFFFF"]
          labels: {
            style: {
              colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
            },
          },
        },
        // fill: {
        //     colors: [function({ value, seriesIndex, w }) {
        //       if(value <= 20) {
        //           return '#ff1744'
        //       } else if (value > 20 && value <= 40) {
        //           return '#ff5722'
        //       } else if (value > 40 && value <= 60) {
        //         return '#ffa733'
        //     } else if (value > 60 && value <= 80) {
        //         return '#00b0ff'
        //     } else{
        //         return '#00e676'
        //     }
        //     }]
        //   }
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
                    this.state.result.profileRating / 10 ,
                    this.state.result.idRating / 10,
                    this.state.result.addressRating / 10,
                    this.state.result.phoneRating / 10,
                    this.state.result.otherJobRating / 10,
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
