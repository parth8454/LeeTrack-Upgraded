const { bool } = require('joi');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const otpSchema = new schema({

    email:{
        type:String,
        required:true,
    },
    Recovery_otp:{
        type:String,
        required:true,
    },
    verified:{
        type:Boolean,
        default:false
    },
    created:{
        type:Date,
        default:Date.now,
        expires:120,
    }

});

const RecoveryOtpModel = mongoose.model('Recovery_otp',otpSchema);
module.exports = RecoveryOtpModel;