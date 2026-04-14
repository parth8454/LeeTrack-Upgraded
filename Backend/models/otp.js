const { required } = require('joi');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const otpSchema = new schema({

    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    created:{
        type:Date,
        default:Date.now,
        expires:300,
    }

});

const OtpModel = mongoose.model('otp',otpSchema);
module.exports = OtpModel;