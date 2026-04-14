const information = require('../controllers/HomeControllers/information');
const leaderboard = require('../controllers/HomeControllers/leaderboard');

const ApiRouter = require('express').Router();

ApiRouter.get('/',leaderboard)
ApiRouter.get('/information/:email',information)

module.exports = ApiRouter;