var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var FlashCardModel = require('./models/flash-card-model');

var app = express(); // Create an express app!
module.exports = app; // Export it so it can be require('')'d

// The path of our public directory. ([ROOT]/public)
var publicPath = path.join(__dirname, '../public');

// The path of our index.html file. ([ROOT]/index.html)
var indexHtmlPath = path.join(__dirname, '../index.html');

// http://nodejs.org/docs/latest/api/globals.html#globals_dirname
// for more information about __dirname

// http://nodejs.org/api/path.html#path_path_join_path1_path2
// for more information about path.join

// When our server gets a request and the url matches
// something in our public folder, serve up that file
// e.g. angular.js, style.css
app.use(express.static(publicPath));

// parse json in post requests
app.use(bodyParser.json());

// If we're hitting our home page, serve up our index.html file!
app.get('/', function (req, res) {
    res.sendFile(indexHtmlPath);
});

app.use(function (req, res, next) {
	console.log('made it');
	next();
});

app.get('/cards', function (req, res) {

    var modelParams = {};

    if (req.query.category) {
    	modelParams.category = req.query.category;
    }

    FlashCardModel.find(modelParams, function (err, cards) {
        setTimeout(function () {
            res.send(cards);
        }, Math.random() * 1000);
    });

});

app.post('/cards', function(req, res) {
    // req.body holds new card info
    var newCard = new FlashCardModel(req.body);
    newCard.save(function(e, data) {
        if (e) throw e;
        // send back the new card
        res.json(data);
    });
});

app.get('/cards/:flashCardId', function(req, res) {
    // return the specified card
    console.log(req.query);
    FlashCardModel.findOne(req.query).exec()
        .then(function(card) {
            res.json(card);
        });
});

app.put('/cards/:flashCardId', function(req, res) {
    // update the specified card
    console.log(req.params.flashCardId);
    console.log(req.body);

    FlashCardModel.findByIdAndUpdate(
        req.params.flashCardId,
        req.body,
        function(e, data) {
            res.json(req.body);
        }
    );
});

app.delete('/cards/:flashCardId', function(req, res) {
    // update the specified card
    console.log('deleting', req.params.flashCardId);

    FlashCardModel.findByIdAndRemove(
        req.params.flashCardId,
        function(e, data) {
            res.json(data);
        }
    );
});


