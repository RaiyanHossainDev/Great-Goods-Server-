const authModel = require("../models/authModel");
const categoryModel = require("../models/categoryModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const productModel = require("../models/productModel");
const { toSlug } = require("../helpers/allGenerators");

cloudinary.config({ 
        cloud_name: 'dmlolndhy', 
        api_key: '816873167382752', 
        api_secret: 'V7XIaNjdZTnXY01_upPcfdDmN3g' // Click 'View API Keys' above to copy your API secret
});

// ================= Add Category ==================
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

// ================= Add Product ==================
const addProduct = async (req,res) => {
    const {productName,productTag,productDescription,productPrice,discountPercentage,productCategory,stock,varient} = req.body;

    const discountPrice = (productPrice - (productPrice * (discountPercentage/100))).toFixed(2);
    const slug = toSlug(productName);
    
    const mainImage = await cloudinary.uploader
    .upload(
        req.files.mainImage[0].path, {
            public_id: `${Date.now()}`,
            folder: 'product/mainImage'
        }
    )
    .catch((error) => {
        console.log(error);
    });
    fs.unlink(req.files.mainImage[0].path, (err) => {
        if (err) console.log(err);
    });

    const subImages = await Promise.all(
        req.files.subImages.map( async (file) => {
            const uploadResult = await cloudinary.uploader
            .upload(
                file.path, {
                    public_id: `${Date.now()}`,
                    folder: 'product/subImages'
                }
            )
            .catch((error) => {
                console.log(error);
            });
            fs.unlink(file.path, (err) => {
                if (err) console.log(err);
            });

            return uploadResult.secure_url;
        })
    )
    
    
 

    await new productModel({
        productName,
        productTag,
        productDescription,
        thumbnailImage: mainImage.secure_url,
        subImages: subImages,
        slug,
        productPrice,
        discountPercentage: discountPercentage? discountPercentage : null,
        discountPrice: discountPrice ? discountPrice : null,
        productCategory,
        stock,
        varient: varient ? JSON.parse(varient) : [],
    }).save();

    res.status(201).send("product added")
}

// ================= Update Product ==================
const updateProduct = async (req,res) => {
    const {slug,productName,productTag,productDescription,productPrice,discountPercentage,productCategory,stock,varient} = req.body;

    // =================================================
    const product = await productModel.findOne({slug});
    if(!product) return res.status(404).send("product not found");

    if(productName) {
        product.productName = productName;
        product.slug = toSlug(productName);
    }
    // =====
    if(productTag) product.productTag = productTag;
    // =====
    if(productDescription) product.productDescription = productDescription;
    // =====
    if(productPrice) {
        product.productPrice = productPrice;
        if(!discountPercentage) product.discountPrice = (productPrice - (productPrice * (product.discountPercentage/100))).toFixed(2);
    }
    // =====
    if(discountPercentage) {
        product.discountPercentage = discountPercentage;
        if(!productPrice) product.discountPrice = (product.productPrice - (product.productPrice * (discountPercentage/100))).toFixed(2);
    }
    // =====
    if(discountPercentage && productPrice) {
        product.discountPrice = (productPrice - (productPrice * (discountPercentage/100))).toFixed(2);
    }
    // =====
    if(productCategory) product.productCategory = productCategory;
    // =====
    if(stock) product.stock = stock;
    // =====
    if(varient) product.varient = JSON.parse(varient);
    // ====== main image ======
    if(req.files?.mainImage) {
        const imageLocation = product.thumbnailImage.split("/").slice(7).join("/").split(".")[0];
        await cloudinary.uploader.destroy(imageLocation);
        const mainImage = await cloudinary.uploader
        .upload(
            req.files.mainImage[0].path, {
                public_id: Date.now(),
                folder: 'product/mainImage'
            }
        )
        .catch((error) => {
            console.log(error);
        });
        fs.unlink(req.files.mainImage[0].path, (err) => {
            if (err) console.log(err);
        });
        product.thumbnailImage = mainImage.secure_url;
    }
    // ====== sub images ======
    if(req.files?.subImages) {
        product.subImages.map( async (img) => {
            const imageLocation = img.split("/").slice(7).join("/").split(".")[0];
            await cloudinary.uploader.destroy(imageLocation);
        })
        const subImages = await Promise.all(
            req.files.subImages.map( async (file) => {
                const uploadResult = await cloudinary.uploader
                .upload(
                    file.path, {
                        public_id: `${Date.now()}`,
                        folder: 'product/subImages'
                    }
                )
                .catch((error) => {
                    console.log(error);
                });
                fs.unlink(file.path, (err) => {
                    if (err) console.log(err);
                });

                return uploadResult.secure_url;
            })
        )
        product.subImages = subImages;
    }


    // ====== saving the model ======
    await product.save();

    res.status(200).send("product updated")

}
// ================= Admin Approval ==================
const adminApproval = async (req,res) => {
    const {slug,status} = req.body;

    if(status !== "approved" && status !== "reject") return res.status(400).send("status must be 'approved' or 'rejected'");


    const product = await productModel.findOne({slug});
    if(!product) return res.status(404).send("product not found");

    product.adminApproval = status;
    await product.save();

    res.status(200).send("product status updated")
}
// ================= give review ==================
const giveReview = async (req,res) => {
    const {slug,reviewer,comment,rating} = req.body;

    if(!slug || !reviewer || !comment || !rating) return res.status(400).send("all fields are required");
    if(rating < 1 || rating > 5) return res.status(400).send("rating must be between 1 and 5");

    const product = await productModel.findOne({slug});
    if(!product) return res.status(404).send("product not found");

    product.review.push({reviewer,comment,rating,date:new Date().toLocaleDateString()});
    await product.save();

    res.status(200).send("review added")   
}
// ================= Get Product Details ==================
const getSingleProduct = async (req,res) => {
    const {slug} = req.params;
    if(!slug) return res.status(400).send("slug is required");

    const product = await productModel.findOne({slug}).populate("productCategory").populate("review.reviewer", "username email");
    if(!product) return res.status(404).send("product not found");

    res.status(200).send(product);
}
// ================= Get All Products ==================
const getAllProducts = async (req,res) => {
    let {searchKey,limit,pageNo} = req.query;
    let isPrev,isNext = false;
    // ================================================
    limit = limit || 4;
    pageNo = pageNo || 1;
    const keyRegex = new RegExp(searchKey, 'i');
    const skip = (pageNo - 1) * limit;
    // ================================================
    const products = await productModel.countDocuments({productName:{$regex:keyRegex}});
    const pageNumber = Math.ceil(products/limit);
    pageNumber > pageNo ? isNext = true : isNext = false;
    pageNo > 1 ? isPrev = true : isPrev = false;

    const refiendProducts = await productModel.find({productName:{$regex:keyRegex}}).populate("review.reviewer", "username email").limit(limit).skip(skip);
    res.status(200).send({products:refiendProducts,currentPage:pageNo,isPrev,isNext,totalPages:pageNumber,limit,});    
}
// =============================== Delete Product ==================
const deleteProduct = async (req,res) => {
    const {id } = req.body;
    if(!id) return res.status(400).send("product id is required");

    const product = await productModel.findById(id);
    if(!product) return res.status(404).send("product not found");
    // ====== deleting images from cloudinary ======
    const mainImageLocation = product.thumbnailImage.split("/").slice(7).join("/").split(".")[0];
    await cloudinary.uploader.destroy(mainImageLocation);

    Promise.all(
        product.subImages.map( async (img) => {
            const imageLocation = img.split("/").slice(7).join("/").split(".")[0];
            await cloudinary.uploader.destroy(imageLocation);
        })
    )
    // ====== deleting product from database ======
    await productModel.findByIdAndDelete(id);

    res.status(200).send("product deleted")
}
// ==================================================
module.exports = {addCategory , addProduct , updateProduct, adminApproval, giveReview, getSingleProduct, getAllProducts, deleteProduct};