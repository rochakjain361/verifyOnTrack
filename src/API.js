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
     await Axios.get(url, {
      headers: {
        Authorization: token,
      },
    }).then((response) => {
       res=response;
        ShowSuccessSnackbar("added succesfully")
     
    }).catch((error)=>{
       res=error
        console.log(error.response.status)
        if(error.response.status===401){
            
        }


    })
    return res;
    console.log("res",res)
    
  }
  



