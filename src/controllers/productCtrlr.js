const authModel = require("../models/authModel");
const categoryModel = require("../models/categoryModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const productModel = require("../models/productModel");

cloudinary.config({ 
        cloud_name: 'dmlolndhy', 
        api_key: '816873167382752', 
        api_secret: 'V7XIaNjdZTnXY01_upPcfdDmN3g' // Click 'View API Keys' above to copy your API secret
});

const addCategory = async (req,res) => {
    const {categoryName} = req.body;
    if(!categoryName) return res.status(400).send("category name is required");

    const existingCategory = await categoryModel.findOne({categoryName:categoryName});
    if(existingCategory) return res.status(400).send("category already exists");

    const creator = await authModel.findOne({email:req.user.email});

    const uploadResult = await cloudinary.uploader
    .upload(
        req.file.path, {
            public_id: 'category/'+Date.now(),
        }
    )
    .catch((error) => {
        console.log(error);
    });

    fs.unlink(req.file.path, (err) => {});

    new categoryModel({
        categoryName:categoryName,
        categoryImage:uploadResult.secure_url,
        creatorName:creator.username,
        creatorEmail:creator.email
    }).save();

    res.status(201).send("category added")
} 


const addProduct = async (req,res) => {
    const {varient} = req.body;

    // await new productModel({
    //     varient:varient,
    // }).save()

    res.send(req.files)
}

module.exports = {addCategory , addProduct};