import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAN_ALERT,
    LOGIN_ERROR,
    LOGIN_SUCCESS
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
        default:
            return state;
    }
};

export default authReducer;