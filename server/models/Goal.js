const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    goalType: {
        type: String,
        required: true,
    },
    targetValue: {
        type: Number,
        required: true,
    },
    currentValue: {
        type: Number,
        default: 0,
    },
    timeFrame: {
        type: String,
        enum: ['weekly', 'monthly'],
        required: true,
    },
    progress: {
        type: String,
        default: 'incomplete',
    },
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
