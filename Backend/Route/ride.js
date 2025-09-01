const express = require('express')
const router = express.Router();
const { body , query } = require('express-validator')
const ridecontroller = require('../Controllers/Ride_Controller')
const authmiddleware = require('../Middlewares/Protected_route');

router.post('/create',
    authmiddleware.authenticateUser ,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle'),
    
    ridecontroller.createride
)

router.get('/get-fare' ,
    authmiddleware.authenticateUser ,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),

    ridecontroller.getfare
)

router.post('/confirm' , 
    authmiddleware.authenticateCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),

    ridecontroller.confirmride
)

router.get('/start-ride' , 
    authmiddleware.authenticateCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    query('otp').isString().isLength({ min: 6 , max:6 }).withMessage('Invalid otp'),

    ridecontroller.startride
)

router.post('/end-ride' ,
    authmiddleware.authenticateCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),

    ridecontroller.endride
)


module.exports = router;