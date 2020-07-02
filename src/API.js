import Axios from "axios";
export  const EmployeeMessagedata = async()=>{
    await Axios.get('http://3.22.17.212:8000/api/v1/messages/',
    {
        headers: {
            'Authorization': token
        }
    }).then((response)=>{
        console.log(response);
        return response;
       
       
        
        
    })
}