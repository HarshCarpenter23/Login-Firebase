import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getAuth, sendEmailVerification } from "firebase/auth";
import app from "../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleButton from "react-google-button";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { signIn } = UserAuth();
    

    const auth = getAuth(app);

   
    const resendVerificationEmail = async () => {
        
        try {
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser);
                console.log("Email verification sent.");
                // Display a success message to the user
                toast.success("Verification email sent. Please check your inbox.");
              } else {
                console.log("User not signed in.");
              }
        } catch (error) {
            if (error.code === "auth/too-many-requests") {
              // Handle the rate limit error
              console.error("Rate limit exceeded. Please wait and try again later.");
              toast.error("Rate limit exceeded. Please wait and try again later.");
            } else {
              // Handle other authentication errors
              console.error("Error sending verification email:", error);
              toast.error("Error sending verification email. Please try again later.");
            }
        }
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            const auth = getAuth(); // Get the authentication instance
            await signIn(email, password); // Pass auth as the first argument

            auth.onAuthStateChanged((authUser) => {
                if (authUser && authUser.emailVerified) {
                  console.log("email is verified");
                  navigate("/account");
                } else {
                  toast.error("Please verify your email.");
                  navigate("/login");
                }
              });


                        
        } catch (e) {
            setError(e.message)
            toast.error(e.message)
        }
    }

        const { googleSignIn } = UserAuth();
        const handleGoogleSignIn = async () => {
            try {
                await googleSignIn();
                const auth = getAuth(); 
                auth.onAuthStateChanged((authUser) => {
                    if (authUser && authUser.emailVerified) {
                    console.log("email is verified");
                    navigate("/account"); 
                    } else {
                    navigate("/login");
                    }
                });

            } catch (err) {
                console.log(err);
            }
        }


    return (
        <section className="px-5 lg:px-0 mt-[40px]">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 bg-white">
                <div className="flex justify-center">
                    <h1>Hello! <span className="text-blue-700">Welcome</span> Back</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col py-2">
                        <label className = 'text-green-700 py-2 font-medium'>Email Address  </label>
                        <input onChange={(e) => setEmail(e.target.value)} className="border p-3" type="email"  placeholder="xyz123@gmail.com"/>
                    </div>
                    <div className="flex flex-col py-2">
                        <label className = 'text-green-700 py-2 font-medium'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className="border p-3" type="password"  placeholder="******"/>
                    </div>
                    <button className="border rounded-md border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">Sign In</button>
                    
                    <p className="py-2 flex justify-center">First time user? <Link to='/signup' className="underline text-blue-500">Sign up.</Link> </p> 
                </form>

                <div className="flex justify-center"><button className="text-white bg-green-500 rounded-xl p-2 text-xs" onClick={resendVerificationEmail}>Resend Verification Email</button></div>

                <div className="flex justify-center mt-3">
                    <div>
                        <h4 className="text-center mb-3">OR</h4>
                        <GoogleButton onClick={handleGoogleSignIn}/>
                    </div>
                </div>
                
        </div>
        </section>
    )
}

export default Signin;