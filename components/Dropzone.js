import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import axiosClient from "../config/axios";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import Form from "./Form";

const Dropzone = () => {
    const AppContext = useContext(appContext);
    const { showAlert, uploadFile, loading, createLink } = AppContext;

    const AuthContext = useContext(authContext);
    const { user, authenticated } = AuthContext;

    const onDropRejected = () => {
        showAlert("The free limit is 1 MB");
    }

    const onDropAccepted = useCallback(async acceptedFiles => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        uploadFile(formData, acceptedFiles[0].path);
    }, []); 

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });
    
    const files = acceptedFiles.map(file => (
        <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{file.path}</p>
            <p className="text-sm text-gray-500">{(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ));

  return (
    <>
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            
            {acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Files</h4>
                    <ul>
                        {files}
                    </ul>
                    
                    {authenticated ? <Form /> : ""}
                      
                    {loading ? (
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>  
                    ) 
                    : (
                        <button
                        type="button"
                        className="button-link"
                        onClick={() => createLink()}
                    >
                        Create Link
                    </button>
                    )}
                    
                   
                </div>
                
            ) : (
                <div {...getRootProps({ className: "dropzone w-full py-32"})} >
                <input {...getInputProps()} className="h-100" />
                {
                    isDragActive ? 
                    <p className="text-2xl text-center text-gray-600">
                        Drag and Drop files here   
                    </p> :
                    <div className="text-center">                
                        <p className="text-2xl text-center text-gray-600 uppercase font-bold">
                            try it out!
                        </p>
                        <button
                            type="button"
                            className="button-link"
                        >
                            Select a file
                        </button>
                    </div>
                }
            </div>
            )} 
        </div>
    </>
  )
}

export default Dropzone
