const express=require('express');
const router =express.Router();

const {login , signup} =require('../controllers/Auth.js');
const {auth , isAdmin , isStudent} =require('../middleware/auth.js');

router.post('/login',login);
router.post('/signup',signup);

//middleware testing route
router.get('/test', auth ,(req,res) =>{
    res.status(200).json({
        success:true,
        message:"Test successful"
    })
})

//protected route for student
router.get('./student', auth , isStudent ,(req,res) =>{
    res.status(200).json({
        succces:true,
        message:"Welcome to Protected Route for Student"
    })
})

//protected route for admin
router.get('./admin', auth , isAdmin ,(req,res) =>{
    res.status(200).json({
        succces:true,
        message:"Welcome to Protected Route for admin"
    })
})

module.exports=router;

