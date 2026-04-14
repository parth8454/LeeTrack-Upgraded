import React from 'react';
import '../../Pages_css/About.css';
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';

const About = () => {
    // Function to scroll smoothly to sections
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="about-page-unique">
            <Navbar/>
            <div className="navbar-spacer"></div>

            <div className="about-layout">
                {/* 2. Side Navigation Panel */}
                <aside className="about-sidebar">
                    <Link to="/home" className="back-home-btn">
                        ← Back to Dashboard
                    </Link>
                    <nav className="side-nav">
                        <p className="nav-label">Navigate</p>
                        <button onClick={() => scrollToSection('story')}>The Story</button>
                        <button onClick={() => scrollToSection('features')}>What LeeTrack Does</button>
                        <button onClick={() => scrollToSection('guide')}>Getting Started</button>
                        <button onClick={() => scrollToSection('scoring')}>Scoring Logic</button>
                        <button onClick={() => scrollToSection('future')}>Future Roadmap</button>
                    </nav>
                </aside>
                

                {/* 3. Main Content Area */}
                <main className="about-content">
                    
                    {/* Story Section */}
                    <section id="story" className="content-section">
                        <h1 className="main-title">The Story Behind LeeTrack</h1>
                        <div className="glass-card-text">
                            <p>What started as a simple academic task turned into something much bigger.</p>
                            <p>I was asked by my professor to maintain records of every student — their LeetCode progress, rankings, and solved questions. Initially, I managed everything using <b>Google Forms and Sheets</b>. It worked… but not efficiently.</p>
                            <p>More importantly, it lacked something crucial — <b>competition.</b></p>
                            <p>I wanted to create an environment where students could actually see where they stand, feel motivated, and push themselves further. I searched for platforms that could do this, but nothing really fit the need.</p>
                            <p className="highlight-text">So instead of waiting for a solution, I decided to build one.</p>
                            <p>That’s how <b>LeeTrack</b> was born.</p>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section id="features" className="content-section">
                        <h2 className="sub-title">What LeeTrack Does</h2>
                        <div className="glass-card-text">
                            <p>LeeTrack is designed to make coding progress visible, competitive, and motivating.</p>
                            <p>Even though this is the very first version, it focuses on doing a few things really well — <b>accuracy and usefulness.</b></p>
                            <ul className="feature-list">
                                <li>📊 A tracker that fetches your LeetCode data automatically</li>
                                <li>🏆 A leaderboard that shows where you stand among others</li>
                            </ul>
                            <p>No manual updates. No spreadsheets. Just real data, real competition.</p>
                        </div>
                    </section>

                    {/* Getting Started Guide */}
                    <section id="guide" className="content-section">
                        <h2 className="sub-title">Getting Started</h2>
                        <div className="glass-card-text">
                            <ol className="step-list">
                                <li>Log in using your email</li>
                                <li>Enter the OTP to verify</li>
                                <li>Go to your profile (top-right dropdown)</li>
                                <li>Add your LeetCode handle</li>
                            </ol>
                            <div className="alert-box">
                                <p>“LeetCode Handle Linked! 🚀”</p>
                            </div>
                            <p className="note-text">
                                <b>Note:</b> If you see an error, make sure your username is <b>case-sensitive</b> and correct.
                            </p>
                        </div>
                    </section>

                    {/* Scoring Logic Section */}
                    <section id="scoring" className="content-section">
                        <h2 className="sub-title">How the Leaderboard Works</h2>
                        <div className="glass-card-text">
                            <p>The leaderboard is based on a weighted scoring system to reflect actual difficulty:</p>
                            <div className="math-card">
                                <p>🟢 Easy = 1 point</p>
                                <p>🟡 Medium = 2 points</p>
                                <p>🔴 Hard = 3 points</p>
                                <div className="formula">
                                    Total Points = (Easy) + 2 × (Medium) + 3 × (Hard)
                                </div>
                            </div>
                            <p>Harder problems give you a real advantage — making the competition more meaningful.</p>
                        </div>
                    </section>

                    {/* Future Section */}
                    <section id="future" className="content-section">
                        <h2 className="sub-title">What’s Coming Next</h2>
                        <div className="glass-card-text">
                            <p>This is just the beginning. LeeTrack will continue evolving with:</p>
                            <ul className="future-list">
                                <li>⏰ Contest reminders</li>
                                <li>✨ More interactive UI</li>
                                <li>📈 Enhanced analytics and insights</li>
                            </ul>
                            <p className="made-by">Made by <span>Paxton</span> 🚀</p>
                        </div>
                    </section>

                </main>
            </div>
            
        </div>
    );
};

export default About;