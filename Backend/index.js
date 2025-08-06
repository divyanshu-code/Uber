const dotenv = require('dotenv')                          // it is used to set the dynamic port or we want to  set the port according to the environment.
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./db/db')
const userRoutes = require('./Route/user')
const captainRoutes = require('./Route/captain')
const cookie = require('cookie-parser')

connectDB()                                         // connect to the database

app.use(cors())
app.use(express.json())                            // it is used to parse the json data from the request body
app.use(express.urlencoded({ extended: true }))    // it is used to parse the urlencoded data from the request body      
app.use(cookie())                                  // it is used to parse the cookies from the request headers

app.get('/', (req, res) => {
     res.send("hello");
})

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)

module.exports = app;

