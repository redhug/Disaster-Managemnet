import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IncidentLists from "./components/incident-list.component"
import viewIncident from "./components/view-Incident";
import CreateResource from "./components/CreateResource";
import CreateReport from "./components/createReport";
import CreateIncident from "./components/createIncident";
import ViewReports from "./components/viewReports";
import LoadMaps from "./components/maps_component";
import PrivateRoute from "./private-route/PrivateRoute";
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
  </Switch>;