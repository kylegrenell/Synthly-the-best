var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/home.html'));
});

app.get('/synth', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/synth.html'));
});

app.get('/synth/theremin', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/theremin.html'));
});

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


