const express = require('express')
const router = express.Router()
const authmiddleware = require('../middleware/auth.middleware')
const postcontroller = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})

router.post('/',authmiddleware,upload.single('image'),postcontroller)


module.exports = router