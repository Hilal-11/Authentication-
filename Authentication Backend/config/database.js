
require('dotenv').config()
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL
const connectDB = async () => {
    try{
        mongoose.connect(DATABASE_URL);
        console.log("Database connection successfully")
    }catch(error) {
        console.log(error.message)
        console.log("Failed to connect with cloud DB")
        process.exit(0)
    }
}

module.exports = connectDB