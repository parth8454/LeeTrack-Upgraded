import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useNavigate,  useLocation } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import axios from 'axios';

const ResetPassOTP = () => {

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!otp) return handleError("OTP daalna zaroori hai! ✉️");

        setLoading(true);
        try {
            const url = "http://localhost:9090/auth/login/otpverify"; 
            const response = await axios.post(url, { email, otp });

            if (response.data.success) {
                handleSuccess("OTP Verified! ✅");
                navigate('/login/reset_pass', { state: { email, otp } });
            }
        } catch (err) {
            handleError(err.response?.data?.message || "Galat OTP hai!");
        } finally {
            setLoading(false);
        }
};

  return (
    <>
    <div className="login-scene">
            <div className="rain"></div>
            
            <div className="lofi-playing">
                WAITING FOR THE SIGNAL... 📻
            </div>
            
            <div className="login-card-wrapper">
                <div className="lofi-glass-card">
                    <div className="card-header">
                        <h2>Verify OTP ✉️</h2>
                        <p>Humne {email} par ek code bheja hai.</p>
                    </div>
                    
                    <form onSubmit={handleVerify} className="lofi-form">
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Enter 6-digit OTP" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength="6"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? "Wait..." : "Verify & Proceed"}
                        </button>

                        <div className="auth-links">
                            <span>OTP nahi aaya? </span>
                            <span style={{cursor: 'pointer', color: '#88e1f2'}}>Resend Code</span>
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

export default ResetPassOTP
