import { LOGIN, LOGOUT } from '../actions/ActionTypes';

const INITIAL_STATE = {
    isAuthenticated: false,
    userName: ''
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isAuthenticated: true, userName: action.payload };
        case LOGOUT:
            return { ...state, isAuthenticated: false };
        default: return state;
    }
}

export default authReducer;