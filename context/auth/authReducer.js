import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAN_ALERT
} from "../../types";

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_ERROR:
        case REGISTER_SUCCESS:
            return {
                ...state,
                message: action.payload
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