import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Account = () => {
    const {user, logout} = UserAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
            console.log('You are logged out')
        } catch (e) {
            console.log(e.message)
        }    
    }

    return (
        <section className=" justify-center align-items-center border border-blue-400 m-[100px] border-4 rounded-md">
            <div className="max-w-[600px] mx-auto my-16 p-4">
            <h1 className="text-rose-600 flex justify-center text-2xl font-bold py-4">User Email: {user && user.email}</h1>
            
            <button onClick={handleLogout} className = 'rounded bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>Logout</button>
            </div>
        </section>
    )
}

export default Account;