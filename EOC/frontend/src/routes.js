import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/forgotPassword"
import IncidentLists from "./components/incident-list.component"
import openIncident from "./components/openIncident";
<<<<<<< HEAD
import CreateResource from "./components/CreateResource";

=======
import submitReport from "./components/submitReport";
import CreateIncident from "./components/createIncident";
>>>>>>> bcdd7438335670c072d0496f89d8802b47fdb5ca
export default () =>
<BrowserRouter>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/forgotPassword" exact component={ForgotPassword} />
    <Route path="/incidentsList" exact component={IncidentLists} />
    <Route path="/openIncident" exact component={openIncident} />
<<<<<<< HEAD
    <Route path="/CreateResource" exact component={CreateResource} />

=======
    <Route path="/submitReport" exact component={submitReport} />
    <Route path="/createIncident" exact component={CreateIncident} />
>>>>>>> bcdd7438335670c072d0496f89d8802b47fdb5ca
  </Switch>
  </BrowserRouter>;