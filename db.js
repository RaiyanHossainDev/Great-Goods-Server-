const mongoose = require("mongoose")

const db = ()=>{
    mongoose.connect(process.env.db_connection)
    .then(()=>console.log("db connected"))
    .catch((err)=>console.log(err))
}

module.exports = db