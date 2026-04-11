const OtpModel = require('../../models/otp');
const  {sendOTP} = require('../../utils/sendOTP');

const OTPbhejna = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await sendOTP(email,otp);
        
        await OtpModel.create({email,otp,name});

        return res.status(200)
            .json({message:"bro OTP bhej dia h check krle"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"OTP nhi jaa paa rha",error: err.message });
    }
};

module.exports = OTPbhejna;