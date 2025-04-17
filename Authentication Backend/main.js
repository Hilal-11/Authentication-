
const express = require('express');
require('dotenv').config();
const app_routes = require('./routes/app_routes');
const connectDB = require('./config/database');
const PORT = process.env.PORT

app.use(express.json())
const app = express();


app.get("/", (req , res) => {
    res.send("<h1>Backend Authentication and Autherization</h1>")
})

app.use("/api/v1" , app_routes)

app.listen(PORT , () => {
    console.log(`App is running on PORT ${PORT}`)
})

connectDB();