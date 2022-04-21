import React from 'react';
import { useFormik} from 'formik';
import { SignInSchema } from '../utils';
import { useSelector,useDispatch } from 'react-redux';
import backgroundLogo from '../../../images/background.jpg'
import Image from 'next/image'
import CustomButtonLoad from '../../common/components/CustomButtonLoad';

const SignInForm = (props) =>{

    const LoginClick = ()=>{
        if(!formik.errors.email && !formik.errors.password && formik.values.email !== "") {
        props.onLogin(formik.values.email,formik.values.password)
        } else 
        return false;
    }
    
    const formik = useFormik({
        initialValues: {
          password:'',
          email: '',
        },
        validationSchema : SignInSchema,
        onSubmit: values => {
        },
    });

    return (       
     
                        <form 
                              onSubmit={formik.handleSubmit}
                              className="max-w-sm p-10 m-auto bg-white bg-opacity-25 rounded shadow-xl">
                            <p className="mb-8 text-2xl font-light text-center text-black">
                                Login
                            </p>
                            <div className="mb-2">
                                <div className=" relative ">
                                    <input 
                                          value = {formik.values.email}
                                          onBlur={formik.handleBlur}
                                          onChange={formik.handleChange}
                                          name="email"
                                          type="text" id="login-with-bg-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email"/>
                                          {
                                              formik.errors.email && formik.touched ? (<p className="text-red-500 text-xs italic">{formik.errors.email}</p>)  : null
                                          }
                                    </div>
                            </div>
                            <div className="mb-2">
                                    <div className=" relative ">
                                        <input 
                                             value = {formik.values.password}
                                             onBlur ={formik.handleBlur}
                                             onChange = {formik.handleChange}
                                             name="password"
                                             type="password" id="login-with-bg-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="password"/>
                                        {
                                         formik.touched && formik.errors.password ? (<p className="text-red-500 text-xs italic">{formik.errors.password}</p>)  : null
                                        }
                                    </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                    {
                                        props.loading ? <CustomButtonLoad /> :
                                        <button 
                                    onClick={(e) =>{
                                        LoginClick()
                                    }}
                                    type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Login
                                    </button>
                                    }
                            </div>
                            <div className="text-center">
                                    <a href="/Register" className="right-0 inline-block text-sm font-light align-baseline text-500 hover:text-gray-800">
                                            Create an account
                                    </a>
                            </div>
                        </form>
         

    )
}

export default React.memo(SignInForm);