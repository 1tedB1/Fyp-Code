const mongoose = require('mongoose');

// Define the schema for the pair request
const pairRequestSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    accepted:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{collection:"pair-requests-data"});

// Create the model for the pair request
const PairRequest = mongoose.model('PairRequest', pairRequestSchema);

module.exports = PairRequest;