const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    code:{
        type:Number,
        default:null,
    },
    codeTimeOut:{
        type:Date,
        default:null,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    avatar:{
        type:String,
        required:true,
    },
},{ timestamps: true })

module.exports = mongoose.model("user", authSchema)