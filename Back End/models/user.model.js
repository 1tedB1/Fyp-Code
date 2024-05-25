//require mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let User = new Schema({
    name: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    dob: {
        type: Date,
        default: Date.now,
    },
    //give referennce to the account model
    blockedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'UserData',
    }],

    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'ArticleData',
    }],

}, { collection: 'user-data' }
);

//create a model and export it
module.exports = mongoose.model('UserData', User);