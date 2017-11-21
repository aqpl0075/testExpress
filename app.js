var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); //file path

var app = express();

app.get('/', function(req, res){
    res.send('Hello World again!');
});

app.listen(3000, function(){
    console.log('Server started on port 3000...');
});