const dotenv = require('dotenv')                          // it is used to set the dynamic port or we want to  set the port according to the environment.
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())                     

app.get('/' , (req , res)=>{
     res.send("hello");
     
})

module.exports= app;

