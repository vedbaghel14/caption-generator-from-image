const Imagekit = require('imagekit')

const imagekit = new Imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL
})

async function uploadfile(file,filename){
    const response = await imagekit.upload({
        file:file,
        fileName:filename
    })
    return response
}

module.exports = uploadfile