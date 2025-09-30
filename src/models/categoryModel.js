const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
    },
    categoryImage:{
        type:String,
        default:null,
    },
    creatorName:{
        type:String,
        required:true,
    },
    creatorEmail:{
        type:String,
        required:true,
    }
},{ timestamps: true })

module.exports = mongoose.model("category", Schema)