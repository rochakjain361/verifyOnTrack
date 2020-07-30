import React from "react";
import {
  Paper,
  Grid,
  Typography,
} from "@material-ui/core/";

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

      {props.data.length===0?<h2>No Comments</h2>:props.data.map((comment) => (
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
