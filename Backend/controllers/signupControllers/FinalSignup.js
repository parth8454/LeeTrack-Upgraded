const bcrypt = require('bcrypt');
const UserModel = require('../../models/user');

const Signup = async(req,res) => {
    try{
    
    const {name,email,password,otp} = req.body;
    
    const hashedPassword = await bcrypt.hash(password,10);

    const usermodel = new UserModel({name,email,password:hashedPassword,isverified:true});
    await usermodel.save();

    res.status(201).json({message:"signup successful",success:true});

    }catch(err){
        console.log(err);
        res.status(500).json({message:`nhi ho paya bhai ye error h ${err}`,success:false});
    };
   
};

module.exports = Signup;