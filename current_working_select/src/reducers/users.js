import { CREATE_USER, LOGIN_USER, SET_USER_DETAILS } from "../actions/actionTypes";
export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, ...action.payload };
    case LOGIN_USER:
      return { ...state, loginDetails: action.payload };
    case SET_USER_DETAILS:
      return { ...state, userDetails: action.payload.data };
    default:
      return state;
  }
}
