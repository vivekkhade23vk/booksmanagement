const mongoose = require('mongoose');
require('dotenv').config();

function connectDB() {
    mongoose.connect(process.env.Mongo_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = connectDB;
