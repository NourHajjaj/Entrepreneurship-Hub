const express = require('express');
const dotenv = require('dotenv');

const database = require('./database').connectDB;
const app = express();
dotenv.config();

database();

// define routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/item',itemRoutes);

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});