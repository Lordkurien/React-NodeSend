import {
    USER_AUTHENTICATED,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAN_ALERT,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOG_OUT
} from "../../types";

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
        case REGISTER_ERROR:
        case REGISTER_SUCCESS:
            return {
                ...state,
                message: action.payload
            }
        case LOGIN_SUCCESS: 
            localStorage.setItem("token", action.payload)
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case CLEAN_ALERT:
            return {
                ...state,
                message: null
            }
        case USER_AUTHENTICATED:
            return {
                ...state,
                user: action.payload
            }
        case LOG_OUT:
            localStorage.removeItem("token");
            return {
                ...state,
                user: null,
                token: null,
                authenticated: null
            }
        default:
            return state;
    }
};

export default authReducer;