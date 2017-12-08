
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

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.post("/new/confession", function(req, res){
  var confessions = req.body.confession;
  var query = "INSERT INTO confessions(message) VALUES (?)";
  con.query(query, confessions, function(err, results, fields){
    if(err){
      res.json({status: 400, msg: "Something wrong"});
    }else{
      res.json({status: 200, msg: "Confession added"});
    }
  });
});

app.get("/confessions", function(req, res){
  var query = "SELECT * FROM confessions";
  con.query(query, function(err, results, fields){
    if(err){
      res.json({status: 400, msg: "Something wrong"});
    }else{
      res.json({status: 200, results: results});
    }
  });
});

app.get("/confessions/:page", function(req, res){
  var page = req.params.page;
  var query = "SELECT * FROM confessions OFFSET ? LIMIT ?";
  con.query(query, [page, page], function(err, results, fields){
    if(err){
      res.json({status: 400, msg: "Something wrong"});
    }else{
      res.json({status: 200, results: results});
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Chat server listening at", process.env.IP + ":" + process.env.PORT);
});
