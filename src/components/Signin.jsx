import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getAuth} from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const {signIn, googleSignIn} = UserAuth();

    
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
  
        } catch (err) {
            console.log(err)
        }
    }
    // useEffect(() => {
    //     if(user != null) {
    //         navigate('/account')
    //     }
    // }, []);

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
                  toast.success("Please verify your email.");
                  navigate("/login");
                }
              });


                        
        } catch (e) {
            setError(e.message)
            toast.success(e.message)
        }
    }



    return (
        <section className="px-5 lg:px-0 mt-[80px]">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 bg-white">
                <div className="flex justify-center">
                    <h1>Hello! <span className="text-blue-700">Welcome</span> Back</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col py-2">
                        <label className = 'text-green-700 py-2 font-medium'>Email Address</label>
                        <input onChange={(e) => setEmail(e.target.value)} className="border p-3" type="email"  placeholder="xyz123@gmail.com"/>
                    </div>
                    <div className="flex flex-col py-2">
                        <label className = 'text-green-700 py-2 font-medium'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className="border p-3" type="password"  placeholder="******"/>
                    </div>
                    <button className="border rounded-md border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">Sign In</button>
                    <p className="py-2 flex justify-center">First time user? <Link to='/signup' className="underline text-blue-500">Sign up.</Link> </p> 
                </form>


                
        </div>
        </section>
    )
}

export default Signin;