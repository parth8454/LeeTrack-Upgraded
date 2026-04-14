import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';

const ForgotPass = () => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);

    if(!email){
      return handleError("bhai sari details fill kro");
    }

    try{
      const url = "${import.meta.env.VITE_API_URL}/auth/login/passRecovery";
      const response = await axios.post(url,{email});

      if(response.status == 200 || response.data.success){
        handleSuccess("OTP bhej dia h");
        navigate('/login/forgot_pass/ResetPassOTP',{state:{email:email}});
      }
    }catch(err){
      setLoading(false);
      return handleError(err);
    }
    setLoading(false);
  }; 



  return (
    <>
      <div className="login-scene">
            {/* 1. Background Vibe Elements */}
            <div className="rain"></div>

            {/* 2. Sexy Bottom Texts (Direct children of login-scene) */}
            <div className="lofi-playing" style={{ position: 'absolute', bottom: '30px', left: '30px', textTransform: 'uppercase', letterSpacing: '2px', opacity: '0.7' }}>
                LOST IN THE SIGNAL... 📻
            </div>
            
            <div className="footer-text" style={{ position: 'absolute', bottom: '30px', right: '30px', opacity: '0.5', fontSize: '0.8rem' }}>
                STATUS: RECOVERING MEMORIES 💡
            </div>

            {/* 3. Main Card Container */}
            <div className="login-card-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="lofi-glass-card">
                    <div className="card-header">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Lost your way?</h2>
                        <div style={{ fontSize: '2rem', marginBottom: '15px' }}>🕯️</div>
                        <p style={{ opacity: '0.8' }}>Ek baar email daal, hum tujhe rasta dikhayenge.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="lofi-form" style={{ marginTop: '20px' }}>
                        <div className="input-group">
                            <input 
                                type="email" 
                                placeholder="Registered Email Address" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                            />
                        </div>

                        <button type="submit" className="btn-login" disabled={loading} style={{ marginTop: '20px', cursor: 'pointer' }}>
                            {loading ? "Finding you..." : "Send OTP"}
                        </button>

                        <div className="auth-links" style={{ marginTop: '20px', textAlign: 'center' }}>
                            <span 
                                onClick={() => navigate('/login')} 
                                style={{ cursor: 'pointer', opacity: '0.6', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
                            >
                                ← Wapas Login pe chalo
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

export default ForgotPass
