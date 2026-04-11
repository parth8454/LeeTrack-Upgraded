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
    created:{
        type:Date,
        default:Date.now,
        expires:120,
    }

});

const RecoveryOtpModel = mongoose.model('Recovery_otp',otpSchema);
module.exports = RecoveryOtpModel;