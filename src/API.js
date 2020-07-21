import Axios from "axios";
// import { CustomizedSnackbars } from "./Snackbarpage";
// import { useSnackbar } from "notistack";
// import React from 'react'
// import signIn from './Components/signIn'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import {connect} from 'react-redux'
// const { enqueueSnackbar, closeSnackbar } = useSnackbar();
import {ShowSuccessSnackbar} from './actions/snackbaractions'
let res=[]
export const get=async(url,token, params)=>{
    // const { classes } = this.props;
      await Axios.get(url, {
      headers: {
        Authorization: "Token "+token,
      },
    }).then(response => {
        res=response;
        // ShowSuccessSnackbar("added succesfully")
      }).catch((error)=>{
        console.log("///////////////////////////");
        console.log(error)
        // if(error.response.status===401){
          
          // }
        }) 
        if(res.status===200){
        return res;
        }
        else{
          return ""
        }
  }
  export const update=async(url,token,formdata)=>{
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    await Axios.post(url,formdata,headers ).then((response) => {
       res=response;
        // ShowSuccessSnackbar("updated succesfully")
      }).catch((error)=>{
        
        res=error
        // console.log(error.response.status)
        // if(error.response.status===401){
          
          // }
        })
        return res
}
export const post=async(url,token,formdata)=>{
  let headers = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
  await Axios.post(url,formdata,headers ).then((response) => {
     res=response;
      // ShowSuccessSnackbar("Added succesfully")
    }).catch((error)=>{
      
      res=error
      // console.log(error.response.status)
      // if(error.response.status===401){
        
        // }
      })
      return res

}
export const put=async(url,token,formdata)=>{
  let headers = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
 return await Axios.put(url,formdata,headers ).then((response) => {
     res=response;
      // ShowSuccessSnackbar("Added succesfully")
    }).catch((error)=>{
      
      res=error
      // console.log(error.response.status)
      // if(error.response.status===401){
        
        // }
      })
      return res

}

  



