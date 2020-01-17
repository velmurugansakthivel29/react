import { HTTP } from "./apiConfig.js";
import { CREATE_USER, LOGIN_USER, SET_USER_DETAILS } from "./actionTypes";
export const addUser = user => ({
  type: CREATE_USER,
  payload: {
    user
  }
});
export const loginUser = ({ user_name, password }) => {
  return dispatch => {
    HTTP.post("/retailer/login", {
      user_name,
      password
    })
      .then(res => {
        dispatch(loginSuccess(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};
export const loginSuccess = data => {
  return {
    type: LOGIN_USER,
    payload: {
      token: data.token
    }
  };
};

export const setUserDetails = data => ({
  type: SET_USER_DETAILS,
  payload: {
    data
  }
});

export default {
  addUser,
  loginUser,
  setUserDetails
};
