import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { USER_AUTHENTICATED } from "../../types";
import axiosClient from "../../config/axios";

const AuthState = ({ children }) => {
    const initialState = {
        token: "",
        authenticated: null,
        user: null,
        message: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registerUser = data => {
        console.log(data)
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