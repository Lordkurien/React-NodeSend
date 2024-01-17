import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAN_ALERT
} from "../../types";
import axiosClient from "../../config/axios";

const AuthState = ({ children }) => {
    const initialState = {
        token: "",
        authenticated: null,
        user: null,
        message: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registerUser = async data => {
        
        try {
            const response = await axiosClient.post("/api/users", data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data.msg
            });
        } catch (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.msg
            });
        }

        setTimeout(() => {
                dispatch({
                    type: "CLEAN_ALERT",
                });
            }, 3000);
    }

    const userAuthenticated = name => {
        dispatch({
            type: USER_AUTHENTICATED,
            payload: name
        })
    }

    return (
        <authContext.Provider value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            registerUser,
            userAuthenticated
        }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState;