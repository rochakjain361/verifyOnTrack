import React, { Component } from "react";
import { Typography, Box, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { get } from "../../../API";

import {connect} from 'react-redux'
import SuccessSnackbar from './../../../sucesssnackbar'
let token = "";
let id = "";
let open = true;

export class index extends Component {
    
    
    state = {
        result: "",
    };
    componentDidMount() {
     
      id = localStorage.getItem("id");
       
        this.getAcademics();
    }
    async getAcademics() {
        // const dispatch = useDispatch();

    await get(
      
      "http://3.22.17.212:8000/api/v1/employees/" + id + "/academics",
      ""
    ).then((response) => {
        console.log("response from api page", response);
        this.setState({result:response})
 
    });

  }

  render() {
    

    
    return <div> </div>;
  }
}


export default (index);
