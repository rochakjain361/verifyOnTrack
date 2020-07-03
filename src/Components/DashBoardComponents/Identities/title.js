import React, { Component } from 'react'
import { CircularProgress, Typography,Box } from "@material-ui/core";
import Index from "./index"
export default class Identitestitile extends Component {
    render() {
        return (
            <div>
                 <Box p={1}>

<Typography variant="h3" gutterBottom align="center">
Identites
</Typography>
</Box>
            <Index/>    
            </div>
        )
    }
}
