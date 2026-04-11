const leaderboard = require('../controllers/HomeControllers/leaderboard');

const ApiRouter = require('express').Router();

ApiRouter.get('/',leaderboard)

module.exports = ApiRouter;