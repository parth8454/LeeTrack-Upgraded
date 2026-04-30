import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import '../../Pages_css/Home.css';
import { handleError, handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    // 1. State for Sidebar Navigation

    const [lcHandle, setLcHandle] = useState('');
    const [activeTab, setActiveTab] = useState('stats');
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading,setloading] = useState(false);
    const [data,setdata] = useState({ });
    const navigate = useNavigate();

    
    // 2. State for User Data
    const [user, setUser] = useState('');
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const fetchLeaderboard = async() => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api`,{
            headers:{Authorization:token}
        });
        setLeaderboard(response.data);

    }

    // request to api and stats fetch
    const UpdateStats = async() =>{
        setloading(true);
        const Mail = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        const information = await axios.get(`${import.meta.env.VITE_API_URL}/api/information/${Mail}`);
        const leetcodeUsername = information.data.leetcodeUsername;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/home/${leetcodeUsername}?email=${Mail}`,
                { headers: { 'Authorization': token } }
            );
            if(response.data.success){
            handleSuccess("successfully updated stats");
            setdata(response.data.stats);
        }
        else{
            setloading(false);
            return handleError("bhai kuch dikat agyi");
        }
        setloading(false);
    }


    return (
        <div className="home-page-unique">
            {/* Top Fixed Navbar */}
            <Navbar />

            <div className="main-layout">
                {/* Side Panel / Sidebar */}
                <aside className="side-panel">
                    <div 
                        className={`side-option ${activeTab === 'stats' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('stats')}
                    >
                        <span className="icon">📊</span> Your Stats
                    </div>
                    <div 
                        className={`side-option ${activeTab === 'leaderboard' ? 'active' : ''}`} 
                        onClick={() => {setActiveTab('leaderboard'); fetchLeaderboard();}}
                    >
                        <span className="icon">🏆</span> Leaderboard
                    </div>
                    <div 
                        className={`side-option ${activeTab === 'About Us' ? 'active' : ''}`} 
                        onClick={() => navigate('/home/About')}
                    >
                        <span className="icon">📚</span> About Us
                    </div>
                </aside>

                {/* Main Dynamic Content Area */}
                <main className="content-area">
                    {activeTab === 'stats' ? (
                        <div className="stats-wrapper">
                            <h1 className="section-title">Welcome Back, {user} </h1>
                            
                            {/* Floating Glass Card for Stats */}
                            <div className="stats-display-card">
                                <div className="stats-info">
                                    {/* Big Progress Circle Placeholder */}
                                    <div className="circle-progress">
                                        <span className="total-count">{data.totalSolved}</span>
                                        <span className="sub-text">Q Solved</span>
                                    </div>

                                    {/* Vertical Stats Detail List */}
                                    <div className="stats-details">
                                        <div className="detail-item">
                                            <span className="dot easy"></span> 
                                            <span className="label">Easy</span>
                                            <span className="value">{data.easy}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="dot medium"></span> 
                                            <span className="label">Medium</span>
                                            <span className="value">{data.medium}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="dot hard"></span> 
                                            <span className="label">Hard</span>
                                            <span className="value">{data.hard}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Action Buttons Row */}
                            <div className="stats-actions">
                                <button className="action-btn update-btn" onClick={UpdateStats}>{loading?"wait...":"Update My Stats"}</button>
                            </div>
                        </div>
                    ) : (
                        <div className="leaderboard-wrapper">
                            <h1 className="section-title">Class Rankings</h1>
                            
                            <div className="table-container">
                                <table className="leaderboard-table">
                                    <thead>
                                        <tr>
                                            <th># Rank</th>
                                            <th>Warrior Name</th>
                                            <th>Total Solved</th>
                                            <th>Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboard.map((user, index) => (
                                            <tr key={user._id}>
                                                <td className="rank-cell">
                                                 {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}  {index + 1}
                                                </td>
                                                <td className="name-cell">{user.name}</td>
                                                <td className="solved-cell">{user.stats?.totalSolved ?? '—'}</td>
                                                <td className="solver-cell">{user.stats?.points??'-'}</td>
                                             </tr>
                                             ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <ToastContainer 
                                    position="bottom-left"
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
        </div>
    );
};

export default Home;