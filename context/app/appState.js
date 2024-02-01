import { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import axiosClient from "../../config/axios";
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

const AppState = ({ children }) => {
    
    const initialState = {
        msg_file: null,
        name: "",
        origin_name: "",
        loading: null,
        downloads: 1,
        password: "",
        author: null,
        url: ""
    }

    const [state, dispatch] = useReducer(appReducer, initialState);

    const showAlert = msg => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }

    const uploadFile = async (formData, nameFile) => {
        dispatch({
            type: UPLOAD_FILE,

        })

        try {
            const response = await axiosClient.post("/api/files", formData);
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    name: response.data.file,
                    origin_name: nameFile
                }
            })
        } catch (error) {
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.response.data.msg
            })
        }
    };

    const createLink = async() => {
        const data = {
            name: state.name,
            origin_name: state.origin_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const response = await axiosClient.post("/api/links", data);
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: response.data.msg
            });
        } catch (error) {
            console.log(error);
        }
    }

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE,

        })
    }

    const addPassword = password => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        })
    }

    const addDownloads = downloads => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: downloads
        })
    }

  return (
    <appContext.Provider value={{
        name: state.name,
        origin_name: state.origin_name,
        msg_file: state.msg_file,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        author: state.author,
        url: state.url,
        showAlert,
        uploadFile,
        createLink,
        cleanState,
        addPassword,
        addDownloads
    }}>
        {children}
    </appContext.Provider>
  )
}

export default AppState;
