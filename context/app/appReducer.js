import {
    SHOW_ALERT,
    HIDE_ALERT,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR,
    UPLOAD_FILE,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SHOW_ALERT: 
            return {
                ...state,
                msg_file: action.payload
            }
        case HIDE_ALERT: 
            return {
                ...state,
                msg_file: null
            }
        case UPLOAD_FILE:
            return {
                ...state,
                loading: true
            }
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                origin_name: action.payload.origin_name,
                loading: null
            }
        case UPLOAD_FILE_ERROR:
            return {
                ...state,
                msg_file: action.payload,
                loading: null
            }
        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                url: action.payload
            }
        case CLEAN_STATE: 
            return {
                ...state,
                msg_file: null,
                name: "",
                origin_name: "",
                loading: null,
                downloads: 1,
                password: "",
                author: null,
                url: ""
            }
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
            }
        default:
            return state;
    }
}