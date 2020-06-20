import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import signUp from './Components/signUp'
import signIn from './Components/signIn'
import LandingPage from './Components/LandingPage'
import Addresses from './Components/DashBoardComponents/Addresses'
import Identities from './Components/DashBoardComponents/Identities'
import Phones from './Components/DashBoardComponents/Phones'
import MyJobProfile from './Components/DashBoardComponents/MyJobProfile'
import Dashboard from './Components/DashBoardComponents/Dashboard'
import PreRegistration from './Components/PreRegistration'
import AdminLandingPage from './Components/AdminLandingPage'
import EmployerLandingPage from './Components/EmployerLandingPage'
import AdminRegistration from './Components/AdminRegistration'
import theme from './theme';

class App extends React.PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>

        <Router>
          <div>
            <Switch>
              {/* Registration Paths */}
              <Route exact path='/' component={PreRegistration} />
              <Route exact path='/adminRegistration' component={AdminRegistration} />
              <Route exact path='/signUp' component={signUp} />
              <Route exact path='/signIn' component={signIn} />

              {/* Employee PAGE PATHS */}
              <Route exact path='/Homepage' component={LandingPage} />
              <Route exact path='/addresses' component={LandingPage} />
              <Route exact path='/Identities' component={LandingPage} />
              <Route exact path='/Phones' component={LandingPage} />
              <Route exact path='/MyJobProfile' component={LandingPage} />
              <Route exact path='/employeeInbox' component={LandingPage} />
              <Route exact path='/employeeOutbox' component={LandingPage} />
              <Route exact path='/profiles' component={LandingPage} />
              <Route exact path='/dashboard' component={LandingPage} />
              <Route exact path='/employeeAccessCodes' component={LandingPage} />
              <Route exact path='/employeeAccessCodes' component={LandingPage} />
              <Route exact path='/employeeEmployementCodes' component={LandingPage} />

              {/* Employer Page Paths */}
              <Route exact path='/employer' component={EmployerLandingPage} />
              <Route exact path='/employerDashboard' component={EmployerLandingPage} />
              <Route exact path='/employerMessages' component={EmployerLandingPage} />
              <Route exact path='/employerAccessCodes' component={EmployerLandingPage} />
              <Route exact path='/employerEmployementCodes' component={EmployerLandingPage} />
              <Route exact path='/employerInbox' component={EmployerLandingPage} />
              <Route exact path='/employerOutbox' component={EmployerLandingPage} />

              {/* ADMIN PAGE PATHS */}
              <Route exact path='/admin' component={AdminLandingPage} />
              <Route exact path='/managestates' component={AdminLandingPage} />
              <Route exact path='/manageLGAs' component={AdminLandingPage} />
              <Route exact path='/manageCities' component={AdminLandingPage} />
              <Route exact path='/adminAccessCodes' component={AdminLandingPage} />
              <Route exact path='/addAdmin' component={AdminLandingPage} />
              <Route exact path='/manageAddressReasons' component={AdminLandingPage} />
              <Route exact path='/manageAddressTypes' component={AdminLandingPage} />
              <Route exact path='/managePhoneTypes' component={AdminLandingPage} />
              <Route exact path='/managePhoneReasons' component={AdminLandingPage} />
              <Route exact path='/manageIdSources' component={AdminLandingPage} />
              <Route exact path='/manageJobCategories' component={AdminLandingPage} />
              <Route exact path='/manageJobLeavingReasons' component={AdminLandingPage} />

            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
