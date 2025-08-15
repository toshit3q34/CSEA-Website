const mongoose = require('mongoose');

const internExpSchema = new mongoose.Schema({
    internName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

const InternExp = mongoose.model('InternExp', internExpSchema);

module.exports = InternExp;