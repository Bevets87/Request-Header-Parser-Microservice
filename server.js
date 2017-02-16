// requires
var express = require('express');
var app = express();

// functions to parse header
var parseAcceptLanguage = function(str){
return str.split(',')[0];
}

var parseUserAgent = function(str){
return str.match(/\([^\)]+\)/)[0].slice(1,str.length - 2)
}

var parseIpaddress = function(str){
    console.log(str.split(':'))
  return str.split(':')[str.length - 2];

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
