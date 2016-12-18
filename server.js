/**
 * Created by Iaroslav Zhbankov on 18.12.2016.
 */
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var Bing = require('node-bing-api')({ accKey: "31686f2bd2e34ac082269fb6f4513a4c" });


app.get('/', function(req, res){
    Bing.images("cats", {
        top: 15,   // Number of results (max 50)
        skip: 3    // Skip first 3 result
    }, function(error, res, body){
        console.log(body);
    });
    res.send('hello world');
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Ready. Listening server at port 3000')
});