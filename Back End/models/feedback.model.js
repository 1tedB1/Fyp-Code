const mongoose = require('mongoose');


const Schema = mongoose.Schema;
// Define the article schema
const FedbackSchema = new Schema({
   

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'UserData',
        required: true
    },

    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'FeedbackData',
    }],

    rating: {
        type: Number,
        
    },

    targetContent:{
        type: Schema.Types.ObjectId,
        ref: 'ArticleData',
        required: true
    },
    
    parentFeedback: {
        //if any
        type: Schema.Types.ObjectId,
        ref: 'FeedbackData',
    },
    content:{
        type:String
    }

}, {collection:"feedback-data"}
);

;

// Export the article model
// const FeedbackData = mongoose.model("FeedbackData",FedbackSchema )
// console.log("FeedbackData", FeedbackData);
// console.log("herer");
// Object.keys(mongoose.models).forEach(modelName => {
//     console.log(modelName);
// });
// module.exports.FeedbackData = FeedbackData;
// module.exports = mongoose.model('UserData', User);
module.exports = mongoose.model('FeedbackData', FedbackSchema);