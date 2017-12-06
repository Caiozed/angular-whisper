
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql'); 

var con = mysql.createConnection({
  host: process.env.IP,
  user: "caiozed",
  password: "",
  database: "c9"
});

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Chat server listening at", process.env.IP + ":" + process.env.PORT);
});
