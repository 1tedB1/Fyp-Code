const mongoose = require("mongoose");
const { collection } = require("./pair.model");

const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
    to:{
        type:Schema.Types.ObjectId,
        ref:'userData',
        required:true
    },
    from:{
        type:Schema.Types.ObjectId,
        ref:'userData',
        required:true
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:'userData',
        required:true
    },
    dateAndTime:{
        type:Date,
        default:Date.now
    },
    text:{
        type:String,
        required:true
    
    },
    viewd:{
        type:Boolean,
        default:false
    }


},{collection:"chat-data"});

module.exports = mongoose.model('chatData',chatSchema);