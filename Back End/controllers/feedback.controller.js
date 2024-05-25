const catchAsync = require("../middlewares/catchAsync");
const feedback = require('../models/feedback.model')
// const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;


module.exports.createFeedback = catchAsync(async (req, res) => {
    console.log(req.body);
    const { rating, owner, targetContent, parentFeedback } = req.body;

    const newFeedback = await feedback.create({
        rating,
        owner,
        targetContent,
        parentFeedback
    });

    if (parentFeedback) {
        const parentFeedback = await feedback.findById(parentFeedback);
        parentFeedback.replies.push(newFeedback._id);
    }

    console.log("New feedback created:", newFeedback);
    res.status(201).json({
        success: true,
        message: "Feedback created successfully",
        data: newFeedback
    });
})

module.exports.removeFeedback = catchAsync(async (req, res) => {
    const { feedbackId } = req.body;
    const feedback = await feedback.findById(feedbackId);
    if (feedback) {
        if (feedback.parentFeedback) {
            const parentFeedback = await feedback.findById(feedback.parentFeedback);
            const index = parentFeedback.replies.indexOf(feedbackId);
            parentFeedback.replies.splice(index, 1);
            await parentFeedback.save();
        }
        if (feedback.replies.length > 0) {
            for (let i = 0; i < feedback.replies.length; i++) {
                const reply = await feedback.findById(feedback.replies[i]);
                await reply.remove()
            }
            await feedback.remove();
            res.status(200).json({
                success: true,
                message: "Feedback removed successfully"
            });
        }
    }
    else {
        return next(new ErrorHandler("Feedback not found", 404));
    }
})

module.exports.getFeedback = catchAsync(async (req, res) => {
    const { feedbackId } = req.body;
    const feedback = await feedback.findById(feedbackId);
    if (feedback) {
        res.status(200).json({
            success: true,
            data: feedback
        });
    }
    else {
        return next(new ErrorHandler("Feedback not found", 404));
    }
})

module.exports.getReplies = catchAsync(async (req, res) => {
    const { feedbackId } = req.body;
    const feedback = await feedback.findById(feedbackId);
    if (feedback) {
        const replies = [];
        for (let i = 0; i < feedback.replies.length; i++) {
            const reply = await feedback.findById(feedback.replies[i]);
            replies.push(reply);
        }
        res.status(200).json({
            success: true,
            data: replies
        });
    }
    else {
        return next(new ErrorHandler("Feedback not found", 404));
    }
}
)


