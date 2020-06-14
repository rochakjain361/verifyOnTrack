import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox } from '@material-ui/core/';

const styles = theme => ({

})

export class index extends Component {
    render() {

        const { classes } = this.props;

        return (
            <div>
                <h1>Access Codes</h1>
            </div>
        )
    }

    
}

export default withStyles(styles)(index);