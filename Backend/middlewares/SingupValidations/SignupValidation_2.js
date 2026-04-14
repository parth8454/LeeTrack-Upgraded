const usermodel = require("../../models/user");

const SignupValidation_2 = async(req,res,next)=>{
    
        const {name,email,password} = req.body;
        const user = await usermodel.findOne({email:email});
        if(user){
            return res.status(409).json({message:"bhai teri id se phle hi signup ho rkha h",success:false});
        }
        next();
};

module.exports = SignupValidation_2;