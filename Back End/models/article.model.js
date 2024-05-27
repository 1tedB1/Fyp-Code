const mongoose = require('mongoose');

// Define the article schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
    }],

    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
    }],

    views:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
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

}, {collection:"article-data"}
);

;

// Export the article model
module.exports = mongoose.model('ArticleData', articleSchema);