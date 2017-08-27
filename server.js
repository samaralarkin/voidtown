// server.js
// where your node app starts

// init project
var express = require('express');
var connect = require('connect');
var session = require('express-session');
//express.bodyParser = require('body-parser');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

var words = new Object();


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
//app.use(express.bodyParser());


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))


app.use(function (req, res, next) {
  console.log('player' in req.session)
  console.log(req.session)
  if (!('player' in req.session)) {
    console.log('foo');
    req.session.player = new Player();
  }
  console.log('player' in req.session)
  next();
})


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  console.log('bar');
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/status", function (req, response) {
  req.session.player.visibleWords = words[req.session.player.x.toString() + '-' + req.session.player.y.toString()];
  console.log(req.session.player);
  response.send(req.session.player);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/", function (req, response) {
  switch (req.body.action) {
    case "say":
      if (req.body.content){
        words[req.session.player.x.toString()+'-'+req.session.player.y.toString()] = req.body.content;
      }
      break;
    case "move":
      switch (req.body.direction) {
        case "east":
          req.session.player.x += 1;
          break;
        case "west":
          req.session.player.x -= 1;
          break;
        case "north":
          req.session.player.y += 1;
          break;
        case "south":
          req.session.player.y -= 1;
          break;
      }
      break;
  }
  response.sendStatus(200);
});

// one player for now
var player = new Player();

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
