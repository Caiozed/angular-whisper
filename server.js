
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql'); 
var db_config = {};

if(process.env.ENVIROMENT != "Production"){
  db_config = {
    host: process.env.IP,
    user: "caiozed",
    password: "",
    database: "c9"
  }
}else{
  db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
}

var con = mysql.createConnection(db_config);

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

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Chat server listening at", process.env.IP + ":" + process.env.PORT);
});
