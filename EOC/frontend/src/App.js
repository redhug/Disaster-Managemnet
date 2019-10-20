import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Routes from "./routes";
import "./static/css/App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/forgotPassword"
import Home from "./components/Home";
import PrivateRoute from "./private-route/PrivateRoute";
import IncidentLists from "./components/incident-list.component"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
  return (
    <Provider store={store}>
    <div>
    <Router >
        <Route path="/" exact component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Routes/>
    </Router>  
  </div>
  </Provider>
  );
}
}
export default App;
