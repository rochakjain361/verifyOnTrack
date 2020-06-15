import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import signUp from './Components/signUp'
import signIn from './Components/signIn'
import LandingPage from './Components/LandingPage'
import Addresses from './Components/DashBoardComponents/Addresses'
import Identities from './Components/DashBoardComponents/Identities'
import Phones from './Components/DashBoardComponents/Phones'
import MyJobProfile from './Components/DashBoardComponents/MyJobProfile'
import Messages from './Components/DashBoardComponents/Messages'
import Dashboard from './Components/DashBoardComponents/Dashboard'
import PreRegistration from './Components/PreRegistration'
import AdminLandingPage from './Components/AdminLandingPage'
import EmployerLandingPage from './Components/EmployerLandingPage'

class App extends React.PureComponent {
  render() {
    return (
      
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={PreRegistration} />
            <Route exact path='/signUp' component={signUp} />
            <Route exact path='/signIn' component={signIn} />
            
            {/* Employee PAGE PATHS */}
            <Route exact path='/Homepage' component={LandingPage} />
            <Route exact path='/addresses' component={LandingPage} />
            <Route exact path='/Identities' component={LandingPage} />
            <Route exact path='/Phones' component={LandingPage} />
            <Route exact path='/MyJobProfile' component={LandingPage} />
            <Route exact path='/messages' component={LandingPage} />
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

          {/* ADMIN PAGE PATHS */}
            <Route exact path='/admin' component={AdminLandingPage} />
            <Route exact path='/managestates' component={AdminLandingPage} />
            <Route exact path='/managelgas' component={AdminLandingPage} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
