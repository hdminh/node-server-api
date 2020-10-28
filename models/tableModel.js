const mongoose = require('mongoose');


const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill table name']
    },
    user: {
        type: String,
        required: [true, 'Please fill user id']

    },
    wentWell: {
        type: Array

    },
    toImprove: {
        type: Array

    },
    actionItems: {
        type: Array

    }
});

const Table = mongoose.model('table', tableSchema);
module.exports = Table;