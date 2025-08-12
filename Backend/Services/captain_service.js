const captainmodel = require('../Models/Captain_model');

module.exports.createcaptain = async ({ firstname, lastname, email, password , color , plate , capacity , type }) => {

    if (!firstname || !email || !password || !color || !plate || !capacity || !type) {
        throw new Error('All fields are required');
    }

    const captain = await captainmodel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            type
        }
    });

    return captain;
}