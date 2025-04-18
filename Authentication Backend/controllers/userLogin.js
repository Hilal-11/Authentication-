
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt')

const userLogin = async (req , res) => {
    try {
        const { email , password } = req.body;
        const userExists = await User.findOne({ email });

        if(!userExists) {
            return res.status(400).json({
                message: "Invalid email and password"
            })
        }
        // const user = await bcrypt.compare(password , userExists.password)
        const user = await userExists.comparePassword(password);

        if(user) {
            return res.status(201).json({
                success: true,
                message: "Login successful",
                token: await userExists.generateToken(),
                userId: userExists._id.toString(),
            })
        }else {
            res.status(401).json({
                success: false,
                message: "Login unsuccessful , invalid email and password",
            })
        }
    }catch(error) {
        console.log(error.message);
        console.log("failed to login")

        res.status(500).json({
            success: false, 
            error: error.message,
            message: "failed to login"
        })
    }
}

module.exports = userLogin;