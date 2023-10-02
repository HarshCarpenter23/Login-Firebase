import React from "react";
import "./App.css";
import Login from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import ForgotPassword from "./components/ForgotPassword";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
   <div>
    <h1 className="text-green-900 mt-6 text-center text-3xl font-bold">
      Firebase Autherization
    </h1>
    <AuthContextProvider>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/account' element={<ProtectedRoute>
        <Account />
        </ProtectedRoute>} />
      <Route path="/reset" element={<ForgotPassword />}/>
    </Routes>
    </AuthContextProvider>
   </div>
  );
}

export default App;
