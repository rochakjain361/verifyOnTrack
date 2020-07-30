import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core/';
import Axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress
} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
let Token1 = "";
let Token = "";
let Id = "";

export default function Datatable(props) {
    const [viewDetailsButton, setviewDetailsButton] = React.useState(false)
    const [addNewMessageDialog, setaddNewMessageDialog] = React.useState(false)
    const [Message, setMessage] = React.useState([])
    const [addMessage, addSetMessage] = React.useState("")
    const [currentID, setCurrentID] = React.useState("")
    // console.log("props.data",props)
    const addNewMessage = async () => {

    }
    const Closeviewbutton = () => {
        setviewDetailsButton(false);
        setMessage("")
    }
    const ViewMessage = async (id) => {
       
        Token = await localStorage.getItem("Token");
        Id = await localStorage.getItem("id")
        setviewDetailsButton(true)
        // setCurrentID(id);
        await Axios.get('http://3.22.17.212:8000/api/v1/messages/' + id,
            {
                headers: {
                    'Authorization': Token
                }
            }).then((response) => {
                console.log("viewresponse", response);
                setMessage(response.data)





            })
    }
    const addMessages = async (id) => {
        setaddNewMessageDialog(false)
        console.log("newmessage", addMessage, id)
        let bodyFormData = new FormData();
        bodyFormData.append("message", addMessage);
        await Axios.put('http://3.22.17.212:8000/api/v1/messages/' + id + '/add',
            bodyFormData,
            {
                headers: {
                    'Authorization': Token
                }
            }).then((response) => {
                console.log("viewraddmessageesponse", response);
                ViewMessage(response.data.message.id)
                props.data.refresh()







            })
    }

    return (
      <div>
        <TableContainer
          component={Paper}
          style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
          elevation={5}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "black" }}>
                <TableCell align="left">Last Updated</TableCell>
                <TableCell align="left">Initial Date</TableCell>
                <TableCell align="left">Discuss With</TableCell>
                <TableCell align="left">Message</TableCell>
                <TableCell align="left">Number of items</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.initialDate_field}</TableCell>
                  <TableCell align="left">
                    {new Date(row.messageDate).toDateString()}
                  </TableCell>
                  <TableCell align="left">
                    {row.discuss_with_employee_field.name}
                  </TableCell>
                  <TableCell align="left">{row.message}</TableCell>
                  <TableCell align="left">{row.total_items_field}</TableCell>
                  <TableCell align="left">
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => ViewMessage(row.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Dialog
            fullWidth={"sm"}
            maxWidth={"sm"}
            open={viewDetailsButton}
            onClose={() => {
              Closeviewbutton();
            }}
          >
            <DialogTitle id="codegenerator">{"Message Details"}</DialogTitle>
            {Message.length === 0 ? (
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                display="flex"
                style={{ minHeight: "100vh" }}
              >
                <CircularProgress />
              </Grid>
            ) : (
              <>
                <DialogContent>
                  <Grid
                    container
                    justify="flex-start"
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    {Message.map((row) => (
                      <Grid item xs={12}>
                        <Card
                          style={{ minWidth: 400, marginTop: 10 }}
                          elevation={4}
                          variant="outlined"
                        >
                          <CardContent>
                            {/* <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>{row.initialDate_field}</Typography> */}
                            <Grid container justify="space-between">
                              <Typography variant="h5" component="h2">
                                {row.initiated_by_field}
                              </Typography>
                              <Typography
                                variant="caption"
                                alignItems="flex-end"
                                style={{ fontSize: 16 }}
                                color="textSecondary"
                              >
                                {row.messageDate}{" "}
                              </Typography>
                            </Grid>
                            <Typography
                              style={{ marginBottom: 12 }}
                              color="textSecondary"
                            >
                              {" "}
                              {row.msgCategory_field}
                            </Typography>

                            <Typography variant="body2" component="p">
                              {row.message}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </DialogContent>
                <DialogActions style={{ padding: 15 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={
                      Message[0].msgCategory_field === "ApprovalRequests"
                    }
                    onClick={() => {
                      setaddNewMessageDialog(true);
                    }}
                  >
                    Add new message
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => Closeviewbutton()}
                  >
                    Back to Inbox
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </div>
        <div>
          <Dialog
            open={addNewMessageDialog}
            onClose={() => setaddNewMessageDialog(false)}
          >
            <DialogTitle id="form-dialog-title">Add new message</DialogTitle>
            <DialogContent style={{ minWidth: 500 }}>
              <TextField
                autoFocus
                margin="dense"
                id="newMessage"
                label="Type message"
                type="text"
                fullWidth
                multiline
                variant="outlined"
                rows={4}
                onChange={(event) => {
                  addSetMessage(event.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addMessages(Message[0].id)}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setaddNewMessageDialog(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
}


