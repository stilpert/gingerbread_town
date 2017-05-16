// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var photoSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: true        
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required:true,       
    }
}, 
    {
    timestamps: true
    }
);

// the schema is useless so far
// we need to create a model using it
var Photos = mongoose.model('Photo', photoSchema);

// make this available to our Node applications
module.exports = Photos;