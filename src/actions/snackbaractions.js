import {connect} from 'react-redux'
import React from 'react'
import { useDispatch } from 'react-redux'// const dispatch=useDispatch();
import { Snackbar } from '@material-ui/core';
import {store} from '../index'
export const ShowSuccessSnackbar = (message)=> {

    console.log("messages",message)
     return store.dispatch({ type: "SNACKBAR_SUCCESS", message });
  
  };
  
  export const clearSnackbar = () => {
     return store.dispatch({ type: "SNACKBAR_CLEAR" });
    
  };
