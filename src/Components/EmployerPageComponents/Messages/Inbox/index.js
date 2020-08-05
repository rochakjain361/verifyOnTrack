import React,  { useState, useEffect }from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core/';


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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Tabs from "./tabs";
import Axios from 'axios';




let result = [];
let Token1="";
let Token="";
let Id="";

export default function Index() {
    const [Response,setResponse]=React.useState([])
    const [loading,setLoading]=React.useState(true)
   
  
    // const[Token,setToken]=React.useState("")
    // const[Token1,setToken1]=React.useState("")
    // const[Id,setId]=React.useState("")

    
    const fetchInboxMessages=async()=> {
        
        const Token=await localStorage.getItem("Token");
        console.log("Token",Token)
        const Id=localStorage.getItem("id")
        await Axios.get('http://3.22.17.212:9000/api/v1/messages/',
             {
                 headers: {
                     'Authorization': Token
                 }
             }).then((response)=>{
                 console.log("messages",response);
                 
                
                setResponse(response.data)
                setLoading(false)  
             })
            }
    useEffect( () => {    
      fetchInboxMessages()   
    },[])
    

        // let tempArr = [];
        // response.forEach(element => {
        //     tempArr.push(element["companyName"]);
        // });
        // this.setState({ companies: tempArr });
        // console.log(tempArr)
      
        return (
            <div style={{ marginTop: 20 }}>
                {/* <Paper style={{ padding: 20, height: '100vh' }}> */}
                <Grid container justify='space-between' alignItems='center' spacing={4}>

                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Messages
                                </Typography>
                    </Grid>

                </Grid>
                {loading?<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        display="flex"
        style={{ minHeight: "0vh" }}>
       <CircularProgress /></Grid>:Response.length===0?
       <Grid 
       container 
       align="center" 
       justify="center"
       >
           <h1>No Messages</h1>
        </Grid>
       
      :
                <Tabs data={Response} refresh={fetchInboxMessages}/>}

               
              

            </div>
        )
    }




