import { useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Header = () => {
  const router = useRouter();

  const AuthContext = useContext(authContext);
  const { userAuthenticated, user, logOut } = AuthContext;

  const AppContext = useContext(appContext);
  const { cleanState } = AppContext;

  const redirect = () => {
    router.push("/");
    cleanState();
  };

  useEffect(() => {
    userAuthenticated();
  }, [])

  return (
    <header className='py-8 flex flex-col md:flex-row items center justify-between'>
          <Image 
            onClick={() => redirect()}
            className='w-64 mb-8 md:mb-0 cursor-pointer' 
            src='/logo.svg' 
            alt="logo image" 
            width={300}
            height={100}
            />

       <div className='flex gap-2'>
        {
          user ? (
            <div className='flex items-center'>
              <p className='mr-2'>Welcome {user.name} </p>
              <button 
                onClick={() => logOut()}
                type='button' 
                className='button-signup'
              >
                Log Out  
              </button>
            </div>
          ): (
              <>
                <Link href="/login" legacyBehavior>
                  <a className='button-login'>
                    Log In
                  </a>
                </Link>
                <Link href="/createAccount" legacyBehavior>
                  <a className='button-signup'>
                    Sign Up
                  </a>
                </Link>
              </>
          )
        }         
       </div>
    </header>
  )
}

export default Header;
