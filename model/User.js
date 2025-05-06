const mongoose =require('mongoose');
 
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','admin','visitor'],
    }
}
);

module.exports=mongoose.model('User',userSchema);

//trim prop  is applied to string fields and ensures that any leading or trailing whitespace in the string value is automatically removed before the value is saved to the database.