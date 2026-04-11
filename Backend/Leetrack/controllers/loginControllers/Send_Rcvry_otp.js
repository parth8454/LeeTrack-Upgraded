const RecoveryOtpModel = require("../../models/Recovery_otp");
const { send_PassRecovery_OTP } = require("../../utils/sendOTP");

const Send_rcvry_otp = async(req,res) => {
    try{
        const {email} = req.body;

        const Exist = await RecoveryOtpModel.findOne({email:email});
        
        if(Exist){
            return res.status(429).json({message: "Bhai abhi toh bheja tha! 2 minute wait kar le.",success: false});
        }
    
        const otp_generated = Math.floor(100000 + Math.random() * 900000).toString();

        send_PassRecovery_OTP(email,otp_generated);

        await RecoveryOtpModel.create({email,Recovery_otp:otp_generated});

        return res.status(200).json({message:"if this mail exists, an otp has been sent"});

    }catch(err){
        return res.status(500).json({message:`error : ${err}`,success:false});
    }    
};

module.exports = Send_rcvry_otp;