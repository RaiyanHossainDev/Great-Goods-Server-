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
        type:Number,
        default:null,
    },
    address:{
        type:String,
        default:null,
    },
    code:{
        type:String,
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
    role:{
        type:String,
        default:"user",
        enum:["client","admin","staff"]
    }
},{ timestamps: true })

module.exports = mongoose.model("user", authSchema)