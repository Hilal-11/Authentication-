const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const createUser = async (req , res) => {
    try{
        const { username , email , password , phone } = req.body;
        const userExists = await User.findOne({ email: email })

        if(userExists) {
            return res.status(400).json({
                success: false,
                message: "Emial already exists"
            })
        }
        // const salt_round = await bcrypt.genSalt(10);
        // const hash_password = await bcrypt.hash(password , salt_round)

        const response = await User.create({
            username,
            email,
            password,
            phone
        })

        res.status(200).json({
            success: true,
            message: "user entry in Database successfully",
            token: generateToken(),
        })

    }catch(error) {
        console.log(error.message);
        console.log("Failed to create an entry of user in Database");

        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to create an entry of user in Database"
        })
    }
}

module.exports = createUser;