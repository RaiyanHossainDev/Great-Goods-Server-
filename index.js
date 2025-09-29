// ======================== requires
const express = require('express')
const cors = require('cors')
const  route  = require('./src/routes/routes')
const db = require('./db')
require('dotenv').config()

// ======================== variables
const app = express()
const port = 8000

// ======================= middlewares
app.use(express.json())
app.use(cors())
app.use(route)
db()

console.log("run ho na plsssadads")
// ======================= running server
app.listen(port, (err)=>{
    if(err) return console.log(err)
    console.log(`the server is running at port ${port}`)
})