import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const Signup = () => {

  const navigate = useNavigate();

  const [signUpInfo,setsignupInfo] = useState({
    name:'',
    email:'',
    password:''
  });

  const handleSignup = async(e) => {
    e.preventDefault();
    const {name,email,password} = signUpInfo;

    if(!name || !email || !password){
      return handleError("bhai sari details fill kro");
    }

    try{ 
      
      const url = "${import.meta.env.VITE_API_URL}/auth/signup";
      const response = await axios.post(url,signUpInfo);

      if(response.status == 200 || response.data.success){
        handleSuccess("Bhai Otp bhar tu ab");
        navigate('/Signup/verifyOTP',{state:{signupData:signUpInfo}});
      }
    }catch(err){
      return handleError(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    const {name,value} = e.target;
    setsignupInfo({...signUpInfo,[name]:value});
  };


  return (
    <>
      <div className="login-scene">
            <div className="rain"></div>
            
            <div className="lofi-playing">
                STATUS: SETTING UP THE STATION 💡
            </div>
            
            <div className="login-card-wrapper">
                <div className="lofi-glass-card">
                    <div className="card-header">
                        <h2>Join the Room 🍃</h2>
                        <p>Create your account to start tracking.</p>
                    </div>
                    
                    <form onSubmit={handleSignup} className="lofi-form">
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Full Name" 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Address" 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Create Password" 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <button type="submit" className="btn-login" style={{background: 'var(--button-soft)'}}>
                            Sign Up
                        </button>

                        <div className="auth-links">
                            <span>Pehle se account hai? </span>
                            <Link to="/login">Login karo</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer 
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover                            
                        theme="dark" // "dark" ya "light" bhi try kar sakte ho
                        limit={1}
                        />
    </>
  )
}

export default Signup
