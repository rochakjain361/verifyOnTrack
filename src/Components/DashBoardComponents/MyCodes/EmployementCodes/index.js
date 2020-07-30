import React, { useEffect,  } from "react";

import {
 
  Grid,
  Typography,
 
} from "@material-ui/core/";

import {
 
  CircularProgress,
  Box,
} from "@material-ui/core/";
import TabsEmployment from "../EmployementCodes/tabsEmployment";
// import Onboarding from "../../../EmployerPageComponents/MyCodes/EmployementCodes/Onboarding";
import Axios from "axios";

import {get} from '../../../../API'


export default function Indexemployment() {
  const [Token] = React.useState(localStorage.getItem("Token"));
  const [id] = React.useState(localStorage.getItem("id"));
  const [Loading, setLoading] = React.useState(true);
  const [OnboardingResponse, setOnboardingResponse] = React.useState([]);
  const [employerlist,setEmployerlist]=React.useState([])
  const [comments,setcomments]=React.useState([])

  const Onboardingdata = async () => {
    await Axios.get("http://3.22.17.212:8000/api/v1/employers/oboffers", {
      headers: {
        Authorization: Token,
      },
    }).then((response) => {
      console.log("response for oboffers", OnboardingResponse);
      setOnboardingResponse(response.data);
      
      
    });
  };
  const employerList=async()=>{
    await get("http://3.22.17.212:8000/api/v1/employees/employers",Token).then((response)=>{
      console.log("response from employee",response);
      setEmployerlist(response.data)
      
    })
  }
  const getcoments=async()=>{
await get("http://3.22.17.212:8000/api/v1/employees/"+id+"/comments",Token).then((response)=>{
console.log("response for comments",response);  
setcomments(response.data)
setLoading(false);
})
  }
  
  const isloading = () => {
    return (
      <Grid
        container
        justify="flex-end"
        alignItems="center"
        // container
        // spacing={0}
        direction="column"
        // alignItems="center"
        // justify="center"
        // // display="flex"
        // style={{ minHeight: "10vh" }}
      >
        <Grid item xs={6} style={{ marginTop: 100 }}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  };

   useEffect(() => {
    
    Onboardingdata();
     employerList();
     getcoments()
    
    
  }, []);

  return Loading ? (
    isloading()
  ) : (
    <Grid container align="center" justify="center">
      <Grid item xs={12}>
        <Box p={2}>
          <Typography variant="h4" align="center" justify="center">
            Employment Codes
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TabsEmployment Onboarding={OnboardingResponse} employerdata={employerlist} refresh={Onboardingdata} employerrefresh={employerList}comments={comments} />
      </Grid>
    </Grid>
  );
}
