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
    const [contests, setContests] = useState({});
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

    const fetchContest = async()=>{
        const token = localStorage.getItem('token');
        const Constresponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/Contest`,{
            headers:{Authorization:token}
        });
        setContests(Constresponse.data);
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
            <Navbar />

            <div className="main-layout">
                <aside className="side-panel">
                    <div className={`side-option ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
                        <span className="icon">📊</span> Your Stats
                    </div>
                    <div className={`side-option ${activeTab === 'leaderboard' ? 'active' : ''}`} 
                         onClick={() => { setActiveTab('leaderboard'); fetchLeaderboard(); }}>
                        <span className="icon">🏆</span> Leaderboard
                    </div>
                    <div className={`side-option ${activeTab === 'About Us' ? 'active' : ''}`} onClick={() => navigate('/home/About')}>
                        <span className="icon">📚</span> About Us
                    </div>
                </aside>

                <main className="content-area">
                    {activeTab === 'stats' ? (
                        <div className="dashboard-layout">
                            {/* LEFT: Stats Section */}
                            <div className="stats-main-wrapper">
                                <h1 className="section-title">Welcome Back, {user}</h1>
                                <div className="stats-display-card">
                                    <div className="stats-info">
                                        <div className="circle-progress">
                                            <span className="total-count">{data.totalSolved || 0}</span>
                                            <span className="sub-text">Q Solved</span>
                                        </div>
                                        <div className="stats-details">
    <div className="detail-item easy-row">
        <span className="dot easy"></span> 
        <span className="label">Easy</span>
        <span className="value">{data.easy || 0}</span>
    </div>
    <div className="detail-item medium-row">
        <span className="dot medium"></span> 
        <span className="label">Medium</span>
        <span className="value">{data.medium || 0}</span>
    </div>
    <div className="detail-item hard-row">
        <span className="dot hard"></span> 
        <span className="label">Hard</span>
        <span className="value">{data.hard || 0}</span>
    </div>
</div>
                                    </div>
                                </div>
                                <div className="stats-actions">
                                    <button className="action-btn update-btn" onClick={UpdateStats}>
                                        {loading ? "wait..." : "Update My Stats"}
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT: Contest Section */}
                            <div className="contests-side-box">
                                <h2 className="sub-section-title">Upcoming Contests 🔥</h2>
                                <div className="contests-list-container">
                                    {contests.length > 0 ? contests.map((contest, index) => (
                                        <div key={index} className="contest-item-card" onClick={() => window.open(`https://leetcode.com/contest/${contest.titleSlug}`, '_blank')}>
                                            <div className="contest-tag">LeetCode</div>
                                            <h3>{contest.title}</h3>
                                            <p className="contest-date">📅 {new Date(contest.startTime * 1000).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}</p>
                                            <span className="reg-text">Register Now →</span>
                                        </div>
                                    )) : <p className="empty-text">Fetching live data...</p>}
                                </div>
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
                                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''} {index + 1}
                                                </td>
                                                <td className="name-cell">{user.name}</td>
                                                <td className="solved-cell">{user.stats?.totalSolved ?? '—'}</td>
                                                <td className="solver-cell">{user.stats?.points ?? '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <ToastContainer position="bottom-left" autoClose={2000} theme="dark" limit={1} />
        </div>
    );
};

export default Home;