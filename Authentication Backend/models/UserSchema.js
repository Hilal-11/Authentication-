const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
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

module.exports = mongoose.model('User' , UserSchema)