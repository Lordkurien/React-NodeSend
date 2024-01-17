import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
    USER_AUTHENTICATED,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAN_ALERT,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from "../../types";
import axiosClient from "../../config/axios";

const AuthState = ({ children }) => {
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem("token") : "",
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
                    type: CLEAN_ALERT,
                });
            }, 3000);
    }

    const login = async data => {
        try {
            const response = await axiosClient.post("/api/auth", data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.token
            });

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }

        setTimeout(() => {
                dispatch({
                    type: CLEAN_ALERT,
                });
            }, 3000);
    }

    const userAuthenticated = async () => {
        
    }

    return (
        <authContext.Provider value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            registerUser,
            userAuthenticated,
            login
        }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState;