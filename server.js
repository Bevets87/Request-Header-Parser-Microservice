// requires
var express = require('express');
var app = express();

// functions to parse header
var parseAcceptLanguage = function(str){
return str.split(',')[0];
}

var parseUserAgent = function(str){
return str.match(/\([^\)]+\)/)[0].replace('(','').replace(')', '')
}

// routes
app.get('/', function(req,res){
  var json = {};

  json.language = parseAcceptLanguage(req.headers['accept-language']);
  json.software = parseUserAgent(req.headers['user-agent']);
  json.ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  res.json(json);
});

// port
app.listen(process.env.PORT || 3000);
