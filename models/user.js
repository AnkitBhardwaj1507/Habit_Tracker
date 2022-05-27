const mongoose = require('mongoose');

//Create user Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        reuired: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    
    view: {
        type: String,
        default: 'daily',
        enum: ['daily', 'weekly']
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;