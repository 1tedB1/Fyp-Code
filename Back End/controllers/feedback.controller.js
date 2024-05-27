const catchAsync = require("../middlewares/catchAsync");
const Feedback = require('../models/feedback.model')
// const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// console.log("feedback ", Feedback);

const createFeedback = catchAsync(async (req, res) => {
    console.log(req.body);
    const { rating, owner, targetContent, parentFeedback } = req.body;

    const newFeedback = await Feedback.create({
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

module.exports.createFeedback = createFeedback;

module.exports.removeFeedback = catchAsync(async (req, res) => {
    const { feedbackId } = req.body;
    const feedback = await Feedback.findById(feedbackId);
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

const getFeedback = catchAsync(async (req, res) => {
    const { feedbackId } = req.body;
    console.log("getFeedback");
    try{
    const feedback = await Feedback.findById(feedbackId);
    if (feedback) {
        res.status(200).json({
            success: true,
            data: feedback
        });
        console.log("feedback", feedback);
    }
    else {
        return next(new ErrorHandler("Feedback not found", 404));
    }}catch(e){
        console.log(e);
    }
})
module.exports.getFeedback = getFeedback;
module.exports.getReplies = catchAsync(async (req, res) => {
    const { feedbackId } = req.body;
    try{
    const feedback = await Feedback.findById(feedbackId);
    console.log(feedback);
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
    }}catch(e){
        console.log(e);
    }
}
)


const req = {
    // const { rating, owner, targetContent, parentFeedback } = req.body;
    body:{
        // rating:5,
        // owner: "665332e533b732d06d94ebe9",
        // targetContent: "6653331bbca915d33fa27a2b",
        feedbackId:"665337b4d49d8b3a324b626b"
    }
}

const getAllFeedback = catchAsync(async (req, res) => {
    const feedbacks = await Feedback.find().populate(
        {
            path:"owner"
        }
    ).populate(
        {
            path:"replies"
        }
    ).populate(
        {
            path:"targetContent"
        }
    ).populate(
        {
            path:"parentFeedback"
        }
    );
    res.status(200).json({
        success: true,
        data: feedbacks
    });
})
module.exports.getAllFeedback = getAllFeedback;
const res = {}

// getFeedback(req, res)
// console.log("done");
