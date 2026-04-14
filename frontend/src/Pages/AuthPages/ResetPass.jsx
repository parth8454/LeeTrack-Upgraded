import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';
import axios from 'axios';

const ResetPass = () => {

  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
  const [loading,setloading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(()=>{
    if(!email){
        navigate('/login');
        handleError('bhai phle otp verify krwa le');
    }
  },[email,navigate]);

  const handleReset = async(e)=>{
    e.preventDefault();
        const { password, confirmPassword } = passwords;

        // Validation
        if (password !== confirmPassword) {
            return handleError("Bhai, dono password match nahi kar rahe! 🙃");
        }

        setloading(true);
        try {
           
            const url = `${import.meta.env.VITE_API_URL}/auth/login/reset_pass`; 
            const response = await axios.post(url, {
                email:email,
                new_Pass: password
            });     

            if (response.data.success) {
                handleSuccess("Password badal gaya! Ab login karle. 🚀");
                setTimeout(() => navigate('/login'), 1000);
            }
        } catch (err) {
            handleError(err.response.data.message || "Kuch toh gadbad hai!");
  
        } finally {
            setloading(false);
        }
  };

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  return (
    <>
      <div className="login-scene">
            <div className="rain"></div>
            
            <div className="lofi-playing">
                WRITING NEW MEMORIES... ✍️
            </div>
            
            <div className="login-card-wrapper">
                <div className="lofi-glass-card">
                    <div className="card-header">
                        <h2>New Start 🕯️</h2>
                        <p>Enter your new password below.</p>
                    </div>
                    
                    <form onSubmit={handleReset} className="lofi-form">
                        <div className="input-group">
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="New Password" 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm New Password" 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? "Wait..." : "Reset Password"}
                        </button>

                        <div className="auth-links">
                            <span>Wapas jana hai? </span>
                            <Link to="/login">Login pe chalo</Link>
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

export default ResetPass
