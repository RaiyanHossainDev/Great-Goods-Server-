const express = require('express');
const { createCupon, updateCupon, deleteCupon } = require('../../controllers/cuponCtrlr');
const jwtMiddleware = require('../../middlewares/jwt');
const accessors = require('../../middlewares/accessors');
const cuponRouter = express.Router();

cuponRouter.post('/createCupon',jwtMiddleware, accessors(["admin"]), createCupon) //
cuponRouter.patch('/updateCupon',jwtMiddleware, accessors(["admin"]), updateCupon) //
cuponRouter.delete('/deleteCupon',jwtMiddleware, accessors(["admin"]), deleteCupon) //

module.exports = cuponRouter;