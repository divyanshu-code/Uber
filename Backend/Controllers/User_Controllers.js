const usermodel = require('../Models/User_model')
const userservice = require('../Services/user_service')
const { validationResult } = require('express-validator');

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