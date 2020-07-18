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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListItemText";

function Comments(props) {
  return (
    <div>
      {/* <Grid container justify='space-between' alignItems='center' spacing={4}>
                    <Grid item xs={8}>
                        <Typography variant='h4'>
                            Comments
                        </Typography>
                    </Grid>
                </Grid> */}

      {props.data.map((comment) => (
        <Paper variant="outlined" style={{ padding: 10, marginTop: 20 }}>
          <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h6">{comment.company_name_field}</Typography>

              {/* <Typography variant='subtitle1' color="textSecondary">
             fds
  </Typography> */}
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                {new Date(comment.created_on).toDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="flex-start">
                <Typography>{comment.comment}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}

export default Comments;
