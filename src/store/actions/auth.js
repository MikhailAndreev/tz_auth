import * as actionTypes from "./actionTypes";
import  axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error, isSignup) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    isSignup
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDat2siXtU0aWE8HcZStMvAWq409QiILM0';
    if(!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDat2siXtU0aWE8HcZStMvAWq409QiILM0'
    }
    axios.post(url, authData)
      .then(resp => {
        console.log(resp)
        dispatch(authSuccess(resp.data.idToken, resp.data.localId))
      })
      .catch(err => {
        console.log(err)
        console.log('IS SIGN UP IN ACTION',isSignUp)
        dispatch(authFail(err, isSignUp))
      })
  };
};