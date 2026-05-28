const usermodule = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registercontroller(req,res){
    const {username,password} = req.body
    const exist = await usermodule.findOne({
        username
    })
    if(exist){
        return res.status(409).json({
            message:"user already exist"
        })
    }

    const user = await usermodule.create({
        username,
        password:await bcrypt.hash(String(password),10)
    })

    const token = jwt.sign({
        id:user._id
    },process.env.SECRET_KEY)

    res.cookie('token',token)

    res.status(200).json({
        message:"successfully user created",
        user
    }) 
}

async function logincontroller(req,res){
    const {username,password} = req.body
    const user = await usermodule.findOne({
        username
    })
    if(!user){
        return res.status(400).json({
            message:"user does not exist"
        })
    }
    const ispasswordcorrect = await bcrypt.compare(String(password),user.password)
    if(!ispasswordcorrect){
        return res.status(400).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
    res.cookie('token',token)
    res.status(200).json({message:"login successfully",user})
}


module.exports = {registercontroller,logincontroller}