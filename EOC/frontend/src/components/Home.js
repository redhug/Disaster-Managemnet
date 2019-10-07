import React, { Component } from "react";
import NavBarLogin from "./navBarLogin"

export default class Home extends Component {
  render() {
    return (
      <div >
        <NavBarLogin />
        <div >
          <h1>Scratch</h1>
          <p>A simple note taking app</p>
        </div>
      </div>
    );
  }
}