const express = require('express');
const { addToCart, deleteFromCart, getCartProducts, updateQty } = require('../../controllers/cartCtrlr');
const cartRouter = express.Router();

cartRouter.post('/addToCart', addToCart) //
cartRouter.delete('/deleteFromCart', deleteFromCart) //
cartRouter.get('/getCartProducts/:userId', getCartProducts) //
cartRouter.patch('/updateQty', updateQty) //

module.exports = cartRouter