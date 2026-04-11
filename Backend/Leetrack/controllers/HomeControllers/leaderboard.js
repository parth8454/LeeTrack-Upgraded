const axios = require('axios');
const usermodel = require('../../models/user');


const leaderboard = async (req, res) => {
    
    try{
        const scores = await usermodel.find({},'stats.rank stats.totalSolved name').sort({'stats.rank': -1 });
        return res.json(scores);

    }catch(error){
        console.log(error);
        return res.status(500).json({msg:"server error"});
    }
}

module.exports = leaderboard;