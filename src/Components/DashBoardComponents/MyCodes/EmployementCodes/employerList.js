import React,{ Component, useEffect, useState } from 'react'
import {
    TextField,
    Paper,
    Grid,
    Typography,
    Button,
    TableContainer,
    FormControlLabel,
    Checkbox,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    CircularProgress,
  } from "@material-ui/core/";
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Fab,
  } from "@material-ui/core/";
function EmployerList(props) {
    const [data]=React.useState(props.data)
    // useEffect(() => {
    //     console.log("props from employerlist", data);
    //   });
    return (
        <div>
           <Grid container justify="flex-start" alignItems="center" spacing={2}>
        <TableContainer
          component={Paper}
          style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
          elevation={5}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "black" }}>
                {[
                  "Company name",
                  "Start Date",
                  "End Date",
                  "Job Title",
                  "Job category",
                  "Termnation",
                  "Updation",
                  "Comment",
                ].map((tablename) => (
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    {tablename}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  
                  <TableCell align="center">{row.employer.companyName}</TableCell>
                  <TableCell align="center">{row.jobDetails.startDate}</TableCell>
                  <TableCell align="center">{row.jobDetails.endDate?row.jobDetails.endDate:"--"}</TableCell>
                  <TableCell align="center">{row.jobDetails.jobTitle}</TableCell>
                  <TableCell align="center">{row.jobDetails.job_category_field}</TableCell>
                 
                  <TableCell align="center">
                      
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        
                      }}
                    >
                      Termination
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        
                      }}
                    >
                      Updation
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        
                      }}
                    >
                      Comment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
        </div>
    )
}

export default EmployerList
