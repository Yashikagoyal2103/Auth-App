const express= require('express');
const app=express();

require('dotenv').config();
const PORT =process.env.PORT || 5000;

app.use(express.json());

app.use('/api/user',require('./routes/user.js'));

require('./config/database.js').connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send('This is Homepage');
})
