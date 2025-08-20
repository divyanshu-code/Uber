const express = require('express')
const router = express.Router();
const authmiddleware = require('../Middlewares/Protected_route');
const { getcoordinates }= require('../Controllers/Map_Controller');
const { query } = require('express-validator')

router.get('/get-coordinate' ,
     query('address').isString().isLength({ min:3 })
    ,authmiddleware.authenticateUser , getcoordinates )



module.exports = router ;