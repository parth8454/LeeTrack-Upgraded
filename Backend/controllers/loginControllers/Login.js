const bcrypt = require('bcrypt');
const UserModel = require('../../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await UserModel.findOne({email:email});

        if(!user){
            return res.status(404).json({message:"either not registered or wrong email",success:false});
        }

        const passEqual = await bcrypt.compare(password,user.password);

        if(!passEqual){
            return res.status(403).json({message:"wrong password or mail",success:false});
        }  

        const jwtToken = jwt.sign(
            {email:user.email,_id:user.id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        );

       return res.status(200).json({message:"login successful",success:true,jwtToken,email,name:user.name});

    }catch(error){
        res.status(500).json({message:error.message,success:false});
    }
};

module.exports = login;