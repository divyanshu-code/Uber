const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User_Controllers');
const { body }  = require('express-validator');
const { authenticateUser } = require('../Middlewares/Protected_route');
 
// express-validator middleware to validate user input it means it will check the user input and if it is not valid then it will return the error message. but if we want to perform the action then it will go under UserController.registerUser.

router.post('/register', [

       body('email').isEmail().withMessage('Please enter a valid email'),
       body('fullname.firstname').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
       body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
] , UserController.registerUser);          

router.post('/login',[

       body('email').isEmail().withMessage('Please enter a valid email'),
       body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

], UserController.login);                                                                        // Assuming you have a loginr method in UserController


router.get('/profile', authenticateUser,UserController.profile); 

router.get('/logout', authenticateUser,UserController.logout); 

module.exports = router;  