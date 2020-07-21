import React, { Component } from 'react'
import queryString from "query-string";
import axios from 'axios'
export class resetpassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             param:{
                 uid:"",
                 token:""
             },
             result:[]
        }
    }
    
    async componentDidMount(){
        // console.log(this.props.location.search);
        let url = this.props.location.search;
         let params = await queryString.parse(url);
        console.log("params",params);
        this.setState({param:params})
        await axios
          .get(
            "http://3.22.17.212:8000/api/v1/accounts/verify_token?uid=" +
             params.uid,
            {
              headers: {
                Authorization:"Token "+params.token,
              },
            }
          )
          .then((res) => this.setState({ result: res.data }));

        
    }
    render() {
        return (
            <div>
                <h1>resetpassword</h1>
            </div>
        )
    }
}

export default resetpassword
