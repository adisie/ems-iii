const jwt = require('jsonwebtoken')

// models
// usersModel
// User
const User = require('../models/usersModel')

// privateRoutes
const privateRoutes = async (req,res,next) => {
    try{
        const token = req.cookies.token 
        // token
        if(!token){
            return res.status(401).json({
                error: 'unauthorized'
            })
        }
        // decode token
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodedToken){
            return res.status(401).json({
                error: 'unauthorized'
            })
        }
        const user = await User.findById(decodedToken._id) 
        if(!user){
            return res.status(401).json({
                error: 'unauthorized'
            })
        }
        
        req.user = {
            _id: user._id,
            username: user.username,
            role: user.role,
        }
        next()
    }catch(err){
        res.status(401).json({
            error: 'unauthorized'
        })
    }
}

// exports
module.exports = {
    privateRoutes,
}