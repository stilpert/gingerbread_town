var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
//.all(Verify.verifyOrdinaryUser, Verify.verifyAdmin)

.get(Verify.verifyOrdinaryUser, function(req,res,next){

    
    Favorites.findOne({ postedBy : req.decoded._id })
        .populate('postedBy')
        .populate('products')
        .populate('products.comments')
        .exec( function(err, favorite) {
            if (err) next (err);
            res.json(favorite);
        });
})


// Save a favorite product for this user
.post(Verify.verifyOrdinaryUser, function(req, res, next){

  var userId = req.decoded._id;

  Favorites.findOneAndUpdate(
      { postedBy : userId }, // get the favorites for this user
      { $addToSet: { products: req.body }}, 
      { upsert: true, // create a favorites list for this user if not already existing
       new: true },  // return the updated document
      function ( err, favorite ) {
          if (err) next (err);

          if(favorite.products.indexOf(req.body._id)<0){
            favorite.products.push(req.body._id);
          }

          favorite.save(function(err, favorite){
          if (err) next (err);

          console.log('Updated Favorite!');
          res.json(favorite);
          })
          
      });
})

// Retrieve favorites associated with user


// Delete all favorites for this user
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOneAndRemove({postedBy: req.decoded._id}, function (err, resp) {
        if (err) next (err);
        // returns the deleted object
        res.json(resp);
    });
});

favoriteRouter.route('/:productId')
.all(Verify.verifyOrdinaryUser)

// Delete a specific favorite for this user
.delete(function (req, res, next) {
        // look for an object with the favorites of current user
        // if found, remove from the favorites the product specified as param
        Favorites.findOne({postedBy:req.decoded._id}, function (err, favorites) {

        if(err) {
          var err = new Error('Favorites not found for current user');
          err.status = 404;
          return next(err);
        }

        // Look for the product ID to be removed
        var index= favorites.products.indexOf(req.params.productId);
        console.log(favorites)
        if(index>=0) {
          favorites.products.splice(index,1);
        }
        else {
          var err = new Error('Product not found in favorites');
          err.status = 404;
          return next(err);
        }

        favorites.save(function (err, resp) {
            if (err) throw err;

            // returns the remaining objects
            res.json(resp);
        });
      });
});

module.exports = favoriteRouter;