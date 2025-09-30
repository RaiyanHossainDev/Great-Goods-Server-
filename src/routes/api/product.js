const express = require('express');
const { addCategory, addProduct } = require('../../controllers/productCtrlr');
const jwtMiddleware = require('../../middlewares/jwt');
const accessors = require('../../middlewares/accessors');
const productRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const multipleUpload = upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImages', maxCount: 8 }])

productRouter.post('/addcategory', jwtMiddleware, upload.single('categoryImage'), addCategory )
productRouter.post("/addproduct", jwtMiddleware , multipleUpload, addProduct)

module.exports = productRouter;