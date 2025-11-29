const express = require('express')
const {register, linkVerification, resendLink, login, getCurrentUser, changeStaffToAdmin, deleteStaffAcc, deleteOwnAcc} = require('../../controllers/authController')
const jwtMiddleware = require('../../middlewares/jwt')
const accessors = require('../../middlewares/accessors')
const authRoute = express.Router()

authRoute.post('/register', register) //
authRoute.get('/:code',linkVerification) //
authRoute.post('/resendLink',resendLink) //
authRoute.post('/login',login) // 
authRoute.post('/currentUser',jwtMiddleware, getCurrentUser) //
authRoute.post("/changeStaffToAdmin",jwtMiddleware, accessors(["admin"]), changeStaffToAdmin) //
authRoute.delete("/deleteStaffAcc", jwtMiddleware, accessors(["admin"]), deleteStaffAcc) //
authRoute.delete("/deleteOwnAcc", jwtMiddleware, accessors(["admin","user"]), deleteOwnAcc) //


module.exports = authRoute