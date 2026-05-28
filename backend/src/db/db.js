const mongoose = require('mongoose')
const dns = require("dns")
dns.setServers([
    '1.1.1.1','8.8.8.8'
])
const connectDb = async () => {
    
  
    await mongoose.connect(process.env.MONGO)
        .then(() => {
           console.log("connected to db")
        })
        .catch((err) => {
           console.log("error ",err.message)
        })
}

module.exports = connectDb