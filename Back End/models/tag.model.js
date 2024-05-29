const mongoose = require('mongoose');


const Schema = mongoose.Schema;
// Define the article schema
const tagSchema = new Schema({
    
    value:{
        type:String,
        required:true
    }


} , {collection:"tag-data"}
);

;

// Export the article model
module.exports = mongoose.model('TagData', tagSchema);