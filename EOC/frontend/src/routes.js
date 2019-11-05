import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/forgotPassword"
import IncidentLists from "./components/incident-list.component"
import openIncident from "./components/openIncident";
import CreateResource from "./components/CreateResource";
import CreateReport from "./components/createReport";
import CreateIncident from "./components/createIncident";
import ViewReports from "./components/viewReports";
import PrivateRoute from "./private-route/PrivateRoute";
import Resources from "./components/resources.component";

export default () =>

  <Switch>
    <PrivateRoute exact path="/incidentsList" component={IncidentLists} />
    <PrivateRoute path="/incidentsList" exact component={IncidentLists} />
    <PrivateRoute path="/openIncident" exact component={openIncident} />
    <PrivateRoute path="/CreateResource" exact component={CreateResource} />
    <PrivateRoute path="/createReport" exact component={CreateReport} />
    <PrivateRoute path="/createIncident" exact component={CreateIncident} />
    <PrivateRoute path="/viewReports" exact component={ViewReports} />
    <PrivateRoute path="/resources" exact component={Resources} />
  </Switch>;