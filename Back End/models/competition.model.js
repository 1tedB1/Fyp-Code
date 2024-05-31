const mongoose = require('mongoose');


const Schema = mongoose.Schema;
// Define the article schema
const competitionSchema = new Schema({

    // start date, end date, participants,entries, winner, name, description,  prize, competition status

    // create above fields for the mongoose schema
    // start date
    startDate: {
        type: Date,
        required: true
    },
    // end date
    endDate: {
        type: Date,
        required: true
    },
    // participants
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData'
    }],
    entries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticleData'
    }],
    // winner
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData'
    },
    // name
    name: {
        type: String,
        required: true
    },
    // description
    description: {
        type: String,
        required: true
    },
    // prize
    prize: {
        type: String,
        required: true
    },
    // competition status
    status: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TagData'
    }]
    // entries

}, { collection: "Competition-data" }
);

;

// Export the article model
module.exports = mongoose.model('CompetitionData', competitionSchema);