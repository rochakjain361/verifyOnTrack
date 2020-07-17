import React, { Component } from 'react'
import {
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CircularProgress,
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
          justify='center'
        >
          <Grid item><CircularProgress /></Grid>
        </Grid>
      </>
    );
  }
  async componentDidMount() {
      this.setState({ loading :true});
  
    token =localStorage.getItem("Token");
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
            this.isloading()
              // <CircularProgress />
            
          ) : this.state.result.length===0?<Grid container
          direction="row"
          justify="center"
          alignItems="center">
            <Typography>Add your job details </Typography>
          </Grid>:(
            this.state.result.map((company, index) => (
              <Grid style={{marginTop: 15}}>
                <ExpansionPanel >
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
                        {company.jobTitle}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {company.jobDescription}
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
