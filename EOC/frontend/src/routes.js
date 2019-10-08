import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/forgotPassword"
import IncidentLists from "./components/incident-list.component"
import openIncident from "./components/openIncident";
import CreateResource from "./components/CreateResource";

export default () =>
<BrowserRouter>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/forgotPassword" exact component={ForgotPassword} />
    <Route path="/incidentsList" exact component={IncidentLists} />
    <Route path="/openIncident" exact component={openIncident} />
    <Route path="/CreateResource" exact component={CreateResource} />

  </Switch>
  </BrowserRouter>;