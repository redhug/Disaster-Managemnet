import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { store } from 'react-notifications-component';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/register", userData)
    .then(res => {
      history.push("/login");
      store.addNotification({
        title: "Sign up request sent",
        message: "Sign up request has been sent to Admin. You will recieve mail once it is approved.",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        width: 300,
        dismiss: {
            duration: 5000,
            onScreen: true
        }
    });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios.post("/api/auth/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token,isAdmin } = res.data;
      localStorage.setItem("jwtToken", token);  
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin)); 
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded,isAdmin));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded,isAdmin) => {
  return {
    type: SET_CURRENT_USER,
    isAdmin: isAdmin,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("isAdmin");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};