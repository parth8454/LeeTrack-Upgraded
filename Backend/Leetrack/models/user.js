const { required } = require('joi');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isverified:{
        type:Boolean,
        default:false
    },
    leetcodeUsername:{ 
        type: String,
        default: "nothing"
    }, 
    stats:{
        rank: { type: Number, default: 0 },
        totalSolved: { type: Number, default: 0 },
        easy: { type: Number, default: 0 },
        medium: { type: Number, default: 0 },
        hard: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now }
    },
    platform: { type: String, enum: ['leetcode', 'manual'], required: false },
    
    username: { type: String },
    
});

const usermodel = mongoose.model('users',userSchema);
module.exports = usermodel;
