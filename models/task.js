const mongoose = require('mongoose');

//Create task schema
const taskSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    dates: [{
        Status: {
            type: String,
            required: true,
            default: 'None',
            enum: ['None', 'Done', 'Not Done']
        },
        Date: {
            type: Date,
            default: Date.now,
            required: true
        }
    }],

    favourite: {
        type: Boolean,
        default: false
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;