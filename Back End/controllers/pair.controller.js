const catchAsync = require("../middlewares/catchAsync");
const Pair = require('../models/pair.model')

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;


const getAllPair = catchAsync(async (req, res) => {
    const pairs = await Pair.find();
    res.status(200).json({
        success: true,
        data: pairs
    });
})

module.exports.getAllPair = getAllPair

const cretaePair = catchAsync(async (req, res) => {
    const { writer1, writer2 } = req.body;
    console.log(writer1, writer2);
    const newPair = await Pair.create({
        writer1,
        writer2
    });

    console.log("New pair created:", newPair);
    res.status(201).json({
        success: true,
        message: "Pair created successfully",
        data: newPair
    });
})

module.exports.cretaePair = cretaePair

const deletePair = catchAsync(async (req, res) => {
    const { id } = req.body;
    const pair = await Pair.findByIdAndDelete(id);
    if (!pair) {
        return res.status(200).json({
            success: false,
            message: "Pair not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Pair deleted successfully"
    });
})


module.exports.deletePair = deletePair

const shareWorkInPair = catchAsync(async (req, res) => {
    const { owner, content, review, pairId } = req.body;
    const pair = await Pair.findById(pairId);
    // const te = {}
    
    pair.workShared.push({ owner, content, review });
    await pair.save();
    res.status(201).json({
        success: true,
        message: "Work shared successfully",
        data: "newWork"
    });
})


module.exports.shareWorkInPair = shareWorkInPair

// {
//     owner: '6654300b8ab9ce458b7dd990',
//     content: 'یہ کیسا ہے؟',
//     review: 'ssdfaf',
//     _id: '665c8a821ed65c9175d89f78',
//     pairId: '665c689720135ac77b97f4b9'
//   }

const addReviewToShareWork = catchAsync(async (req, res) => {
    const { pairId, review, content } = req.body;
    // console.log("body", req.body);
    const pair = await Pair.findById(pairId)
    // console.log("pair" , pair);
    let workSharedArray = pair.workShared
    let oneWeWant = workSharedArray.find((work) => work.content === content)
    // console.log("oww",oneWeWant);
    console.log(review);
    oneWeWant.review = review;
    await pair.save();
    res.status(201).json({
        success: true,
        message: "Review added successfully",
        data: "newWork"
    });
    // console.log("oww2",oneWeWant);
    // console.log("wr",work.review);
    // console.log(req.body);

})

module.exports.addReviewToShareWork = addReviewToShareWork


