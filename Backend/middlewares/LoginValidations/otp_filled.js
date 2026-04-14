const RecoveryOtpModel = require('../../models/Recovery_otp');

const otp_filled = async(req,res,next) =>{

    const {email,otp,}

    try{
    const response = await RecoveryOtpModel.findOne();

    }catch(err){

    }
}

module.exports = otp_filled;