import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Grid, Typography, Button, TableContainer, FormControlLabel, Checkbox, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core/';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core/';
import Datatable from "./Datatable";

export default function Tabs(props) {

    return (
        <div>
            <Datatable data={props}/>
        </div>
    )
}
