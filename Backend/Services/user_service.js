const usermodel = require('../Models/User_model');

module.exports.createuser= async ({ firstname , lastname, email, password }) => {

       if (!firstname || !email || !password) {
            throw new Error('All fields are required');
       }

       const user = await usermodel.create({
            fullname: {
                 firstname,
                 lastname
            },
            email,
            password,
       })

       return user;

    }