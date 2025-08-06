const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');                  

const captainSchema = new mongoose.Schema({

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
        mathch: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },

    password: {
        type: String,
        required: true,
        select: false,                              // Do not share the password while finding the captain
    },

    socketId: {
        type: String,
        default: null,
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',

    },

    vechicle: {

        color: {
            type: String,
            required: true,
            minlength: [2, 'Color must be at least 2 characters long'],
        }
        ,
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
        },

        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },

        type: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },

    location: {

        lat: {
            type: Number,

        },

        lng: {
            type: Number,

        }
    }
});


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

captainSchema.statics.hashPassword = async function (password) {    
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = mongoose.model('captain', captainSchema);