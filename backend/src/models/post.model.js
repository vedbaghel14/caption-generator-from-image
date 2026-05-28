const mongoose = require('mongoose')

const postschema = new mongoose.Schema({
    image:{
        type:String
       
    },
    caption:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const postmodel = mongoose.model('posts',postschema)

module.exports = postmodel