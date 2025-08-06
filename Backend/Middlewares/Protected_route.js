const usermodel = require('../Models/User_model')
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../Models/Blacklist_token_model');

module.exports.authenticateUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] ;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorizied access' });
    }

    const blacklistedToken = await usermodel.findOne({ token: token });

    if (blacklistedToken) {
        return res.status(401).json({ message: 'Unauthorizied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded._id)

        req.user = user;
        return next();

    } catch (error) {
        return res.status(400).json({ message: 'Unauthorizied' });
    }
}