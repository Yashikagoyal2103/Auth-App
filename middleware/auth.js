const jwt =require('jsonwebtoken');
require('dotenv').config();

//verify token
exports.auth = (req, res , next) => {
    try{
        const token =req.body.token;
        // const token = req.cookie.token
        // const token = req.headers.authorization.split(" ")[1]   
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token missing'
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;   

        }catch (err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();

    }catch (error) {
        res.status(500).json ({
            success:false,
            message:'Something went wrong while verifying token'
        })
    }
}


//check if user is student
exports.isStudent = (req, res , next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for students you can not access it'
            })
        }
        next();
    }catch (error){
        return res.status(500).json({
            success:false,
            message:'User role is not matching'
        })
    }
}

//check if user is admin    
exports.isAdmin = (req, res , next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for admin you can not access it'
            })
        }
        next();
    }catch (error){
        return res.status(500).json({
            success:false,
            message:'User role is not matching'
        })
    }
}