const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pos: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
