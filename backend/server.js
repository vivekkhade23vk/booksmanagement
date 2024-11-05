const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const connectDB=require('./config/config')
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 


const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);


// Routes
app.use('/books', bookRoutes);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Live on http://localhost:${PORT}`) ;
});