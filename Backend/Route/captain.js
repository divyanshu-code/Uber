const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const CaptainController = require('../Controllers/Captain_Controllers');
const { authenticateCaptain } = require('../Middlewares/Protected_route');

router.post('/register', [

    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    body('fullname.lastname').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vechicle.color').isLength({ min: 2 }).withMessage('Color must be at least 2 characters long'),
    body('vechicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vechicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vechicle.type').isIn(['car', 'motorcycle', 'auto']).withMessage('Type must be either car, motorcycle or auto'),

] , CaptainController.registerCaptain);


router.post('/login' , [

    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

] , CaptainController.loginCaptain);

 
router.get('/profile',authenticateCaptain  ,CaptainController.profile);

router.get('/logout', authenticateCaptain, CaptainController.logout);


module.exports = router;