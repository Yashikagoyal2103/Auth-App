const mongoose=require('mongoose');
require("dotenv").config();

exports.connectDB = () => {
    try{
        mongoose.connect(process.env.DATABASE_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    }catch (err) {
        console.log('Database connection failed:', err.message);
        process.exit(1); // Exit the process with failure
    }
}
