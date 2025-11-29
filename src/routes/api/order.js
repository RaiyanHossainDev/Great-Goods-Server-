const express = require('express');
const { order } = require('../../controllers/orderCtrlr');
const jwtMiddleware = require('../../middlewares/jwt');
const accessors = require('../../middlewares/accessors');
const orderRouter = express.Router();

orderRouter.post('/placeOrder', jwtMiddleware, accessors(["client","staff","admin"]), order); //

module.exports = orderRouter;

