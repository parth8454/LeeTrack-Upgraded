import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Pages_css/Profile.css'

const Profile = () => {
    const [user, setUser] = useState('');
    const [leetcodeUsername, setLeetcodeUsername] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('username');
        if (loggedInUser) setUser(loggedInUser);
    }, []);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        const Mail = localStorage.getItem('email');
        
        try {
            const response = await axios.get(`http://localhost:9090/home/${leetcodeUsername}?email=${Mail}`,
                { headers: { 'Authorization': token } }
            );
            
            if (response.data.success) {
                alert("LeetCode Handle Linked! 🚀");
            }
        } catch (err) {
            console.error("Update Error:", err);
            alert("Failed to sync LeetCode handle.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page-unique">
            {/* Navbar Space */}
            <div className="navbar-spacer"></div>

            <div className="profile-main">
                <div className="profile-glass-card">
                    {/* Home Navigation */}
                    <Link to="/home" className="home-link">
                        ← Back to Dashboard
                    </Link>

                    <div className="profile-header">
                        <div className="avatar-circle">{user.charAt(0)}</div>
                        <h2>{user}</h2>
                        <p className="status-text">LeetCode Tracking Only 🕯️</p>
                    </div>

                    <form className="profile-form" onSubmit={handleSaveProfile}>
                        <div className="input-section">
                            <label>Your LeetCode Handle</label>
                            <input 
                                type="text" 
                                placeholder="e.g. paxton_01" 
                                value={leetcodeUsername}
                                onChange={(e) => setLeetcodeUsername(e.target.value)}
                                required
                            />
                            <p className="helper-text">This will be used to automate your stat collection.</p>
                        </div>

                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Syncing..." : "Link LeetCode Account"}
                        </button>
                    </form>

                    <div className="profile-footer">
                        <small>Data is fetched directly from LeetCode Public API</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;