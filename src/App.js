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
import dash from './dash'
import Stepper from './Components/WorkFlow/Stepper'
import ApprovalCodes from './Components/AdminPageComponents/ManageCodes/ApprovalCodes';
import Job from './Components/AdminPageComponents/ManageCodes/Pages/Job';
import AdminDash from './AdminDash'
import EmployerDash from './EmployerDash'


class App extends React.PureComponent {
 
  render() {
    return (
      <ThemeProvider theme={theme}>

        <Router>
          <div>
            <Switch>
              {/* Registration Paths */}
              <Route exact path='/' component={signIn} />
              <Route exact path='/adminRegistration' component={AdminRegistration} />
              <Route exact path='/signUp' component={signUp} />
              <Route exact path='/signIn' component={signIn} />
              <Route exact path='/dash' component={dash} />
              <Route exact path='/workflow' component={Stepper} />

              {/* Employee PAGE PATHS */}
              <Route exact path='/Homepage' component={dash} />
              <Route exact path='/addresses' component={dash} />
              <Route exact path='/Identities' component={dash} />
              <Route exact path='/Phones' component={dash} />
              <Route exact path='/MyJobProfile' component={dash} />
              <Route exact path='/employeeInbox' component={dash} />
              <Route exact path='/employeeOutbox' component={dash} />
              <Route exact path='/profiles' component={dash} />
              <Route exact path='/dashboard' component={dash} />
              <Route exact path='/employeeAccessCodes' component={dash} />
              <Route exact path='/employeeAccessCodes' component={dash} />
              <Route exact path='/employeeEmployementCodes' component={dash} />

              {/* Employer Page Paths */}
              {/* <Route exact path='/employerLanding' component={EmployerDash} /> */}
              <Route exact path='/employer' component={EmployerDash} />
              <Route exact path='/employerDashboard' component={EmployerDash} />
              <Route exact path='/employerMessages' component={EmployerDash} />
              <Route exact path='/employerAccessCodes' component={EmployerDash} />
              <Route exact path='/employerEmployementCodes' component={EmployerDash} />
              <Route exact path='/employerInbox' component={EmployerDash} />
              <Route exact path='/employerOutbox' component={EmployerDash} />

              {/* ADMIN PAGE PATHS */}
              {/* <Route exact path='/adminLanding' component={AdminDash} /> */}
              <Route exact path='/admin' component={AdminDash} />
              <Route exact path='/managestates' component={AdminDash} />
              <Route exact path='/manageLGAs' component={AdminDash} />
              <Route exact path='/manageCities' component={AdminDash} />
              <Route exact path='/adminAccessCodes' component={AdminDash} />
              <Route exact path='/addAdmin' component={AdminDash} />
              <Route exact path='/manageAddressReasons' component={AdminDash} />
              <Route exact path='/manageAddressTypes' component={AdminDash} />
              <Route exact path='/managePhoneTypes' component={AdminDash} />
              <Route exact path='/managePhoneReasons' component={AdminDash} />
              <Route exact path='/manageIdSources' component={AdminDash} />
              <Route exact path='/manageJobCategories' component={AdminDash} />
              <Route exact path='/manageJobLeavingReasons' component={AdminDash} />
              <Route exact path='/approvalCodes' component={AdminDash} />
              <Route exact path='/approvaljobs' component={Job} />

            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
