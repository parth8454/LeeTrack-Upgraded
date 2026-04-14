const bcrypt = require('bcrypt');
const usermodel = require('../../models/user');
const RecoveryOtpModel = require('../../models/Recovery_otp');

const Set_Up_New_Pass = async(req,res)=>{
    const {email,otp,new_Pass} = req.body;

    const mila = await RecoveryOtpModel.findOne({email});

    if(!mila){
        return res.status(409).json({
            message:'cant update your password',
            success:false
        })
    }

    if(!mila.verified){
        return res.status(409).json({
            message:'otp not verified',
            success:false
        })
    }

    const hashed_new_pass = await bcrypt.hash(new_Pass,10);

    const user = await usermodel.findOneAndUpdate({email:email},{password:hashed_new_pass},{new:true});

    if(!user){
        return res.status(409).json({message:"cant update password",success:false});
    }

    await RecoveryOtpModel.findOneAndDelete({email:email});

    return res.status(200).json({message:"updated your password successfully",success:true});
};

module.exports = Set_Up_New_Pass;