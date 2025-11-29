const express = require('express')
const authRoute = require('./api/auth')
const productRouter = require('./api/product')
const cartRouter = require('./api/cart')
const cuponRouter = require('./api/cupon')
const orderRouter = require('./api/order')
const route = express.Router()

route.use('/auth', authRoute)
route.use('/product', productRouter)
route.use('/cart', cartRouter)
route.use('/cupon', cuponRouter)
route.use('/order', orderRouter)

module.exports = route