const postmodel = require('../models/post.model')
const generate_caption = require('../services/ai.service')
const uploadfile = require('../services/storage.service')
const {v4:uuid_v4} = require('uuid');

async function postcontroller(req,res){
    const file = req.file
    const base64file = new Buffer.from(file.buffer).toString('base64')
    const caption = await generate_caption(base64file)
    const result = await uploadfile(file.buffer,`${uuid_v4()}`)
    const post = await postmodel.create({
        image:result.url,
        caption,
        user:req.user._id
    })

    return res.status(201).json({
        message:"post created successfully",
        post

    })

}

module.exports = postcontroller