/**
 * Created by Iaroslav Zhbankov on 18.12.2016.
 */
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var Bing = require('node-bing-api')({accKey: "31686f2bd2e34ac082269fb6f4513a4c"});

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public');
});
app.get('/search/*', function (req, res) {
    var searchImg = req.params['0'];
    var offset = req.query['offset'];

    Bing.images(searchImg, {
        top: 10,   // Number of results (max 50)
        skip: offset    // Skip first 'offset' result
    }, function (error, respond, body) {
        res.send(body.value);
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Ready. Listening server at port 3000')
});