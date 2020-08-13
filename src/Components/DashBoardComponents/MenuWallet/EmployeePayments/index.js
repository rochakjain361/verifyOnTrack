import React, { Component } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Grid,
  Container,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TableBody,
  Paper,
  Box,
  Card
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Addmoney from "../../Wallet/Addmoney";
import { makeStyles, useTheme } from "@material-ui/core/styles";

let Token = "";
// const  useStyles = makeStyles((theme) => ({
//      link: {
//     textDecoration: "none"

//   }
// }));
// const style = useStyles();
export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Balance: "",
      walletstatus: "",
      Transaction: "",
    };
  }

  async componentDidMount() {
    Token = localStorage.getItem("Token");

    await axios
      .get("http://3.22.17.212:9000/wallet/getBalance", {
        headers: {
          Authorization: Token,
        },
      })
      .then((response) => {
        this.setState({
          Balance: response.data[0].balance,
          walletstatus: response.status,
        });
      });
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    await axios
      .get(
        "http://3.22.17.212:9000/wallet/accTransactions?sdate=2020-01-01&edate=" +
          yyyy +
          "-" +
          mm +
          "-" +
          dd,
        {
          headers: {
            Authorization: Token,
          },
        }
      )
      .then((response) => {
        this.setState({
          Transaction:response.data
        });
      });
  }

  render() {
    return (
      <>
        {this.state.walletstatus === 200 ? (
          <div>
            <Paper elevation={2}>
              <Box p={2} m={2}>
                <Grid container justify="space-between">

                    <Box p={1}>
                  <Typography variant="h4">E-wallet Balance</Typography>
                  
                  <Typography variant="h5" align="center">{this.state.Balance}</Typography>
                    </Box>
                    <Box p={2}>

                  <Button
                    variant="contained"
                    color="primary"
                    >
                    <Link to="/Addmoney" style={{ textDecoration: "none" }}>
                      Recharge Wallet
                    </Link>
                  </Button>
                    </Box>
                </Grid>
              </Box>
            </Paper>
            <Switch>
              <Route exact path="/Addmoney">
                <Container>
                  <Addmoney />
                </Container>
              </Route>
            </Switch>
          </div>
        ) : null}
        <Box p={2}>
          <TableContainer component={Paper} elevation={16} p={3}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  {[
                    "Transaction Date",
                    "Transaction Type",
                    "Transaction Amount",
                    "Balance before transaction",
                    "Balance After transaction",
                    "Currency",
                    "Description",
                  ].map((text, index) => (
                    <TableCell style={{ fontWeight: "bolder" }} align="center">
                      {text}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.Transaction
                  ? this.state.Transaction.map((row, index) =>
                      index < 10 ? (
                        <TableRow key={row.id}>
                          <TableCell
                            align="center"
                            style={{ textTransform: "capitalize" }}
                          >
                            {new Date(row.trxDate).toDateString()}
                          </TableCell>

                          <TableCell align="center">{row.trxType}</TableCell>
                          <TableCell align="center">{row.trxAmount}</TableCell>
                          <TableCell align="center">
                            {row.balanceBeforeTrx}
                          </TableCell>
                          <TableCell align="center">
                            {row.balanceAfterTrx}
                          </TableCell>
                          <TableCell align="center">
                            {row.trxAmount_currency}
                          </TableCell>

                          <TableCell align="center">
                            {row.trxdescription}{" "}
                          </TableCell>
                        </TableRow>
                      ) : null
                    )
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

export default index;
