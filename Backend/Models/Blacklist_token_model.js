const mongoose = require('mongoose');

const BlacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400                                                          // 24 hours TTL i.e. the token will be deleted after 24 hours (time to live)
    }                            
});

module.exports = mongoose.model('BlacklistToken', BlacklistTokenSchema);