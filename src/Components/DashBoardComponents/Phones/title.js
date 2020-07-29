import React, { Component } from 'react'
import Index from "./index"
import { Typography, Box } from "@material-ui/core";

export default class phonetitle extends Component {
    render() {
        return (
            <div>
                <Box p={1}>

                 <Typography variant="h3" gutterBottom align="center">
               Phones
              </Typography>
                </Box>
              <Index/>
                
            </div>
        )
    }
}
