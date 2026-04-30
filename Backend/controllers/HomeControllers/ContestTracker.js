const axios = require('axios');
const getContestInfo = async() =>{
    try{

        const graphQL_URL = 'https://leetcode.com/graphql';
        
        const query = {
            query : "query contestV2UpcomingContests{contestV2UpcomingContests{titleSlug    title   titleCn    startTime    duration    cardImg    cardImgApp}  }"
        }

        const response = await axios.post(graphQL_URL,query,{
            headers:{
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const information = {
            contest_one:{
                "contest name":response.data.data.contestV2UpcomingContests[0].titleSlug,
            "start_time":response.data.data.contestV2UpcomingContests[0].startTime,
            "duration":response.data.data.contestV2UpcomingContests[0].duration,
            },
            contest_two:{
                "contest name":response.data.data.contestV2UpcomingContests[1].titleSlug,
            "start_time":response.data.data.contestV2UpcomingContests[1].startTime,
            "duration":response.data.data.contestV2UpcomingContests[1].duration,
            }
        }


    }catch(err){

    }
}