import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";

const Index = () => {

  const AuthContext = useContext(authContext);
  const { userAuthenticated } = AuthContext;

  useEffect(() => {
    userAuthenticated();
  }, [])

  return (
    <Layout>
      
    </Layout>
  )
}

export default Index;
