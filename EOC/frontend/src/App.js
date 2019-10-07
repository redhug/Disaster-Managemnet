import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Routes from "./routes";
import "./static/css/App.css";


function App() {
  return (
    <div>
    <Routes />   
  </div>
  );
}

export default App;
