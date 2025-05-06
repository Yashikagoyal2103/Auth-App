const bcrypt =require('bcrypt');
const User =require('./models/User.js');

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
    