import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Button, Paper, Avatar } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";

let token = "";

export default class employerlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employerlist: [],
      page: 0,
      rowsPerPage: 10,
      count: 0,
      nextpagelink: "",
      previouspagelink: "",
    };
  
  }

  async getemployerlist() {
    await axios
      .get("http://3.22.17.212:9000/getEmployerList", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({
          employerlist: res.data.results,
          count: res.data.count,
          nextpagelink: res.data.next,
          previouspagelink: res.data.previous,
        });
      });
  }
  async nextpage() {
    await axios
      .get(this.state.nextpagelink, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({
          employerlist: res.data.results,
          count: res.data.count,
          nextpagelink: res.data.next,
          previouspagelink: res.data.previous,
        });
      });
  }
  async previouspage() {
    await axios
      .get(this.state.previouspagelink, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({
          employerlist: res.data.results,
          count: res.data.count,
          nextpagelink: res.data.next,
          previouspagelink: res.data.previous,
        });
       
      });
  }
  async componentDidMount() {
    token = localStorage.getItem("Token");
    this.getemployerlist();
  }
  nextpageclick = (event, newPage) => {
      console.log("typeof",typeof(newPage))
    if (newPage > this.state.page) {
        console.log("nextpage")
          this.nextpage();
    } else {
        console.log("prevpage")
      this.previouspage();
    }
    this.setState({
      page: newPage,
    });
  };
  render() {
    return (
      <div>
        <>
          <TableContainer component={Paper} elevation={16} p={3}>
            <Table stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  {[
                    "CompanyName",
                    "Logo",
                    "Phone",
                    "Email",
                    "RegNum",
                    "Category",
                    "Actions",
                  ].map((text, index) => (
                    <TableCell style={{ fontWeight: "bolder" }} align="center">
                      {text}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.employerlist.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.companyName}</TableCell>
                    <TableCell align="center">
                      <Avatar src={row.logo}></Avatar>
                    </TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.regNum}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() =>
                          this.setState(
                            { Viewdialogopen: true },
                            this.fetchhistory
                          )
                        }
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={this.state.count}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.nextpageclick}
          />
        </>
      </div>
    );
  }
}
