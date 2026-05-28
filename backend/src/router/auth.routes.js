const express = require('express')
const router = express.Router()
const {registercontroller,logincontroller} = require('../controllers/auth.controller')

router.post('/register',registercontroller)
router.post('/login',logincontroller)

module.exports = router
