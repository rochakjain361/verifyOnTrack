import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Paper,
    Typography,
    Button
} from '@material-ui/core';
import axios from 'axios'

const styles = theme => ({

})

class index extends React.Component {

    state = {
        allCodes: []
    }

    // constructor(props) {
    //     super(props);
    //     this.generateNewEmployementCodeButton = this.generateNewEmployementCodeButton.bind(this);
    //   } 
    async postAPI() {

        let bodyData = {
            "aggs": {
                "source": {
                    "terms": {
                        "field": "Source.keyword"
                    },
                    "aggs": {
                        "Daily-Sentiment-Distro": {
                            "terms": {
                                "field": "predictedSentiment.keyword"
                            }
                        }
                    }
                }
            }
        }

        console.log('Body data:', bodyData)

        try {
            let response = await fetch('https://cors-anywhere.herokuapp.com/http://3.7.187.244:9200/analyzed-docs/_search?size=0',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }
            );
            response = await response.json();
            console.log('postCodeSuccess:', response);

        } catch (error) {
            console.log("[!ON_REGISTER] " + error);
        }
    }


    async componentDidMount() {
        token = localStorage.getItem("Token");
        id = localStorage.getItem("id");
        // this.fetchAll()
        // console.log('allfetchallfetch')

        //     await axios
        //   .post(
        //     'http://3.7.187.244:9200/analyzed-docs/_search?size=0/',
        //     bodyFormData
        //   )
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <h1>New API</h1>
                <Button variant='contained' onClick={()=> this.postAPI()}>Hit API</Button>
            </div>
        );
    }
}

export default withStyles(styles)(index);
