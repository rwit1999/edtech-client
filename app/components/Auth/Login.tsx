import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react'; 

type Props = {
    setRoute: (route: string) => void;
    setOpen:(open:boolean)=>void
};

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password")
});

const Login: FC<Props> = ({ setRoute,setOpen }) => {
    const [show, setShow] = useState(false); // to hide or show password
    const [login,{isSuccess,error}]=useLoginMutation()

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({email,password})
        }
    });

    useEffect(()=>{
        if(isSuccess){
            toast.success("Logged in successfully")
            setOpen(false) // close popup
        }
        if(error){
            if("data" in error){
                const errorData=error as any
                toast.error(errorData.data.message)
            }
        }
    },[isSuccess,error])

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            id="email"
                            placeholder='loginmail@gmail.com'
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                        {errors.email && touched.email && (
                            <span className="text-red-500 text-sm">{errors.email}</span>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Enter your password
                        </label>
                        <input
                            type={!show ? "password" : "text"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            id="password"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                        {!show ? (
                            <AiOutlineEyeInvisible
                                onClick={() => setShow(true)}
                                className="absolute top-10 right-3 text-gray-500 cursor-pointer dark:text-gray-300"
                            />
                        ) : (
                            <AiOutlineEye
                                onClick={() => setShow(false)}
                                className="absolute top-10 right-3 text-gray-500 cursor-pointer dark:text-gray-300"
                            />
                        )}
                        {errors.password && touched.password && (
                            <span className="text-red-500 text-sm">{errors.password}</span>
                        )}
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Login"
                            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                    </div>
                    <br />
                    <div className="text-center">
                        <h5 className="text-gray-700 dark:text-gray-300">Or join with</h5>
                        <div className="flex justify-center space-x-4 mt-2">
                            <FcGoogle size={30} className="cursor-pointer"  onClick={()=>signIn("google")}/>
                            <AiFillGithub size={30} className="cursor-pointer" />
                        </div>
                    </div>
                    <br />
                    <h5 className="text-center text-gray-700 dark:text-gray-300">
                        Not have an account?{" "}
                        <span onClick={() => setRoute("SignUp")} className="text-blue-500 cursor-pointer hover:underline">
                            Sign Up
                        </span>
                    </h5>
                </form>
            </div>
        </div>
    );
};

export default Login;
