
const { z } = require('zod')

const SignUpSchema = z.object({
    username: z
        .string({required_error: "Name is required"}).trim()
        .min(3 , {message: "Name is required at least 3 characters"})
        .max(255 , {message: "Name must conatins at most 255 characters"}),

    email: z
        .string({required_error: "Email is required"}).trim()
        .min(8 , {message: "email is required at least 8 characters"})
        .max(255, {message: "email isrequired at most 255 characters"}),

    password: z
        .string({required_error: "Password is required"})
        .min(6 , {message: "Password must contains at least 6 characters"})
        .max(20 , {message: "Password must contains at most 20 characters"}),
    
    phone: z 
        .string({required_error: "Contect number is required"})
        .min(10 ,{message: "contect number must contains at least 10 characters"})
        .max(12, {message: "contect number must contains at most 12 characters"})
    
})

module.exports = SignUpSchema