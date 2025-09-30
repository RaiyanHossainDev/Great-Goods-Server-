const express = require('express')
const authRoute = require('./api/auth')
const productRouter = require('./api/product')
const route = express.Router()

route.use('/auth', authRoute)
route.use('/product', productRouter)

module.exports = route