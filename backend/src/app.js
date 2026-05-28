const express = require('express')
const cors = require('cors')
const authrouter = require('./router/auth.routes')
const cookieparser = require('cookie-parser') 
const postrouter = require('./router/posts.routes')
const path = require('path')
const app = express()

app.use(cors({
  origin: 'https://caption-generator-from-image.onrender.com',
  credentials: true
}))

app.use(cookieparser())
app.use(express.json())
app.use('/api/auth',authrouter)
app.use('/api/posts',postrouter)
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})



module.exports = app
