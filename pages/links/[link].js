import { useState, useContext } from 'react';
import Layout from "../../components/Layout";
import axiosClient from "../../config/axios";
import appContext from "../../context/app/appContext";
import Alert from "../../components/Alert";

export async function getServerSideProps({ params }) {
    const { link } = params;

    const response = await axiosClient(`http://127.0.0.1:4000/api/links/${link}`);

    return {
        props: {
            link: response.data
        }
    }
}

export async function getServerSidePaths() {
    const links = await axiosClient("http://127.0.0.1:4000/api/links");

    return {
        paths: links.data.links.map( link => ({
            params: {link: link.url}
        })),
        fallback: false
    }
}

export default ({ link }) => {
  const AppContext = useContext(appContext);
  const { showAlert, msg_file } = AppContext;

  const [getPassword, setGetPassword] = useState(link.password);
  const [password, setPassword] = useState("");

  const validatePassword = async e => {
    e.preventDefault();

    const data = {
      password
    }
    
    try {
      const response = await axiosClient.post(`/api/links/${link.link}`, data);
      setGetPassword(response.data.password);

    } catch (error) {
      showAlert(error.response.data.msg);
    }
  }

  return (
    <Layout>
      {
        getPassword ? (
          <>
          <p className="text-center">This Link is Password Protected</p>
          
          {msg_file && <Alert />}
          
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form 
                className='bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' 
                onSubmit={e => validatePassword(e)}
              >
              <div className='mb-4'>
                <label 
                  htmlFor='password'
                  className='block text-black text-sm font-bols mb-2'>
                  Password
                </label>
                <input 
                  type='password'
                  className='input-style'
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div> 
              
              <input
                type='submit'
                className='input-button'
                value="Enter your Password"
              />
              
              </form>
            </div>
          </div>
          </>
        ): (
          <>
            <h1 className="text-4xl text-center text-gray-700">Download your file: </h1>
            <div className="flex items-center justify-center mt-10">
              <a href={`${process.env.backendURL}/api/files/${link.file}`} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </a>
            </div>
          </>
        )
      }
    </Layout>
  )
}

