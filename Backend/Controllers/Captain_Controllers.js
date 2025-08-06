const captainmodel = require('../Models/Captain_model')
const captainservice = require('../Services/captain_service')
const { validationResult } = require('express-validator');

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

