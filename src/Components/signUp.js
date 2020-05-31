import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import GradientButton from './GradientButton'
import RouterLink from './RouterLink/index.js';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class signUp extends Component {

    constructor(props) {
        super(props);
        this.onRegisterButtonPress = this.onRegisterButtonPress.bind(this);
    }

    state = {
        designation: '',
        companyName: '',
        firstName: '',
        middleName: '',
        surname: '',
        username: '',
        email: '',
        password: '',
    }
    render() {

        const { classes } = this.props;

        return (
            <Grid container component="main" className={classes.root} direction="row" justify="center">
                <CssBaseline />
                <Grid container xs={false} sm={12} md={12} square className={classes.mainImage} direction="row" justify="center">

                    <Grid item style={{ marginTop: 40, marginBottom: 40 }} sm={6} md={6}>
                        <Card style={{ padding: 50, marginLeft: 40, marginRight: 40 }} raised="true">
                            <form className={classes.form} noValidate>

                                <Typography variant="h4" gutterBottom color="primary">
                                    Register
                                </Typography>

                                <Grid container spacing={1}>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel id="demo-simple-select-outlined-label">Designation</InputLabel>
                                            <Select
                                                xs={12}
                                                labelId="designation"
                                                id="designation"
                                                value={this.state.designation}
                                                onChange={event => this.setState({ designation: event.target.value })}
                                                label="registerType"
                                                fullWidth
                                                size="medium"
                                            >
                                                <MenuItem value='Admin'>Admin</MenuItem>
                                                <MenuItem value='Employer'>Employer</MenuItem>
                                                <MenuItem value='Employee'>Employee</MenuItem>
                                            </Select>
                                            <FormHelperText>Select your designation:</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            style={{ marginRight: 10 }}
                                            margin="dense"
                                            id="companyName"
                                            label="Company Name"
                                            value={this.state.companyName}
                                            onChange={event => this.setState({ companyName: event.target.value })}
                                            type="text"
                                            autoComplete="companyName"
                                            autoFocus
                                            fullWidth
                                            size="medium"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            style={{ marginRight: 10 }}
                                            margin="dense"
                                            id="firstName"
                                            label="First Name"
                                            value={this.state.firstName}
                                            onChange={event => this.setState({ firstName: event.target.value })}
                                            type="text"
                                            autoComplete="firstName"
                                            autoFocus
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            style={{ marginRight: 10 }}
                                            margin="dense"
                                            id="middleName"
                                            label="Middle Name"
                                            value={this.state.middleName}
                                            onChange={event => this.setState({ middleName: event.target.value })}
                                            type="text"
                                            autoComplete="middleName"
                                            autoFocus
                                            fullWidth
                                            size="medium"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            style={{ marginRight: 10 }}
                                            margin="dense"
                                            id="surname"
                                            label="Surname"
                                            value={this.state.surname}
                                            onChange={event => this.setState({ surname: event.target.value })}
                                            type="text"
                                            autoComplete="surname"
                                            autoFocus
                                            fullWidth
                                            size="medium"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            style={{ marginRight: 10 }}
                                            margin="dense"
                                            id="username"
                                            label="Username"
                                            value={this.state.username}
                                            onChange={event => this.setState({ username: event.target.value })}
                                            type="text"
                                            autoComplete="username"
                                            autoFocus
                                            fullWidth
                                            size="medium"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            style={{ marginRight: 10 }}
                                            margin="dense"
                                            id="email"
                                            label="Email Address"
                                            value={this.state.email}
                                            onChange={event => this.setState({ email: event.target.value })}
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            style={{ marginRight: 10 }}
                                            margin="dense"
                                            name="password"
                                            label="Password"
                                            value={this.state.password}
                                            onChange={event => this.setState({ password: event.target.value })}
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            style={{ marginRight: 10 }}
                                            margin="dense"
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="current-password"
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>

                                </Grid>

                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <GradientButton
                                            onClick={this.onRegisterButtonPress}
                                            title={'Sign Up'}
                                            center
                                            style={{ marginTop: 16, marginBottom: 16 }}
                                            fullWidth  
                                        />
                                    </Grid>
                                    <Grid container xs={12} justify="center">
                                        <RouterLink title="Have an account? Sign In" to="/"/>
                                    </Grid>
                                </Grid>

                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    async onRegisterButtonPress() {
        try {
            let apiEndpoint = 'http://127.0.0.1:8000/api/v1/accounts/auth';
            if (this.state.designation === 'employee') apiEndpoint += '/employee/register';
            else if (this.state.designation === 'employer') apiEndpoint += '/employer/register';
            else apiEndpoint += '/admin/register';

            var requestBody = {
                designation: this.state.designation,
                companyName: this.state.companyName,
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                surname: this.state.surname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            };

            console.log(requestBody);

            let response = await fetch(apiEndpoint, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
            });
            response = await response.json();
            console.log(response);
        } catch (error) {
            console.log('[!ON_REGISTER] ' + error);
        }
    }
}
signUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
        height: '100vh',
    },
    mainImage: {
        backgroundImage: 'url(/images/mainImage2.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
});

export default withStyles(styles)(signUp);