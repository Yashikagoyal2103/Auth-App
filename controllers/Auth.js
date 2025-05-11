const bcrypt =require('bcrypt');
const User =require('../model/User.js');
const jwt =require('jsonwebtoken');
require('dotenv').config();

//signup
exports.signup = async (req,res) => {
    try{
        const {name, email, password , role} = req.body;
        //check to see if user exit or not
        const userExisting =await User.findOne({email});
        if(userExisting){
            return res.status(400).json(
                {
                    success:false,
                    message:'User already exists'
                }
            );
        }

        //hash password
        let hashedPassword;
        try{
            hashedPassword =await bcrypt.hash(password, 10);

        }catch(err){
            console.error(err);
            return res.status(500).json(
                {
                    success:false,
                    message:'Password hashing failed'
                }
            );
        }

        //create user 
        const user =await User.create({
            name, email, password:hashedPassword , role
        })

        res.status(200).json({
            success:true,
            message:'User created successfully',
        })
        
    }catch(err){
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:'Internal server error'
            }
        );
    }
}

//login
exports.login =async (req,res) => {
    try{
        const {email , password} = req.body;
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please enter email and password'
            })
        }

    const user =await User.findOne({email});
    if(!user){
        return res.status(401).json({
                success:false,
                message:'User not registered'
        })
    }

    const payload ={
        email:user.email,
        id:user._id,
        role:user.role
    }
    //password varification and jwt token generation
    if(await bcrypt.compare(password , user.password)){
        const token = jwt.sign( payload ,process.env.JWT_SECRET, process.env.JWT_EXPIRY);
        user.token =token;
        user.password =undefined;

        //cookies
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true
        } 
        res.cookie('token', token , options).status(200).json({
            success:true,
            message:'Login successful',
            user,
            token
        })
    }
    else{
        return res.status(403).json({
                success:false,
                message:'Password is incorrect'
            })
    }

    }catch(err) {
        res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}
    