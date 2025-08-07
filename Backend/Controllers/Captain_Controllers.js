const captainmodel = require('../Models/Captain_model')
const captainservice = require('../Services/captain_service')
const { validationResult } = require('express-validator');
const BlacklistToken = require('../Models/Blacklist_token_model');

module.exports.registerCaptain = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vechicle } = req.body;

    const iscaptainExists = await captainmodel.findOne({ email });
    if (iscaptainExists) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashedPassword = await captainmodel.hashPassword(password);

    const captain = await captainservice.createcaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vechicle.color,
        plate: vechicle.plate,
        capacity: vechicle.capacity,
        type: vechicle.type
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainmodel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: 'Invalid email' });
    }


    const isPasswordValid = await captain.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}

module.exports.profile = async (req, res) => {
    
     res.status(200).json( req.captain );
}

module.exports.logout = async (req, res) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await BlacklistToken.create({ token });
     
    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });

}