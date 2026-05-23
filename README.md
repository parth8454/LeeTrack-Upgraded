# LeeTrack 🚀

**A High-Performance Competitive Programming Tracker & Leaderboard**

LeeTrack is a full-stack web application designed to track LeetCode progress, foster healthy competition among college classmates, and keep users updated with live coding contests. It fetches real-time data using the LeetCode GraphQL API and utilizes an advanced caching layer for lightning-fast dashboard loads.

## ✨ Key Features

* **Live Class Leaderboard:** Ranks peers based on total problems solved and points accumulated.
* **Personalized Stats Dashboard:** A visual breakdown of Easy, Medium, and Hard problems solved by the user.
* **Upcoming Battles (Contests):** Dedicated section displaying live and upcoming LeetCode contests with direct registration redirection.
* **Ultra-Fast Loading:** Integrates an in-memory caching system to serve data instantly and avoid external API rate limits.
* **Automated Sync:** Backend scheduled tasks to keep contest data and user statistics up to date without manual intervention.

## 🛠️ Tech Stack

**Frontend:**
* React.js
* CSS3 (Custom Glassmorphism & UI animations)
* Axios (API communication)

**Backend:**
* Node.js & Express.js
* MongoDB (Database for storing user stats and contest history)
* Redis (In-memory caching for optimized performance)
* LeetCode GraphQL API (Data source)

## ⚙️ System Architecture

LeeTrack is built with a heavy focus on performance and reliability:
1.  **Smart Caching:** User stats and upcoming contests are cached in Redis. This ensures a zero-delay experience for the user while protecting the application from being blocked by LeetCode rate limiters.
2.  **Hybrid Data Fetching:** A dedicated sync route periodically fetches data from LeetCode and updates the MongoDB database, acting as the single source of truth for the frontend dashboard.
3.  **Secure Endpoints:** Admin routes for data synchronization are protected via custom API key headers.

## 🚀 Getting Started

Follow these steps to run LeeTrack locally on your machine.

### Prerequisites
* Node.js installed
* MongoDB instance running (local or Atlas)

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Paxton/leetrack.git](https://github.com/Paxton/leetrack.git)
    ```

2.  Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

3.  Navigate to the frontend directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

4.  Create a `.env` file in the **backend** directory and add your credentials:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    REDIS_URI=your_redis_connection_string
    CRON_SECRET_KEY=your_secret_key_for_sync
    ```

5.  Create a `.env` file in the **frontend** directory:
    ```env
    VITE_API_URL=http://localhost:5000
    ```

6.  Start the development servers:
    ```bash
    # In the backend directory
    npm start

    # In the frontend directory
    npm run dev
    ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## 👨‍💻 Author

**Paxton** building tools that make an impact.