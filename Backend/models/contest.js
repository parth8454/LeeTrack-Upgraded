const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ContestSchema = new schema({
    information:{
        contest_one:{
            contest_name : {type:String,default: ""},
            start_time : {type:Number,default:0},
            duration : {type:Number,default:0}
        },
        contest_two:{
            contest_name : {type:String,default: ""},
            start_time : {type:Number,default:0},
            duration : {type:Number,default:0}
        }
    }
});

const ContestModel = mongoose.model('Contests',ContestSchema);
module.exports = ContestModel;