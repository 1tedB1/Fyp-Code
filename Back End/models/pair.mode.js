const mongoose = require('mongoose');


const Schema = mongoose.Schema;
// Define the article schema
const pairSchema = new mongoose.Schema({


    writer1: {
        type: Schema.Types.ObjectId,
        ref: 'userData',
        required: true
    },
    writer2: {
        type: Schema.Types.ObjectId,
        ref: 'userData',
        required: true
    },
    sharedWork: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }


} , {collection:"pair-data"}
);

;

// Export the article model
module.exports = mongoose.model('PairData', pairSchema);