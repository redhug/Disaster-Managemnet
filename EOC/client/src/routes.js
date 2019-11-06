import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IncidentLists from "./components/incident-list.component"
import viewIncident from "./components/view-Incident";
import CreateResource from "./components/CreateResource";
import CreateReport from "./components/createReport";
import CreateIncident from "./components/createIncident";
import ViewReports from "./components/viewReports";
import ViewReport from "./components/viewReport";
import LoadMaps from "./components/maps_component";
import PendingRequests from "./components/requests";
import NewUserDetails from "./components/newUserDetails";
import PrivateRoute from "./private-route/PrivateRoute";
import Resources from "./components/resources.component";
export default () =>

  <Switch>
    <PrivateRoute exact path="/incidentsList" component={IncidentLists} />
    <PrivateRoute exact path="/loadMaps" component={LoadMaps} />
    <PrivateRoute path="/incidentsList" exact component={IncidentLists} />
    <PrivateRoute path="/viewIncident" exact component={viewIncident} />
    <PrivateRoute path="/CreateResource" exact component={CreateResource} />
    <PrivateRoute path="/createReport" exact component={CreateReport} />
    <PrivateRoute path="/createIncident" exact component={CreateIncident} />
    <PrivateRoute path="/viewReports" exact component={ViewReports} />
    <PrivateRoute path="/viewReport" exact component={ViewReport} />
    <PrivateRoute path="/pendingRequests" exact component={PendingRequests} />
    <PrivateRoute path="/newUserDetails" exact component={NewUserDetails} />
    <PrivateRoute path="/resources" exact component={Resources} />
  </Switch>;