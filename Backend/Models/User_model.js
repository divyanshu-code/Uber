const mongoose = require('mongoose');
const bcrypt = require('bcrypt');                  // for hashing passwords
const jwt = require('jsonwebtoken');              // for generating JWT tokens

const UserSchema = new mongoose.Schema({

    fullname: {

        firstname: {
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters long'],

        },

        lastname: {
            type: String,
            required: true,
            minlength: [2, 'Last name must be at least 2 characters long'],
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },

    password: {
        type: String,
        required: true,
        select: false,                       // Do not share the password while find the user
    },

    socketId: {                            // it is used to store the socket id of the user that is used for real-time communication where captain and user can chat with each other.
        type: String,
        default: null,
    }

})

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

UserSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = mongoose.model('user', UserSchema);

