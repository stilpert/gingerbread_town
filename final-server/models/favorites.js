// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var favoritesSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products:[{ type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'Product' }]
}, {
    timestamps: true
});

// make this available to our Node applications
module.exports = mongoose.model('Favorites', favoritesSchema);
