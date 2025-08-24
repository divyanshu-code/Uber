const express = require('express')
const router = express.Router();
const { body } = require('express-validator')
const ridecontroller = require('../Controllers/Ride_Controller')
const authmiddleware = require('../Middlewares/Protected_route');

router.post('/create',
    authmiddleware.authenticateUser ,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle'),
    
    ridecontroller.createride
)





module.exports = router;