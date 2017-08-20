// server.js
// where your node app starts

// init project
var express = require('express');
var connect = require('connect');
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


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/status", function (request, response) {
  player.visibleWords = words[player.x.toString()+'-'+player.y.toString()];
  console.log(player);
  response.send(player);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/", function (request, response) {
  switch (request.body.action) {
    case "say":
      if (request.body.content){
        words[player.x.toString()+'-'+player.y.toString()] = request.body.content;
      }
      break;
    case "move":
      switch (request.body.direction) {
        case "east":
          player.x += 1;
          break;
        case "west":
          player.x -= 1;
          break;
        case "north":
          player.y += 1;
          break;
        case "south":
          player.y -= 1;
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
