import React, { Component } from 'react'
import queryString from "query-string";
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";

export class resetpassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             param:{
                 uid:"",
                 token:""
             },
             result:[],
             loading:true,
             isuser:false,
        }
    }
     isloading() {
    return (
      <Grid
        container
        justify="flex-end"
        alignItems="center"
        direction="column"
      >
        <Grid item xs={6} style={{ marginTop: 150 }}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
    
    async componentDidMount(){
        // console.log(this.props.location.search);
        let url = this.props.location.search;
         let params = await queryString.parse(url);
        console.log("params",params);
        this.setState({param:params})
        await axios
          .get(
            "http://3.22.17.212:8000/api/v1/accounts/verify_token?uid=" +
             params.uid,
            {
              headers: {
                Authorization:"Token "+params.token,
              },
            }
          )
          .then((res) =>res.status===200? this.setState({ result: res.data,loading:false,isuser:true }):this.setState({loading:false}));

        
    }
    render() {
        return (
            <div>
                {this.state.loading?this.isloading():
                <h1>resetpassword</h1>}
            </div>
        )
    }
}

export default resetpassword
