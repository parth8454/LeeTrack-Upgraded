import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import '../../Pages_css/Login.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

    const [loginInfo,setloginInfo] = useState({
        email:'',
        password:'',
    });

    const handleLogin = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const {email,password} = loginInfo;

        if(!email || !password){
            setLoading(false);
            return handleError("bhai sari details bhar de😗");
        }

        console.log(loginInfo);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setLoading(false);
        return handleError('Ye email sahi nahi lag raha, check karle ek baar.');
    }

        try{
            const url = `${import.meta.env.VITE_API_URL}/auth/login`;
            const response = await axios.post(url,loginInfo);
            
            const {success,jwtToken,name,email,message,error} = response.data;

            if(success){
                handleSuccess("Welcome back, " + name + "! 🎧");
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                localStorage.setItem('email',email);
                setTimeout(() => {
                        navigate('/home');  
                    },1000);
            }else if(error){
                  const details = error?.details[0].message;
                  
                    setLoading(false);
                  return handleError(details);
              }else if(!success){
                
          setLoading(false);
                  return handleError(message);
              }
              console.log(response);
          }catch(err){
            console.log(`error : ${err}`);
            
          setLoading(false);
            return handleError(err.response.data.message);
          }

    };

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setloginInfo({...loginInfo,[name]:value});
    };

  return (
    <>
        <div className="login-scene">
            <div className="rain"></div>
            
            <div className="lofi-playing">
                PLAYING: 1 A.M. STUDY SESSION 🎧
            </div>

            <div className="login-card-wrapper">
                <div className="lofi-glass-card">
                    <div className="card-header">
                        <h2>Welcome Back ☕</h2>
                        <p>Grab a coffee and log in to track your stats.</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="lofi-form">
                        <div className="input-group">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Address" 
                                onChange={handleChange} 
                                
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                onChange={handleChange} 
                             
                            />
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading?"Wait...":"Login"}
                        </button>

                        <div className="auth-links">
                            <span>Naye ho? </span>
                            <Link to="/signup">Signup yahan se karo</Link>
                            <br />
                            <Link to="/login/forgot_pass" className="forgot-pass-link">
                                Password bhool gaye?
                            </Link>
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

export default Login
