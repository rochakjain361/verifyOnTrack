import React, { Component } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Tabs,
  Tab,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core/";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

let token1 = "";
let token = "";
let id = "";
let result = [];
class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            result:[],
            loading:true,
        }
    }
    
  isloading() {
    return (
      <>
        <Grid
          container
        //   spacing={0}
        //   direction="column"
        //   alignItems="center"
        //   justify="center"
        //   display="flex"
        //   style={{ minHeight: "100vh" }}
        >
          <CircularProgress />
        </Grid>
      </>
    );
  }
  async componentDidMount() {
      this.setState({ loading :true});
    token1 = localStorage.getItem("Token");
    token = "Token " + token1;
    id = localStorage.getItem("id");
    await axios
      .get(
        "http://3.22.17.212:8000/api/v1/employees/" + id + "/jobs?current=true",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        // result = res.data;
        this.setState({result:res.data})
        console.table("companies", this.state.result);
        // console.log(result[0].phone_reason);
      });
       this.setState({ loading: false });
  }
  render() {
    return (
      <div>
        {/* {this.workDescription()} */}
        {/* ONLY KEEP THE ABOVE EXPANSION PANEL AND USE MAP FUNC TO LOOP */}
        
        <Grid>
          {this.state.loading ? (
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              display="flex"
             style={{ minHeight: "100vh" }}
            >
              <CircularProgress />
            </Grid>
          ) : (
            this.state.result.map((company, index) => (
              <Grid>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography
                      variant="subtitle1"
                      display="block"
                      gutterBottom
                    >
                      {company.company_name_field}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction="column">
                      <Typography variant="body1" display="block" gutterBottom>
                        Job Title:{company.jobTitle}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Job Description:{company.jobDescription}
                      </Typography>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    );
  }

 
}

export default withStyles()(index);
