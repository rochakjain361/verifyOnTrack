import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import reducer from './Reducer/reducer'
window.$IP = '3.22.17.212'
export const store=createStore(reducer)
ReactDOM.render(
  <Provider store={store}> 
    <App /></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// const SingInContainer = ({ message, variant}) => {
//   const [open, setSnackBarState] = useState(false);
//   const handleClose = (reason) => {
//       if (reason === 'clickaway') {
//         return;
//       }
//       setSnackBarState(false)

//     };

//   if (variant) {
//       setSnackBarState(true);
//   }
//   return (
//       <div>
//       <SnackBar
//           open={open}
//           handleClose={handleClose}
//           variant={variant}
//           message={message}
//           />
//       <SignInForm/>
//       </div>
//   )
// }

// const SingInContainer = ({ message, variant}) => {
//   const [open, setSnackBarState] = useState(variant ? true : false); 
//                                 // or useState(!!variant); 
//                                 // or useState(Boolean(variant));
//   const handleClose = (reason) => {
//       if (reason === 'clickaway') {
//         return;
//       }
//       setSnackBarState(false)

//     };

//   return (
//       <div>
//       <SnackBar
//           open={open}
//           handleClose={handleClose}
//           variant={variant}
//           message={message}
//           />
//       <SignInForm/>
//       </div>
//   )
// }
