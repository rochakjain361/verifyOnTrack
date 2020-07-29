import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  Button,
  TableContainer,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core/";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Axios from "axios";
import { get } from "../../../../API";
let token = "";
export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codes: [],
    };
  }
  async getcodes() {
    await get(
      "http://3.22.17.212:8000/api/v1/codes/evaluation/codes",
      token,
      ""
    ).then((res) => this.setState({ codes: res.data }));
  }
  async componentDidMount() {
    token = localStorage.getItem("Token");
    await this.getcodes();
  }
  render() {
    return <div></div>;
  }
}

export default index;
