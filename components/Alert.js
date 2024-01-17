import { useContext } from "react";
import authContext from "../context/auth/authContext";

const Alert = () => {
    const AuthContext = useContext(authContext);
    const { message } = AuthContext;

  return (
    <div className="alert">
      {message}
    </div>
  )
}

export default Alert
