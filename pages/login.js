import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";
import Alert from "../components/Alert";
import { useRouter } from "next/router";

const Login = () => {

    const AuthContext = useContext(authContext);
    const { login, message, authenticated } = AuthContext;

    const router = useRouter();

    useEffect(() => {
      if (authenticated){
          router.push("/");
      }
    }, [authenticated])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid Email")
                .required("The Email is required"),
            password: Yup.string()
                .min(6, "The password must be at least 6 characters long")
                .required("The password is required")
        }),
        onSubmit: (values) => {
            login(values);
        }
    });

  return (
    <Layout>
       <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-4'>Log In</h2>
        
        {message && <Alert />}

        <div className='flex justify-center mt-5'>
            <div className='max-w-lg w-full'>
                <form 
                    className='bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' 
                    onSubmit={formik.handleSubmit}
                >
                    <div className='mb-4'>
                        <label 
                            htmlFor='email'
                            className='block text-black text-sm font-bols mb-2'>
                            Email
                        </label>
                        <input 
                            type='text'
                            className='input-style'
                            id='email' 
                            placeholder='User Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        
                        {formik.touched.email && formik.errors.email ? (
                            <div className='error'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.email}</p>
                            </div>
                        ): null}
                        
                    </div>
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
                            placeholder='Choose your Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        
                        {formik.touched.password && formik.errors.password ? (
                            <div className='error'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.password}</p>
                            </div>
                        ): null}
                        
                    </div>
                    <input
                        type='submit'
                        className='input-button'
                        value="Get Started"
                    />
                </form>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login;
