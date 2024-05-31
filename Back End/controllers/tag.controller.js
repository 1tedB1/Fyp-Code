const catchAsync = require("../middlewares/catchAsync");
const Tag = require('../models/tag.model')

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;

const createTag = catchAsync(async (req, res) => {
    const { value } = req.body;
    const newTag = await Tag.create({
        value
    });

    console.log("New tag created:", newTag);
    res.status(201).json({
        success: true,
        message: "Tag created successfully",
        data: newTag
    });
})

module.exports.createTag = createTag;

module.exports.getAllTags = catchAsync(async (req, res) => {
    const tags = await Tag.find();
    res.status(200).json({
        success: true,
        message: "All tags fetched",
        data: tags
    });
})


// req1 = {
//     body: {
//        value:"ہارر"
//         // prevPart:""
//     }
// }
// req2 = {
//     body: {
//        value:"رومانوی"
//         // prevPart:""
//     }
// }
// req3 = {
//     body: {
//        value:"بولڈ"
//         // prevPart:""
//     }
// }

// res = {}

// createTag(req1,res)
// createTag(req2,res)
// createTag(req3,res)






