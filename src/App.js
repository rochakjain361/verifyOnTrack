import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import signUp from "./Components/signUp";
import signIn from "./Components/signIn";
import LandingPage from "./Components/LandingPage";
import Addresses from "./Components/DashBoardComponents/Addresses";
import Identities from "./Components/DashBoardComponents/Identities";
import Phones from "./Components/DashBoardComponents/Phones";
import MyJobProfile from "./Components/DashBoardComponents/MyJobProfile";
import Dashboard from "./Components/DashBoardComponents/Dashboard";
import PreRegistration from "./Components/PreRegistration";
import AdminLandingPage from "./Components/AdminLandingPage";
import EmployerLandingPage from "./Components/EmployerLandingPage";
import AdminRegistration from "./Components/AdminRegistration";
import theme from "./theme";
import dash from "./dash";
import Stepper from "./Components/WorkFlow/Stepper";
import ApprovalCodes from "./Components/AdminPageComponents/ManageCodes/ApprovalCodes";
import Job from "./Components/AdminPageComponents/ManageCodes/Pages/Job";
import AdminDash from "./AdminDash";
import EmployerDash from "./EmployerDash";
import EmloymentTabs from "./Components/EmployerPageComponents/MyCodes/EmployementCodes/EmploymentTabs";
import Academics from "./Components/DashBoardComponents/Academics";
import { CustomizedSnackbars } from "./Snackbarpage";
import { SnackbarProvider } from "notistack";
import SuccessSnackbar from "./sucesssnackbar";
import { createStore } from "redux";
import reducer from "./Reducer/reducer";
import forgotpassword from "./forgotpassword";
import resetpassword from "./resetpassword";
// const store = createStore(reducer);
import Profile from "./Components/AdminPageComponents/ManageCodes/EmployerPages/Profile";
import EmployerStepper from "./Components/Employerworkflow/EmployerStepper";
import Createwallet from '../src/Components/DashBoardComponents/Wallet/Createwallet'
class App extends React.PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <SuccessSnackbar />
          <Router>
            <div>
              <Switch>
                {/* Registration Paths */}
                <Route exact path="/" component={signIn} />
                <Route
                  exact
                  path="/forgotpassword"
                  component={forgotpassword}
                />
                <Route
                  exact
                  path="/reset_forgot_pswd"
                  component={resetpassword}
                />
                <Route
                  exact
                  path="/adminRegistration"
                  component={AdminRegistration}
                />
                <Route exact path="/signUp" component={signUp} />
                <Route exact path="/signIn" component={signIn} />
                <Route exact path="/dash" component={dash} />
                <Route exact path="/workflow" component={Stepper} />
                <Route
                  exact
                  path="/employerworkflow"
                  component={EmployerStepper}
                />

                {/* Employee PAGE PATHS */}
                <Route exact path="/Homepage" component={dash} />
                <Route exact path="/myInfo" component={dash} />
                <Route exact path="/addresses" component={dash} />
                <Route exact path="/Identities" component={dash} />
                <Route exact path="/Phones" component={dash} />
                <Route exact path="/MyJobProfile" component={dash} />
                <Route exact path="/employeeInbox" component={dash} />
                <Route exact path="/employeeOutbox" component={dash} />
                <Route exact path="/profiles" component={dash} />
                <Route exact path="/dashboard" component={dash} />
                <Route exact path="/employeeAccessCodes" component={dash} />
                <Route exact path="/employeeAccessCodes" component={dash} />
                <Route exact path="/Createwallet" component={dash} />

                <Route
                  exact
                  path="/employeeEmployementCodes"
                  component={dash}
                />
                <Route exact path="/employee/academics" component={dash} />

                {/* Employer Page Paths */}
                {/* <Route exact path='/employerLanding' component={EmployerDash} /> */}
                <Route exact path="/employer" component={EmployerDash} />
                <Route
                  exact
                  path="/employerDashboard"
                  component={EmployerDash}
                />
                <Route
                  exact
                  path="/employerMessages"
                  component={EmployerDash}
                />
                <Route
                  exact
                  path="/employerEmployees"
                  component={EmployerDash}
                />
                <Route
                  exact
                  path="/employerAccessCodes"
                  component={EmployerDash}
                />
                <Route
                  exact
                  path="/employerEmployementCodes"
                  component={EmployerDash}
                />
                <Route exact path="/employerInbox" component={EmployerDash} />
                <Route exact path="/employerOutbox" component={EmployerDash} />
                <Route
                  exact
                  path="/employerEmployment"
                  component={EmployerDash}
                />

              {/* ADMIN PAGE PATHS */}
              {/* <Route exact path='/adminLanding' component={AdminDash} /> */}
              <Route exact path='/academicSettings' component={AdminDash} />
              <Route exact path='/ratingsSettings' component={AdminDash} />
              <Route exact path='/addressSettings' component={AdminDash} />
              <Route exact path='/phoneSettings' component={AdminDash} />
              <Route exact path='/jobSettings' component={AdminDash} />
              <Route exact path='/adminCodes' component={AdminDash} />
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
              <Route exact path='/adminRejectReasons' component={AdminDash} />
              <Route exact path='/adminSecurityQuestions' component={AdminDash} />
              <Route exact path='/adminManageIndustries' component={AdminDash} />
              <Route exact path='/adminManageOffboardTypes' component={AdminDash} />
              <Route exact path='/approvaljobs' component={Job} />
              <Route exact path='/employerProfile' component={Profile} />
                {/* ADMIN PAGE PATHS */}
                {/* <Route exact path='/adminLanding' component={AdminDash} /> */}
                <Route exact path="/admin" component={AdminDash} />
                <Route exact path="/managestates" component={AdminDash} />
                <Route exact path="/manageLGAs" component={AdminDash} />
                <Route exact path="/manageCities" component={AdminDash} />
                <Route exact path="/adminAccessCodes" component={AdminDash} />
                <Route exact path="/addAdmin" component={AdminDash} />
                <Route
                  exact
                  path="/employeeratingquestions"
                  component={AdminDash}
                />
                <Route
                  exact
                  path="/employeechoicequestions"
                  component={AdminDash}
                />
                <Route
                  exact
                  path="/employerchoicequestions"
                  component={AdminDash}
                />
                <Route
                  exact
                  path="/employerratingquestions"
                  component={AdminDash}
                />
                <Route
                  exact
                  path="/adminEvaluationCodes"
                  component={AdminDash}
                />

                <Route
                  exact
                  path="/manageAddressReasons"
                  component={AdminDash}
                />
                <Route exact path="/manageAddressTypes" component={AdminDash} />
                <Route exact path="/managePhoneTypes" component={AdminDash} />
                <Route exact path="/managePhoneReasons" component={AdminDash} />
                <Route exact path="/manageIdSources" component={AdminDash} />
                <Route
                  exact
                  path="/manageJobCategories"
                  component={AdminDash}
                />
                <Route
                  exact
                  path="/manageJobLeavingReasons"
                  component={AdminDash}
                />
                <Route exact path="/approvalCodes" component={AdminDash} />
                <Route exact path="/approvaljobs" component={Job} />
                <Route exact path="/employerProfile" component={Profile} />
              </Switch>
            </div>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    );
  }
}

export default App;
