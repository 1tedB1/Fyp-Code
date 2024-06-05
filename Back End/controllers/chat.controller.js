const catchAsync = require("../middlewares/catchAsync");
const Chat = require('../models/chat.model')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const getAllChat = catchAsync(async (req, res) => {
    const chats = await Chat.find();
    res.status(200).json({
        success: true,
        data: chats
    });
});

module.exports.getAllChat = getAllChat;

const sendChat = catchAsync(async (req, res) => {
    let { to, from, text , dateAndTime} = req.body;
    dateAndTime = dateAndTime?dateAndTime:new Date();
    // console.log(dateAndTime);
    const newChat = await Chat.create({
        to,
        from,
        text,
        dateAndTime
        
    });

    console.log("New chat created:", newChat);
    res.status(201).json({
        success: true,
        message: "Chat sent successfully",
        data: newChat
    });
})
module.exports.sendChat = sendChat;

const deleteChat = catchAsync(async (req, res) => {
    const { id } = req.body;
    const chat = await Chat.findByIdAndDelete(id);
    if (!chat) {
        return res.status(200).json({
            success: false,
            message: "Chat not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Chat deleted successfully",
        data:chat
    });
})

module.exports.deleteChat = deleteChat;

const viewChat = catchAsync(async (req, res) => {
    const { id } = req.body;
    console.log(id);
    const chat = await Chat.findById(id);
    chat.viewd = true;
    await chat.save();
    res.status(200).json({
        success: true,
        message: "Chat viewed successfully",
        data : chat
    });
})
module.exports.viewChat = viewChat;

const editChat = catchAsync(async (req, res) => {
    const { id, text } = req.body;
    const chat = await Chat.findById(id);   
    chat.text = text;
    await chat.save();
    res.status(200).json({
        success: true,
        message: "Chat edited successfully",
        data:chat
    });
})
module.exports.editChat = editChat;


// let d = new Date(2025,5,3,13,12,25,985)
// console.log(d.getHours());
// res = {}
// req = {
//     body: {
//         from: "665bf48620135ac77b97f49b",
//         to: "665332e533b732d06d94ebe9",
//         text: "hello there!",
//         dateAndTime: new Date(2023, 5, 4, 13, 20, 51, 985)
//     }
// }

// req2 = {
//     body: {
//         to: "665332e533b732d06d94ebe9",
//         from: "665bf48620135ac77b97f49b",
//         text: "Yes!",
//         dateAndTime: new Date(2023, 5, 4, 13, 22, 51, 985)
//     }
// }

// req3 = {
//     body: {
//         from: "665bf48620135ac77b97f49b",
//         to: "665332e533b732d06d94ebe9",
//         text: "wassup!",
//         dateAndTime: new Date(2023, 5, 4, 13, 21, 51, 985)
//     }
// }

// req4 = {
//     body: {
//         to: "665332e533b732d06d94ebe9",
//         from: "665bf48620135ac77b97f49b",
//         text: "leave me alone",
//         dateAndTime: new Date(2023, 5, 4, 13, 23, 51, 985)
//     }
// }

// sendChat(req, res)
// sendChat(req2, res)
// sendChat(req3, res)
// sendChat(req4, res)
