const catchAsync = require("../middlewares/catchAsync");
const PairRequest = require('../models/pairRequest.model')
const jwt = require('jsonwebtoken');

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;


const createPairRequest = catchAsync(async (req, res) => {
    // sender, receiver, accepted, createdAt
    let { sender, receiver, accepted } = req.body;
    accepted = false; 
    //check if there exists a pair request with same sender and reciever
    const pairRequest = await PairRequest.findOne({ sender, receiver });
    if (pairRequest) {
        res.status(201).json({
            success: false,
            message: "Pair request exists",
            data: pairRequest
        });
        return;
    }
    const newPairRequest = await PairRequest.create({
        sender,
        receiver,
        accepted,
    });

    console.log("New pair request created:", newPairRequest);
    res.status(201).json({
        success: true,
        message: "Pair request created successfully",
        data: newPairRequest
    });

});

const getPairRequestByUserId = catchAsync(async (req, res) => {
    let userId = req.body.token;
    // console.log(req);
    userId = jwt.verify(userId, "andazebayan");
    const pairRequest = await PairRequest.find({ $or: [{ receiver: userId }, { sender: userId }] }).populate(
        {
            path: 'sender',

        }
    ).populate(
        {
            path: 'receiver',

        }
    );
    if (pairRequest) {
        // console.log("Pair request found:", pairRequest);
        res.status(200).json({
            success: true,
            message: "Pair request found successfully",
            data: pairRequest
        });
    }
    else {
        res.status(200).json({
            success: false,
            message: "Pair request not found",
            data: null
        });
    }
});

// const updatePairRequest = (req, res) => {

// };

const deletePairRequest = catchAsync( async (req, res) => {
    const id = req.body.pairRequestId;
    console.log("id",id)
    // pr = PairRequest.findById(id)
    // console.log(pr);
    await PairRequest.findByIdAndDelete(id)
    // console.log("pr",pr);
    // pr.remove()
    // console.log(pr);
    res.status(200).json({
        success: true,
        message: "Pair request deleted successfully",
        data: null
    });

});

// Export the controller functions
module.exports = {
    createPairRequest,
    getPairRequestByUserId,
    // updatePairRequest,
    deletePairRequest,
};


// req = {
//     body: {
//         sender: "665332e533b732d06d94ebe9",
//         receiver: "6654300b8ab9ce458b7dd990",
//         accepted: false
//     }
// }
// res = {}

// createPairRequest(req, res)