const joi = require('joi');

const loginValidation = (req,res,next)=>{
        const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(100).required(),
    });
    
    const {error} = schema.validate(req.body);
    if(error){
       return res.status(400).json({message:"bad request",success:false});
    }
    next();
    
};

module.exports = loginValidation;