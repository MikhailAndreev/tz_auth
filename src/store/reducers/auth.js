import * as actionsTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  errorAuth: null,
  errorLogin: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, {errorAuth: null, errorLogin: null, loading: true});
};

const authSuccess = (state, action, isSignUp) => {

  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    errVar: null,
    loading: false
  });
};

const authFail = (state, action) => {
  let errorAuth = action.isSignup ? action.error.response.data.error : '';
  let errorLogin = action.isSignup ? '' : action.error.response.data.error;
  return updateObject(state, {
    error: action.error.response.data.error,
    errorAuth: errorAuth,
    errorLogin: errorLogin,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {token: null, userId: null, errorAuth: null, errorLogin: null,});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_START: return authStart(state, action);
    case actionsTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionsTypes.AUTH_FAIL: return authFail(state, action);
    case actionsTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;