const usermodel = require('../Models/User_model')
const userservice = require('../Services/user_service')
const { validationResult } = require('express-validator');
const BlacklistToken = require('../Models/Blacklist_token_model');

module.exports.registerUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashedPassword = await usermodel.hashPassword(password);

    const user = await userservice.createuser({
        firstname: fullname.firstname,                            //  fullname sets as a object in the User model that's why we have to access the firstname and lastname separately.
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user })

}

module.exports.login = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await usermodel.findOne({email}).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token)

    res.status(200).json({ token, user });

}

module.exports.profile = async (req, res) => {

    res.status(200).json(req.user);         

}

module.exports.logout = async (req, res) => {

    res.clearCookie('token');                

    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    await BlacklistToken.create({ token });

    res.status(200).json({ message: 'Logout successful' });

}