const User = require('../models/UserSchema')

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
        const response = await User.create({
            username,
            email,
            password,
            phone
        })

        res.status(200).json({
            success: true,
            message: "user entry in Database successfully",
            data: response,
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