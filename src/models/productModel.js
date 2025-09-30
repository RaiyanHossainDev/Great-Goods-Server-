const e = require("express")
const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    productName:{type:String, required:true},
    productTag:{type:String, default:null},
    productDescription:{type:String, required:true},
    thumbnailImage:{type:String, required:true},
    subImages:{type:Array, default:[]},
    productPrice:{type:String, required:true},
    review:[{
        reviewer:{type:String,default:null},
        comment:{type:String,default:null},
        rating:{type:String,default:null},
        date:{type:Date,default:null},
    }],
    adminApproval:{type:String, default:"pending", enum:["pending","approved","rejected"]},
    discountPrice:{type:Number, default:null},
    discountPercentage:{type:String, default:null},
    slug:{type:String, required:true, unique:true},
    productCategory:{type:mongoose.Schema.ObjectId, required:true, ref:"category"},
    stock:{type:String, required:true},
    varient:[
        {
            title:{type:String, default:null, enum:["size","color",]},
            value:{type:String, default:null},
            additionalPrice:{type:String, default:null},
        }
    ]
},{ timestamps: true })

module.exports = mongoose.model("product", Schema)