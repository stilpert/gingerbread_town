var express = require('express');
var bodyParser = require('body-parser');	
var morgan = require('morgan');
var mongoose = require('mongoose');

var Photos = require('../models/photos')


var photoRouter = express.Router();
photoRouter.use(bodyParser.json());
photoRouter.route('/')



.get(function(req, res, next){
	
	Photos.find(req.query)
	 .exec(function(err, photo) {
		if(err) next (err);
		res.json(photo);
	});

})

.post(function(req, res, next){
	
	Photos.create(req.body, function (err, photo) {
		if (err) next (err);

		console.log('photo created!');
		var id = photo._id;
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		res.end('Added the photo with id: ' + id);
	});
})

.delete(function(req, res, next) {
	Photos.remove({}, function(err, resp) {
		if (err) next (err);
		res.json(resp);
	})
});



photoRouter.route('/:photoId')

.get( function(req, res, next) {
	
	Photos.findById(req.params.photoId, function (err, photo) {
		if (err) next (err);

		res.json(photo);
	});
})

.put( function(req, res, next) {
	
	Photos.findByIdAndUpdate(req.params.photoId, {
		$set: req.body
	}, {
		new:true
	}, function(err, photo) {
		if(err) next (err);

		res.json(photo);
	});

})

.delete(function(req, res, next) {
	
	Photos.remove(req.params.photoId, function(err, resp) {
		if (err) next (err);
		res.json(resp);
	});
});

module.exports = photoRouter;