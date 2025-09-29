const express = require('express')
const {register, linkVerification, resendLink, login} = require('../../controllers/authController')
const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.get('/:code',linkVerification)
authRoute.post('/resendLink',resendLink)
authRoute.post('/login',login)

module.exports = authRoute