const mongoose = require('mongoose');


const Schema = mongoose.Schema;
// Define the article schema
const teamSchema = new mongoose.Schema({


    members: [{
        type: Schema.Types.ObjectId,
        ref: 'userData',
        required: true
    }],
    sharedWork: [{
        type: Schema.Types.ObjectId,
        ref: 'ArticleData',
    }],
    teamName: {
        type: String,
        required: true
    },


});

;

// Export the article model
module.exports = mongoose.model('FeedbackData', articleSchema);