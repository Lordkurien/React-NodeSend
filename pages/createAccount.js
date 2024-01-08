import React from 'react';
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateAccount = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("The name is required"),
            email: Yup.string()
                .email("Invalid Email")
                .required("The Email is required"),
            password: Yup.string()
                .min(6, "The password must be at least 6 characters long")
                .required("The password is required")
        }),
        onSubmit: () => {
            console.log("Formulario enviado...");
        }
    });

  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-4'>Join Us!</h2>
        
        <div className='flex justify-center mt-5'>
            <div className='max-w-lg w-full'>
                <form 
                    className='bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' 
                    onSubmit={formik.handleSubmit}
                >
                    <div className='mb-4'>
                        <label 
                            htmlFor='name'
                            className='block text-black text-sm font-bols mb-2'>
                            Name
                        </label>
                        <input 
                            type='text'
                            className='input-style'
                            id='name' 
                            placeholder='User Name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        
                        {formik.touched.name && formik.errors.name ? (
                            <div className='error'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.name}</p>
                            </div>
                        ): null}
                        
                    </div>
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
                            type='text'
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
                        value="create an account"
                    />
                </form>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateAccount;
