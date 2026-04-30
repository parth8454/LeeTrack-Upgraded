const getLeetCodeStats = require('../controllers/HomeControllers/Tracker');
const isAuthenticated = require('../middlewares/ensureAuthenticated/IsAuthenticated');
const HomeRouter = require('express').Router();
const leaderboard = require('../controllers/HomeControllers/leaderboard');
const { getContestInfo } = require('../controllers/HomeControllers/ContestTracker');

HomeRouter.get('/:UserName',isAuthenticated,getLeetCodeStats);


module.exports = HomeRouter;