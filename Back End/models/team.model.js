const mongoose = require('mongoose');


const Schema = mongoose.Schema;
// Define the article schema
const teamSchema = new mongoose.Schema({


    members: [{
        type: Schema.Types.ObjectId,
        ref: 'UserData',
        required: true
    }],
    sharedWork: [{
        content:String,
        title:String,
    }],
    name: {
        type: String,
        required: true
    },


} , {collection:"team-data"}
);

;

// Export the article model
module.exports = mongoose.model('TeamData', teamSchema);