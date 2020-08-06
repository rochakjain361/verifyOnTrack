import React, { Component } from "react";
import Dash from "../../../dash";
import {
  Box,
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import axios from "axios";
let token="";
export default class Createwallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ontracid: "",
      sucess:false,
      email:"",
      name:"",
      phone:""
    };
  }
  async reset() {
    let bodyFormData = new FormData();
    let headers = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    bodyFormData.append("userid ", this.state.ontracid);
    await axios
      .post("http://3.22.17.212:9000/wallet/create", bodyFormData, headers)
      .then((res) =>{ window.location.reload(false);})
          
      
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount(){
token=localStorage.getItem("Token")
this.setState({ ontracid: localStorage.getItem("ontrac_id") });
  }

  render() {
    return (
      <div>
        <Box m={2} p={2}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Card
                style={{ padding: 100 }}
                raised={true}
                >
               
                <Grid
                  container
                  justify="flex-start"
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} justify="center">
                    <Grid container direction="row" justify="center">
                      <Typography
                        variant="h5"
                        gutterBottom
                        style={{ fontWeight: "bold" }}
                        color="primary"
                      >
                        Create wallet
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid xs={12}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={8}>
                        <TextField
                          variant="outlined"
                          required
                          margin="dense"
                          label="ontracid"
                          value={this.state.ontracid}
                          type="ontracid"
                          id="password"
                          autoComplete="current-password"
                          fullWidth
                          error={this.state.ontracidnf}
                          size="small"
                          helperText={"please enter your ontracid"}
                          onChange={(event) =>
                            this.setState({
                              ontracid: event.target.value,
                            })
                          }
                        ></TextField>
                        
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={12}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          this.reset();
                        }}
                      >
                        Create Wallet
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
        
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}
