import { useEffect, useContext } from "react";
import Layout from "../components/Layout";
import Alert from "../components/Alert";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import Dropzone from "../components/Dropzone";
import Link from "next/link";

const Index = () => {

  const AuthContext = useContext(authContext);
  const { userAuthenticated } = AuthContext;

  const AppContext = useContext(appContext);
  const { msg_file, url } = AppContext;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      userAuthenticated();
    }
  }, [])

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      {url ? (
        <>
          <p className="text-center text-2xl mt-10">
            <span className="font-bold text-red-700 text-3xl uppercase">Your URL: </span>
            {`${process.env.frontendURL}/links/${url}`}
          </p>
            <button
              type='button'
              className='input-button mt-10'
              onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
            >
              Share Link
           </button>
        </>
      ) : (
        <>
        {msg_file && <Alert />}

        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <Dropzone />
          
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
              Share files easily and privately
            </h2>
            <p className="text-lg leading-loose">
              <span className="text-red-500 font-bold">ReactNodeSend</span> 
              {" "}
              It&#39;s a cloud storage service that allows user to store and share files. 
            </p>
            
            <Link href="/createAccount" legacyBehavior>
              <a className="text-red-500 font-bold text-lg hover:text-red-700 ">
                Create an Account Now!
              </a>
            </Link>
            
            </div>
        </div>
        </>
      )}
      </div>
    </Layout>
  )
}

export default Index;
