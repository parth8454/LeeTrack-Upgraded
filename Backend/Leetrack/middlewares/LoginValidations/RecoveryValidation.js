const RecoveryOtpModel = require("../../models/Recovery_otp");
const usermodel = require("../../models/user");
const { send_PassRecovery_OTP } = require("../../utils/sendOTP");

const EmailValidation = async(req,res,next)=>{
try{
    const {email} = req.body;

    const user = await usermodel.findOne({email:email});

    if(!user){
        return res.status(200).json({message:"If this email exists, an OTP has been sent",success:false});
    }

    next();

}catch(err){
    return res.status(500).json({message:`error : ${err}`,success:false});
    }
};

module.exports = EmailValidation;