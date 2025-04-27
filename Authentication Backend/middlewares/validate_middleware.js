
const validate =  (Schema) => async (req , res , next) => {
    try{
        const parseBody = await Schema.parseAsync(req.body)
        req.body = parseBody
        next();
    }catch(error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            message: "Failed to validation"
        })
    }
}

module.exports = validate