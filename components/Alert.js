import { useContext } from "react";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";

const Alert = () => {
    const AuthContext = useContext(authContext);
    const { message } = AuthContext;

    const AppContext = useContext(appContext);
    const { msg_file } = AppContext;

  return (
    <div className="alert">
      { message || msg_file }
    </div>
  )
}

export default Alert
