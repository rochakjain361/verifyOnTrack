import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import RouterLink from '../../RouterLink';
import GradientButton from '../../GradientButton';
import Card from '@material-ui/core/Card';

class Addresses extends Component {
    render() {
        return (

            <Grid container justify="space-between" alignItems="center">

                <Grid item xs={12}>
                    <h1>My Address</h1>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Card style={{ padding: 20 }} raised={true}>
                        <form>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        style={{ marginRight: 10 }}
                                        margin="dense"
                                        id="address"
                                        label="Please Enter your Address"

                                        type="text"
                                        autoComplete="username"
                                        autoFocus
                                        fullWidth
                                        size="medium"

                                        multiline
                                        rows={4}
                                    />
                                </Grid>

                                <Grid container justify="space-between" alignItems="center">
                                    <Grid item xs={6}>
                                        <GradientButton
                                            onClick={this.onSignInButtonPress}
                                            title={'Submit Address'}
                                            center
                                            style={{ marginTop: 16, marginBottom: 16, fontFamily: 'Montserrat', fontWeight: 'bold' }}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <GradientButton
                                            onClick={this.onSignInButtonPress}
                                            title={'Geolocation'}
                                            center
                                            style={{ marginTop: 16, marginBottom: 16, fontFamily: 'Montserrat', fontWeight: 'bold' }}
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>

                        </form>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default Addresses
