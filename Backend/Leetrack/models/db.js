const mongoose = require('mongoose');
const mongoURL = process.env.mongo_URL;

mongoose.connect(mongoURL).then(()=>{
    console.log("database successfully connected");
}).catch((err)=>{
    console.log(`this is the error ${err}`);
});
