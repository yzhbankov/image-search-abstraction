/**
 * Created by Iaroslav Zhbankov on 18.12.2016.
 */
var express = require('express');
var app = express();
var curTime = require('./getdate');
var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://yzhbankov:password1360@ds135798.mlab.com:35798/heroku_4np3mkvf';
var url = 'mongodb://localhost:27017/image-search';
var Bing = require('node-bing-api')({accKey: "31686f2bd2e34ac082269fb6f4513a4c"});

app.use(express.static('public'));

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/public');

});
app.get('/search/*', function (req, res) {
    var searchImg = req.params['0'];
    var offset = req.query['offset'];
    MongoClient.connect(url, function (err, db) {
        db.collection('search-image').insertOne({
            "term": searchImg,
            "when": curTime.currentTime()
        }, function (err, result) {
            if (!err) {
                console.log("inserted successfuly");
            }
        });
        db.close();
    });

    Bing.images(searchImg, {
        top: 10,   // Number of results (max 50)
        skip: offset    // Skip first 'offset' result
    }, function (error, respond, body) {
        res.send(body.value);
    });
});

app.get('/latest', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        var search = [];
        var i = 0;
        var resent = db.collection('search-image').find({}, {
            'term': true,
            "when": true,
            '_id': false
        }).sort({_id: -1}).limit(10).toArray(function (err, result) {
            if (result.length < 10) {
                while (result.length < 10) {
                    result.push({
                        'term': null,
                        "when": null
                    });
                }
            }
            res.send(result);
        });
        
        db.close();
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Ready. Listening server at port 3000')
});