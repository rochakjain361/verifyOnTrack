import React, { Component } from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Tabs,
    Tab,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

})

class index extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div>
                <ExpansionPanel >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="body1" display='block'>Company name 1</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.workDescription()}
                    </ExpansionPanelDetails>
                </ExpansionPanel>

{/* ONLY KEEP THE ABOVE EXPANSION PANEL AND USE MAP FUNC TO LOOP */}

                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="body1" display='block'>Company name 2</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.workDescription()}
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="body1" display='block'>Company name 3</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.workDescription()}
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="body1" display='block'>Company name 4</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.workDescription()}    
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }

    workDescription() {
        return(
            <Grid container direction='row'>
            <Typography variant='body1' display='block'>
                Job Tiltle
            </Typography>
            <Typography variant='body2' display='block' style={{marginTop:5}}>
            Job Description Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
            sit amet blandit leo lobortis eget.
            </Typography>
        </Grid>
        );   
    }

}

export default withStyles(styles)(index);
