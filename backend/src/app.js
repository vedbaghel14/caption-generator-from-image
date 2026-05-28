const express = require('express')
const cors = require('cors')
const authrouter = require('./router/auth.routes')
const cookieparser = require('cookie-parser') 
const postrouter = require('./router/posts.routes')
const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(cookieparser())
app.use(express.json())
app.use('/api/auth',authrouter)
app.use('/api/posts',postrouter)
app.use(express.static(path.join(__dirname,'../public')))
app.get("*name",(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/index.html'))
})



module.exports = app
