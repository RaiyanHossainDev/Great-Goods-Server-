const express = require('express');
const { addCategory, addProduct, updateProduct, adminApproval, giveReview, getSingleProduct } = require('../../controllers/productCtrlr');
const jwtMiddleware = require('../../middlewares/jwt');
const accessors = require('../../middlewares/accessors');
const productRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const multipleUpload = upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImages', maxCount: 6}])

productRouter.post('/addcategory', jwtMiddleware, accessors(['staff',"admin"]), upload.single('categoryImage'), addCategory )
productRouter.post("/addproduct", jwtMiddleware , accessors(["staff","admin"]), multipleUpload, addProduct)
productRouter.post("/updateProduct", jwtMiddleware , accessors(["staff","admin"]), multipleUpload, updateProduct)
productRouter.post("/adminApproval", jwtMiddleware , accessors(["admin"]), adminApproval)
productRouter.post("/giveReview", jwtMiddleware , accessors(["user","admin","staff"]), giveReview)
productRouter.post("/getSingleProduct/:slug", getSingleProduct)

module.exports = productRouter;