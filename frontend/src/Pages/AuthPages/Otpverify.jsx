import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';
import axios from 'axios';

const Otpverify = () => {

  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const signupData = location.state?.signupData;

  const handleVerify = async (e) => {
        e.preventDefault();
        if (!otp) {
            return alert("otp glt h");
        }

        if (!signupData) {
            handleError("Something went wrong. Please signup again.");
            return navigate('/signup');
        }

        try {
            const url = "${import.meta.env.VITE_API_URL}/auth/signup/otpverify";
            
            // Sab kuch combine karke bhej rahe hain backend ko
            const finalPayload = { 
                ...signupData, 
                otp: otp 
            };

            const response = await axios.post(url, finalPayload);

            if (response.status === 201 || response.data.success) {
                handleSuccess("Account Verified! Welcome to the Club.");
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (err) {
            const msg = err.response.data.message || "Invalid OTP or Session Expired";
            handleError(msg);
        }
    };

  return (
    <>
      <div className="login-scene">
            <div className="rain"></div>
            <div className="lofi-playing">
                CHECKING YOUR SIGNAL... 📻
            </div>

            <div className="login-card-wrapper">
                <div className="lofi-glass-card">
                    <div className="card-header">
                        <h2>Verify Identity ✉️</h2>
                        <p>Humne tere email <b>({signupData?.email})</b> par ek code bheja hai.</p>
                    </div>

                    <form onSubmit={handleVerify} className="lofi-form">
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Enter 6-digit OTP" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength="6"
                                style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '8px' }}
                                required 
                            />
                        </div>

                        <button type="submit" className="btn-login">
                            Verify & Create Account
                        </button>

                        <div className="auth-links">
                            <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
                                ← Galat email daal diya?
                            </span>
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

export default Otpverify

