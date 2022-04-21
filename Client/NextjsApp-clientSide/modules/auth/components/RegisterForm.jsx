import React from 'react';
import { SignUpSchema } from '../utils';
import { useFormik} from 'formik';
import Link from 'next/link';
import CustomButtonLoad from '../../common/components/CustomButtonLoad';

const RegisterForm = (props) =>{

    const formik = useFormik({
        initialValues: {
          name:'',
          password:'',
          email: '',
          confirmPassword : ''
        },
        validationSchema : SignUpSchema,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
    });
    
    const registerClick = () => {
        if(!formik.errors.email && !formik.errors.password && formik.values.email !== "" &&
           !formik.errors.confirmPassword &&
           !formik.errors.name
        ) {
            props.onRegister(formik.values.email,formik.values.password,formik.values.confirmPassword,formik.values.name)
        } else return false
    }

    return (
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{width : 400}} 
                  onSubmit={formik.handleSubmit}
                  >
                <p className="mb-8 text-2xl font-light text-center text-black">
                    Create new account
                </p>
                <div className="mb-4">

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                           id="email"
                           name="email" 
                           type="text" 
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           onBlur={formik.onBlur}
                           placeholder="Email"
                    />
                    {
                        formik.errors.email && formik.touched ? (<p className="text-red-500 text-xs italic">{formik.errors.email}</p>)  : null
                    }
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Name
                    </label>
                    <input className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                           id="name"
                           name="name" 
                           type="text" 
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           onBlur={formik.onBlur}
                           placeholder="Your name"
                    />
                    {
                        formik.errors.name && formik.touched ? (<p className="text-red-500 text-xs italic">{formik.errors.name}</p>)  : null
                    }
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                           id="password" 
                           name="password"
                           type="password" 
                           placeholder="password"
                           value={formik.values.password}
                           onBlur={formik.onBlur}
                           onChange={formik.handleChange} 
                           />
                    {
                        formik.touched && formik.errors.password ? (<p className="text-red-500 text-xs italic">{formik.errors.password}</p>)  : null
                    }
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                       Confirm Password
                    </label>
                    <input className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                           id="confirmPassword" 
                           name="confirmPassword"
                           type="password" 
                           placeholder="Confirm password"
                           value={formik.values.confirmPassword}
                           onBlur={formik.onBlur}
                           onChange={formik.handleChange} 
                           />
                    {
                        formik.touched && formik.errors.confirmPassword ? (<p className="text-red-500 text-xs italic">{formik.errors.confirmPassword}</p>)  : null
                    }
                </div>
                <div className="flex items-center justify-between">
                    {
                        props.loading ? <CustomButtonLoad /> : 
                        <button 
                        onClick={registerClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign Up
                        </button>
                    }
                    <Link href="/Login">
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        if you have account,login {"->"}
                    </a>
                    </Link>
                </div>
            </form>
    )
}

export default React.memo(RegisterForm)