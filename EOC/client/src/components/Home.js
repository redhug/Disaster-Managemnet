import React, { Component } from "react";
import NavBarLogin from "./navBarLogin";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/incidentsList");
    }
    else{
      this.props.history.push("/login");
    }
  }
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
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps
)(Home);