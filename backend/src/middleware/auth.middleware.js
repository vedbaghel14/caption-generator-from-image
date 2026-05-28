const jwt = require('jsonwebtoken')
const usermodel = require('../models/user.model')
async function authmiddleware(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }

   try{
    const decoded = await jwt.verify(token,process.env.SECRET_KEY)
    const user = await usermodel.findOne({
        _id:decoded.id
    })

   req.user = user
    
   }
   catch(err){
    return res.status(500).json({message:"invalid token"})
   }

   next()
   


}


module.exports = authmiddleware