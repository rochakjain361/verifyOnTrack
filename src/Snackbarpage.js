import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider, useSnackbar } from "notistack";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("This is a success message!", "sucess");
  };

  return handleClickVariant("success");
}

let open = true;

console.log("from snackabr", open);

const handleClose = (event, reason) => {
  console.log("from handleclose");
  if (reason === "clickaway") {
    return;
  }

  open = false;
  console.log("open", open);
};
// export const CustomizedSnackbars = () => {
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

 
//   const handleClick = () => {
//     enqueueSnackbar('I love hooks');
// };

// return (
//     <Button onClick={handleClick}>Show snackbar</Button>
// );

  
// }
export function CustomizedSnackbars (value) {
 console.log(value)
  this.value=value;
  return(
    <Snackbar
      open={this.value}
      autoHideDuration={600}
      onClose={(reason) => {
        if (reason === "clickaway") {
          return;
        }
    //  snackbarclose()
    this.value=false
      }}
    >
      <Alert onClose={() => this.value=false} severity="success">
        This is a success message!
      </Alert>
    </Snackbar>)
    
  
    }

