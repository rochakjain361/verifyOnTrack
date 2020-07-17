import React from "react";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  Button,
  TableContainer,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
  Radio,
  RadioGroup,
} from "@material-ui/core/";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListItemText';

function Comments(props) {
  return (
    <div>
        <List>
      {props.data.map((comment) => (<Grid  justify="flex-start">

       
<h3>
{comment.company_name_field}
</h3>
<ListItemText>
{comment.comment}
</ListItemText>
      </Grid>
      ))}
      </List>
    </div>
  );
}

export default Comments;
