const joi =  require('joi');

const signupValidation_1 = (req,res,next)=>{
    const Schema = joi.object({
        name: joi.string().min(3).max(15).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    });
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message:"bad request",error});
    }
    next();
};

module.exports = signupValidation_1;