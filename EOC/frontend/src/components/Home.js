import React, { Component } from "react";
import NavBarLogin from "./navBarLogin"

export default class Home extends Component {
  render() {
    return (
      <div >
        <NavBarLogin />
        <div >
          <h1>Emergency Operation Center</h1>
          <p>Welcome to emergency operation center</p>
        </div>
      </div>
    );
  }
}