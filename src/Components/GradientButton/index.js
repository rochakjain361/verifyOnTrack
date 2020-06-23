import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 42,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    }
});

class GradientButton extends React.PureComponent {
    render() {
        const { classes } = this.props;

        return (
            <Button
                fullWidth={this.props.fullWidth}
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                onClick={this.props.onClick}
                type={this.props.type}
                style={this.props.style}
                 disabled={this.props.disabled}
            >
                { this.props.title }
            </Button>
        );
    }
};

export default withStyles(styles)(GradientButton);
