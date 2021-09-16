var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// this from #7 Mount the Logger middleware
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

// This is from #11: Mount the body-parser middleware here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*console.log("Hello World");

app.get("/", function(req, res) {
  res.send("Hello Express");
});*/

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*app.get("/json", (req, res) => {
  res.json({
    message: "Hello json"
  });
});*/

let data = {"message": "Hello json"};

app.get('/json', function (req,res) {

    if(process.env.MESSAGE_STYLE==="uppercase"){
      data.message = data.message.toUpperCase();
    }
 return res.json(data);
})

// Chain Middleware to Create a Time Server
function getTheCurrentTimeString() {
  return new Date().toString();
}

app.get("/now", function(req, res, next) {
  req.time = getTheCurrentTimeString();
  next();
}, function(req, res) {
  res.json({time: req.time}); 
})

// Get input from client - Route parameters */

app.get("/:word/echo", (req, res) => {
  const {word} = req.params;
  res.json({
    echo: word
  });
});

//10) Get input from client - Query parameters
app.get("/name", function(req, res) {
  res.json({ name: req.query.first + " " + req.query.last});
});

/* 12) Get data form POST  */
app.post("/name", function(req, res) {
  res.json({ name: req.body.first + " " + req.body.last});
});




































 module.exports = app;
