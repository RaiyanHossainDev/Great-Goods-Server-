const express = require('express')
const {register, linkVerification, resendLink, login, getCurrentUser} = require('../../controllers/authController')
const jwtMiddleware = require('../../middlewares/jwt')
const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.get('/:code',linkVerification)
authRoute.post('/resendLink',resendLink)
authRoute.post('/login',login)
authRoute.get('/currentUser', getCurrentUser)


module.exports = authRoute