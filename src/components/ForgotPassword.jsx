import React from "react";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emlVal = e.target.email.value;
        sendPasswordResetEmail(auth, emlVal).then(data => {
            toast.success("Password reset mail sent");
            navigate('/login');
        }).catch(err=>{
            toast.error(err.code)
        })

    }

    return (
        <div className="mt-9 w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 bg-white">
            
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col py-2">
                <label className='text-center text-green-700 py-2 font-medium text-xl'>Forgot Password</label>
                <input name="email" className="border p-3" type="email"  placeholder="xyz123@gmail.com"/>
            </div>
                <button className="border rounded-md border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">Reset</button>         
            </form>
        </div>
    )
}


export default ForgotPassword;