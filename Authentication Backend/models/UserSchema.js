const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_SIGNITURE = process.env.JWT_SECRET_SIGNITURE
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        maxLength: 12,
    }
})
UserSchema.pre("save" , async function(next) {
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    try{
        const salt_round = await bcrypt.genSalt(20)
        const hash_password = await bcrypt.hash(user.password , salt_round)
        user.password = hash_password;
    }catch(error) {
        console.log(error.message)
        next(error.message)
    }
})
UserSchema.methods.generateToken = async function() {
    try{    
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,   
        },
        JWT_SECRET_SIGNITURE,
        {
            expiresIn: '10d'
        }
    )
    }catch(error) { 
        console.log(error.message);
        console.log("Failed to Generate the web token.")
    }
}


module.exports = mongoose.model('User' , UserSchema)