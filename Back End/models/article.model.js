const mongoose = require('mongoose');

// Define the article schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    views:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    prevPart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticleData',
    },

    nextPart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticleData',
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedbackData',
    }],

});

;

// Export the article model
module.exports = mongoose.model('ArticleData', articleSchema);