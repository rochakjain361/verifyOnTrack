import Axios from "axios";
import { CustomizedSnackbars } from "./Snackbarpage";
import { useSnackbar } from "notistack";
import React from 'react'
import signIn from './Components/signIn'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {connect} from 'react-redux'
// const { enqueueSnackbar, closeSnackbar } = useSnackbar();
import {ShowSuccessSnackbar} from './actions/snackbaractions'

 
let res=[]
const token = localStorage.getItem("Token");
export const get=async(url, params)=>{
    // const { classes } = this.props;
     return await Axios.get(url, {
      headers: {
        Authorization: token,
      },
    }).then(response => {
       let res=response;
        // ShowSuccessSnackbar("added succesfully")
        return res;
    }).catch((error)=>{
      console.log("///////////////////////////");
        console.log(error)
        // if(error.response.status===401){
            
        // }
    }) 
  }
  export const update=async(url,formdata)=>{
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
   return await Axios.post(url,formdata,headers ).then((response) => {
       res=response;
        ShowSuccessSnackbar("updated succesfully")
       return res
    }).catch((error)=>{
     
       res=error
        // console.log(error.response.status)
        // if(error.response.status===401){
            
        // }
  })
}
export const post=async(url,formdata)=>{
  let headers = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
 return await Axios.post(url,formdata,headers ).then((response) => {
     res=response;
      ShowSuccessSnackbar("Added succesfully")
     return res
  }).catch((error)=>{
   
     res=error
      // console.log(error.response.status)
      // if(error.response.status===401){
          
      // }
})

}

  



