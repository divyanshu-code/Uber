const express = require('express')
const router = express.Router();
const authmiddleware = require('../Middlewares/Protected_route');
const { getcoordinates } = require('../Controllers/Map_Controller');
const { getdistance } = require('../Controllers/Map_Controller')
const { getsuggestion } = require('../Controllers/Map_Controller')
const { query } = require('express-validator')

router.get('/get-coordinate',
      query('address').isString().isLength({ min: 3 })
      , authmiddleware.authenticateUser, getcoordinates)

router.get('/get-distance-time',
      query('origin').isString().isLength({ min: 3 }),
      query('destination').isString().isLength({ min: 3 })
      , authmiddleware.authenticateUser, getdistance)

router.get('/get-suggestion',
      query('input').isString().isLength({ min: 3 }),
      authmiddleware.authenticateUser, getsuggestion)



module.exports = router;