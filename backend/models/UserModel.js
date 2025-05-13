const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,  // This allows multiple documents with null values
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});

module.exports = mongoose.model('User', UserSchema);