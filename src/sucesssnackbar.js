import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";


import { clearSnackbar } from "../src/actions/snackbaractions";
import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SuccessSnackbar() {
  const dispatch = useDispatch();

   var { successSnackbarMessage, successSnackbarOpen } = useSelector(
    state=>state
  );
console.log("successSnackbarMessage",successSnackbarOpen)
  function handleClose() {
     dispatch(clearSnackbar());
  }

  return (
    <Snackbar open={successSnackbarOpen} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success">
  {successSnackbarMessage}
  </Alert>
</Snackbar>
   
  );
}

