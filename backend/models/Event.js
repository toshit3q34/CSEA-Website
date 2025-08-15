const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    event_name: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
