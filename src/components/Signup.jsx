import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import signupImg from "../assets/images/signup.gif";
import { getAuth, sendEmailVerification } from "firebase/auth"; // Import from the modular version
import app from "../firebase";



const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { createUser } = UserAuth();
    const navigate = useNavigate();
    const {user} = UserAuth();
    const auth = getAuth(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await createUser(email, password);
            const auth = getAuth();
            sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Email Sent");
                auth.onAuthStateChanged((authUser) => {
                    if (authUser && authUser.emailVerified) {
                      console.log("email is verified");
                      navigate("/account");
                    } else {
                      console.log("email not verified");
                      navigate("/login");
                    }
                  });
            });
            
            
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    return (
        <section className="px-5 xl:px-0 mt-9">
            <div className="max-w-[1170px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    <div className="hidden lg:block bg-blue-500 rounded-l-lg">
                    <figure className="rounded-l-lg">
                    <img src={signupImg} alt="" className="w-full rounded-l-lg" />
                    </figure>
                    </div>

                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h1 className="text-green-800 text-2xl font-bold py-2">Sign Up for free</h1>
                        
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col py-2">
                            <label className = 'text-green-700 py-2 font-medium'>Full Name</label>
                            <input onChange={(e) => setName(e.target.value)} className="border p-3" type="text"  placeholder="Harsh"/> 
                        </div>
                        <div className="flex flex-col py-2">
                            <label className = 'text-green-700 py-2 font-medium'>Email Address </label>
                            <input onChange={(e) => setEmail(e.target.value)} className="border p-3" type="email"  placeholder="xyz123@gmail.com"/>
                            
                        </div>
                        
                        <div className="flex flex-col py-2">
                            <label className = 'text-green-700 py-2 font-medium'>Password (6-digits)</label>
                            <input onChange={(e) => setPassword(e.target.value)} className="border p-3" type="password"  placeholder="******"/>
                        </div>
                        <button className="rounded-md border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">Sign Up</button>
                        <p className="text-green-700 py-2 flex justify-center">Already have an account yet? <Link to='/login' className="text-blue-500 underline"> Sign in.</Link> </p>
                    </form>
                    </div>
                
                </div>
            </div>

        </section>
    )
}

export default Signup;