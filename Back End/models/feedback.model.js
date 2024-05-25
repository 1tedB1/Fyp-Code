const mongoose = require('mongoose');


const Schema = mongoose.Schema;
// Define the article schema
const FedbackSchema = new mongoose.Schema({
   

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'UserData',
        required: true
    },

    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'FeedbackData',
    }],

    rating: {
        type: Number,
        required: true
    },

    targetContent:{
        type: Schema.Types.ObjectId,
        ref: 'ArticleData',
        required: true
    },
    
    parentFeedback: {
        //if any
        type: Schema.Types.ObjectId,
        ref: 'FeedbackData',
    },

});

;

// Export the article model
module.exports = mongoose.model('FeedbackData', articleSchema);