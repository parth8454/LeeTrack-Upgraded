const RecoveryOtpModel = require("../../models/Recovery_otp");

const Verify_recovery_OTP = async(req,res,next) => {
    try{
        const {email,otp,new_pass} = req.body;

        const user = await RecoveryOtpModel.findOne({email:email});

        if(!user){
            return res.status(404).json({message:"ya to otp generate nhi hua ya expired h",success:false});
        }

        if(otp != user.Recovery_otp ){
            return res.status(409).json({message:"bhai tune glt otp dal dia h",success:false});
        }else{
            await RecoveryOtpModel.findOneAndUpdate({email:email},{verified:true},{new:true});
            return res.status(200).json({message:"okiee.. wait!!",success:true});
        }

    }catch(error){
        return res.status(409).json({message:`bhai error aagya : ${error}`,success:false});
    }
};

module.exports = Verify_recovery_OTP;